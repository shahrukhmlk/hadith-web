"use client"

import { ButtonLoading } from "@/components/ui/buttons/ButtonLoading"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Status } from "@/data/models/status/status"
import { useFindUniqueUser, useUpsertUser } from "@/lib/hooks/query"
import { deleteUser } from "@/serverActions/user/deleteUser"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import clsx from "clsx"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export interface IUserEditFormProps {
  user: User
}

export const UserEditForm = ({ user }: IUserEditFormProps) => {
  const findUniqueUser = useFindUniqueUser(
    {
      where: {
        id: user.id,
      },
      select: {
        id: true,
        image: true,
        name: true,
        email: true,
        emailVerified: true,
        role: true,
      },
    },
    { initialData: user },
  )

  const upsertUser = useUpsertUser()

  const form = useForm({
    /*     resolver: zodResolver(UserSchem),
     */ values: findUniqueUser.data,
    defaultValues: { image: "", name: "", email: "", role: "" },
  })

  const { control } = form

  /***
   * If user is available from props and the query returns no data it means the data has changed on the server after
   * the server render, so we return null.
   */
  if (user && !findUniqueUser.data) {
    return null
  }

  const onSubmit = (values: User) => {
    upsertUser.mutate(
      {
        create: values,
        where: { id: values.id },
        update: values,
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      },
      {
        onSuccess(data, variables, context) {
          toast.success("Done!")
        },
      },
    )
  }

  if (!findUniqueUser.data) {
    return null
  }

  return (
    <>
      <Form {...form}>
        <form
          className={clsx("space-y-4")}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input disabled placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name={"role"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input placeholder="Role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="flex space-x-2">
        <ButtonLoading
          type="button"
          isLoading={upsertUser.isPending}
          onClick={() => {
            form.handleSubmit(onSubmit)()
          }}
        >
          Save
        </ButtonLoading>
        <form
          action={(e) => deleteUser(user.id)}
          className="flex flex-1 justify-end"
        >
          <ButtonLoading variant={"destructive"}>Delete User</ButtonLoading>
        </form>
      </div>
    </>
  )
}

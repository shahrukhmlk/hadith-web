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
import { auth } from "@/config/auth"
import {
  useDeleteUser,
  useFindUniqueUser,
  useUpsertUser,
} from "@/lib/hooks/query"
import { User } from "@prisma/client"
import clsx from "clsx"
import { forwardRef } from "react"
import { useForm } from "react-hook-form"

export interface UserEditFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  user: User
  onSave?: (id: string) => void
  onDelete?: () => void
}

export const UserEditForm = forwardRef<HTMLFormElement, UserEditFormProps>(
  ({ user, onSave, onDelete, ...props }, ref) => {
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

    const deleteUser = useDeleteUser({
      onSuccess(data, variables, context) {
        onDelete && onDelete()
      },
    })

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
            onSave && onSave(data?.id ?? "")
          },
        },
      )
    }

    if (!findUniqueUser.data) {
      return null
    }

    return (
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
                <FormLabel>Email</FormLabel>
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
                <FormLabel>Role</FormLabel>
                <FormControl>
                  {/* @ts-ignore */}
                  <Input placeholder="Role" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            <div className="flex-1"></div>
            {findUniqueUser.data && (
              <ButtonLoading
                type="button"
                variant={"destructive"}
                isLoading={deleteUser.isPending}
                onClick={() => {
                  deleteUser.mutate({ where: { id: findUniqueUser.data.id } })
                }}
              >
                Delete User
              </ButtonLoading>
            )}
          </div>
        </form>
      </Form>
    )
  },
)

UserEditForm.displayName = "UserEditForm"

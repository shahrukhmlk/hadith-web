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
import { ROUTES } from "@/constants/routes"
import { Status } from "@/data/models/status/status"
import { ITopic, TopicSchema } from "@/data/models/topic/topic"
import {
  useDeleteTopic,
  useFindUniqueTopic,
  useUpsertTopic,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { Route } from "next"
import { useRouter } from "next/navigation"
import { forwardRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export interface TopicEditFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  topic: ITopic
}

export const TopicEditForm = forwardRef<HTMLFormElement, TopicEditFormProps>(
  ({ topic, ...props }, ref) => {
    const findUniqueTopic = useFindUniqueTopic(
      {
        where: {
          id: topic.id,
        },
        select: {
          id: true,
          title: true,
          status: true,
        },
      },
      { initialData: topic },
    )

    const upsertTopic = useUpsertTopic()
    const deleteTopic = useDeleteTopic()
    const router = useRouter()

    const form = useForm({
      resolver: zodResolver(TopicSchema.partial({ id: true })),
      values: findUniqueTopic.data,
      defaultValues: { title: "", status: Status.draft },
    })

    const { control } = form

    /***
     * If topic is available from props and the query returns no data it means the data has changed on the server after
     * the server render, so we return null.
     */
    if (topic && !findUniqueTopic.data) {
      return null
    }

    const onSubmit = (values: ITopic) => {
      upsertTopic.mutate(
        {
          create: values,
          where: { id: values.id },
          update: values,
          select: {
            id: true,
            title: true,
            status: true,
          },
        },
        {
          onSuccess(data, variables, context) {
            toast.success("Done!")
          },
        },
      )
    }

    if (!findUniqueTopic.data) {
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
              control={control}
              name={"title"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Topic" {...field} />
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
            variant={"secondary"}
            isLoading={
              upsertTopic.isPending && form.getValues("status") === Status.draft
            }
            onClick={() => {
              form.setValue("status", Status.draft)
              form.handleSubmit(onSubmit)()
            }}
          >
            Save Draft
          </ButtonLoading>
          <ButtonLoading
            isLoading={
              upsertTopic.isPending &&
              form.getValues("status") === Status.published
            }
            onClick={() => {
              form.setValue("status", Status.published)
              form.handleSubmit(onSubmit)()
            }}
          >
            {findUniqueTopic.data.status === Status.published
              ? "Update"
              : "Publish"}
          </ButtonLoading>
          <div className="flex-1"></div>
          <ButtonLoading
            type="button"
            variant={"destructive"}
            isLoading={deleteTopic.isPending}
            onClick={() => {
              deleteTopic.mutate(
                { where: { id: findUniqueTopic.data.id } },
                {
                  onSuccess(data, variables, context) {
                    router.replace(ROUTES.ADMIN.TOPICS as Route)
                  },
                },
              )
            }}
          >
            Delete Topic
          </ButtonLoading>
        </div>
      </>
    )
  },
)

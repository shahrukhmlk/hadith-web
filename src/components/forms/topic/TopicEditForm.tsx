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
import { ITopic, TopicSchema } from "@/data/models/topic/topic"
import {
  useDeleteTopic,
  useFindUniqueTopic,
  useUpsertTopic,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { forwardRef } from "react"
import { useForm } from "react-hook-form"

export interface TopicEditFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  topic?: ITopic
  onSave?: (id: number) => void
  onDelete?: () => void
}

export const TopicEditForm = forwardRef<HTMLFormElement, TopicEditFormProps>(
  ({ topic, onSave, onDelete, ...props }, ref) => {
    const findUniqueTopic = useFindUniqueTopic(
      {
        where: {
          id: topic?.id,
        },
        select: {
          id: true,
          title: true,
          status: true,
        },
      },
      { initialData: topic, enabled: !!topic },
    )

    const upsertTopic = useUpsertTopic()
    const deleteTopic = useDeleteTopic({
      onSuccess(data, variables, context) {
        onDelete && onDelete()
      },
    })

    const form = useForm({
      resolver: zodResolver(TopicSchema.partial({ id: true })),
      values: findUniqueTopic.data,
      defaultValues: { id: 0, title: "", status: Status.draft },
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
            onSave && onSave(data?.id ?? 0)
          },
        },
      )
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
                  <FormLabel>Topic</FormLabel>
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
            {findUniqueTopic.data?.status === Status.published
              ? "Update"
              : "Publish"}
          </ButtonLoading>
          <div className="flex-1"></div>
          {findUniqueTopic.data && (
            <ButtonLoading
              type="button"
              variant={"destructive"}
              isLoading={deleteTopic.isPending}
              onClick={() => {
                deleteTopic.mutate({ where: { id: findUniqueTopic.data.id } })
              }}
            >
              Delete Topic
            </ButtonLoading>
          )}
        </div>
      </>
    )
  },
)

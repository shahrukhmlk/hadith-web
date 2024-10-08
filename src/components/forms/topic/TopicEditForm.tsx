"use client"

import { ButtonConfirm } from "@/components/ui/buttons/ButtonConfirm"
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
import { ITopic, TopicSchema } from "@/data/models/topic/topic"
import {
  useDeleteTopic,
  useFindUniqueTopic,
  useUpsertTopic,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { omit } from "lodash"
import { forwardRef } from "react"
import { useForm } from "react-hook-form"

export interface TopicEditFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  topic?: ITopic
  onSave?: (id: number) => void
  onDelete?: () => void
}

export const TopicEditForm = forwardRef<HTMLFormElement, TopicEditFormProps>(
  ({ topic, onSave, onDelete, className, ...props }, ref) => {
    const findUniqueTopic = useFindUniqueTopic(
      {
        where: {
          id: topic?.id,
        },
        select: {
          id: true,
          title: true,
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
      defaultValues: { id: 0, title: "" },
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
          create: omit(values, ["id"]),
          where: { id: values.id },
          update: values,
          select: {
            id: true,
            title: true,
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
      <Form {...form}>
        <form
          className={clsx("space-y-4", className)}
          onSubmit={form.handleSubmit(onSubmit)}
          {...props}
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
          <div className="flex space-x-2">
            <ButtonLoading type="submit" isLoading={upsertTopic.isPending}>
              Save
            </ButtonLoading>
            <div className="flex-1"></div>
            {findUniqueTopic.data && (
              <ButtonConfirm
                type="button"
                variant={"destructive"}
                isLoading={deleteTopic.isPending}
                onClick={() => {
                  deleteTopic.mutate({
                    where: { id: findUniqueTopic.data.id },
                  })
                }}
              >
                Delete Topic
              </ButtonConfirm>
            )}
          </div>
        </form>
      </Form>
    )
  },
)

TopicEditForm.displayName = "TopicEditForm"

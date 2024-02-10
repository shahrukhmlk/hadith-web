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
import {
  ITopicTranslation,
  TopicTranslationSchema,
} from "@/data/models/topic/topic-translation"
import {
  useDeleteTopicTranslation,
  useFindUniqueTopicTranslation,
  useUpsertTopicTranslation,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { FormHTMLAttributes, forwardRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export interface ITopicTranslationEditFormProps
  extends FormHTMLAttributes<HTMLFormElement> {
  topicTranslation: ITopicTranslation
}

export const TopicTranslationEditForm = forwardRef<
  HTMLFormElement,
  ITopicTranslationEditFormProps
>(({ topicTranslation, ...props }, ref) => {
  const findUniqueTopicTranslation = useFindUniqueTopicTranslation(
    {
      where: {
        topicID_languageCode: {
          languageCode: topicTranslation.languageCode,
          topicID: topicTranslation.topicID,
        },
      },
      select: {
        topicID: true,
        languageCode: true,
        title: true,
      },
    },
    { initialData: topicTranslation },
  )
  const upsertTopicTranslation = useUpsertTopicTranslation()
  const deleteTopicTranslation = useDeleteTopicTranslation()

  const form = useForm({
    resolver: zodResolver(TopicTranslationSchema),
    values: findUniqueTopicTranslation.data,
    defaultValues: { topicID: -1, languageCode: "", title: "" },
  })
  const { control, handleSubmit, formState } = form

  const onSubmit = (values: ITopicTranslation) => {
    upsertTopicTranslation.mutate(
      {
        create: values,
        where: {
          topicID_languageCode: {
            topicID: topicTranslation.topicID,
            languageCode: topicTranslation.languageCode,
          },
        },
        update: values,
        select: {
          topicID: true,
          languageCode: true,
          title: true,
        },
      },
      {
        onSuccess(data, variables, context) {
          toast.success("Done!")
        },
      },
    )
  }

  return (
    <Form {...form}>
      <form
        ref={ref}
        className={clsx("space-y-4")}
        onSubmit={handleSubmit(onSubmit)}
        {...props}
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
        <div className="flex justify-end space-x-2">
          <ButtonLoading
            isLoading={upsertTopicTranslation.isPending}
            disabled={!formState.isDirty}
          >
            Save
          </ButtonLoading>
          <ButtonLoading
            type="button"
            variant={"destructive"}
            isLoading={deleteTopicTranslation.isPending}
            onClick={() => {
              deleteTopicTranslation.mutate({
                where: {
                  topicID_languageCode: {
                    topicID: topicTranslation.topicID,
                    languageCode: topicTranslation.languageCode,
                  },
                },
              })
            }}
          >
            Delete
          </ButtonLoading>
        </div>
      </form>
    </Form>
  )
})

TopicTranslationEditForm.displayName = "TopicTranslationEditForm"

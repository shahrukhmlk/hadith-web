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
import { Textarea } from "@/components/ui/textarea"
import {
  HadithTranslationSchema,
  IHadithTranslation,
} from "@/data/models/hadith/hadith-translation"
import {
  useDeleteHadithTranslation,
  useFindUniqueHadithTranslation,
  useUpsertHadithTranslation,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { FormHTMLAttributes, forwardRef } from "react"
import { useForm } from "react-hook-form"

export interface IHadithTranslationEditFormProps
  extends FormHTMLAttributes<HTMLFormElement> {
  hadithTranslation: IHadithTranslation
  onSave?: (id: number, languageCode: string) => void
  onDelete?: () => void
}

export const HadithTranslationEditForm = forwardRef<
  HTMLFormElement,
  IHadithTranslationEditFormProps
>(({ hadithTranslation, onSave, onDelete, ...props }, ref) => {
  const findUniqueHadithTranslation = useFindUniqueHadithTranslation(
    {
      where: {
        hadithID_languageCode: {
          languageCode: hadithTranslation.languageCode,
          hadithID: hadithTranslation.hadithID,
        },
      },
      select: {
        hadithID: true,
        languageCode: true,
        text: true,
      },
    },
    { initialData: hadithTranslation },
  )
  const upsertHadithTranslation = useUpsertHadithTranslation()
  const deleteHadithTranslation = useDeleteHadithTranslation({
    onSuccess(data, variables, context) {
      onDelete && onDelete()
    },
  })

  const form = useForm({
    resolver: zodResolver(HadithTranslationSchema),
    values: findUniqueHadithTranslation.data,
    defaultValues: {
      hadithID: -1,
      languageCode: "",
      text: "",
    },
  })
  const { handleSubmit, formState } = form

  const onSubmit = (values: IHadithTranslation) => {
    upsertHadithTranslation.mutate(
      {
        create: values,
        where: {
          hadithID_languageCode: {
            languageCode: hadithTranslation.languageCode,
            hadithID: hadithTranslation.hadithID,
          },
        },
        update: values,
        select: {
          hadithID: true,
          languageCode: true,
          text: true,
        },
      },
      {
        onSuccess(data, variables, context) {},
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
          control={form.control}
          name={"text"}
          render={({ field }) => (
            <FormItem className="flex flex-1 flex-col">
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea
                  dir="auto"
                  placeholder="Text..."
                  {...field}
                  className="flex-1 resize-none text-base"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-2">
          <ButtonLoading
            isLoading={upsertHadithTranslation.isPending}
            disabled={!formState.isDirty}
          >
            Save
          </ButtonLoading>
          <div className="flex-1"></div>
          <ButtonLoading
            type="button"
            variant={"destructive"}
            isLoading={deleteHadithTranslation.isPending}
            onClick={() => {
              deleteHadithTranslation.mutate({
                where: {
                  hadithID_languageCode: {
                    hadithID: hadithTranslation.hadithID,
                    languageCode: hadithTranslation.languageCode,
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

HadithTranslationEditForm.displayName = "HadithTranslationEditForm"

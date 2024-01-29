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
import { Textarea } from "@/components/ui/textarea"
import {
  HadithTranslationSchema,
  IHadithTranslation,
} from "@/data/models/hadith/hadith"
import {
  useDeleteHadithTranslation,
  useFindUniqueHadithTranslation,
  useUpsertHadithTranslation,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { FormHTMLAttributes, forwardRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export interface IHadithTranslationEditFormProps
  extends FormHTMLAttributes<HTMLFormElement> {
  hadithTranslation: IHadithTranslation
}

export const HadithTranslationEditForm = forwardRef<
  HTMLFormElement,
  IHadithTranslationEditFormProps
>(({ hadithTranslation, ...props }, ref) => {
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
        topic: true,
        text: true,
        fontScale: true,
      },
    },
    { initialData: hadithTranslation },
  )
  const upsertHadithTranslation = useUpsertHadithTranslation()
  const deleteHadithTranslation = useDeleteHadithTranslation()

  const form = useForm<IHadithTranslation>({
    resolver: zodResolver(HadithTranslationSchema),
    values: findUniqueHadithTranslation.data,
    defaultValues: {
      hadithID: -1,
      languageCode: "",
      topic: "",
      text: "",
      fontScale: 0,
    },
  })
  const { control, handleSubmit, formState } = form

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
          topic: true,
          text: true,
          fontScale: true,
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
          control={form.control}
          name={"topic"}
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
        <FormField
          control={form.control}
          name={"text"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea dir="auto" placeholder="Text..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <ButtonLoading
            isLoading={upsertHadithTranslation.isPending}
            disabled={!formState.isDirty}
          >
            Save
          </ButtonLoading>
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
      {/*       <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
       */}{" "}
    </Form>
  )
})

HadithTranslationEditForm.displayName = "HadithTranslationEditForm"

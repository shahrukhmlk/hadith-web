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
import {
  BookTranslationSchema,
  IBookTranslation,
} from "@/data/models/book/book-translation"
import {
  useDeleteBookTranslation,
  useFindUniqueBookTranslation,
  useUpsertBookTranslation,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { FormHTMLAttributes, forwardRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export interface IBookTranslationEditFormProps
  extends FormHTMLAttributes<HTMLFormElement> {
  bookTranslation: IBookTranslation
}

export const BookTranslationEditForm = forwardRef<
  HTMLFormElement,
  IBookTranslationEditFormProps
>(({ bookTranslation, ...props }, ref) => {
  const findUniqueBookTranslation = useFindUniqueBookTranslation(
    {
      where: {
        bookID_languageCode: {
          languageCode: bookTranslation.languageCode,
          bookID: bookTranslation.bookID,
        },
      },
      select: {
        bookID: true,
        languageCode: true,
        name: true,
      },
    },
    { initialData: bookTranslation },
  )
  const upsertBookTranslation = useUpsertBookTranslation()
  const deleteBookTranslation = useDeleteBookTranslation()

  const form = useForm({
    resolver: zodResolver(BookTranslationSchema),
    values: findUniqueBookTranslation.data,
    defaultValues: { bookID: -1, languageCode: "", name: "" },
  })
  const { control, handleSubmit, formState } = form

  const onSubmit = (values: IBookTranslation) => {
    upsertBookTranslation.mutate(
      {
        create: values,
        where: {
          bookID_languageCode: {
            bookID: bookTranslation.bookID,
            languageCode: bookTranslation.languageCode,
          },
        },
        update: values,
        select: {
          bookID: true,
          languageCode: true,
          name: true,
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
          name={"name"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end space-x-2">
          <ButtonLoading
            isLoading={upsertBookTranslation.isPending}
            disabled={!formState.isDirty}
          >
            Save
          </ButtonLoading>
          <ButtonConfirm
            type="button"
            variant={"destructive"}
            isLoading={deleteBookTranslation.isPending}
            onClick={() => {
              deleteBookTranslation.mutate({
                where: {
                  bookID_languageCode: {
                    bookID: bookTranslation.bookID,
                    languageCode: bookTranslation.languageCode,
                  },
                },
              })
            }}
          >
            Delete
          </ButtonConfirm>
        </div>
      </form>
    </Form>
  )
})

BookTranslationEditForm.displayName = "BookTranslationEditForm"

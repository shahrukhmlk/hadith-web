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
  bookTranslation?: IBookTranslation
  onBookTranslationCreate?: (bookTranslation: IBookTranslation) => void
}

export const BookTranslationEditForm = forwardRef<
  HTMLFormElement,
  IBookTranslationEditFormProps
>(({ bookTranslation, onBookTranslationCreate, ...props }, ref) => {
  const findUniqueBookTranslation = useFindUniqueBookTranslation(
    {
      where: {
        bookID_languageCode: {
          languageCode: bookTranslation?.languageCode || "",
          bookID: bookTranslation?.bookID || -1,
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

  const form = useForm<IBookTranslation>({
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
            bookID: bookTranslation?.bookID || -1,
            languageCode: bookTranslation?.languageCode || "",
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
          if (data && !bookTranslation) {
            onBookTranslationCreate ? onBookTranslationCreate(data) : null
          }
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
          <ButtonLoading
            type="button"
            variant={"destructive"}
            isLoading={deleteBookTranslation.isPending}
            onClick={() => {
              deleteBookTranslation.mutate({
                where: {
                  bookID_languageCode: {
                    bookID: bookTranslation?.bookID ?? -1,
                    languageCode: bookTranslation?.languageCode ?? "",
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

BookTranslationEditForm.displayName = "BookTranslationEditForm"

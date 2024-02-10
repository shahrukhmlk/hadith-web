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
import { BookSchema, IBook } from "@/data/models/book/book"
import { Status } from "@/data/models/status/status"
import {
  useDeleteBook,
  useFindUniqueBook,
  useUpsertBook,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { omit } from "lodash"
import { forwardRef } from "react"
import { useForm } from "react-hook-form"

export interface BookEditFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  book?: IBook
  onSave?: (id: number) => void
  onDelete?: () => void
}

export const BookEditForm = forwardRef<HTMLFormElement, BookEditFormProps>(
  ({ book, onSave, onDelete, ...props }, ref) => {
    const findUniqueBook = useFindUniqueBook(
      {
        where: {
          id: book?.id,
        },
        select: {
          id: true,
          name: true,
          status: true,
        },
      },
      { initialData: book, enabled: !!book },
    )

    const upsertBook = useUpsertBook()

    const deleteBook = useDeleteBook({
      onSuccess(data, variables, context) {
        onDelete && onDelete()
      },
    })

    const form = useForm({
      resolver: zodResolver(BookSchema.partial({ id: true })),
      values: findUniqueBook.data,
      defaultValues: { id: 0, name: "", status: Status.draft },
    })

    const { control } = form

    /***
     * If book is available from props and the query returns no data it means the data has changed on the server after
     * the server render, so we return null.
     */
    if (book && !findUniqueBook.data) {
      return null
    }

    const onSubmit = (values: IBook) => {
      upsertBook.mutate(
        {
          create: omit(values, ["id"]),
          where: { id: values.id },
          update: values,
          select: {
            id: true,
            name: true,
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
          </form>
        </Form>
        <div className="flex space-x-2">
          <ButtonLoading
            type="button"
            variant={"secondary"}
            isLoading={
              upsertBook.isPending && form.getValues("status") === Status.draft
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
              upsertBook.isPending &&
              form.getValues("status") === Status.published
            }
            onClick={() => {
              form.setValue("status", Status.published)
              form.handleSubmit(onSubmit)()
            }}
          >
            {findUniqueBook.data?.status === Status.published
              ? "Update"
              : "Publish"}
          </ButtonLoading>
          <div className="flex-1"></div>
          {findUniqueBook.data && (
            <ButtonLoading
              type="button"
              variant={"destructive"}
              isLoading={deleteBook.isPending}
              onClick={() => {
                deleteBook.mutate({ where: { id: findUniqueBook.data.id } })
              }}
            >
              Delete Book
            </ButtonLoading>
          )}
        </div>
      </>
    )
  },
)

BookEditForm.displayName = "BookEditForm"

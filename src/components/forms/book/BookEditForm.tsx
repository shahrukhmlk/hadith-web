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
import { BookSchema, IBook } from "@/data/models/book/book"
import { Status } from "@/data/models/status/status"
import {
  useDeleteBook,
  useFindUniqueBook,
  useUpsertBook,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { Route } from "next"
import { useRouter } from "next/navigation"
import { forwardRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export interface BookEditFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  book: IBook
}

export const BookEditForm = forwardRef<HTMLFormElement, BookEditFormProps>(
  ({ book, ...props }, ref) => {
    const findUniqueBook = useFindUniqueBook(
      {
        where: {
          id: book.id,
        },
        select: {
          id: true,
          name: true,
          status: true,
        },
      },
      { initialData: book },
    )

    const upsertBook = useUpsertBook()

    const deleteBook = useDeleteBook()
    const router = useRouter()

    const form = useForm({
      resolver: zodResolver(BookSchema.partial({ id: true })),
      values: findUniqueBook.data,
      defaultValues: { name: "", status: Status.draft },
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
          create: values,
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
            toast.success("Done!")
          },
        },
      )
    }

    if (!findUniqueBook.data) {
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
            {findUniqueBook.data.status === Status.published
              ? "Update"
              : "Publish"}
          </ButtonLoading>
          <div className="flex-1">
            <ButtonLoading
              type="button"
              variant={"destructive"}
              isLoading={deleteBook.isPending}
              onClick={() => {
                deleteBook.mutate(
                  { where: { id: findUniqueBook.data.id } },
                  {
                    onSuccess(data, variables, context) {
                      router.replace(ROUTES.ADMIN.BOOKS as Route)
                    },
                  },
                )
              }}
            >
              Delete Book
            </ButtonLoading>
          </div>
        </div>
      </>
    )
  },
)

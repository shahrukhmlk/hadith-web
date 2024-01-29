"use client"

import SearchableSelectInput from "@/components/inputs/searchable-select/SearchableSelectInput"
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
import { IBook } from "@/data/models/book/book"
import { HadithBookSchema, IHadithBook } from "@/data/models/hadith/hadith"
import {
  useDeleteHadithBook,
  useFindManyBook,
  useFindUniqueHadithBook,
  useUpsertHadithBook,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import { keepPreviousData } from "@tanstack/react-query"
import clsx from "clsx"
import { forwardRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export interface HadithBookFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  hadithBook: IHadithBook
  books: IBook[]
}

const HadithBookForm = forwardRef<HTMLFormElement, HadithBookFormProps>(
  ({ hadithBook, books, ...props }, ref) => {
    const [bookSearch, setBookSearch] = useState<string>()
    const findUniqueHadithBook = useFindUniqueHadithBook(
      {
        where: {
          hadithID_bookID: {
            bookID: hadithBook.bookID,
            hadithID: hadithBook.hadithID,
          },
        },
        select: {
          bookID: true,
          hadithID: true,
          hadithRefNumber: true,
        },
      },
      { initialData: hadithBook },
    )
    const findManyBook = useFindManyBook(
      {
        where: {
          name: {
            contains: bookSearch?.length ? bookSearch : undefined,
          },
        },
        select: {
          id: true,
          status: true,
          name: true,
        },
      },
      {
        initialData: bookSearch?.length ? undefined : books,
        placeholderData: keepPreviousData,
      },
    )
    const upsertHadithBook = useUpsertHadithBook()
    const deleteHadithBook = useDeleteHadithBook()

    const form = useForm<IHadithBook>({
      resolver: zodResolver(HadithBookSchema),
      values: findUniqueHadithBook.data,
      // @ts-ignore
      defaultValues: { bookID: -1, hadithID: -1, hadithRefNumber: "" },
    })
    const { control, handleSubmit, formState } = form

    const onSubmit = (values: IHadithBook) => {
      upsertHadithBook.mutate(
        {
          create: values,
          where: {
            hadithID_bookID: {
              bookID: values.bookID,
              hadithID: values.hadithID,
            },
          },
          update: values,
          select: {
            bookID: true,
            hadithID: true,
            hadithRefNumber: true,
          },
        },
        {
          onSuccess(data, variables, context) {
            toast.success("Done!")
          },
        },
      )
    }
    const getSelectableBooks = () => {
      return (
        findManyBook.data?.map((book) => {
          return {
            label: book.name,
            value: book.id.toString(),
          }
        }) ?? []
      )
    }

    if (!findUniqueHadithBook.data) {
      return null
    }

    return (
      <Form {...form}>
        <form
          ref={ref}
          className={clsx("flex flex-wrap gap-2")}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <FormField
            control={control}
            name={"bookID"}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <SearchableSelectInput
                    items={getSelectableBooks()}
                    selectedItem={getSelectableBooks().find(
                      (item) => parseInt(item.value) === field.value,
                    )}
                    isLoading={findManyBook.isFetching}
                    selectText="Select Book"
                    onItemSelect={(item) =>
                      field.onChange(parseInt(item.value))
                    }
                    onFilterChange={setBookSearch}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name={"hadithRefNumber"}
            render={({ field }) => (
              <FormItem className="basis-32">
                <FormControl>
                  <Input placeholder="Hadith Number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-end space-x-2">
            <ButtonLoading
              isLoading={upsertHadithBook.isPending}
              disabled={!formState.isDirty}
            >
              Save
            </ButtonLoading>
            <ButtonLoading
              type="button"
              variant={"destructive"}
              isLoading={deleteHadithBook.isPending}
              onClick={() => {
                deleteHadithBook.mutate({
                  where: {
                    hadithID_bookID: {
                      bookID: findUniqueHadithBook.data.bookID,
                      hadithID: findUniqueHadithBook.data.hadithID,
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
  },
)
HadithBookForm.displayName = "HadithBookForm"

export default HadithBookForm

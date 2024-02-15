"use client"

import SearchableSelectInput from "@/components/inputs/searchable-select/SearchableSelectInput"
import { Button } from "@/components/ui/button"
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
import { Label } from "@/components/ui/label"
import { IBook } from "@/data/models/book/book"
import { HadithBookSchema, IHadithBook } from "@/data/models/hadith/hadith-book"
import {
  useDeleteHadithBook,
  useFindManyBook,
  useFindManyHadithBook,
  useUpdateHadith,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import { keepPreviousData } from "@tanstack/react-query"
import clsx from "clsx"
import { Minus, Plus } from "lucide-react"
import { forwardRef, useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

export interface HadithBooksFormProps
  extends React.FormHTMLAttributes<HTMLFormElement> {
  hadithID: number
  hadithBooks: IHadithBook[]
  books: IBook[]
}

const HadithBooksForm = forwardRef<HTMLFormElement, HadithBooksFormProps>(
  ({ hadithID, hadithBooks, books, ...props }, ref) => {
    const [bookSearch, setBookSearch] = useState<string>("")
    const findManyHadithBook = useFindManyHadithBook(
      {
        where: {
          hadithID: hadithID,
        },
        select: {
          bookID: true,
          hadithID: true,
          hadithRefNumber: true,
        },
      },
      {
        initialData: hadithBooks,
        select(data) {
          return { hadithBooks: data }
        },
      },
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
        orderBy: { sort: "asc" },
      },
      {
        initialData: bookSearch?.length ? undefined : books,
        placeholderData: keepPreviousData,
        select(data) {
          return data.map((book) => {
            return {
              value: book.id.toString(),
              label: book.name,
            }
          })
        },
      },
    )

    const updateHadith = useUpdateHadith()
    const deleteHadithBook = useDeleteHadithBook()

    const schema = z.object({
      hadithBooks: z.array(HadithBookSchema),
    })
    type Type = z.infer<typeof schema>

    const form = useForm({
      resolver: zodResolver(schema),
      defaultValues: findManyHadithBook.data,
      /* defaultValues: {
        hadithBooks: [{ hadithID: hadithID, bookID: -1, hadithRefNumber: 0 }],
      }, */
    })
    const { control, handleSubmit, formState } = form

    const booksFieldArray = useFieldArray({
      control,
      name: "hadithBooks",
    })

    const onSubmit = (values: Type) => {
      updateHadith.mutate({
        where: {
          id: hadithID,
        },
        data: {
          books: {
            createMany: { data: values?.hadithBooks },
          },
        },
      })
    }

    return (
      <Form {...form}>
        <form
          ref={ref}
          className={clsx("space-y-4")}
          onSubmit={handleSubmit(onSubmit)}
          {...props}
        >
          <Label className="flex items-center gap-2">
            Books{" "}
            <Button
              type="button"
              size={"icon"}
              variant={"secondary"}
              onClick={() => {
                booksFieldArray.append(
                  {
                    hadithID: hadithID,
                    bookID: -1,
                    hadithRefNumber: 0,
                  },
                  { shouldFocus: false },
                )
              }}
            >
              <Plus />
            </Button>
          </Label>
          {booksFieldArray.fields.map((item, index) => (
            <div key={item.id} className="flex flex-wrap gap-2">
              <FormField
                control={control}
                name={`hadithBooks.${index}.bookID`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <SearchableSelectInput
                        items={findManyBook.data ?? []}
                        selectedItem={findManyBook.data?.find(
                          (item) => parseInt(item.value) === field.value,
                        )}
                        isLoading={findManyBook.isFetching}
                        selectText="Select Book"
                        onItemSelect={(item) =>
                          field.onChange(parseInt(item.value))
                        }
                        filterValue={bookSearch}
                        onFilterChange={setBookSearch}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name={`hadithBooks.${index}.hadithRefNumber`}
                render={({ field }) => (
                  <FormItem className="basis-32">
                    <FormControl>
                      <Input placeholder="Hadith Number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ButtonConfirm
                isLoading={deleteHadithBook.isPending}
                type="button"
                size={"icon"}
                variant={"destructive"}
                onClick={() => {
                  if (
                    findManyHadithBook.data &&
                    findManyHadithBook.data.hadithBooks[index]?.hadithID ===
                      item.hadithID
                  ) {
                    deleteHadithBook.mutate({
                      where: {
                        hadithID_bookID: {
                          hadithID: hadithID,
                          bookID: item.bookID,
                        },
                      },
                    })
                  }
                  booksFieldArray.remove(index)
                }}
              >
                <Minus />
              </ButtonConfirm>
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <ButtonLoading
              isLoading={updateHadith.isPending}
              disabled={!formState.isDirty}
            >
              Save
            </ButtonLoading>
          </div>
        </form>
        {/*       <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
         */}{" "}
      </Form>
    )
  },
)
HadithBooksForm.displayName = "HadithBookForm"

export default HadithBooksForm

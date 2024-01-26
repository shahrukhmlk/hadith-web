"use client"

import { ButtonLoading } from "@/components/ui/buttons/ButtonLoading"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
import {
  BookSchema,
  IBook,
  IBookWithTranslations,
} from "@/data/models/book/book"
import { IBookTranslation } from "@/data/models/book/book-translation"
import { ILanguage } from "@/data/models/language/language"
import { Status } from "@/data/models/status/status"
import {
  useCreateBookTranslation,
  useFindManyBookTranslation,
  useFindUniqueBook,
  useUpsertBook,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import clsx from "clsx"
import { Plus } from "lucide-react"
import { useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { BookTranslationEditForm } from "./BookTranslationEditForm"

export interface IBookEditForm {
  book?: IBookWithTranslations
  languages: ILanguage[]
  onBookCreate?: (bookID: number) => void
}

export const BookEditForm = ({
  book,
  languages,
  onBookCreate,
}: IBookEditForm) => {
  const translationsRef = useRef<Map<string, HTMLFormElement>>(new Map())

  const findUniqueBook = useFindUniqueBook(
    {
      where: {
        id: book?.id ?? -1,
      },
      select: {
        id: true,
        name: true,
        status: true,
      },
    },
    { initialData: book },
  )

  const findManyBookTranslation = useFindManyBookTranslation(
    {
      where: {
        bookID: book?.id || -1,
      },
      select: {
        bookID: true,
        languageCode: true,
        name: true,
      },
      orderBy: { language: { sort: "asc" } },
    },
    { initialData: book?.translations },
  )
  const upsertBook = useUpsertBook()
  const createBookTranslation = useCreateBookTranslation()

  const form = useForm<IBook>({
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

  const addBookTranslation = (translation: IBookTranslation) => {
    createBookTranslation.mutate(
      {
        data: translation,
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
        onError(error, variables, context) {
          toast.error(`An error occured`)
        },
      },
    )
  }

  const onSubmit = (values: IBook) => {
    upsertBook.mutate(
      {
        create: values,
        where: { id: values.id || -1 },
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
          if (data && !book) {
            onBookCreate ? onBookCreate(data.id) : null
          }
        },
      },
    )
    translationsRef.current.forEach((el) => el.requestSubmit())
  }

  const notTranlsatedLanguages = () => {
    return languages.filter(
      (language) =>
        findManyBookTranslation.data &&
        !findManyBookTranslation.data.some(
          (translation) => translation.languageCode === language.code,
        ),
    )
  }

  return (
    <>
      <Form {...form}>
        <form
          className={clsx("space-y-4")}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
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
        <div className="flex items-center gap-2">
          Translations
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ButtonLoading
                variant={"outline"}
                size={"icon"}
                disabled={
                  !findUniqueBook.data || notTranlsatedLanguages().length === 0
                }
                isLoading={createBookTranslation.isPending}
                type="button"
              >
                <Plus className="h-4 w-4" />
              </ButtonLoading>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Add translation for:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notTranlsatedLanguages().map((language) => (
                <DropdownMenuItem
                  key={language.code}
                  onClick={() => {
                    if (findUniqueBook.data) {
                      addBookTranslation({
                        bookID: findUniqueBook.data.id,
                        languageCode: language.code,
                        name: "",
                      })
                    }
                  }}
                >
                  {language.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/*         <pre>{JSON.stringify(form.formState.errors, null, 2)}</pre>
         */}{" "}
        {/* <DevTool control={control} /> */}
      </Form>
      {findManyBookTranslation.data?.map((translation, index) => (
        <div className="space-y-2" key={index}>
          <Label>
            {languages.find((l) => l.code === translation.languageCode)?.name}
          </Label>
          <BookTranslationEditForm
            ref={(el) => {
              if (el) {
                translationsRef.current.set(translation.languageCode, el)
              } else {
                translationsRef.current.delete(translation.languageCode)
              }
            }}
            key={index}
            bookTranslation={translation}
          />
        </div>
      ))}
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
      </div>
    </>
  )
}

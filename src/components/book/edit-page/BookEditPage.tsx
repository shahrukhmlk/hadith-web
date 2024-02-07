"use client"

import { BookEditForm } from "@/components/forms/book/BookEditForm"
import { BookTranslationEditForm } from "@/components/forms/book/BookTranslationEditForm"
import { ButtonLoading } from "@/components/ui/buttons/ButtonLoading"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { ROUTES } from "@/constants/routes"
import { IBookDetails } from "@/data/models/book/book-details"
import { ILanguage } from "@/data/models/language/language"
import {
  useCreateBookTranslation,
  useFindManyBookTranslation,
  useFindUniqueBook,
} from "@/lib/hooks/query"
import { Plus } from "lucide-react"
import { Route } from "next"
import { useRouter } from "next/navigation"
import { forwardRef, useRef } from "react"

export interface BookEditPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  book: IBookDetails
  languages: ILanguage[]
}

export const BookEditPage = forwardRef<HTMLDivElement, BookEditPageProps>(
  ({ book, languages, ...props }, ref) => {
    const router = useRouter()
    const translationsRef = useRef<Map<string, HTMLFormElement>>(new Map())
    const bookEditFormRef = useRef<HTMLFormElement | null>(null)

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

    const findManyBookTranslation = useFindManyBookTranslation(
      {
        where: {
          bookID: book.id,
        },
        select: {
          bookID: true,
          languageCode: true,
          name: true,
        },
        orderBy: { language: { sort: "asc" } },
      },
      { initialData: book.translations },
    )
    const createBookTranslation = useCreateBookTranslation()

    /***
     * If book is available from props and the query returns no data it means the data has changed on the server after
     * the server render, so we return null.
     */
    if (book && !findUniqueBook.data) {
      return null
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
    if (!findUniqueBook.data) {
      return null
    }

    return (
      <div className="space-y-4" ref={ref} {...props}>
        <BookEditForm
          ref={bookEditFormRef}
          book={findUniqueBook.data}
          onSave={(id) => {}}
          onDelete={() => {
            router.replace(ROUTES.ADMIN.BOOKS as Route)
          }}
        />
        <div className="flex items-center gap-2">
          Translations
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ButtonLoading
                variant={"outline"}
                size={"icon"}
                disabled={notTranlsatedLanguages().length === 0}
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
                    createBookTranslation.mutate({
                      data: {
                        bookID: findUniqueBook.data.id,
                        languageCode: language.code,
                        name: "",
                      },
                    })
                  }}
                >
                  {language.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
      </div>
    )
  },
)

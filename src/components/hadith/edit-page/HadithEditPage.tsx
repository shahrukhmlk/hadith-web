"use client"

import HadithBookForm from "@/components/forms/hadith/HadithBookForm"
import HadithEditForm from "@/components/forms/hadith/HadithEditForm"
import { HadithTranslationEditForm } from "@/components/forms/hadith/HadithTranslationEditForm"
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
import { IBook } from "@/data/models/book/book"
import { IHadithDetails } from "@/data/models/hadith/hadith-details"
import { ILanguage } from "@/data/models/language/language"
import {
  useCreateHadithBook,
  useCreateHadithTranslation,
  useFindManyHadithBook,
  useFindManyHadithTranslation,
  useFindUniqueHadith,
} from "@/lib/hooks/query"
import { Plus } from "lucide-react"
import { forwardRef, useRef } from "react"

export interface HadithEditPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hadith: IHadithDetails
  books: IBook[]
  languages: ILanguage[]
}

const HadithEditPage = forwardRef<HTMLDivElement, HadithEditPageProps>(
  ({ hadith, books, languages, ...props }, ref) => {
    const hadithEditFormRef = useRef<HTMLFormElement | null>(null)
    const translationsRef = useRef<Map<string, HTMLFormElement>>(new Map())
    const booksRef = useRef<Map<number, HTMLFormElement>>(new Map())

    const findUniqueHadith = useFindUniqueHadith(
      {
        where: {
          id: hadith.id,
        },
        select: {
          id: true,
          number: true,
          date: true,
          status: true,
          color: true,
          topicID: true,
          text: true,
          fontScale: true,
        },
      },
      { initialData: hadith },
    )

    const findManyHadithBook = useFindManyHadithBook(
      {
        where: {
          hadithID: hadith.id,
        },
        select: {
          hadithID: true,
          bookID: true,
          hadithRefNumber: true,
        },
      },
      { initialData: hadith.books },
    )

    const findManyHadithTranslation = useFindManyHadithTranslation(
      {
        where: {
          hadithID: hadith.id,
        },
        select: {
          hadithID: true,
          languageCode: true,
          text: true,
          fontScale: true,
        },
      },
      { initialData: hadith.translations },
    )
    const createHadithTranslation = useCreateHadithTranslation()
    const notTranlsatedLanguages = () => {
      return languages.filter(
        (language) =>
          !findManyHadithTranslation.data?.some(
            (translation) => translation.languageCode === language.code,
          ),
      )
    }
    if (!findUniqueHadith.data) {
      return null
    }

    return (
      <div className="space-y-4" ref={ref} {...props}>
        <HadithEditForm
          hadith={findUniqueHadith.data}
          ref={hadithEditFormRef}
        />
        <div className="flex items-center gap-2">
          Books
          {/* <ButtonLoading
            variant={"outline"}
            size={"icon"}
            isLoading={createHadithBook.isPending}
            type="button"
            onClick={() =>
              createHadithBook.mutate({
                data: {
                  hadithID: findUniqueHadith.data.id,
                  bookID: 0,
                  hadithRefNumber: 0,
                },
              })
            }
          >
            <Plus className="h-4 w-4" />
          </ButtonLoading> */}
        </div>
        {findManyHadithBook.data?.map((book, index) => (
          <HadithBookForm
            key={index}
            hadithID={findUniqueHadith.data.id}
            hadithBook={book}
            books={books}
            ref={(el) => {
              if (el) {
                booksRef.current.set(book.bookID, el)
              } else {
                booksRef.current.delete(book.bookID)
              }
            }}
          />
        ))}
        <HadithBookForm hadithID={findUniqueHadith.data.id} books={books} />
        <div className="flex items-center gap-2">
          Translations
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <ButtonLoading
                variant={"outline"}
                size={"icon"}
                disabled={notTranlsatedLanguages().length === 0}
                isLoading={createHadithTranslation.isPending}
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
                    createHadithTranslation.mutate({
                      data: {
                        hadithID: findUniqueHadith.data.id,
                        languageCode: language.code,
                        text: "",
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
        {findManyHadithTranslation.data?.map((translation, index) => (
          <div className="space-y-2" key={index}>
            <Label>
              {languages.find((l) => l.code === translation.languageCode)?.name}
            </Label>
            <HadithTranslationEditForm
              ref={(el) => {
                if (el) {
                  translationsRef.current.set(translation.languageCode, el)
                } else {
                  translationsRef.current.delete(translation.languageCode)
                }
              }}
              key={index}
              hadith={findUniqueHadith.data}
              hadithTranslation={translation}
            />
          </div>
        ))}
      </div>
    )
  },
)

HadithEditPage.displayName = "HadithEditPage"

export default HadithEditPage

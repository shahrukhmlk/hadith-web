"use client"

import HadithBookForm from "@/components/forms/hadith/HadithBookForm"
import HadithEditForm from "@/components/forms/hadith/HadithEditForm"
import { HadithTranslationEditForm } from "@/components/forms/hadith/HadithTranslationEditForm"
import { HadithTranslationImageEditForm } from "@/components/forms/hadith/HadithTranslationImageEditForm"
import { ButtonLoading } from "@/components/ui/buttons/ButtonLoading"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ROUTES } from "@/constants/routes"
import { IBook } from "@/data/models/book/book"
import { IHadithDetails } from "@/data/models/hadith/hadith-details"
import { ILanguage } from "@/data/models/language/language"
import { ITopic } from "@/data/models/topic/topic"
import {
  useCreateHadithTranslation,
  useFindManyHadithBook,
  useFindManyHadithTranslation,
  useFindUniqueHadith,
} from "@/lib/hooks/query"
import { Plus } from "lucide-react"
import { Route } from "next"
import { useRouter } from "next/navigation"
import { forwardRef, useRef } from "react"

export interface HadithEditPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hadith: IHadithDetails
  topics: ITopic[]
  books: IBook[]
  languages: ILanguage[]
}

const HadithEditPage = forwardRef<HTMLDivElement, HadithEditPageProps>(
  ({ hadith, topics, books, languages, ...props }, ref) => {
    const hadithEditFormRef = useRef<HTMLFormElement | null>(null)
    const translationsRef = useRef<Map<string, HTMLFormElement>>(new Map())
    const imagesRef = useRef<Map<string, HTMLFormElement>>(new Map())
    const booksRef = useRef<Map<number, HTMLFormElement>>(new Map())

    const router = useRouter()

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
          topicID: true,
          text: true,
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
      <Tabs defaultValue="hadith">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="hadith">Hadith</TabsTrigger>
          <TabsTrigger value="translations">Translations</TabsTrigger>
        </TabsList>
        <TabsContent value="hadith">
          <Card>
            <CardHeader>
              <CardTitle>Hadith Details</CardTitle>
              <CardDescription>Arabic</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
              <HadithBookForm
                hadithID={findUniqueHadith.data.id}
                books={books}
              />
              <HadithEditForm
                ref={hadithEditFormRef}
                hadith={findUniqueHadith.data}
                topics={topics}
                onSave={(id) => {}}
                onDelete={() => {
                  router.replace(ROUTES.ADMIN.HADITHS as Route)
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="translations">
          <Card>
            <CardHeader>
              <CardTitle>
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
                      <DropdownMenuLabel>
                        Add translation for:
                      </DropdownMenuLabel>
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
                                image: { create: {} },
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
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {findManyHadithTranslation.data?.map((translation, index) => (
                <div className="space-y-4" key={index}>
                  <h2>
                    {
                      languages.find((l) => l.code === translation.languageCode)
                        ?.name
                    }
                  </h2>
                  <div className="flex flex-wrap justify-stretch gap-4">
                    <HadithTranslationEditForm
                      ref={(el) => {
                        if (el) {
                          translationsRef.current.set(
                            translation.languageCode,
                            el,
                          )
                        } else {
                          translationsRef.current.delete(
                            translation.languageCode,
                          )
                        }
                      }}
                      className="flex-1 basis-96"
                      hadithTranslation={translation}
                    />
                    <HadithTranslationImageEditForm
                      ref={(el) => {
                        if (el) {
                          imagesRef.current.set(translation.languageCode, el)
                        } else {
                          imagesRef.current.delete(translation.languageCode)
                        }
                      }}
                      className="flex-1 basis-1/2"
                      hadithID={translation.hadithID}
                      languageCode={translation.languageCode}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    )
  },
)

HadithEditPage.displayName = "HadithEditPage"

export default HadithEditPage

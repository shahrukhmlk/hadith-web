"use client"

import HadithBookForm from "@/components/forms/hadith/HadithBookForm"
import HadithEditForm from "@/components/forms/hadith/HadithEditForm"
import { HadithTranslationEditForm } from "@/components/forms/hadith/HadithTranslationEditForm"
import { HadithTranslationImageEditForm } from "@/components/forms/hadith/HadithTranslationImageEditForm"
import { Button } from "@/components/ui/button"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ROUTES } from "@/constants/routes"
import { IBook } from "@/data/models/book/book"
import { IHadithDetails } from "@/data/models/hadith/hadith-details"
import { ILanguage } from "@/data/models/language/language"
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
import { toast } from "sonner"

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
          topic: {
            select: {
              id: true,
              title: true,
            },
          },
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

    const copyHadithText = async () => {
      if (!findUniqueHadith.data) {
        toast.error("Error with data")
        return
      }
      const { data } = findUniqueHadith
      const hadithText =
        data.topic.title +
        "\n" +
        data.text +
        "\n" +
        findManyHadithTranslation.data
          ?.map((translation) => translation.text)
          .join("\n") +
        "\n" +
        findManyHadithBook.data
          ?.map(
            (book) =>
              `${books.find((_book) => _book.id === book.bookID)?.name}, حديث: ${book.hadithRefNumber.toLocaleString("ar-eg", { useGrouping: false })}`,
          )
          .join(",\nو")
      try {
        await navigator.clipboard.writeText(hadithText)
        toast.success("Copied text to clipboard.")
      } catch (error) {
        toast.error("An error occured while copying text.")
        console.error(error)
      }
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
              <CardDescription>
                <Button variant={"secondary"} onClick={copyHadithText}>
                  Copy
                </Button>
              </CardDescription>
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
                  <div className="flex flex-col gap-4 md:flex-row md:*:flex-1">
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

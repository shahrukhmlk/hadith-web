"use client"

import { TopicEditForm } from "@/components/forms/topic/TopicEditForm"
import { TopicTranslationEditForm } from "@/components/forms/topic/TopicTranslationEditForm"
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
import { ILanguage } from "@/data/models/language/language"
import { ITopicDetails } from "@/data/models/topic/topic-details"
import {
  useCreateTopicTranslation,
  useFindManyTopicTranslation,
  useFindUniqueTopic,
} from "@/lib/hooks/query"
import { Plus } from "lucide-react"
import { Route } from "next"
import { useRouter } from "next/navigation"
import { forwardRef, useRef } from "react"

export interface TopicEditPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  topic: ITopicDetails
  languages: ILanguage[]
}

export const TopicEditPage = forwardRef<HTMLDivElement, TopicEditPageProps>(
  ({ topic, languages, ...props }, ref) => {
    const router = useRouter()
    const translationsRef = useRef<Map<string, HTMLFormElement>>(new Map())
    const topicEditFormRef = useRef<HTMLFormElement | null>(null)

    const findUniqueTopic = useFindUniqueTopic(
      {
        where: {
          id: topic.id,
        },
        select: {
          id: true,
          title: true,
        },
      },
      { initialData: topic },
    )

    const findManyTopicTranslation = useFindManyTopicTranslation(
      {
        where: {
          topicID: topic.id,
        },
        select: {
          topicID: true,
          languageCode: true,
          title: true,
        },
        orderBy: { language: { sort: "asc" } },
      },
      { initialData: topic.translations },
    )
    const createTopicTranslation = useCreateTopicTranslation()

    /***
     * If topic is available from props and the query returns no data it means the data has changed on the server after
     * the server render, so we return null.
     */
    if (topic && !findUniqueTopic.data) {
      return null
    }

    const notTranlsatedLanguages = () => {
      return languages.filter(
        (language) =>
          findManyTopicTranslation.data &&
          !findManyTopicTranslation.data.some(
            (translation) => translation.languageCode === language.code,
          ),
      )
    }
    if (!findUniqueTopic.data) {
      return null
    }

    return (
      <div ref={ref} className="space-y-4" {...props}>
        <TopicEditForm
          ref={topicEditFormRef}
          topic={findUniqueTopic.data}
          onSave={(id) => {}}
          onDelete={() => {
            router.replace(ROUTES.ADMIN.TOPICS as Route)
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
                isLoading={createTopicTranslation.isPending}
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
                    createTopicTranslation.mutate({
                      data: {
                        topicID: findUniqueTopic.data.id,
                        languageCode: language.code,
                        title: "",
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
        {findManyTopicTranslation.data?.map((translation, index) => (
          <div className="space-y-2" key={index}>
            <Label>
              {languages.find((l) => l.code === translation.languageCode)?.name}
            </Label>
            <TopicTranslationEditForm
              ref={(el) => {
                if (el) {
                  translationsRef.current.set(translation.languageCode, el)
                } else {
                  translationsRef.current.delete(translation.languageCode)
                }
              }}
              key={index}
              topicTranslation={translation}
            />
          </div>
        ))}
      </div>
    )
  },
)

TopicEditPage.displayName = "TopicEditPage"

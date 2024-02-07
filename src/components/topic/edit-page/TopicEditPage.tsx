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
import { ILanguage } from "@/data/models/language/language"
import { Status } from "@/data/models/status/status"
import { TopicSchema } from "@/data/models/topic/topic"
import { ITopicDetails } from "@/data/models/topic/topic-details"
import { ITopicTranslation } from "@/data/models/topic/topic-translation"
import {
  useCreateTopicTranslation,
  useFindManyTopicTranslation,
  useFindUniqueTopic,
  useUpsertTopic,
} from "@/lib/hooks/query"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"
import { forwardRef, useRef } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export interface TopicEditPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  topic: ITopicDetails
  languages: ILanguage[]
}

export const TopicEditPage = forwardRef<HTMLDivElement, TopicEditPageProps>(
  ({ topic, languages, ...props }, ref) => {
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
          status: true,
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
    const upsertTopic = useUpsertTopic()
    const createTopicTranslation = useCreateTopicTranslation()

    const form = useForm({
      resolver: zodResolver(TopicSchema.partial({ id: true })),
      values: findUniqueTopic.data,
      defaultValues: { title: "", status: Status.draft },
    })

    const { control } = form

    /***
     * If topic is available from props and the query returns no data it means the data has changed on the server after
     * the server render, so we return null.
     */
    if (topic && !findUniqueTopic.data) {
      return null
    }

    const addTopicTranslation = (translation: ITopicTranslation) => {
      createTopicTranslation.mutate(
        {
          data: translation,
          select: {
            topicID: true,
            languageCode: true,
            title: true,
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
      <div className="space-y-4" ref={ref} {...props}>
        <TopicEditForm topic={findUniqueTopic.data} ref={topicEditFormRef} />
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

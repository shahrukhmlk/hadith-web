import { z } from "zod"
import { IDNumberSchema, StatusSchema, TranslationSchema } from "../base/base"

export const TopicTranslatedFieldsSchema = z.object({
  title: z.string().trim().min(1),
})

export const TopicSchema = IDNumberSchema.merge(StatusSchema).merge(
  TopicTranslatedFieldsSchema,
)

type Topic = z.infer<typeof TopicSchema>

export interface ITopic extends Topic {}

export const TopicWithTranslationsSchema = TopicSchema.extend({
  translations: z.array(
    TranslationSchema.merge(TopicTranslatedFieldsSchema).extend({
      topicID: z.number().int(),
    }),
  ),
})
type TopicWithTranslations = z.infer<typeof TopicWithTranslationsSchema>
export interface ITopicWithTranslations extends TopicWithTranslations {}

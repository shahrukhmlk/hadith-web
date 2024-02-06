import { z } from "zod"
import { IDNumberSchema, StatusSchema, TranslationSchema } from "../base/base"

const TopicTranslatedFieldsSchema = z.object({
  title: z.string().trim().min(1),
})

export const TopicSchema = IDNumberSchema.merge(StatusSchema).merge(
  TopicTranslatedFieldsSchema,
)

type Topic = z.infer<typeof TopicSchema>

export interface ITopic extends Topic {}

export const TopicTranslationSchema = TranslationSchema.extend({
  topicID: z.number().int(),
  ...TopicTranslatedFieldsSchema.shape,
})

type TopicTranslation = z.infer<typeof TopicTranslationSchema>

export interface ITopicTranslation extends TopicTranslation {}

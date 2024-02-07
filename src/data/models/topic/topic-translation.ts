import { z } from "zod"
import { TranslationSchema } from "../base/base"
import { TopicTranslatedFieldsSchema } from "./topic"

export const TopicTranslationSchema = TranslationSchema.extend({
  topicID: z.number().int(),
  ...TopicTranslatedFieldsSchema.shape,
})

type TopicTranslation = z.infer<typeof TopicTranslationSchema>

export interface ITopicTranslation extends TopicTranslation {}

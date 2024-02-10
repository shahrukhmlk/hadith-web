import { z } from "zod"
import { IDNumberValidator, TranslationSchema } from "../base/base"
import { TopicTranslatedFieldsSchema } from "./topic"

export const TopicTranslationSchema = TranslationSchema.merge(
  TopicTranslatedFieldsSchema,
).extend({
  topicID: IDNumberValidator,
})
type TopicTranslation = z.infer<typeof TopicTranslationSchema>
export interface ITopicTranslation extends TopicTranslation {}

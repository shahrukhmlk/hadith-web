import { z } from "zod"
import { TranslationSchema } from "../base/base"
import { TopicSchema, TopicTranslatedFieldsSchema } from "./topic"

export const TopicDetails = TopicSchema.extend({
  translations: z.array(
    TranslationSchema.merge(TopicTranslatedFieldsSchema).extend({
      topicID: z.number().int(),
    }),
  ),
})
type TopicDetails = z.infer<typeof TopicDetails>
export interface ITopicDetails extends TopicDetails {}

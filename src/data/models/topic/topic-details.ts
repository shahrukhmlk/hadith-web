import { z } from "zod"
import { TopicSchema } from "./topic"
import { TopicTranslationSchema } from "./topic-translation"

export const TopicDetails = TopicSchema.extend({
  translations: z.array(TopicTranslationSchema),
})
type TopicDetails = z.infer<typeof TopicDetails>
export interface ITopicDetails extends TopicDetails {}

import { z } from "zod"
import { TopicSchema } from "../topic/topic"
import { HadithSchema } from "./hadith"
import { HadithBookSchema } from "./hadith-book"
import { HadithTranslationSchema } from "./hadith-translation"

export const HadithDetailsSchema = HadithSchema.extend({
  topic: TopicSchema,
  books: z.array(HadithBookSchema),
  translations: z.array(HadithTranslationSchema),
})
type HadithDetails = z.infer<typeof HadithDetailsSchema>
export interface IHadithDetails extends HadithDetails {}

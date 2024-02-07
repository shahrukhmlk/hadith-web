import { z } from "zod"
import { TranslationSchema } from "../base/base"
import { HadithTranslatedFieldsSchema } from "./hadith"

export const HadithTranslationSchema = TranslationSchema.extend({
  hadithID: z.number().int(),
  ...HadithTranslatedFieldsSchema.shape,
})
type HadithTranslation = z.infer<typeof HadithTranslationSchema>
export interface IHadithTranslation extends HadithTranslation {}

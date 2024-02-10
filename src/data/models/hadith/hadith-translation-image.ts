import { z } from "zod"
import { HadithTranslationSchema } from "./hadith-translation"

export const HadithTranslationImageSchema = HadithTranslationSchema.omit({
  text: true,
}).extend({
  hadithFontScale: z.number().int(),
  translationFontScale: z.number().int(),
  color: z.string(),
})
type HadithTranslationImage = z.infer<typeof HadithTranslationImageSchema>
export interface IHadithTranslationImage extends HadithTranslationImage {}

import { z } from "zod"
import { IDNumberValidator, TranslationSchema } from "../base/base"
import { HadithTranslatedFieldsSchema } from "./hadith"

export const HadithTranslationSchema = TranslationSchema.merge(
  HadithTranslatedFieldsSchema,
).extend({
  hadithID: IDNumberValidator,
})
type HadithTranslation = z.infer<typeof HadithTranslationSchema>
export interface IHadithTranslation extends HadithTranslation {}

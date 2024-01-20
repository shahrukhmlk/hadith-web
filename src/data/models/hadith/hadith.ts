import { z } from "zod"
import { IDNumberSchema, StatusSchema, TranslationSchema } from "../base/base"

const TranslatedSchema = z.object({
  topic: z.string().trim().min(1),
  text: z.string().trim().min(1),
  fontScale: z.number().int().min(-99).max(100),
})

const HadithSchema = IDNumberSchema.merge(StatusSchema)
  .merge(TranslatedSchema)
  .extend({
    number: z.coerce.number().int().min(1),
    date: z.date(),
  })
type Hadith = z.infer<typeof HadithSchema>
export interface IHadith extends Hadith {}

const HadithWithTranslationsSchema = HadithSchema.extend({
  translations: z.array(TranslationSchema.merge(TranslatedSchema)),
})

type HadithWithTranslations = z.infer<typeof HadithWithTranslationsSchema>
export interface IHadithWithTranslations extends HadithWithTranslations {}

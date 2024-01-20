import { z } from "zod"
import { IDNumberSchema, StatusSchema, TranslationSchema } from "../base/base"

const TranslatedSchema = z.object({
  topic: z.string().trim().min(1),
  text: z.string().trim().min(1),
  fontScale: z.number().int().min(-99).max(100),
})

export const HadithSchema = IDNumberSchema.merge(StatusSchema)
  .merge(TranslatedSchema)
  .extend({
    number: z.coerce.number().int().min(1),
    date: z.date(),
    color: z.string(),
  })
type Hadith = z.infer<typeof HadithSchema>
export interface IHadith extends Hadith {}

const HadithBookSchema = z.object({
  bookID: z.number().int(),
  hadithRefNumber: z.number().int(),
})
type HadithBook = z.infer<typeof HadithBookSchema>
export interface IHadithBook extends HadithBook {}

const HadithTranslationSchema = TranslationSchema.merge(TranslatedSchema)
type HadithTranslation = z.infer<typeof HadithTranslationSchema>
export interface IHadithTranslation extends HadithTranslation {}

export const HadithDetailsSchema = HadithSchema.merge(TranslatedSchema).extend({
  books: z.array(HadithBookSchema),
  translations: z.array(HadithTranslationSchema),
})
type HadithDetails = z.infer<typeof HadithDetailsSchema>
export interface IHadithDetails extends HadithDetails {}

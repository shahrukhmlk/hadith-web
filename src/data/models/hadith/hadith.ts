import { z } from "zod"
import { IDNumberSchema, StatusSchema, TranslationSchema } from "../base/base"

const HadithTranslatedFieldsSchema = z.object({
  topic: z.string().trim().min(1),
  text: z.string().trim().min(1),
  fontScale: z.number().int().min(-99).max(100),
})

export const HadithSchema = IDNumberSchema.merge(StatusSchema)
  .merge(HadithTranslatedFieldsSchema)
  .extend({
    number: z.coerce.number().int().min(1),
    date: z.date(),
    color: z.string(),
  })
type Hadith = z.infer<typeof HadithSchema>
export interface IHadith extends Hadith {}

export const HadithBookSchema = z.object({
  hadithID: z.coerce.number().int(),
  bookID: z.coerce.number().int(),
  hadithRefNumber: z.coerce.number().int(),
})
type HadithBook = z.infer<typeof HadithBookSchema>
export interface IHadithBook extends HadithBook {}

const HadithTranslationSchema = TranslationSchema.extend({
  hadithID: z.number().int(),
  ...HadithTranslatedFieldsSchema.shape,
})
type HadithTranslation = z.infer<typeof HadithTranslationSchema>
export interface IHadithTranslation extends HadithTranslation {}

export const HadithWithDetailsSchema = HadithSchema.extend({
  books: z.array(HadithBookSchema),
  translations: z.array(HadithTranslationSchema),
})
type HadithWithDetails = z.infer<typeof HadithWithDetailsSchema>
export interface IHadithWithDetails extends HadithWithDetails {}

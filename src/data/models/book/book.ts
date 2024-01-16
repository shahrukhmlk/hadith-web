import { z } from "zod"
import { IDNumberSchema, StatusSchema, TranslationSchema } from "../base/base"

const TranslatedSchema = z.object({
  name: z.string(),
})
const BookSchema = IDNumberSchema.merge(StatusSchema).merge(TranslatedSchema)
type Book = z.infer<typeof BookSchema>
export interface IBook extends Book {}

const BookWithTranslationsSchema = BookSchema.extend({
  translations: z.array(TranslationSchema.merge(TranslatedSchema)),
})

type BookWithTranslations = z.infer<typeof BookWithTranslationsSchema>
export interface IBookWithTranslations extends BookWithTranslations {}

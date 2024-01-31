import { z } from "zod"
import { IDNumberSchema, StatusSchema, TranslationSchema } from "../base/base"

export const BookTranslatedFieldsSchema = z.object({
  name: z.coerce.string().min(1),
})
export const BookSchema = IDNumberSchema.merge(StatusSchema).merge(
  BookTranslatedFieldsSchema,
)
type Book = z.infer<typeof BookSchema>
export interface IBook extends Book {}

export const BookWithTranslationsSchema = BookSchema.extend({
  translations: z.array(
    TranslationSchema.merge(BookTranslatedFieldsSchema).extend({
      bookID: z.number().int(),
    }),
  ),
})
type BookWithTranslations = z.infer<typeof BookWithTranslationsSchema>
export interface IBookWithTranslations extends BookWithTranslations {}

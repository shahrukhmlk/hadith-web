import { z } from "zod"
import { IDNumberValidator, TranslationSchema } from "../base/base"
import { BookTranslatedFieldsSchema } from "./book"

export const BookTranslationSchema = TranslationSchema.merge(
  BookTranslatedFieldsSchema,
).extend({
  bookID: IDNumberValidator,
})
type BookTranslation = z.infer<typeof BookTranslationSchema>
export interface IBookTranslation extends BookTranslation {}

import { z } from "zod"
import { TranslationSchema } from "../base/base"
import { BookSchema, BookTranslatedFieldsSchema } from "./book"

export const BookTranslationSchema = TranslationSchema.extend({
  bookID: z.number(),
  ...BookTranslatedFieldsSchema.shape,
})
type BookTranslation = z.infer<typeof BookTranslationSchema>
export interface IBookTranslation extends BookTranslation {}

import { z } from "zod"
import { TranslationSchema } from "../base/base"
import { BookSchema, BookTranslatedFieldsSchema } from "./book"

export const BookDetails = BookSchema.extend({
  translations: z.array(
    TranslationSchema.merge(BookTranslatedFieldsSchema).extend({
      bookID: z.number().int(),
    }),
  ),
})
export type BookDetails = z.infer<typeof BookDetails>
export interface IBookDetails extends BookDetails {}

import { z } from "zod"
import { BookSchema } from "./book"
import { BookTranslationSchema } from "./book-translation"

export const BookDetails = BookSchema.extend({
  translations: z.array(BookTranslationSchema),
})
export type BookDetails = z.infer<typeof BookDetails>
export interface IBookDetails extends BookDetails {}

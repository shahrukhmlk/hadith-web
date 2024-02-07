import { z } from "zod"
import { IDNumberSchema, StatusSchema } from "../base/base"

export const BookTranslatedFieldsSchema = z.object({
  name: z.coerce.string().min(1),
})
export const BookSchema = IDNumberSchema.merge(StatusSchema).merge(
  BookTranslatedFieldsSchema,
)
type Book = z.infer<typeof BookSchema>
export interface IBook extends Book {}

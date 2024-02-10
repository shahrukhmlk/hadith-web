import { z } from "zod"
import { IDNumberValidator, StatusSchema } from "../base/base"

export const BookTranslatedFieldsSchema = z.object({
  name: z.coerce.string().min(1),
})
export const BookSchema = StatusSchema.merge(BookTranslatedFieldsSchema).extend(
  {
    id: IDNumberValidator,
  },
)
type Book = z.infer<typeof BookSchema>
export interface IBook extends Book {}

import { z } from "zod"
import { IDNumberValidator } from "../base/base"

export const HadithBookSchema = z.object({
  hadithID: IDNumberValidator,
  bookID: IDNumberValidator,
  hadithRefNumber: z.coerce.number().int().min(1),
})
type HadithBook = z.infer<typeof HadithBookSchema>
export interface IHadithBook extends HadithBook {}

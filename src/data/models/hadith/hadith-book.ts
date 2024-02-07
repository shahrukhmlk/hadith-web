import { z } from "zod"

export const HadithBookSchema = z.object({
  hadithID: z.coerce.number().int().min(1),
  bookID: z.coerce.number().int().min(1),
  hadithRefNumber: z.coerce.number().int().min(1),
})
type HadithBook = z.infer<typeof HadithBookSchema>
export interface IHadithBook extends HadithBook {}

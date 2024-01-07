import * as z from "zod"

export const hadithEditFormSchema = z.object({
  num: z.coerce.number().int().min(1),
  translations: z
    .object({
      langCode: z.string().min(2).max(2),
      topic: z.string().min(1),
      text: z.string().min(1),
    })
    .array()
    .min(1),
  books: z
    .object({
      bookID: z.number().int().min(1),
      hadithNum: z.number().gt(0),
    })
    .array()
    .min(1),
})

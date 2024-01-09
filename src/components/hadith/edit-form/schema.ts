import * as z from "zod"

export const hadithEditFormSchema = z.object({
  num: z.coerce.number().int().min(1),
  date: z.date(),
  status: z.string(),
  translations: z
    .array(
      z.object({
        langCode: z.string().min(2).max(2),
        topic: z.string().min(1),
        text: z.string().min(1),
        fontScale: z.number(),
      }),
    )
    .min(1)
    .max(4),
  books: z
    .array(
      z.object({
        bookID: z.coerce.number().int().min(1),
        hadithNum: z.coerce.number().int().min(1),
      }),
    )
    .min(1),
})

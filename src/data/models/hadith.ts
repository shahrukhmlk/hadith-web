import { Status } from "@/data/models/status"
import * as z from "zod"

export interface IHadith {
  num: number
  date: Date
  topic: string
  lang: string
  text: string
  books: IBook[]
}

export interface IBook {
  id: number
  name: string
  hadithNum: number
}

const Translated = z.object({
  languageCode: z.string().min(2),
  topic: z.string().trim().min(1),
  text: z.string().trim().min(1),
  fontScale: z.number().int().min(-100).max(100),
})

export const HadithEditableSchema = z.object({
  id: z.number().int(),
  number: z.coerce.number().int().min(1),
  date: z.date(),
  status: z.nativeEnum(Status),
  translations: z.array(Translated).min(1).max(4),
  books: z
    .array(
      z.object({
        bookID: z.coerce.number().int().min(1),
        hadithRefNumber: z.coerce.number().int().min(1),
      }),
    )
    .min(1),
})

export interface IHadithEditable extends z.infer<typeof HadithEditableSchema> {}

import { z } from "zod"
import { Status } from "../status"

export const IDNumberSchema = z.object({
  id: z.number(),
})
export const IDStringSchema = z.object({
  id: z.number(),
})

export const TranslationSchema = z.object({
  languageCode: z.string(),
})

export const StatusSchema = z.object({
  status: z.nativeEnum(Status),
})

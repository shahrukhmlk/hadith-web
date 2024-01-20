import { z } from "zod"
import { Status } from "../status/status"

export const IDNumberSchema = z.object({
  id: z.number().int(),
})
export const IDStringSchema = z.object({
  id: z.string(),
})

export const TranslationSchema = z.object({
  languageCode: z.string(),
})

export const StatusSchema = z.object({
  status: z.nativeEnum(Status),
})

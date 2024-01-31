import { z } from "zod"
import { Status } from "../status/status"

export const IDNumberSchema = z.object({
  id: z.coerce.number().int().min(0),
})
export const IDStringSchema = z.object({
  id: z.coerce.string().min(0),
})

export const TranslationSchema = z.object({
  languageCode: z.coerce.string().min(1),
})

export const StatusSchema = z.object({
  status: z.nativeEnum(Status),
})

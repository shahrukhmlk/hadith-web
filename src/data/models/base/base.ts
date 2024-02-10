import { z } from "zod"
import { Status } from "../status/status"

export const IDNumberValidator = z.coerce.number().int().min(0)
export const IDStringValidator = z.coerce.string().min(1)

export const TranslationSchema = z.object({
  languageCode: z.coerce.string().min(1),
})

export const StatusSchema = z.object({
  status: z.nativeEnum(Status),
})

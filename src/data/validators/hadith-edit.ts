import { z } from "zod"
import { HadithEditableSchema } from "../models/hadith"

export const HadithEditFormSchema = z.object({
  ...HadithEditableSchema.omit({ id: true }).shape,
})
export type HadithEditFormData = z.infer<typeof HadithEditFormSchema>

import { z } from "zod"

const LanguageSchema = z.object({
  code: z.string(),
  name: z.string(),
  rtl: z.boolean(),
})

type Language = z.infer<typeof LanguageSchema>

export interface ILanguage extends Language {}

import { z } from "zod"

const Translated = z.object({
  languageCode: z.string().min(2),
  name: z.string(),
})
const BookWithTranslationsSchema = z.object({
  id: z.number().int(),
  ...Translated.omit({ languageCode: true }).shape,
  translations: z.array(Translated),
})
export interface IBookWithTranslations
  extends z.infer<typeof BookWithTranslationsSchema> {}

import { z } from "zod"
import { IDNumberValidator, StatusSchema } from "../base/base"

export const HadithTranslatedFieldsSchema = z.object({
  text: z.string().trim().min(1),
})

export const HadithSchema = StatusSchema.merge(
  HadithTranslatedFieldsSchema,
).extend({
  id: IDNumberValidator,
  number: z.coerce.number().int().min(1),
  date: z.date(),
  topicID: z.coerce.number().int().min(1),
})
type Hadith = z.infer<typeof HadithSchema>
export interface IHadith extends Hadith {}

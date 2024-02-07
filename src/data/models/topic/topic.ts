import { z } from "zod"
import { IDNumberValidator, StatusSchema } from "../base/base"

export const TopicTranslatedFieldsSchema = z.object({
  title: z.coerce.string().min(1),
})
export const TopicSchema = StatusSchema.merge(
  TopicTranslatedFieldsSchema,
).extend({
  id: IDNumberValidator,
})
type Topic = z.infer<typeof TopicSchema>
export interface ITopic extends Topic {}

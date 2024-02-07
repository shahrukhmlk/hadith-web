import { z } from "zod"
import { IDNumberSchema, StatusSchema } from "../base/base"

export const TopicTranslatedFieldsSchema = z.object({
  title: z.coerce.string().min(1),
})
export const TopicSchema = IDNumberSchema.merge(StatusSchema).merge(
  TopicTranslatedFieldsSchema,
)
type Topic = z.infer<typeof TopicSchema>
export interface ITopic extends Topic {}

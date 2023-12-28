import { createDirectus, rest } from "@directus/sdk"

export const client = createDirectus(process.env.API_URL as string).with(rest())

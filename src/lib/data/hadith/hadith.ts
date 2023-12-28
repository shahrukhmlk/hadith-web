import { readItems } from "@directus/sdk"
import { format } from "date-fns"
import { client } from "../directus"

export async function getHadith(date: Date) {
  const res = await client.request(readItems("hadiths", { fields: ["*.*.*"] }))
  return res
}

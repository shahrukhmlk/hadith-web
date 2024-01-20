import "server-only"
import { ILanguage } from "@/data/models/language/language"
import prisma from "@/data/prisma"
import { cache } from "react"

export const getLanguages = cache(async (): Promise<ILanguage[]> => {
  const res = await prisma.language.findMany({ orderBy: { sort: "asc" } })
  return res
})

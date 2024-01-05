import "server-only"
import prisma from "@/data/prisma"
import { cache } from "react"

export const getLanguages = cache(async () => {
  const res = await prisma.languages.findMany({ orderBy: { sort: "asc" } })
  return res
})

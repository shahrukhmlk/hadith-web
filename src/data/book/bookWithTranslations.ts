import "server-only"
import prisma from "@/data/prisma"
import { cache } from "react"

export const getBookWithAllTranslations = cache(async (bookID: number) => {
  const res = await prisma.book.findUnique({
    where: {
      id: bookID,
    },
    select: {
      id: true,
      name: true,
      status: true,
      translations: {
        select: {
          bookID: true,
          languageCode: true,
          name: true,
        },
        orderBy: { language: { sort: "asc" } },
      },
    },
  })
  return res
})

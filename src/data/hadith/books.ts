import "server-only"
import prisma from "@/data/prisma"
import { cache } from "react"

export const getBooks = cache(async () => {
  const res = await prisma.books.findMany({
    include: {
      books_translations: {
        orderBy: { languages: { sort: "asc" } },
      },
    },
    orderBy: { sort: "asc" },
  })
  return res
})

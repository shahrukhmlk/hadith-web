import "server-only"
import prisma from "@/data/prisma"
import { cache } from "react"
import { IBookWithTranslations } from "../models/book"

export const getBooks = cache(async (): Promise<IBookWithTranslations[]> => {
  const res = await prisma.books.findMany({
    select: {
      id: true,
      sort: true,
      books_translations: {
        select: {
          languages_code: true,
          name: true,
        },
        orderBy: { languages: { sort: "asc" } },
      },
    },
    orderBy: { sort: "asc" },
  })
  return res
})

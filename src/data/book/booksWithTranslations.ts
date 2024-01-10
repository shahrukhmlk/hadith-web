"use server"

import "server-only"
import prisma from "@/data/prisma"
import { cache } from "react"
import { IBookWithTranslations } from "../models/book"

export const getBooks = cache(
  async (languageCode?: string): Promise<IBookWithTranslations[]> => {
    const res = await prisma.book.findMany({
      select: {
        id: true,
        sort: true,
        name: true,
        BookTranslation: {
          where: {
            languageCode: languageCode,
          },
          select: {
            languageCode: true,
            name: true,
          },
          orderBy: { Language: { sort: "asc" } },
        },
      },
      orderBy: { sort: "asc" },
    })
    return res.map((book) => {
      return {
        id: book.id,
        name: book.name,
        translations: book.BookTranslation,
      }
    })
  },
)

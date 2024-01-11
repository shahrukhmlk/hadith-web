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
        translations: {
          where: {
            languageCode: languageCode,
          },
          select: {
            languageCode: true,
            name: true,
          },
          orderBy: { language: { sort: "asc" } },
        },
      },
      orderBy: { sort: "asc" },
    })
    return res
  },
)

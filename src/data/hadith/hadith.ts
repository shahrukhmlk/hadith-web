import "server-only"
import prisma from "@/data/prisma"
import { cache } from "react"
import { IHadithDetails } from "../models/hadith/hadith"

export const getHadithEditable = cache(
  async (id: number): Promise<IHadithDetails | null> => {
    const res = await prisma.hadith.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        number: true,
        date: true,
        status: true,
        color: true,
        topic: true,
        text: true,
        fontScale: true,
        translations: {
          select: {
            languageCode: true,
            topic: true,
            text: true,
            fontScale: true,
          },
          orderBy: { language: { sort: "asc" } },
        },
        books: {
          select: {
            bookID: true,
            hadithRefNumber: true,
          },
        },
      },
    })
    return res
  },
)

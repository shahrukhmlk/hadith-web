import "server-only"
import { IHadith, IHadithEditable } from "@/data/models/hadith"
import { Status } from "@/data/models/status"
import prisma from "@/data/prisma"
import { cache } from "react"

export const getHadith = cache(
  async (date: Date, langs?: string[], status?: Status): Promise<IHadith[]> => {
    const res = await prisma.hadith.findUnique({
      where: {
        date: date,
        status: status,
      },
      select: {
        id: true,
        number: true,
        date: true,
        translations: {
          where: {
            languageCode: { in: langs },
          },
          select: {
            topic: true,
            text: true,
            languageCode: true,
          },
          orderBy: { language: { sort: "asc" } },
        },
        books: {
          select: {
            bookID: true,
            hadithRefNumber: true,
            book: {
              select: {
                id: true,
                translations: {
                  where: { languageCode: { in: langs } },
                  select: {
                    languageCode: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    let hadithArray: IHadith[] = []
    if (res) {
      res.translations.map((hadith) => {
        hadithArray.push({
          num: res.number,
          topic: hadith.topic,
          date: res.date,
          lang: hadith.languageCode,
          text: hadith.text,
          books: res.books.map((book) => {
            const book2 = book.book.translations.find(
              (book) => book.languageCode === hadith.languageCode,
            )
            return {
              id: book.book.id,
              name: book2?.name || "",
              hadithNum: book.hadithRefNumber,
            }
          }),
        })
      })
    }
    return hadithArray
  },
)

export const getHadithEditable = cache(
  async (
    date?: Date,
    id?: number,
    hadithNumber?: number,
  ): Promise<IHadithEditable | null> => {
    const res = await prisma.hadith.findUnique({
      where: {
        date: date,
        id: id,
        number: hadithNumber,
      },
      select: {
        id: true,
        number: true,
        date: true,
        status: true,
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
            book: {
              select: {
                id: true,
                translations: {
                  select: {
                    languageCode: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return res
  },
)

export const getHadithsEditable = cache(
  async (): Promise<IHadithEditable[]> => {
    const res = await prisma.hadith.findMany({
      select: {
        id: true,
        number: true,
        date: true,
        status: true,
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
            book: {
              select: {
                id: true,
                translations: {
                  select: {
                    languageCode: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    })
    return res
  },
)

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
        HadithTranslation: {
          where: {
            languageCode: { in: langs },
          },
          select: {
            topic: true,
            text: true,
            languageCode: true,
          },
          orderBy: { Language: { sort: "asc" } },
        },
        HadithBook: {
          select: {
            bookID: true,
            hadithRefNumber: true,
            Book: {
              select: {
                id: true,
                BookTranslation: {
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
      res.HadithTranslation.map((hadith) => {
        hadithArray.push({
          num: res.number,
          topic: hadith.topic,
          date: res.date,
          lang: hadith.languageCode,
          text: hadith.text,
          books: res.HadithBook.map((book) => {
            const book2 = book.Book.BookTranslation.find(
              (book) => book.languageCode === hadith.languageCode,
            )
            return {
              id: book.Book.id,
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
  async (date: Date): Promise<IHadithEditable | null> => {
    const res = await prisma.hadith.findUnique({
      where: {
        date: date,
      },
      select: {
        id: true,
        number: true,
        date: true,
        status: true,
        HadithTranslation: {
          select: {
            languageCode: true,
            topic: true,
            text: true,
            fontScale: true,
          },
          orderBy: { Language: { sort: "asc" } },
        },
        HadithBook: {
          select: {
            bookID: true,
            hadithRefNumber: true,
            Book: {
              select: {
                id: true,
                BookTranslation: {
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
    if (res) {
      return {
        id: res.id,
        number: res.number,
        date: res.date,
        status: res.status,
        translations: res.HadithTranslation,
        books: res.HadithBook,
      }
    } else {
      return res
    }
  },
)

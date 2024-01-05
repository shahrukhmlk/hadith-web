import "server-only"
import { IBook, IHadith } from "@/components/hadith/ui/HadithUI"
import prisma from "@/data/prisma"
import { cache } from "react"

export const getHadith = cache(
  async (date: Date, langs?: string[], status?: string) => {
    const res = await prisma.hadiths.findUnique({
      where: {
        date: date,
        status: status,
      },
      select: {
        id: true,
        number: true,
        date: true,
        hadiths_translations: {
          where: {
            languages_code: { in: langs },
          },
          select: {
            topic: true,
            text: true,
            languages_code: true,
          },
          orderBy: { languages: { sort: "asc" } },
        },
        hadiths_books: {
          select: {
            books_id: true,
            hadith_num: true,
            books: {
              select: {
                id: true,
                books_translations: {
                  where: { languages_code: { in: langs } },
                  select: {
                    languages_code: true,
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
      res.hadiths_translations.map((hadith) => {
        hadithArray.push({
          num: res.number,
          topic: hadith.topic,
          date: res.date,
          lang: hadith.languages_code,
          text: hadith.text,
          books: res.hadiths_books.map((book) => {
            const hadithNum = book.hadith_num
            const bookName = book.books.books_translations.find(
              (book) => book.languages_code === hadith.languages_code,
            )?.name
            return { name: bookName || "", hadithNum: hadithNum }
          }),
        })
      })
    }
    return hadithArray
  },
)

export const getHadithEditable = cache(async (date: Date) => {
  const res = await prisma.hadiths.findUnique({
    where: {
      date: date,
    },
    include: {
      hadiths_translations: {
        orderBy: { languages: { sort: "asc" } },
      },
      hadiths_books: {
        include: {
          books: true,
        },
      },
    },
  })
  if (res) {
    return {
      id: res.id,
      number: res.number,
      books: res.hadiths_books.map((book) => {
        return { ...book.books, hadithNum: book.hadith_num }
      }),
      translations: res.hadiths_translations,
    }
  }
})

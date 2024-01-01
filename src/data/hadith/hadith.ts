import { IBook, IHadith } from "@/components/hadith/ui/HadithUI"
import prisma from "@/data/prisma"
import { cache } from "react"

export const getHadiths = cache(async (date: Date, langs?: string[]) => {
  const res = await prisma.hadiths.findUnique({
    where: {
      date: date,
      status: "published",
    },
    select: {
      number: true,
      date: true,
      hadiths_translations: {
        where: {
          languages_code: { in: langs },
        },
        orderBy: { languages: { sort: "asc" } },
      },
      hadiths_books: {
        include: {
          books: {
            select: {
              books_translations: { where: { languages_code: { in: langs } } },
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
})

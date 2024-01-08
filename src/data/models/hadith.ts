import { Prisma } from "@prisma/client"

export interface IHadith {
  num: number
  date: Date
  topic: string
  lang: string
  text: string
  books: IBook[]
}

export interface IBook {
  id: number
  name: string
  hadithNum: number
}

const hadithEditable = Prisma.validator<Prisma.hadithsDefaultArgs>()({
  select: {
    id: true,
    number: true,
    date: true,
    hadiths_translations: {
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

export interface IHadithEditable
  extends Prisma.hadithsGetPayload<typeof hadithEditable> {}

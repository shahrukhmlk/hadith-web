import { Prisma } from "@prisma/client"

const bookWithTranlsations = Prisma.validator<Prisma.booksDefaultArgs>()({
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
})

export interface IBookWithTranslations
  extends Prisma.booksGetPayload<typeof bookWithTranlsations> {}

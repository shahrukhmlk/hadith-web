import { books, Prisma } from "@prisma/client"

export const bookWithTranlsations = Prisma.validator<Prisma.booksDefaultArgs>()(
  {
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
  },
)

export interface IBookWithTranslations
  extends Prisma.booksGetPayload<typeof bookWithTranlsations> {}

"use client"

import {
  useFindManyBook,
  useFindManyLanguage,
  useFindUniqueHadith,
} from "@/lib/hooks/query"

export default function Home({ params }: { params: { id: string } }) {
  const hadithID = parseInt(params.id)
  const result = useFindUniqueHadith({
    where: {
      id: hadithID,
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
  const languages = useFindManyLanguage()
  const books = useFindManyBook()
  return <main className="flex h-full w-full"></main>
}

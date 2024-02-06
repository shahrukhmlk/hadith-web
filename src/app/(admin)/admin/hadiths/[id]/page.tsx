import HadithEditPage from "@/components/hadith/edit-page/HadithEditPage"
import { getBooks } from "@/data/book/getBooks"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { getLanguages } from "@/data/language/getLanguages"
import { notFound } from "next/navigation"

export default async function Home({ params }: { params: { id: string } }) {
  const hadithID = parseInt(params.id)
  if (isNaN(hadithID)) {
    notFound()
  }
  const prisma = await getEnhancedPrisma()

  const hadith = await prisma.hadith.findUnique({
    where: {
      id: hadithID,
    },
    select: {
      id: true,
      number: true,
      date: true,
      status: true,
      color: true,
      text: true,
      fontScale: true,
      topicID:true,
      topic: { select: { id: true, status: true, title: true } },
      translations: {
        select: {
          hadithID: true,
          languageCode: true,
          text: true,
          fontScale: true,
        },
        orderBy: { language: { sort: "asc" } },
      },
      books: {
        select: {
          hadithID: true,
          bookID: true,
          hadithRefNumber: true,
        },
      },
    },
  })
  if (!hadith) {
    notFound()
  }

  const languages = await getLanguages()
  const books = await getBooks()
  return (
    <main className="space-y-4 p-4">
      {<HadithEditPage hadith={hadith} books={books} languages={languages} />}
    </main>
  )
}

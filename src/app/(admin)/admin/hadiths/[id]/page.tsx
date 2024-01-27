import HadithEditPage from "@/components/hadith/edit-page/HadithEditPage"
import { getBooks } from "@/data/book/getBooks"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { getLanguages } from "@/data/language/getLanguages"
import { IHadithWithDetails } from "@/data/models/hadith/hadith"
import { notFound } from "next/navigation"

export default async function Home({ params }: { params: { id: string } }) {
  const hadithID = parseInt(params.id)
  let hadith: IHadithWithDetails | undefined = undefined
  const prisma = await getEnhancedPrisma()
  if (isNaN(hadithID)) {
    if (params.id !== "create") {
      notFound()
    }
  } else {
    hadith =
      prisma.hadith.findUnique({
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
              hadithID: true,
              languageCode: true,
              topic: true,
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
      }) ?? undefined
    if (!hadith) {
      notFound()
    }
  }
  const languages = await getLanguages()
  const books = await getBooks()
  return (
    <main className="space-y-4 p-4">
      <HadithEditPage hadith={hadith} books={books} languages={languages} />
    </main>
  )
}

import { BookEditForm } from "@/components/forms/book/BookEditForm"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { getLanguages } from "@/data/language/getLanguages"
import { notFound } from "next/navigation"

export default async function Home({ params }: { params: { id: string } }) {
  const bookID = parseInt(params.id)
  if (isNaN(bookID)) {
    notFound()
  }
  const prisma = await getEnhancedPrisma()
  const book = await prisma.book.findUnique({
    where: {
      id: bookID,
    },
    select: {
      id: true,
      name: true,
      status: true,
      translations: {
        select: {
          bookID: true,
          languageCode: true,
          name: true,
        },
        orderBy: { language: { sort: "asc" } },
      },
    },
  })
  if (!book) {
    notFound()
  }
  const languages = await getLanguages()
  return (
    <main className="space-y-4 p-4">
      <BookEditForm book={book} languages={languages} />
    </main>
  )
}

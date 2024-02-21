import HadithUI from "@/components/hadith/ui/HadithUI"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { Status } from "@/data/models/status/status"

export default async function Home() {
  const prisma = await getEnhancedPrisma()
  const hadith = await prisma.hadith.findFirst({
    where: {
      status: Status.published,
    },
    select: {
      id: true,
      number: true,
      date: true,
      text: true,
      topic: { select: { title: true } },
      translations: { select: { languageCode: true, text: true } },
      books: {
        select: {
          book: { select: { id: true, name: true } },
          hadithRefNumber: true,
        },
      },
    },
    orderBy: { number: "desc" },
  })
  return (
    <main className="flex justify-center p-4">
      {!!hadith && (
        <HadithUI
          hadith={{
            ...hadith,
            topic: hadith.topic.title,
            books: hadith.books.map((book) => {
              return { id: book.book.id, name: book.book.name, ...book }
            }),
          }}
        />
      )}
    </main>
  )
}

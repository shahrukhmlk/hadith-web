import { TopicEditPage } from "@/components/topic/edit-page/TopicEditPage"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { getLanguages } from "@/data/language/getLanguages"
import { notFound } from "next/navigation"

export default async function Home({ params }: { params: { id: string } }) {
  const topicID = parseInt(params.id)
  if (isNaN(topicID)) {
    notFound()
  }
  const prisma = await getEnhancedPrisma()
  const topic = await prisma.topic.findUnique({
    where: {
      id: topicID,
    },
    select: {
      id: true,
      title: true,
      status: true,
      translations: {
        select: {
          topicID: true,
          languageCode: true,
          title: true,
        },
        orderBy: { language: { sort: "asc" } },
      },
    },
  })
  if (!topic) {
    notFound()
  }
  const languages = await getLanguages()
  return (
    <main className="space-y-4 p-4">
      <TopicEditPage topic={topic} languages={languages} />
    </main>
  )
}

import TopicCreateDialog from "@/components/dialogs/topic-create/BookCreateDialog"
import TopicList from "@/components/topic/list/TopicList"
import { Button } from "@/components/ui/button"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { createNewTopic } from "@/serverActions/topic/createTopic"
import { Plus } from "lucide-react"

export default async function Home() {
  const prisma = await getEnhancedPrisma()
  const topics = await prisma.topic.findMany({
    select: {
      id: true,
      status: true,
      title: true,
    },
  })
  return (
    <main className="flex flex-col items-start p-8">
      <TopicCreateDialog />
      <TopicList topics={topics} />
    </main>
  )
}

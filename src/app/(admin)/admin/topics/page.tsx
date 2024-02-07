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
      <form action={createNewTopic}>
        <Button size={"sm"} className="h-8" variant={"secondary"}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Topic
        </Button>
      </form>
      <TopicList topics={topics} />
    </main>
  )
}

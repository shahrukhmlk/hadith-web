import TopicCreateDialog from "@/components/dialogs/topic-create/TopicCreateDialog"
import TopicList from "@/components/topic/list/TopicList"
import getEnhancedPrisma from "@/data/enhanced-prisma"

export default async function Home() {
  const prisma = await getEnhancedPrisma()
  const topics = await prisma.topic.findMany({
    select: {
      id: true,
      title: true,
    },
  })
  return (
    <>
      <TopicCreateDialog />
      <TopicList topics={topics} />
    </>
  )
}

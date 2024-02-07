import HadithCreateDialog from "@/components/dialogs/hadith-create/HadithCreateDialog"
import HadithList from "@/components/hadith/list/HadithList"
import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants/routes"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { createNewHadith } from "@/serverActions/hadith/createHadith"
import { Plus } from "lucide-react"
import { Route } from "next"
import Link from "next/link"

/**
 * Fetch allowed params from URL, parse them into a prisma filter/react query filter, pass the data
 * to the client component along with the filter.
 */
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  /*   const page = searchParams.page
  const pageSize = searchParams.page_size
  const search = searchParams.search
  const sort = searchParams.sort
  const order = searchParams.order
 */
  const prisma = await getEnhancedPrisma()

  const hadiths = await prisma.hadith.findMany({
    select: {
      id: true,
      number: true,
      date: true,
      status: true,
      color: true,
      topicID: true,
      text: true,
      fontScale: true,
    },
    orderBy: { number: "desc" },
  })
  const topics = await prisma.topic.findMany({
    select: { id: true, status: true, title: true },
  })
  return (
    <main className="flex flex-col items-start p-8">
      <HadithCreateDialog topics={topics} />
      <HadithList hadiths={hadiths} />
    </main>
  )
}

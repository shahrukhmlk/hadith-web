import { Button } from "@/components/ui/button"
import DataTable from "@/components/ui/data-table/DataTable"
import { ROUTES } from "@/constants/routes"
import { getHadiths } from "@/data/hadith/getHadiths"
import { Plus } from "lucide-react"
import Link from "next/link"
import { columns } from "./columns"

export default async function Home() {
  const hadiths = await getHadiths()
  return (
    <main className="flex flex-col items-start p-8">
      <Link href={ROUTES.ADMIN.HADITHS + "/new"}>
        <Button size={"sm"} className="h-8" variant={"secondary"}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Hadith
        </Button>
      </Link>
      <DataTable columns={columns} data={hadiths} />
    </main>
  )
}

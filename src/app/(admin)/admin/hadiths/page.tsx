import DataTable from "@/components/ui/data-table/DataTable"
import { getHadiths } from "@/data/hadith/getHadiths"
import { columns } from "./columns"

export default async function Home() {
  const hadiths = await getHadiths()
  return (
    <main className="h-full w-full">
      <DataTable columns={columns} data={hadiths} />
    </main>
  )
}

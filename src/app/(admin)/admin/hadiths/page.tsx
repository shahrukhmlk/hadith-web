import DataTable from "@/components/ui/data-table/DataTable"
import { getHadithsEditable } from "@/data/hadith/hadith"
import { columns } from "./columns"

export default async function Home({}: {}) {
  const hadiths = await getHadithsEditable()
  return (
    <main className="flex h-full w-full justify-center p-4">
      <DataTable columns={columns} data={hadiths} />
    </main>
  )
}

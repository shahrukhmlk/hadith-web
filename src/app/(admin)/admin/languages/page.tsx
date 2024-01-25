import DataTable from "@/components/ui/data-table/DataTable"
import { getLanguages } from "@/data/language/getLanguages"
import { columns } from "./columns"

export default async function Home() {
  const languages = await getLanguages()
  return (
    <main className="flex flex-col items-start p-8">
      <DataTable columns={columns} data={languages} />
    </main>
  )
}

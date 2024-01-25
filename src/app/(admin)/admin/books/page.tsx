import DataTable from "@/components/ui/data-table/DataTable"
import { getBooks } from "@/data/book/getBooks"
import { columns } from "./columns"

export default async function Home() {
  const books = await getBooks()
  return (
    <main className="flex flex-col items-start p-8">
      <DataTable columns={columns} data={books} />
    </main>
  )
}

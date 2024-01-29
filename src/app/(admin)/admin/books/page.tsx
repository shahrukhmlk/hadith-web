import { Button } from "@/components/ui/button"
import DataTable from "@/components/ui/data-table/DataTable"
import { getBooks } from "@/data/book/getBooks"
import { createNewBook } from "@/serverActions/hadith/createBook"
import { Plus } from "lucide-react"
import { columns } from "./columns"

export default async function Home() {
  const books = await getBooks()
  return (
    <main className="flex flex-col items-start p-8">
      <form action={createNewBook}>
        <Button size={"sm"} className="h-8" variant={"secondary"}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Book
        </Button>
      </form>
      <DataTable columns={columns} data={books} />
    </main>
  )
}

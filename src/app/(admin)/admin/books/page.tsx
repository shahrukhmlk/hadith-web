import BookList from "@/components/book/list/BookList"
import { Button } from "@/components/ui/button"
import { getBooks } from "@/data/book/getBooks"
import { createNewBook } from "@/serverActions/book/createBook"
import { Plus } from "lucide-react"

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
      <BookList books={books} />
    </main>
  )
}

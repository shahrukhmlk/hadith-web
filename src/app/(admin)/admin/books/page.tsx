import BookCreateDialog from "@/components/book/create-dialog/BookCreateDialog"
import BookList from "@/components/book/list/BookList"
import { getBooks } from "@/data/book/getBooks"

export default async function Home() {
  const books = await getBooks()
  return (
    <main className="flex flex-col items-start p-8">
      <BookCreateDialog />
      <BookList books={books} />
    </main>
  )
}

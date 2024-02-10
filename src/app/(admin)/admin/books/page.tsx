import BookList from "@/components/book/list/BookList"
import BookCreateDialog from "@/components/dialogs/book-create/BookCreateDialog"
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

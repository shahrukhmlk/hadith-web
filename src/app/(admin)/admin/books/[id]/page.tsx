import { BookEditForm } from "@/components/forms/book/BookEditForm"
import { getBookWithAllTranslations } from "@/data/book/bookWithTranslations"
import { getLanguages } from "@/data/language/getLanguages"
import { IBookWithTranslations } from "@/data/models/book/book"
import { redirectToBook } from "@/serverActions/redirectToBook"
import { notFound } from "next/navigation"

export default async function Home({ params }: { params: { id: string } }) {
  const bookID = parseInt(params.id)
  let book: IBookWithTranslations | undefined = undefined
  if (isNaN(bookID)) {
    if (params.id !== "create") {
      notFound()
    }
  } else {
    book = (await getBookWithAllTranslations(bookID)) ?? undefined
    if (!book) {
      notFound()
    }
  }
  const languages = await getLanguages()
  console.log(book?.id)
  return (
    <main className="space-y-4 p-4">
      <BookEditForm
        book={book}
        onBookCreate={redirectToBook}
        languages={languages}
      />
    </main>
  )
}

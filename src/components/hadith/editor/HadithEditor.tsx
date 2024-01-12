import { getBooks } from "@/data/book/booksWithTranslations"
import { getHadithEditable } from "@/data/hadith/hadith"
import { getLanguages } from "@/data/language/languages"
import HadithEditForm from "../edit-form/HadithEditForm"

export interface IHadithEditor {
  className?: string
  date: Date
}

const HadithEditor = async ({ className, date }: IHadithEditor) => {
  const languages = await getLanguages()
  const books = await getBooks()
  const hadith = await getHadithEditable(date)
  if (languages && books) {
  }
  return (
    <HadithEditForm
      languages={languages}
      books={books}
      hadith={hadith}
      date={date}
    />
  )
}

export default HadithEditor

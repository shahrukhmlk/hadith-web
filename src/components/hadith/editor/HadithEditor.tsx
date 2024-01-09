import { getBooks } from "@/data/hadith/books"
import { getHadithEditable } from "@/data/hadith/hadith"
import { getLanguages } from "@/data/hadith/languages"
import { clsx } from "clsx"
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
    <div className={clsx("p-4", className)}>
      <HadithEditForm
        languages={languages}
        books={books}
        hadith={hadith}
        date={date}
      />
    </div>
  )
}

export default HadithEditor

import HadithEditUI from "@/components/hadith/edit-ui/HadithEditUI"
import { getBooks } from "@/data/hadith/books"
import { getHadith, getHadithEditable } from "@/data/hadith/hadith"
import { getLanguages } from "@/data/hadith/languages"
import { clsx } from "clsx"

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
    <div
      className={clsx(
        "flex max-w-xl flex-col items-center gap-4 p-4",
        className,
      )}
    >
      <div>Hadith Serial Number: {hadith?.number}</div>
      {languages.map((lang, i) => {
        const translation = hadith?.translations.find(
          (el) => el.languages_code === lang.code,
        )
        return (
          <HadithEditUI
            key={i}
            lang={lang.code}
            text={translation?.text}
            topic={translation?.topic}
          />
        )
      })}
      <div>Books: {hadith?.books.map((book) => book.hadithNum)}</div>
    </div>
  )
}

export default HadithEditor

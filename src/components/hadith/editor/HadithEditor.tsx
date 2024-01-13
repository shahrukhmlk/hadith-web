import { getBooks } from "@/data/book/booksWithTranslations"
import { getHadithEditable } from "@/data/hadith/hadith"
import { getLanguages } from "@/data/language/languages"
import HadithEditForm from "../edit-form/HadithEditForm"

export interface IHadithEditor {
  className?: string
  hadithID: number
}

const HadithEditor = async ({ className, hadithID }: IHadithEditor) => {
  const languages = await getLanguages()
  const books = await getBooks()
  const hadith = await getHadithEditable(undefined, hadithID)
  return <HadithEditForm languages={languages} books={books} hadith={hadith} />
}

export default HadithEditor

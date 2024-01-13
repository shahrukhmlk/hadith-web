import { getBooks } from "@/data/book/booksWithTranslations"
import { getHadithEditable } from "@/data/hadith/hadith"
import { getLanguages } from "@/data/language/languages"
import HadithEditForm from "../edit-form/HadithEditForm"

export interface IHadithEditor {
  hadithNumber: number
}

const HadithEditor = async ({ hadithNumber }: IHadithEditor) => {
  const languages = await getLanguages()
  const books = await getBooks()
  const hadith = await getHadithEditable(undefined, undefined, hadithNumber)
  return <HadithEditForm languages={languages} books={books} hadith={hadith} />
}

export default HadithEditor

import { getBooks } from "@/data/book/booksWithTranslations"
import { getHadithEditable } from "@/data/hadith/hadith"
import { getLanguages } from "@/data/language/getLanguages"
import HadithEditForm from "../edit-form/HadithEditForm"

export interface IHadithEditor {
  hadithID?: number
}

const HadithEditor = async ({ hadithID }: IHadithEditor) => {
  const languages = await getLanguages()
  const books = await getBooks()
  const hadith = hadithID ? await getHadithEditable(hadithID) : null
  return <HadithEditForm languages={languages} books={books} hadith={hadith} />
}

export default HadithEditor

import { DEFAULT_LANGUAGE } from "@/constants/HADITH_CONSTANTS"
import { IHadithEditUI } from "./HadithEditUI"

const base: IHadithEditUI = {
  className: undefined,
  num: 5,
  lang: DEFAULT_LANGUAGE,
  topic: "Topic",
  date: new Date(),
  text: "",
  books: [{ name: "Book Name", hadithNum: 5 }],
}

export const mockHadithEditUiProps = {
  base,
}

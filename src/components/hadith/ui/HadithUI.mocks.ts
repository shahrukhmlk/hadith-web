import { DEFAULT_LANGUAGE } from "@/constants/HADITH_CONSTANTS"
import { IHadith } from "./HadithUI"

const base: IHadith = {
  className: undefined,
  num: 5,
  lang: DEFAULT_LANGUAGE,
  topic: "Topic",
  text: "",
  books: [{ name: "Book Name", hadithNum: 5 }],
}

export const mockHadithProps = {
  base,
}

import { DEFAULT_LANGUAGE } from "@/constants/HADITH_CONSTANTS"
import { HadithUIProps } from "./HadithUI"

const base: HadithUIProps = {
  className: undefined,
  num: 5,
  lang: DEFAULT_LANGUAGE,
  topic: "Topic",
  date: new Date(),
  text: "gdfgfd",
  books: [
    { id: 1, name: "Book Name 1", hadithNum: 5 },
    { id: 1, name: "Book Name 2", hadithNum: 88 },
  ],
}

export const mockHadithProps = {
  base,
}

import { DEFAULT_LANGUAGE } from "@/constants/HADITH_CONSTANTS"
import { HadithImageGeneratorProps } from "./HadithImageGenerator"

const base: HadithImageGeneratorProps = {
  num: 5,
  lang: DEFAULT_LANGUAGE,
  topic: "Topic",
  date: new Date(),
  text: "gdfgfd",
  books: [
    { id: 1, name: "Book Name 1", hadithNum: 5 },
    { id: 1, name: "Book Name 2", hadithNum: 88 },
  ],
  fontScale: 0,
}

export const mockHadithImageGeneratorProps = {
  base,
}

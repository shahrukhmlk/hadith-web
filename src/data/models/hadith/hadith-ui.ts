import { IHadith } from "./hadith"
import { IHadithTranslation } from "./hadith-translation"

export type IHadithUI = Omit<IHadith, "status" | "topicID"> & {
  topic: string
  books: { name: string; hadithRefNmber: number }[]
  translation: Omit<IHadithTranslation, "hadithID">
}

import { DEFAULT_LANGUAGE } from "@/constants/HADITH_CONSTANTS"
import { IHadithEditUI } from "./HadithEditUI"

const base: IHadithEditUI = {
  className: undefined,
  lang: DEFAULT_LANGUAGE,
  topic: "Topic",
  text: "",
}

export const mockHadithEditUiProps = {
  base,
}

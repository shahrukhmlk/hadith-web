import { DEFAULT_LANGUAGE } from "@/constants/HADITH_CONSTANTS"
import { IHadithHoc } from "./HadithHoc"

const base: IHadithHoc = {
  className: undefined,
  date: new Date(),
  languages: [DEFAULT_LANGUAGE],
}

export const mockHadithHocProps = {
  base,
}

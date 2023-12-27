import { LAST_DATE } from "@/data/HADITH_CONSTANTS"

export interface IHadithHoc {
  className?: string
  date?: Date
  langs?: string[]
}

const HadithHoc = ({ className, date, langs }: IHadithHoc) => {
  /**
   * > Check if date is supplied else use latest date
   * > Check for languages else load locale default if available else default site language
   * > Load hadith for that day and languages from database
   * > Display all hadiths using hadith component.
   */
  const selectedDate = date ? date : LAST_DATE
  const languages = langs ? langs : ["AR", "UR", "EN"]
  const hadiths = languages.map((lang) => {
    return {
      topic: `Hadith Topic in ${lang}`,
      text: `Hadith text in ${lang}`,
      ref: [{ book: "", hadithNum: 2123 }],
    }
  })
  return <div className={className}>{JSON.stringify(hadiths)}</div>
}

export default HadithHoc

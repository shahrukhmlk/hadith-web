import { LAST_DATE } from "@/data/HADITH_CONSTANTS"
import HadithUI, { Hadith, Reference } from "../ui/HadithUI"
import { sampleHadithData } from "../ui/HadithUI.mocks"

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
  return (
    <div className={className}>
      {sampleHadithData.map((hadith, index) => (
        <HadithUI key={index} hadith={hadith} />
      ))}
    </div>
  )
}

export default HadithHoc

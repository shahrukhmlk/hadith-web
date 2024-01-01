import { DEFAULT_LANGUAGE } from "@/constants/HADITH_CONSTANTS"
import { getLastDate } from "@/data/hadith/dates"
import { getHadiths } from "@/data/hadith/hadith"
import clsx from "clsx"
import HadithUI, { IHadith } from "../ui/HadithUI"

export interface IHadithHoc {
  className?: string
  date?: Date
  langs?: string[]
}

const HadithHoc = async ({ className, date, langs }: IHadithHoc) => {
  /**
   * > Check if date is supplied else use latest date
   * > Check for languages else load locale default if available else default site language
   * > Load hadith for that day and languages from database
   * > Display all hadiths using hadith component.
   */
  const lastDate = await getLastDate()
  const selectedDate = date ? date : lastDate
  const languages = langs && langs.length ? langs : [DEFAULT_LANGUAGE]
  let hadiths = new Array<IHadith>()
  if (selectedDate) {
    hadiths = await getHadiths(selectedDate, languages)
  }
  return (
    <div className={clsx("flex w-full flex-col gap-4", className)}>
      <div className="flex items-baseline gap-4">
        <p className="w-40 text-left">111</p>
        <h1 className="flex flex-1 justify-center">Topic</h1>
        <p className="w-40 text-right">{selectedDate?.toDateString()}</p>
      </div>
      <div className="flex flex-col justify-center gap-2 text-center">
        {hadiths.map((hadith, index) => (
          <HadithUI
            key={index}
            num={hadith.num}
            topic={hadith.topic}
            lang={hadith.lang}
            text={hadith.text}
            books={hadith.books}
          />
        ))}
      </div>
    </div>
  )
}

export default HadithHoc

import { LAST_DATE } from "@/data/HADITH_CONSTANTS"
import { getHadith } from "@/lib/data/hadith/hadith"
import clsx from "clsx"
import HadithUI, { Hadith, Reference } from "../ui/HadithUI"
import { sampleHadithData } from "../ui/HadithUI.mocks"

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
  const selectedDate = date ? date : LAST_DATE
  const hadith = await getHadith(selectedDate)
  return (
    <div className={clsx("flex flex-col gap-4", className)}>
      <div className="flex items-baseline gap-4">
        <p className="w-40 text-left">111</p>
        <h1 className="flex flex-1 justify-center">{JSON.stringify(hadith)}</h1>
        <p className="w-40 text-right">{selectedDate.toDateString()}</p>
      </div>
      <div className="flex flex-col justify-center gap-2 text-center">
        {sampleHadithData.map((hadith, index) => (
          <HadithUI key={index} hadith={hadith} />
        ))}
      </div>
      <div></div>
    </div>
  )
}

export default HadithHoc

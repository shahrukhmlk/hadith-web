import { isAdmin } from "@/data/auth/roles"
import { getLastDate } from "@/data/hadith/dates"
import { getHadith } from "@/data/hadith/hadith"
import { Status } from "@/data/models/status"
import clsx from "clsx"
import HadithUI, { HadithUIProps } from "../ui/HadithUI"

export interface IHadithHoc {
  className?: string
  date?: Date
  langs?: string[]
  edit?: boolean
}

const HadithHoc = async ({ className, date, langs, edit }: IHadithHoc) => {
  /**
   * > Check if date is supplied else use latest date
   * > Check for languages else load locale default if available else default site language
   * > Load hadith for that day and languages from database
   * > Display all hadiths using hadith component.
   */
  const admin = await isAdmin()
  const lastDate = !admin ? await getLastDate() : new Date()
  const selectedDate = date || lastDate
  let hadiths = new Array<HadithUIProps>()
  if (selectedDate) {
    hadiths = await getHadith(selectedDate, langs, Status.published)
  }
  return (
    <div
      className={clsx("flex w-full flex-col items-center gap-4 p-4", className)}
    >
      {hadiths.map((hadith, index) => (
        <HadithUI
          key={index}
          num={hadith.num}
          topic={hadith.topic}
          date={selectedDate as Date}
          lang={hadith.lang}
          text={hadith.text}
          books={hadith.books}
        />
      ))}
    </div>
  )
}

export default HadithHoc

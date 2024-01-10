import { auth } from "@/config/auth"
import { getLastDate } from "@/data/hadith/dates"
import { getHadith } from "@/data/hadith/hadith"
import clsx from "clsx"
import HadithEditor from "../editor/HadithEditor"
import HadithUI, { HadithUIProps } from "../ui/HadithUI"

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
  const session = await auth()
  const lastDate = !session ? await getLastDate() : new Date()
  const selectedDate = date || lastDate
  // return <HadithEditor date={selectedDate as Date} />
  if (session) {
    return <HadithEditor date={selectedDate as Date} />
  }
  let hadiths = new Array<HadithUIProps>()
  if (selectedDate) {
    hadiths = await getHadith(
      selectedDate,
      langs,
      !session ? "published" : undefined,
    )
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

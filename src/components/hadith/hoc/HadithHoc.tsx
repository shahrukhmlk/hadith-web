import { getLastDate } from "@/data/hadith/dates"
import { getHadith } from "@/data/hadith/hadith"
import { auth } from "@/lib/auth"
import clsx from "clsx"
import HadithEditor from "../editor/HadithEditor"
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
  const session = await auth()
  const lastDate = !session ? await getLastDate() : new Date()
  const selectedDate = date || lastDate
  if (session) {
    return <HadithEditor date={selectedDate as Date} />
  }
  let hadiths = new Array<IHadith>()
  if (selectedDate) {
    hadiths = await getHadith(
      selectedDate,
      langs,
      !session ? "published" : undefined,
    )
  }
  return (
    <div
      className={clsx(
        "flex max-w-xl flex-col items-center gap-4 p-4",
        className,
      )}
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

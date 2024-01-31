import { isAdmin } from "@/data/auth/roles"
import { getLastDate } from "@/data/hadith/dates"
import { Status } from "@/data/models/status/status"
import clsx from "clsx"
import HadithUI, { HadithUIProps } from "../ui/HadithUI"

export interface IHadithHoc {
  className?: string
  date?: Date
  languages?: string[]
}

const HadithHoc = async ({ className, date, languages }: IHadithHoc) => {
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
    //hadiths = await getHadith(selectedDate, langs, Status.published)
  }
  return <div></div>
}

export default HadithHoc

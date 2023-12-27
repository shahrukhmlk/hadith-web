import HadithHoc from "@/components/hadith/hoc/HadithHoc"
import { LAST_DATE } from "@/data/HADITH_CONSTANTS"
import { isAfter, isDate } from "date-fns"

export default function Home({ params }: { params: { date: number[] } }) {
  const dateArray = params.date
  /* {<div>
      {dateArray
        ? dateArray.length === 1
          ? "Year view"
          : dateArray.length === 2
            ? "monthView"
            : dateArray.length === 3
              ? getDateFromPath(dateArray).toDateString()
              : "none"
        : "none"}
    </div>} */
  return <HadithHoc date={getDateFromPath(params.date)} />
}

export function getDateFromPath(pathArray: number[]) {
  var selectedDate =
    pathArray && pathArray.length > 2
      ? new Date(pathArray[0], pathArray[1] - 1, pathArray[2])
      : LAST_DATE
  if (!selectedDate.valueOf() || isAfter(selectedDate, LAST_DATE)) {
    selectedDate = LAST_DATE
  }
  return selectedDate
}

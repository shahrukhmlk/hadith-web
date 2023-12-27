import HadithHoc from "@/components/hadith/hoc/HadithHoc"
import { getDateFromPath } from "@/lib/utils"

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

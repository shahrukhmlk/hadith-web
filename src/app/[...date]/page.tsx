import HadithHoc from "@/components/hadith/hoc/HadithHoc"
import { getDateFromPath } from "@/lib/utils"

export default function Home({ params }: { params: { date: number[] } }) {
  const dateArray = params.date
  return <HadithHoc date={getDateFromPath(params.date)} />
}

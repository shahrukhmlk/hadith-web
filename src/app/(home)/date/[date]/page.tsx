import HadithHoc from "@/components/hadith/hoc/HadithHoc"
import { getDateFromPath, getLangArrayFromURL } from "@/lib/utils"

export default function Home({
  params,
  searchParams,
}: {
  params: { date: string }
  searchParams: {
    [key: string]: string | undefined
    languages: string | undefined
    edit: string
  }
}) {
  const langs = getLangArrayFromURL(searchParams.languages)
  const dateArray = params.date
  return (
    <main className="flex h-full w-full">
      <HadithHoc date={getDateFromPath(params.date)} languages={langs} />
    </main>
  )
}

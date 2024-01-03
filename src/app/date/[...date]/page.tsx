import HadithHoc from "@/components/hadith/hoc/HadithHoc"
import { getDateFromPath, getLangArrayFromURL } from "@/lib/utils"

export default function Home({
  params,
  searchParams,
}: {
  params: { date: number[] }
  searchParams: { [languages: string]: string | undefined }
}) {
  const langs = getLangArrayFromURL(searchParams.languages)
  const dateArray = params.date
  return (
    <main className="flex h-full w-full flex-col items-center">
      <HadithHoc date={getDateFromPath(params.date)} langs={langs} />
    </main>
  )
}

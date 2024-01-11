import HadithHoc from "@/components/hadith/hoc/HadithHoc"
import { getLangArrayFromURL } from "@/lib/utils"

export default function Home({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined
    languages: string | undefined
    edit: string
  }
}) {
  const langs = getLangArrayFromURL(searchParams.languages)
  return (
    <main className="h-full w-full">
      <HadithHoc langs={langs} edit={searchParams.edit === "true"} />
    </main>
  )
}

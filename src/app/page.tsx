import HadithHoc from "@/components/hadith/hoc/HadithHoc"
import { getLangArrayFromURL } from "@/lib/utils"

export default function Home({
  searchParams,
}: {
  searchParams: { [languages: string]: string | string[] | undefined }
}) {
  const langs = getLangArrayFromURL(searchParams.languages)
  return (
    <main className="h-full w-full">
      <HadithHoc langs={langs} />
    </main>
  )
}

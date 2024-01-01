import HadithHoc from "@/components/hadith/hoc/HadithHoc"
import { getLangArrayFromURL } from "@/lib/utils"

export default function Home({
  searchParams,
}: {
  searchParams: { [languages: string]: string | string[] | undefined }
}) {
  const langs = getLangArrayFromURL(searchParams.languages)
  return (
    <main className="flex h-full w-full flex-col items-center">
      <HadithHoc langs={langs} />
    </main>
  )
}

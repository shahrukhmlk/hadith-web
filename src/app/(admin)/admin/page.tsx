import HadithEditor from "@/components/hadith/editor/HadithEditor"

export default function Home({}: {}) {
  return (
    <main className="flex h-full w-full">
      <HadithEditor date={new Date()} />
    </main>
  )
}

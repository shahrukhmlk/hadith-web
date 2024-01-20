import HadithEditor from "@/components/hadith/editor/HadithEditor"

export default function Home({ params }: { params: { id: string } }) {
  const hadithID = parseInt(params.id)
  return (
    <main className="flex h-full w-full">
      <HadithEditor hadithID={hadithID} />
    </main>
  )
}

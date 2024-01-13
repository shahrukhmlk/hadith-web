import HadithEditor from "@/components/hadith/editor/HadithEditor"

export default function Page({ params }: { params: { number: string } }) {
  return (
    <main className="flex h-full w-full justify-center p-4">
      <HadithEditor hadithNumber={parseInt(params.number)} />
    </main>
  )
}

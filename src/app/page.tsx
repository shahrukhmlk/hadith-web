import MainHero from "@/components/heros/main/MainHero"

export default function Home() {
  return (
    <main className="flex h-full w-full flex-col justify-center">
      <MainHero className="flex flex-col justify-center p-4" />
    </main>
  )
}

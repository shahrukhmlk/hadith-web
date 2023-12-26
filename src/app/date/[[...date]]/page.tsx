import HadithCalendar from "@/components/hadith/calendar/HadithCalendar"

export default function Home({ params }: { params: { date: number[] } }) {
  const startDate = new Date(2023, 10, 5)
  const lastDate = new Date()
  const date =
    params.date && params.date.length == 3
      ? {
          year: params.date[0],
          month: params.date[1],
          date: params.date[2],
        }
      : null

  return (
    <main className="container mx-auto flex h-full w-full flex-col lg:flex-row">
      <div className="flex flex-col">{date?.date}</div>
      <div className="flex flex-col">
        <HadithCalendar
          selectedDate={new Date()}
          startDate={startDate}
          lastDate={lastDate}
        />
      </div>
      <section id="calendar"></section>
    </main>
  )
}

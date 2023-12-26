import HadithCalendar from "@/components/hadith/calendar/HadithCalendar"
import { Separator } from "@/components/ui/separator"
import { isAfter } from "date-fns"

export default function Home({ params }: { params: { date: number[] } }) {
  // TODO: Fetch last hadith date from db
  const lastDate = new Date()
  const dateArray = params.date
  var selectedDate =
    dateArray && dateArray.length > 2
      ? new Date(dateArray[0], dateArray[1] - 1, dateArray[2])
      : lastDate
  if (isAfter(selectedDate, lastDate)) {
    selectedDate = lastDate
  }

  return (
    <main className="flex w-full flex-1 flex-col justify-center lg:flex-row">
      <div className="flex flex-col p-4 lg:order-3 lg:flex-1">
        {selectedDate.toDateString()}
      </div>
      <div className="flex flex-col p-4 lg:order-1">
        <HadithCalendar selectedDate={selectedDate} lastDate={lastDate} />
      </div>
      <Separator
        orientation={"vertical"}
        className="hidden lg:order-2 lg:block"
      />
    </main>
  )
}

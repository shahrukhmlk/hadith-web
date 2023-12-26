import { IHadithCalendar } from "./HadithCalendar"

const base: IHadithCalendar = {
  className: undefined,
  selectedDate: new Date(),
  startDate: new Date(2023, 11),
  lastDate: new Date(),
}

export const mockHadithCalendarProps = {
  base,
}

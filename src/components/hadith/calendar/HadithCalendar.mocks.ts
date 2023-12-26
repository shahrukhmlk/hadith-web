import { IHadithCalendar } from "./HadithCalendar"

const base: IHadithCalendar = {
  className: undefined,
  selectedDate: new Date(),
  lastDate: new Date(),
}

export const mockHadithCalendarProps = {
  base,
}

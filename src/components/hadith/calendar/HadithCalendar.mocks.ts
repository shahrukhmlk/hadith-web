import { IHadithCalendar } from "./HadithCalendar"

const base: IHadithCalendar = {
  className: undefined,
  startDate: new Date(2023, 0, 1),
  lastDate: new Date(),
}

export const mockHadithCalendarProps = {
  base,
}

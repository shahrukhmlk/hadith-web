"use client"

import { Calendar } from "@/components/ui/calendar"
import { getDateFromPath } from "@/lib/utils"
import { format } from "date-fns"
import { Route } from "next"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useRef } from "react"
import { Button, DayProps, useDayRender } from "react-day-picker"

export interface IHadithCalendar {
  className?: string
  startDate?: Date
  lastDate?: Date
}

const HadithCalendar = ({
  className,
  startDate,
  lastDate,
}: IHadithCalendar) => {
  const pathname = usePathname()
  const selectedDate = getDateFromPath(pathname) || lastDate
  return (
    <Calendar
      mode="single"
      defaultMonth={selectedDate}
      selected={selectedDate}
      fromDate={startDate}
      toDate={lastDate}
      components={{ Day: DayLink }}
    />
  )
}

function DayLink(props: DayProps): JSX.Element {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dayRender = useDayRender(props.date, props.displayMonth, buttonRef)
  const searchParams = useSearchParams()

  if (dayRender.isHidden) {
    return <div role="gridcell"></div>
  }
  if (!dayRender.isButton) {
    return <div {...dayRender.divProps} />
  }
  if (dayRender.buttonProps.disabled) {
    return <Button name="day" ref={buttonRef} {...dayRender.buttonProps} />
  }
  return (
    <Link
      href={
        ("/date/" +
          format(props.date, "dd-MM-yyy") +
          (searchParams.size ? "?" + searchParams.toString() : "")) as Route
      }
    >
      <Button name="day" ref={buttonRef} {...dayRender.buttonProps} />
    </Link>
  )
}

export default HadithCalendar

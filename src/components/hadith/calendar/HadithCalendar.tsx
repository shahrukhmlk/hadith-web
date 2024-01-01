"use client"

import { Calendar } from "@/components/ui/calendar"
import { getDateFromPath } from "@/lib/utils"
import { Route } from "next"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
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
  const pathName = usePathname()
  const patNameStripped = pathName.slice(1)
  const selectedDate =
    getDateFromPath(patNameStripped.split("/").map(Number)) || lastDate
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
        ("/" +
          props.date.getFullYear() +
          "/" +
          (props.date.getMonth() + 1) +
          "/" +
          props.date.getDate() +
          "?" +
          useSearchParams().toString()) as Route
      }
    >
      <Button name="day" ref={buttonRef} {...dayRender.buttonProps} />
    </Link>
  )
}

export default HadithCalendar

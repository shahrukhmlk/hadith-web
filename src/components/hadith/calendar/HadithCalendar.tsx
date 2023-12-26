"use client"

import { Calendar } from "@/components/ui/calendar"
import { Route } from "next"
import Link from "next/link"
import { useRef } from "react"
import { Button, DayProps, useDayRender } from "react-day-picker"

export interface IHadithCalendar {
  className?: string
  selectedDate: Date
  lastDate: Date
}

const HadithCalendar = ({
  className,
  selectedDate,
  lastDate,
}: IHadithCalendar) => {
  return (
    <Calendar
      mode="single"
      defaultMonth={selectedDate}
      selected={selectedDate}
      fromDate={new Date(2022, 0, 1)}
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
        ("/date/" +
          props.date.getFullYear() +
          "/" +
          (props.date.getMonth() + 1) +
          "/" +
          props.date.getDate()) as Route
      }
    >
      <Button name="day" ref={buttonRef} {...dayRender.buttonProps} />
    </Link>
  )
}

export default HadithCalendar

"use client"

import { getDateFromPath } from "@/app/[...date]/page"
import { Calendar } from "@/components/ui/calendar"
import { START_DATE } from "@/data/HADITH_CONSTANTS"
import { Route } from "next"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useRef } from "react"
import { Button, DayProps, useDayRender } from "react-day-picker"

export interface IHadithCalendar {
  className?: string
  lastDate: Date
}

const HadithCalendar = ({ className, lastDate }: IHadithCalendar) => {
  const pathName = usePathname()
  const patNameStripped = pathName.slice(1)
  return (
    <>
      <Calendar
        mode="single"
        defaultMonth={new Date()}
        selected={getDateFromPath(patNameStripped.split("/").map(Number))}
        fromDate={START_DATE}
        toDate={lastDate}
        components={{ Day: DayLink }}
      />
      {JSON.stringify(pathName)}
    </>
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
          props.date.getDate()) as Route
      }
    >
      <Button name="day" ref={buttonRef} {...dayRender.buttonProps} />
    </Link>
  )
}

export default HadithCalendar

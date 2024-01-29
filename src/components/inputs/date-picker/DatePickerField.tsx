"use client"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useState } from "react"

export interface DatePickerFieldProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}
function DatePickerField({ selected, onSelect }: DatePickerFieldProps) {
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  return (
    <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full min-w-52 pl-3 text-left font-normal",
            !selected && "text-muted-foreground",
          )}
        >
          {selected ? format(selected, "PPP") : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          onDayClick={() => setDatePickerOpen(false)}
          onSelect={onSelect}
          selected={selected}
          /* disabled={(date) =>
              date > new Date() || date < new Date("1900-01-01")
            } */
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export default DatePickerField
import { LAST_DATE } from "@/data/HADITH_CONSTANTS"
import { clsx, type ClassValue } from "clsx"
import { isAfter } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDateFromPath(pathArray: number[]) {
  var selectedDate =
    pathArray && pathArray.length > 2
      ? new Date(pathArray[0], pathArray[1] - 1, pathArray[2])
      : LAST_DATE
  if (!selectedDate.valueOf() || isAfter(selectedDate, LAST_DATE)) {
    selectedDate = LAST_DATE
  }
  return selectedDate
}

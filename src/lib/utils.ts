import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDateFromPath(pathArray: number[]) {
  var selectedDate =
    pathArray && pathArray.length > 2
      ? new Date(pathArray[0], pathArray[1] - 1, pathArray[2])
      : undefined
  return selectedDate
}

export const getLangArrayFromURL = (param: string | string[] | undefined) => {
  return param ? (Array.isArray(param) ? param : param.split(",")) : undefined
}

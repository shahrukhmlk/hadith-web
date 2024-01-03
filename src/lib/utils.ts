import { clsx, type ClassValue } from "clsx"
import { parse } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDateFromPath(pathname: string) {
  const match = pathname.match(/[0-9]{2}-[0-9]{2}-[0-9]{4}/)
  return match ? parse(match[0], "dd-MM-yyyy", new Date()) : undefined
}

export const getLangArrayFromURL = (param: string | string[] | undefined) => {
  return param ? (Array.isArray(param) ? param : param.split(",")) : undefined
}

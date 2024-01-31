import "server-only"
import prisma from "@/data/prisma"
import { cache } from "react"
import { Status } from "../models/status/status"

export const getStartDate = cache(async () => {
  const res = await prisma.hadith.findFirst({
    orderBy: {
      date: "asc",
    },
    select: {
      date: true,
    },
    where: {
      status: Status.published,
    },
  })
  return res?.date
})

export const getLastDate = cache(async () => {
  const res = await prisma.hadith.findFirst({
    orderBy: {
      date: "desc",
    },
    select: {
      date: true,
    },
    where: {
      status: Status.published,
    },
  })
  return res?.date
})

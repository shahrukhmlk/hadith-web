import "server-only"
import { Status } from "@/data/models/status"
import prisma from "@/data/prisma"
import { cache } from "react"

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

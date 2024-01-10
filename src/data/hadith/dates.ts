import "server-only"
import prisma from "@/data/prisma"
import { Prisma, status } from "@prisma/client"
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
      status: status.published,
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
      status: status.published,
    },
  })
  return res?.date
})

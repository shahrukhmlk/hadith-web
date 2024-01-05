import "server-only"
import prisma from "@/data/prisma"
import { Prisma } from "@prisma/client"
import { cache } from "react"

export const getStartDate = cache(async () => {
  const res = await prisma.hadiths.findFirst({
    orderBy: {
      date: "asc",
    },
    select: {
      date: true,
    },
    where: {
      status: "published",
    },
  })
  return res?.date
})

export const getLastDate = cache(async () => {
  const res = await prisma.hadiths.findFirst({
    orderBy: {
      date: "desc",
    },
    select: {
      date: true,
    },
    where: {
      status: "published",
    },
  })
  return res?.date
})

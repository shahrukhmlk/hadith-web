import prisma from "@/data/prisma"
import { cache } from "react"
import { IHadith } from "../models/hadith/hadith"

export const getHadiths = cache(async (): Promise<IHadith[]> => {
  const res = await prisma.hadith.findMany({
    select: {
      id: true,
      number: true,
      date: true,
      status: true,
      color: true,
      topic: true,
      text: true,
      fontScale: true,
    },
  })
  return res
})

import "server-only"
import prisma from "@/data/prisma"
import { cache } from "react"
import { IBook } from "../models/book/book"

export const getBook = cache(async (id: number): Promise<IBook | null> => {
  const res = await prisma.book.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      status: true,
    },
  })
  return res
})

import "server-only"
import prisma from "@/data/prisma"
import { cache } from "react"
import { IBook } from "../models/book/book"

export const getBooks = cache(async (): Promise<IBook[]> => {
  const res = await prisma.book.findMany({
    select: {
      id: true,
      sort: true,
      name: true,
      status: true,
    },
    orderBy: { sort: "asc" },
  })
  return res
})

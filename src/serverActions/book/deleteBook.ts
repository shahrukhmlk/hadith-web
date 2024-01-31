"use server"

import { ROUTES } from "@/constants/routes"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { redirect } from "next/navigation"

export async function deleteBook(bookID: number) {
  const prisma = await getEnhancedPrisma()
  const { id } = await prisma.book.delete({
    where: {
      id: bookID,
    },
  })
  redirect(`${ROUTES.ADMIN.BOOKS}`)
}

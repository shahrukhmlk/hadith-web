"use server"

import { ROUTES } from "@/constants/routes"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { redirect } from "next/navigation"

export async function createNewBook() {
  const prisma = await getEnhancedPrisma()
  const { id } = await prisma.book.create({
    data: {
      name: "",
    },
    select: {
      id: true,
    },
  })
  redirect(`${ROUTES.ADMIN.BOOKS}/${id}`)
}

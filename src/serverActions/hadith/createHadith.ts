"use server"

import { ROUTES } from "@/constants/routes"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { redirect } from "next/navigation"

export async function createNewHadith() {
  const prisma = await getEnhancedPrisma()
  const { id } = await prisma.hadith.upsert({
    create: {
      date: new Date(),
      topic: "",
      number: 0,
      text: "",
    },
    update: {
      date: new Date(),
      topic: "",
      number: 0,
      text: "",
    },
    where: {
      number: 0,
    },
    select: {
      id: true,
    },
  })
  redirect(`${ROUTES.ADMIN.HADITHS}/${id}`)
}

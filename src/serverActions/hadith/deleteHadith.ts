"use server"

import { ROUTES } from "@/constants/routes"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { redirect } from "next/navigation"

export async function deleteHadith(hadithID: number) {
  const prisma = await getEnhancedPrisma()
  const { id } = await prisma.hadith.delete({
    where: {
      id: hadithID,
    },
  })
  redirect(`${ROUTES.ADMIN.HADITHS}`)
}

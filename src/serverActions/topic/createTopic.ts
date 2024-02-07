"use server"

import { ROUTES } from "@/constants/routes"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { redirect } from "next/navigation"

export async function createNewTopic() {
  const prisma = await getEnhancedPrisma()
  const { id } = await prisma.topic.create({
    data: {
      title: "",
    },
    select: {
      id: true,
    },
  })
  redirect(`${ROUTES.ADMIN.TOPICS}/${id}`)
}

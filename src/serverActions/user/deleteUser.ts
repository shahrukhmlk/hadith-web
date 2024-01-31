"use server"

import { ROUTES } from "@/constants/routes"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { redirect } from "next/navigation"

export async function deleteUser(userID: string) {
  const prisma = await getEnhancedPrisma()
  const { id } = await prisma.user.delete({
    where: {
      id: userID,
    },
  })
  redirect(`${ROUTES.ADMIN.USERS}`)
}

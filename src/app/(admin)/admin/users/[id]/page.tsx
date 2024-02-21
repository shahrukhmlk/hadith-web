import { UserEditForm } from "@/components/forms/user/UserEditForm"
import { UserEditPage } from "@/components/user/edit-page/UserEditPage"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { notFound } from "next/navigation"

export default async function Home({ params }: { params: { id: string } }) {
  const prisma = await getEnhancedPrisma()
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      emailVerified: true,
      role: true,
    },
  })
  if (!user) {
    notFound()
  }
  return <UserEditPage user={user} />
}

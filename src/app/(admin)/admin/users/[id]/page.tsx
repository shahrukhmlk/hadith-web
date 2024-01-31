import { UserEditForm } from "@/components/forms/user/UserEditForm"
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
  return <main className="space-y-4 p-4">{<UserEditForm user={user} />}</main>
}

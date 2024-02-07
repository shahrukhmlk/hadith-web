import DataTable from "@/components/ui/data-table/DataTable"
import UserList from "@/components/user/list/UserList"
import getEnhancedPrisma from "@/data/enhanced-prisma"

export default async function Home() {
  const prisma = await getEnhancedPrisma()
  const users = await prisma.user.findMany({
    select: {
      id: true,
      image: true,
      name: true,
      email: true,
      emailVerified: true,
      role: true,
    },
  })
  return (
    <main className="flex flex-col items-start p-8">
      <UserList users={users} />
    </main>
  )
}

import DataTable from "@/components/ui/data-table/DataTable"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { columns } from "./columns"

export default async function Home() {
  const prisma = await getEnhancedPrisma()
  const users = await prisma.user.findMany()
  return (
    <main className="flex flex-col items-start p-8">
      {/* <form action={createNewBook}>
        <Button size={"sm"} className="h-8" variant={"secondary"}>
          <Plus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </form> */}
      <DataTable columns={columns} data={users} />
    </main>
  )
}

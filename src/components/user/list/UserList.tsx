"use client"

import DataTable from "@/components/ui/data-table/DataTable"
import { useFindManyUser } from "@/lib/hooks/query"
import { User } from "@prisma/client"
import { forwardRef } from "react"
import { columns } from "./columns"

export interface UserListProps extends React.HTMLAttributes<HTMLDivElement> {
  users: User[]
}

const UserList = forwardRef<HTMLDivElement, UserListProps>(
  ({ users, ...props }, ref) => {
    const findManyUser = useFindManyUser(
      {
        select: {
          id: true,
          image: true,
          name: true,
          email: true,
          emailVerified: true,
          role: true,
        },
      },
      {
        initialData: users,
      },
    )
    return (
      <div ref={ref} {...props}>
        {findManyUser.data ? (
          <DataTable columns={columns} data={findManyUser.data} />
        ) : null}
      </div>
    )
  },
)

UserList.displayName = "UserList"

export default UserList

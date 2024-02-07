"use client"

import { UserEditForm } from "@/components/forms/user/UserEditForm"
import { ROUTES } from "@/constants/routes"
import { useFindUniqueUser } from "@/lib/hooks/query"
import { User } from "@prisma/client"
import { Route } from "next"
import { useRouter } from "next/navigation"
import { forwardRef, useRef } from "react"

export interface UserEditPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  user: User
}

export const UserEditPage = forwardRef<HTMLDivElement, UserEditPageProps>(
  ({ user, ...props }, ref) => {
    const router = useRouter()
    const userEditFormRef = useRef<HTMLFormElement | null>(null)

    const findUniqueUser = useFindUniqueUser(
      {
        where: {
          id: user.id,
        },
        select: {
          id: true,
          image: true,
          name: true,
          email: true,
          emailVerified: true,
          role: true,
        },
      },
      { initialData: user },
    )

    /***
     * If user is available from props and the query returns no data it means the data has changed on the server after
     * the server render, so we return null.
     */
    if (user && !findUniqueUser.data) {
      return null
    }

    if (!findUniqueUser.data) {
      return null
    }

    return (
      <div ref={ref} className="space-y-4" {...props}>
        <UserEditForm
          ref={userEditFormRef}
          user={findUniqueUser.data}
          onSave={(id) => {}}
          onDelete={() => {
            router.replace(ROUTES.ADMIN.USERS as Route)
          }}
        />
      </div>
    )
  },
)

UserEditPage.displayName = "UserEditPage"

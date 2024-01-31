"use client"

import { Button } from "@/components/ui/button"
import { ROUTES } from "@/constants/routes"
import clsx from "clsx"
import {
  Languages,
  Library,
  LibrarySquare,
  MessageSquareQuote,
  Quote,
  Users,
  UserSquare,
} from "lucide-react"
import { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

export interface AdminSidebarProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const AdminSidebar = ({ className, ...props }: AdminSidebarProps) => {
  const pathName = usePathname()
  const iconClassName = "mr-2 h-4 w-4"
  let menuItems = [
    {
      path: ROUTES.ADMIN.HADITHS,
      text: "Hadiths",
      icon: <Quote className={iconClassName} />,
    },
    {
      path: ROUTES.ADMIN.BOOKS,
      text: "Books",
      icon: <Library className={iconClassName} />,
    },
    {
      path: ROUTES.ADMIN.LANGUAGES,
      text: "Languages",
      icon: <Languages className={iconClassName} />,
    },
    {
      path: ROUTES.ADMIN.USERS,
      text: "Users",
      icon: <Users className={iconClassName} />,
    },
  ]
  return (
    <div className={clsx("basis-56 pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Content
          </h2>
          <nav>
            <ul className="space-y-1">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Button
                    size={"sm"}
                    asChild
                    variant={item.path === pathName ? "secondary" : "ghost"}
                    className="w-full justify-start"
                  >
                    <Link href={item.path as Route}>
                      {item.icon} {item.text}
                    </Link>
                  </Button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default AdminSidebar

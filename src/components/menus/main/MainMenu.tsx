"use client"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { ROUTES } from "@/constants/routs"
import { Route } from "next"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

export interface IMainMenu {
  className?: string
}

const MainMenu = ({ className }: IMainMenu) => {
  const pathName = usePathname()
  let menuItems = [
    { path: ROUTES.HOME + "?" + useSearchParams().toString(), text: "Home" },
    { path: ROUTES.ADMIN, text: "Admin" },
  ]
  const menuItemsUI = menuItems.map((item, index) => (
    <NavigationMenuItem key={index}>
      <Link href={item.path as Route} legacyBehavior passHref>
        <NavigationMenuLink
          className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
          active={item.path === pathName}
        >
          {item.text}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  ))
  return (
    <NavigationMenu>
      <NavigationMenuList>{menuItemsUI}</NavigationMenuList>
    </NavigationMenu>
  )
}

export default MainMenu

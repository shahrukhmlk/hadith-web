"use client"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { MenuItem } from "@/constants/menu"
import clsx from "clsx"
import { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"

export interface MainMenuProps {
  items: MenuItem[]
}

const MainMenu = ({ items }: MainMenuProps) => {
  const pathName = usePathname()

  const menuItemsUI = items.map((item) => (
    <NavigationMenuItem key={item.route}>
      {!!item.children ? (
        <>
          <NavigationMenuTrigger>
            <Link href={item.route as Route} legacyBehavior passHref>
              <NavigationMenuLink active={item.route === pathName}>
                {item.title}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-max space-y-1 p-2">
              {item.children.map((subItem) => (
                <li key={subItem.route}>
                  <Link href={subItem.route as Route} legacyBehavior passHref>
                    <NavigationMenuLink
                      className="flex h-10 w-full items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      active={subItem.route === pathName}
                    >
                      {subItem.title}
                    </NavigationMenuLink>
                  </Link>
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </>
      ) : (
        <Link href={item.route as Route} legacyBehavior passHref>
          <NavigationMenuLink
            className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
            active={item.route === pathName}
          >
            {item.title}
          </NavigationMenuLink>
        </Link>
      )}
    </NavigationMenuItem>
  ))
  return (
    <NavigationMenu className={clsx("hidden sm:flex")}>
      <NavigationMenuList>{menuItemsUI}</NavigationMenuList>
    </NavigationMenu>
  )
}

export default MainMenu

"use client"

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { MenuItem } from "@/constants/menu"
import clsx from "clsx"
import { Menu } from "lucide-react"
import { Route } from "next"
import { ROUTER_TYPE } from "next/dist/build/utils"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useState } from "react"

export interface MobileMenuProps {
  items: MenuItem[]
}

export const MobileMenu = ({ items }: MobileMenuProps) => {
  const [open, onOpenChange] = useState(false)
  const pathname = usePathname()
  return (
    <Drawer direction="left" open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger className="sm:hidden" asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full w-56 space-y-1 overflow-y-auto p-4">
        {items.map((item) => (
          <Fragment key={item.route}>
            <MobileLink href={item.route as Route} onOpenChange={onOpenChange}>
              <Button
                variant={pathname === item.route ? "secondary" : "ghost"}
                className="w-full justify-start"
              >
                {item.title}
              </Button>
            </MobileLink>
            {!!item.children && (
              <div className="px-4">
                {item.children.map((subItem) => (
                  <MobileLink
                    key={subItem.route}
                    href={subItem.route as Route}
                    onOpenChange={onOpenChange}
                  >
                    <Button
                      variant={"link"}
                      className={clsx(
                        "w-full justify-start text-muted-foreground",
                        pathname === subItem.route && "text-foreground",
                      )}
                    >
                      {subItem.title}
                    </Button>
                  </MobileLink>
                ))}
              </div>
            )}
          </Fragment>
        ))}
        {/* <DrawerHeader>
          <DrawerTitle>Admin Menu</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter></DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  )
}

interface MobileLinkProps extends LinkProps<ROUTER_TYPE> {
  onOpenChange?: (open: boolean) => void
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => {
        onOpenChange?.(false)
      }}
      className={clsx(className)}
      {...props}
    >
      {children}
    </Link>
  )
}

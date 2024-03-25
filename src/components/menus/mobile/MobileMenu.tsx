"use client"

import Series from "@/assets/svg/calligraphy-series.svg"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
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
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger className="sm:hidden" asChild>
        <Button variant={"ghost"} size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle asChild>
            <Link href={"/"}>
              <Series className={"h-9 w-auto px-4 *:fill-foreground"} />
            </Link>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
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
      </SheetContent>
    </Sheet>
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

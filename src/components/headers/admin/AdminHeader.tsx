import AdminMenu from "@/components/menus/admin/AdminMenu"
import ProfileMenu from "@/components/menus/profile/ProfileMenu"
import AdminSidebar from "@/components/sidebars/admin/AdminSidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Separator } from "@/components/ui/separator"
import ThemeSwitchUtility from "@/components/utilities/ThemeSwitch/ThemeSwitchUtility"
import { Menu } from "lucide-react"
import Link from "next/link"

export interface AdminHeaderProps {
  className?: string
}

const AdminHeader = ({ className }: AdminHeaderProps) => {
  return (
    <header className="fixed z-10 h-16 w-full backdrop-blur">
      <div className="flex h-full flex-wrap items-center justify-center gap-x-4 gap-y-1 p-2">
        <Drawer direction="left">
          <DrawerTrigger className="mr-2 sm:hidden" asChild>
            <Button variant={"secondary"} size={"icon"}>
              <Menu />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-full w-56 overflow-y-auto sm:hidden">
            <DrawerHeader>
              <DrawerTitle>Admin Menu</DrawerTitle>
              <DrawerDescription>
                This action cannot be undone.
              </DrawerDescription>
            </DrawerHeader>
            <AdminSidebar />
            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </Drawer>

        <Link href={"/"} className="flex items-center justify-center gap-2">
          <Avatar>
            <AvatarImage src="/" />
            <AvatarFallback>DMF</AvatarFallback>
          </Avatar>
          <p className="hidden text-xl font-semibold md:block">
            Dar al-Malik Foundation
          </p>
        </Link>
        <div className="flex flex-1 md:ms-4">
          <AdminMenu />
        </div>
        <div className="flex items-center justify-center gap-4 ">
          <ThemeSwitchUtility />
          <ProfileMenu />
        </div>
      </div>
      <Separator asChild>
        <hr />
      </Separator>
    </header>
  )
}

export default AdminHeader

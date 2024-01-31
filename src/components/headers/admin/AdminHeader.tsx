import AdminMenu from "@/components/menus/admin/AdminMenu"
import ProfileMenu from "@/components/menus/profile/ProfileMenu"
import AdminSidebar from "@/components/sidebars/admin/AdminSidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import Link from "next/link"

export interface AdminHeaderProps {
  className?: string
}

const AdminHeader = ({ className }: AdminHeaderProps) => {
  return (
    <header className="fixed z-10 h-16 w-full backdrop-blur">
      <div className="flex h-full flex-wrap items-center justify-center gap-y-1 p-2">
        <Sheet>
          <SheetTrigger className="mr-2 sm:hidden" asChild>
            <Button variant={"secondary"} size={"icon"}>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={"left"} className="w-min sm:hidden">
            <AdminSidebar />
          </SheetContent>
        </Sheet>

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
        <div className="flex items-center justify-center gap-1 ">
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

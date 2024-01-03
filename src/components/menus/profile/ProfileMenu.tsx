import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { auth } from "@/lib/auth"
import { CircleUserRound } from "lucide-react"
import Link from "next/link"

export interface IProfileMenu {
  className?: string
}

const ProfileMenu = async ({ className }: IProfileMenu) => {
  const session = await auth()
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <CircleUserRound />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session?.user ? (
          <DropdownMenuItem>
            <Link href={"/api/auth/signout"} className="w-full">
              Logout
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href={"/api/auth/signin"} className="w-full">
              Login
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileMenu

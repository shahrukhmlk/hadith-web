import { authOptions } from "@/app/api/auth/[...nextauth]/route"
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
import { CircleUserRound } from "lucide-react"
import { getServerSession } from "next-auth/next"
import Link from "next/link"

export interface IProfileMenu {
  className?: string
}

const ProfileMenu = async ({ className }: IProfileMenu) => {
  const session = await getServerSession(authOptions)
  return (
    <DropdownMenu>
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
            <Link href={"/api/auth/signout"}>Logout</Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <Link href={"/api/auth/signin"}>Login</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileMenu

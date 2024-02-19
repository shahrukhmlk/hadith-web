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
import { auth } from "@/config/auth"
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
        <Button
          variant={"ghost"}
          size={"icon"}
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user.image ?? ""} />
            <AvatarFallback>
              <CircleUserRound />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="font-normal">
          {session?.user ? (
            <div className="flex flex-col space-y-2">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          ) : (
            "My Account"
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {session?.user ? (
          <Link href={"/api/auth/signout"} className="w-full">
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </Link>
        ) : (
          <Link href={"/api/auth/signin"} className="w-full">
            <DropdownMenuItem>Login</DropdownMenuItem>
          </Link>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileMenu

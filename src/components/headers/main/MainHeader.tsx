import Series from "@/assets/svg/calligraphy-series.svg"
import Logo from "@/assets/svg/logo.svg"
import MainMenu from "@/components/menus/main/MainMenu"
import { MobileMenu } from "@/components/menus/mobile/MobileMenu"
import ProfileMenu from "@/components/menus/profile/ProfileMenu"
import { Button } from "@/components/ui/button"
import ThemeSwitchUtility from "@/components/utilities/ThemeSwitch/ThemeSwitchUtility"
import { ADMIN_MENU_ITEMS, MAIN_MENU_ITEMS } from "@/constants/menu"
import { isAdmin } from "@/data/auth/roles"
import clsx from "clsx"
import { Menu } from "lucide-react"
import Link from "next/link"
import { forwardRef, HTMLAttributes } from "react"

export interface MainHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const MainHeader = forwardRef<HTMLDivElement, MainHeaderProps>(
  async ({ className, ...props }, ref) => {
    const admin = await isAdmin()
    const menuItems = admin
      ? [...MAIN_MENU_ITEMS, ...ADMIN_MENU_ITEMS]
      : MAIN_MENU_ITEMS
    return (
      <header
        ref={ref}
        className={clsx(
          "flex h-16 w-full justify-center gap-x-4",
          "border-b border-border/40 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60",
          className,
        )}
        {...props}
      >
        <div className="flex w-[36px] gap-4 sm:w-[200px]">
          <MobileMenu items={menuItems} />
          <Link href={"/"} className="hidden sm:inline-block">
            <Logo className={"h-full w-auto *:fill-foreground"} />
          </Link>
          <MainMenu items={menuItems} />
        </div>

        <Link
          href={"/"}
          className="flex h-full flex-1 items-center justify-center"
        >
          <Series className={"h-full w-auto *:fill-foreground"} />
        </Link>
        <div className="flex w-[64px] items-center justify-end gap-4 sm:w-[200px]">
          <ThemeSwitchUtility />
          <ProfileMenu />
        </div>
      </header>
    )
  },
)

MainHeader.displayName = "MainHeader"

export default MainHeader

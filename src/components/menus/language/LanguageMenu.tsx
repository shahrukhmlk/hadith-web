"use client"

import { Checkbox } from "@/components/ui/checkbox"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { CheckSquare2, Square } from "lucide-react"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

export interface ILanguageMenu {
  className?: string
  languages: ILanguage[]
}

export interface ILanguage {
  code: string
  name: string
  rtl: boolean
}

const LanguageMenu = ({ className, languages }: ILanguageMenu) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const langCodes = searchParams.get("languages")?.split(",")
  const addLanguage = (langCode: string) => {
    if (langCodes && langCodes.length) {
      if (langCodes.includes(langCode)) {
        return new URLSearchParams({
          languages: [langCodes.filter((code) => code !== langCode)].join(","),
        })
      } else {
        return new URLSearchParams({
          languages: [...langCodes, langCode].join(","),
        })
      }
    } else {
      return new URLSearchParams({ languages: langCode })
    }
  }
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Show/Hide Languages</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex w-48 flex-col gap-1 p-2">
              {languages.map((language, index) => {
                const enabled = langCodes?.includes(language.code)
                return (
                  <li>
                    <Link
                      key={index}
                      href={pathname + "?" + addLanguage(language.code)}
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink className="flex select-none items-center gap-x-1 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                        {enabled ? <CheckSquare2 /> : <Square />}{" "}
                        {language.name}
                      </NavigationMenuLink>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default LanguageMenu

"use client"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { ILanguage } from "@/data/models/language/language"
import { CheckSquare2, Globe, Square } from "lucide-react"
import { Route } from "next"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"

export interface LanguageMenuProps {
  className?: string
  languages: ILanguage[]
}

const LanguageMenu = ({ className, languages }: LanguageMenuProps) => {
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
          <NavigationMenuTrigger>
            <Globe />
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="flex w-48 flex-col gap-1 p-2">
              {languages.map((language, index) => {
                const enabled = langCodes?.includes(language.code)
                return (
                  <li key={index}>
                    <Link
                      href={
                        (pathname +
                          "?" +
                          addLanguage(language.code).toString()) as Route
                      }
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

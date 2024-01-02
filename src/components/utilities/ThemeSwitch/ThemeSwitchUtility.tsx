"use client"

import { Card } from "@/components/ui/card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import clsx from "clsx"
import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export interface IThemeSwitchUtility {
  className?: string
}

const ThemeSwitchUtility = ({ className: className }: IThemeSwitchUtility) => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Card className={clsx(className, "bg-transparent backdrop-blur")}>
      <ToggleGroup type="single" value={theme} onValueChange={setTheme}>
        <ToggleGroupItem value="light">
          <Sun />
        </ToggleGroupItem>
        <ToggleGroupItem value="dark">
          <Moon />
        </ToggleGroupItem>
        <ToggleGroupItem value="system">
          <SunMoon />
        </ToggleGroupItem>
      </ToggleGroup>
    </Card>
  )
}

export default ThemeSwitchUtility

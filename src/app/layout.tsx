import HomeHeader from "@/components/headers/Home/HomeHeader"
import RootProvider from "@/providers/RootProvider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import HadithCalendar from "@/components/hadith/calendar/HadithCalendar"
import { Separator } from "@/components/ui/separator"
import ThemeSwitchUtility from "@/components/utilities/ThemeSwitch/ThemeSwitchUtility"
import { LAST_DATE } from "@/data/HADITH_CONSTANTS"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "سلسة الأحاديث النبوية",
  description: `تحت إشراف "مؤسسة دار المَلِكْ" (بريلي-الهند)`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={"flex h-screen w-screen flex-col overflow-x-hidden"}>
        <RootProvider>
          <HomeHeader />
          <main className="flex w-full flex-1 flex-col justify-center lg:flex-row">
            <div className="flex flex-col p-4 lg:order-3 lg:flex-1">
              {children}
            </div>
            <div className="flex flex-col p-4 lg:order-1">
              <HadithCalendar lastDate={LAST_DATE} />
            </div>
            <Separator
              orientation={"vertical"}
              className="hidden lg:order-2 lg:block"
            />
          </main>
          <ThemeSwitchUtility className="absolute bottom-4 right-4" />
        </RootProvider>
      </body>
    </html>
  )
}

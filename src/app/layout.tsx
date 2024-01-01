import HomeHeader from "@/components/headers/Home/HomeHeader"
import RootProvider from "@/providers/RootProvider"
import type { Metadata } from "next"
import { Inter, Noto_Nastaliq_Urdu } from "next/font/google"
import "./globals.css"
import HadithCalendar from "@/components/hadith/calendar/HadithCalendar"
import { Separator } from "@/components/ui/separator"
import ThemeSwitchUtility from "@/components/utilities/ThemeSwitch/ThemeSwitchUtility"
import { getLastDate, getStartDate } from "@/data/hadith/dates"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "سلسة الأحاديث النبوية",
  description: `تحت إشراف "مؤسسة دار المَلِكْ" (بريلي-الهند)`,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const startDate = await getStartDate()
  const lastDate = await getLastDate()
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={"flex h-screen w-screen flex-col overflow-x-hidden"}>
        <RootProvider>
          <HomeHeader />
          <div className="flex w-full flex-1 flex-col justify-center lg:flex-row">
            <div className="lg:order-3 lg:flex-1">{children}</div>
            <div className="flex flex-col p-4 lg:order-1">
              <HadithCalendar startDate={startDate} lastDate={lastDate} />
            </div>
            <Separator
              orientation={"vertical"}
              className="hidden lg:order-2 lg:block"
            />
          </div>
          <ThemeSwitchUtility className="absolute bottom-4 right-4" />
        </RootProvider>
      </body>
    </html>
  )
}

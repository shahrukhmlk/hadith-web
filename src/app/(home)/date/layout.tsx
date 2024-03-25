import HadithCalendar from "@/components/hadith/calendar/HadithCalendar"
import MainHeader from "@/components/headers/main/MainHeader"
import MainSidebar from "@/components/sidebars/main/MainSidebar"
import { Separator } from "@/components/ui/separator"
import ThemeSwitchUtility from "@/components/utilities/ThemeSwitch/ThemeSwitchUtility"
import { isAdmin } from "@/data/auth/roles"
import { getLastDate, getStartDate } from "@/data/hadith/dates"
import { getLanguages } from "@/data/language/getLanguages"
import type { Metadata } from "next"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await isAdmin()
  const startDate = !admin ? await getStartDate() : undefined
  const lastDate = !admin ? await getLastDate() : undefined
  const languages = await getLanguages()
  return (
    <>
      <MainHeader />
      <div className="flex w-full flex-1 flex-col justify-center pt-16 md:flex-row">
        <div className="md:order-3 md:flex-1">{children}</div>
        <MainSidebar className="md:order-1">
          <HadithCalendar startDate={startDate} lastDate={lastDate} />
        </MainSidebar>
        <Separator
          orientation={"vertical"}
          className="hidden md:order-2 md:block"
        />
      </div>
    </>
  )
}

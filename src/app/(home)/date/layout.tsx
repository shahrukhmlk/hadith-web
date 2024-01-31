import HadithCalendar from "@/components/hadith/calendar/HadithCalendar"
import HomeHeader from "@/components/headers/Home/HomeHeader"
import MainSidebar from "@/components/sidebars/main/MainSidebar"
import { Separator } from "@/components/ui/separator"
import ThemeSwitchUtility from "@/components/utilities/ThemeSwitch/ThemeSwitchUtility"
import { isAdmin } from "@/data/auth/roles"
import { getLastDate, getStartDate } from "@/data/hadith/dates"
import { getLanguages } from "@/data/language/getLanguages"
import type { Metadata } from "next"

const title = "سلسة الأحاديث النبوية"
const description = `تحت إشراف "مؤسسة دار المَلِكْ" (بريلي-الهند)`

export const metadata: Metadata = {
  metadataBase: new URL(`https://${process.env.MAIN_URL}`),
  title: title,
  description: description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: title,
    description: description,
    url: "/",
    siteName: title,
    images: [
      {
        url: "/hadith_cover.webp",
        width: 800,
        height: 600,
        alt: title,
      },
    ],
    type: "website",
  },
}

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
      <HomeHeader languages={languages} />
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
      <ThemeSwitchUtility className="fixed bottom-4 right-4" />
    </>
  )
}

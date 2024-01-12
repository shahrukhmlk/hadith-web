import HomeHeader from "@/components/headers/Home/HomeHeader"
import RootProvider from "@/providers/RootProvider"
import type { Metadata } from "next"
import "@/app/globals.css"
import HadithCalendar from "@/components/hadith/calendar/HadithCalendar"
import MainSidebar from "@/components/sidebars/main/MainSidebar"
import { Separator } from "@/components/ui/separator"
import ThemeSwitchUtility from "@/components/utilities/ThemeSwitch/ThemeSwitchUtility"
import { ROUTES } from "@/constants/routs"
import { isAdmin } from "@/data/auth/roles"
import { getLastDate, getStartDate } from "@/data/hadith/dates"
import { getLanguages } from "@/data/language/languages"
import { inter } from "@/lib/fonts"
import { redirect } from "next/navigation"

const title = "Admin"
const description = "Admin"

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
  if (!admin) {
    redirect(ROUTES.LOGIN)
  }
  const startDate = /* !admin ? await getStartDate() : */ undefined
  const lastDate = /* !admin ? await getLastDate() : */ undefined
  const languages = await getLanguages()
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={"flex h-screen w-full flex-col"}>
        <RootProvider>
          <HomeHeader languages={languages} />
          <div className="flex w-full flex-1 flex-col pt-16">
            {children}
            {/* <div className="md:order-3 md:flex-1">{children}</div>
            <MainSidebar className="md:order-1"></MainSidebar>
            <Separator
              orientation={"vertical"}
              className="hidden md:order-2 md:block"
            /> */}
          </div>
          <ThemeSwitchUtility className="fixed bottom-4 right-4" />
        </RootProvider>
      </body>
    </html>
  )
}

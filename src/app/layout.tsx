import RootProvider from "@/providers/RootProvider"
import "@/app/globals.css"
import ThemeSwitchUtility from "@/components/utilities/ThemeSwitch/ThemeSwitchUtility"
import { inter } from "@/lib/fonts"
import { Analytics } from "@vercel/analytics/react"

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={"flex min-h-screen w-full flex-col"}>
        <RootProvider>
          {children}
          <ThemeSwitchUtility className="fixed bottom-4 right-4" />
        </RootProvider>
        <Analytics />
      </body>
    </html>
  )
}

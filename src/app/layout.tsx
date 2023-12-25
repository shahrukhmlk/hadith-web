import HomeHeader from "@/components/headers/Home/HomeHeader"
import RootProvider from "@/providers/RootProvider"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ThemeSwitchUtility from "@/components/utilities/ThemeSwitch/ThemeSwitchUtility"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Shahrukh Malik",
  description: "Software Developer",
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
          {children}
          <ThemeSwitchUtility className="absolute bottom-4 right-4" />
        </RootProvider>
      </body>
    </html>
  )
}

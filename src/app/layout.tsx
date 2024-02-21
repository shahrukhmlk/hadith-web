import RootProvider from "@/providers/RootProvider"
import "@/app/globals.css"
import MainHeader from "@/components/headers/main/MainHeader"
import { inter } from "@/lib/fonts"
import { Analytics } from "@vercel/analytics/react"
import { Metadata } from "next"

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
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={"flex min-h-screen w-full flex-col"}>
        <RootProvider>
          <MainHeader className="sticky top-0 z-50" />
          {children}
        </RootProvider>
        <Analytics />
      </body>
    </html>
  )
}

import { isAdmin } from "@/data/auth/roles"
import { inter } from "@/lib/fonts"
import RootProvider from "@/providers/RootProvider"
import type { Metadata } from "next"

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
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={"flex h-screen w-full flex-col"}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}

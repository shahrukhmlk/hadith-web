import RootProvider from "@/providers/RootProvider"
import "@/app/globals.css"
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
        <RootProvider>{children}</RootProvider>
        <Analytics />
      </body>
    </html>
  )
}

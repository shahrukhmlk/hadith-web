import { isAdmin } from "@/data/auth/roles"
import { inter } from "@/lib/fonts"
import AntdConfigProvider from "@/providers/AntdConfigProivder"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import type { Metadata } from "next"
import "@refinedev/antd/dist/reset.css"
import RefineProvider from "@/providers/refine"

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
        <AntdRegistry>
          <AntdConfigProvider>
            <RefineProvider>{children}</RefineProvider>
          </AntdConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}

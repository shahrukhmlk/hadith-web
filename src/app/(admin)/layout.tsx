import { isAdmin } from "@/data/auth/roles"
import { inter } from "@/lib/fonts"
import RootProvider from "@/providers/RootProvider"
import type { Metadata } from "next"
import "@/app/globals.css"
import AdminHeader from "@/components/headers/admin/AdminHeader"
import AdminSidebar from "@/components/sidebars/admin/AdminSidebar"
import { Separator } from "@/components/ui/separator"
import { redirect, RedirectType } from "next/navigation"

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
    redirect("/api/auth/signin")
  }
  return (
    <>
      <AdminHeader />
      <div className="flex w-full flex-1 flex-wrap pt-16">
        <AdminSidebar className="hidden sm:block" />
        <Separator
          className="hidden h-auto sm:block"
          orientation={"vertical"}
        />
        <div className="mx-auto min-w-[50%] max-w-5xl flex-grow-[999] basis-0">
          {children}
        </div>
      </div>
    </>
  )
}

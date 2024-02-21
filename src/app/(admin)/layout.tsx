import { isAdmin } from "@/data/auth/roles"
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

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const admin = await isAdmin()
  if (!admin) {
    redirect("/api/auth/signin")
  }
  return (
    <main className="container mx-auto flex max-w-screen-lg flex-col space-y-4 p-4">
      {children}
    </main>
  )
}

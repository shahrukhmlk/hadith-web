import { ROUTES } from "@/constants/routes"
import { redirect } from "next/navigation"

export default function Home() {
  redirect(`${ROUTES.HADITH_BY_DATE}`)
}

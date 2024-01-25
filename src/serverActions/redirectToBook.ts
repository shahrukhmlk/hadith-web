"use server"

import { ROUTES } from "@/constants/routes"
import { redirect } from "next/navigation"

export async function redirectToBook(bookID: number) {
  redirect(`${ROUTES.ADMIN.BOOKS}/${bookID}`)
}

import prisma from "@/lib/data/prisma"
import { startOfDay } from "date-fns"

export async function getHadith(date: Date) {
  try {
    const res = await prisma.hadiths.findUnique({
      where: {
        date: date,
        status: "published",
      },
      include: {
        hadiths_translations: true,
        hadiths_books: true,
      },
    })
    return res
  } catch (error) {
    console.error(error)
  }
}

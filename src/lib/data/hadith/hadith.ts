import { Hadith } from "@/components/hadith/ui/HadithUI"
import prisma from "@/lib/data/prisma"
import { startOfDay } from "date-fns"
import { cache } from "react"

export const getHadith = cache(async (date: Date) => {
  try {
    const res = await prisma.hadiths.findUnique({
      where: {
        date: date,
        status: "published",
      },
      include: {
        hadiths_translations: true,
        hadiths_books: {
          include: {
            books: {
              include: {
                books_translations: true,
              },
            },
          },
        },
      },
    })
    return res
  } catch (error) {
    console.error(error)
  }
})

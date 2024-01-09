"use server"

import { hadithEditFormSchema } from "@/components/hadith/edit-form/schema"
import prisma from "@/data/prisma"
import { z } from "zod"

type hadithSchema = z.infer<typeof hadithEditFormSchema>
export const saveHadith = async (hadith: hadithSchema) => {
  hadithEditFormSchema.parse(hadith)
  const result = prisma.$transaction(async (tx) => {
    const h = await tx.hadiths.upsert({
      where: {
        number: hadith.num,
      },
      update: {
        date: hadith.date,
        number: hadith.num,
        status: hadith.status,
      },
      create: {
        date: hadith.date,
        number: hadith.num,
        status: hadith.status,
      },
    })

    /* As we dont have coposite keys we cant use upsert so... */
    //Delete existing translations
    await tx.hadiths_translations.deleteMany({
      where: {
        hadiths_id: h.id,
      },
    })
    // Create the translations again
    await tx.hadiths_translations.createMany({
      data: hadith.translations.map((translation) => {
        return {
          hadiths_id: h.id,
          languages_code: translation.langCode,
          text: translation.text,
          topic: translation.topic,
          fontScale: translation.fontScale,
        }
      }),
    })

    // same goes for the books-hadith join table
    await tx.hadiths_books.deleteMany({ where: { hadiths_id: h.id } })
    await tx.hadiths_books.createMany({
      data: hadith.books.map((book) => {
        return {
          hadiths_id: h.id,
          books_id: book.bookID,
          hadith_num: book.hadithNum,
        }
      }),
    })
  })

  return result
}

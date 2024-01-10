"use server"

import prisma from "@/data/prisma"
import {
  HadithEditFormData,
  HadithEditFormSchema,
} from "@/data/validators/hadith-edit"

export const saveHadith = async (hadith: HadithEditFormData) => {
  HadithEditFormSchema.parse(hadith)
  const result = prisma.$transaction(async (tx) => {
    const h = await tx.hadith.upsert({
      where: {
        number: hadith.number,
      },
      update: {
        date: hadith.date,
        number: hadith.number,
        status: hadith.status,
      },
      create: {
        date: hadith.date,
        number: hadith.number,
        status: hadith.status,
      },
    })

    /* As we dont have coposite keys we cant use upsert so... */
    //Delete existing translations
    await tx.hadithTranslation.deleteMany({
      where: {
        hadithID: h.id,
      },
    })
    // Create the translations again
    await tx.hadithTranslation.createMany({
      data: hadith.translations.map((translation) => {
        return {
          hadithID: h.id,
          languageCode: translation.languageCode,
          text: translation.text,
          topic: translation.topic,
          fontScale: translation.fontScale,
        }
      }),
    })

    // same goes for the books-hadith join table
    await tx.hadithBook.deleteMany({ where: { hadithID: h.id } })
    await tx.hadithBook.createMany({
      data: hadith.books.map((book) => {
        return {
          hadithID: h.id,
          bookID: book.bookID,
          hadithRefNumber: book.hadithRefNumber,
        }
      }),
    })
  })

  return result
}

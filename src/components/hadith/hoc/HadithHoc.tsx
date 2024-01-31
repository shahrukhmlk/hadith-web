import { isAdmin } from "@/data/auth/roles"
import getEnhancedPrisma from "@/data/enhanced-prisma"
import { getLastDate } from "@/data/hadith/dates"
import { Status } from "@/data/models/status/status"
import clsx from "clsx"
import { notFound } from "next/navigation"
import HadithUI, { HadithUIProps } from "../ui/HadithUI"

export interface IHadithHoc {
  className?: string
  date?: Date
  languages?: string[]
}

const HadithHoc = async ({ className, date, languages }: IHadithHoc) => {
  /**
   * > Check if date is supplied else use latest date
   * > Check for languages else load locale default if available else default site language
   * > Load hadith for that day and languages from database
   * > Display all hadiths using hadith component.
   */
  const prisma = await getEnhancedPrisma()
  const selectedDate = date || (await getLastDate()) || new Date()

  const hadith = await prisma.hadith.findUnique({
    where: {
      date: selectedDate,
      status: Status.published,
    },
    select: {
      id: true,
      number: true,
      date: true,
      topic: true,
      text: true,
      color: true,
      books: {
        select: {
          book: { select: { name: true } },
          hadithRefNumber: true,
        },
      },
      translations: {
        where: {
          languageCode: { in: languages },
        },
        select: {
          topic: true,
          text: true,
        },
      },
    },
  })
  if (!hadith) {
    notFound()
  }
  return (
    <HadithUI
      number={hadith.number}
      date={hadith.date}
      color={hadith.color}
      topic={hadith.topic}
      text={hadith.text}
      bookText={hadith.books
        .map(
          (book) =>
            `${book.book.name}: ${book.hadithRefNumber.toLocaleString("ar-eg", { useGrouping: false })}`,
        )
        .join(",\n")}
    />
  )
}

export default HadithHoc

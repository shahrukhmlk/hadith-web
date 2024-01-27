"use client"

import { IBook } from "@/data/models/book/book"
import { IHadithWithDetails } from "@/data/models/hadith/hadith"
import { ILanguage } from "@/data/models/language/language"
import { useFindUniqueHadith } from "@/lib/hooks/query"
import { forwardRef } from "react"

export interface HadithEditPageProps
  extends React.HTMLAttributes<HTMLDivElement> {
  hadith?: IHadithWithDetails
  books: IBook[]
  languages: ILanguage[]
}

const HadithEditPage = forwardRef<HTMLDivElement, HadithEditPageProps>(
  ({ hadith, ...props }, ref) => {
    const findUniqueHadith = useFindUniqueHadith(
      {
        where: {
          id: hadith?.id ?? -1,
        },
        select: {
          id: true,
          number: true,
          date: true,
          status: true,
          color: true,
          topic: true,
          text: true,
          fontScale: true,
          translations: {
            select: {
              hadithID: true,
              languageCode: true,
              topic: true,
              text: true,
              fontScale: true,
            },
            orderBy: { language: { sort: "asc" } },
          },
          books: {
            select: {
              hadithID: true,
              bookID: true,
              hadithRefNumber: true,
            },
          },
        },
      },
      { initialData: hadith },
    )

    return <div ref={ref} {...props}></div>
  },
)

export default HadithEditPage

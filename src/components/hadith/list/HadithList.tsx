"use client"

import DataTable from "@/components/ui/data-table/DataTable"
import { IHadith } from "@/data/models/hadith/hadith"
import { useFindManyHadith } from "@/lib/hooks/query"
import { forwardRef } from "react"
import { columns } from "./columns"

export interface HadithListProps extends React.HTMLAttributes<HTMLDivElement> {
  hadiths: IHadith[]
}

const HadithList = forwardRef<HTMLDivElement, HadithListProps>(
  ({ hadiths, ...props }, ref) => {
    const findManyHadith = useFindManyHadith(
      {
        select: {
          id: true,
          number: true,
          date: true,
          status: true,
          color: true,
          topic: true,
          text: true,
          fontScale: true,
        },
        orderBy: { number: "desc" },
      },
      {
        initialData: hadiths,
      },
    )
    return (
      <div ref={ref} {...props}>
        {findManyHadith.data ? (
          <DataTable columns={columns} data={findManyHadith.data} />
        ) : null}
      </div>
    )
  },
)

HadithList.displayName = "HadithList"

export default HadithList

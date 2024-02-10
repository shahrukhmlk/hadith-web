"use client"

import DataTable from "@/components/ui/data-table/DataTable"
import { ITopic } from "@/data/models/topic/topic"
import { useFindManyTopic } from "@/lib/hooks/query"
import { forwardRef } from "react"
import { columns } from "./columns"

export interface TopicListProps extends React.HTMLAttributes<HTMLDivElement> {
  topics: ITopic[]
}

const TopicList = forwardRef<HTMLDivElement, TopicListProps>(
  ({ topics, ...props }, ref) => {
    const findManyTopic = useFindManyTopic(
      {
        select: {
          id: true,
          title: true,
        },
      },
      {
        initialData: topics,
      },
    )
    return (
      <div ref={ref} {...props}>
        {findManyTopic.data ? (
          <DataTable columns={columns} data={findManyTopic.data} />
        ) : null}
      </div>
    )
  },
)

TopicList.displayName = "TopicList"

export default TopicList

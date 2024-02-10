"use client"

import DataTable from "@/components/ui/data-table/DataTable"
import { IBook } from "@/data/models/book/book"
import { useFindManyBook } from "@/lib/hooks/query"
import { forwardRef } from "react"
import { columns } from "./columns"

export interface BookListProps extends React.HTMLAttributes<HTMLDivElement> {
  books: IBook[]
}

const BookList = forwardRef<HTMLDivElement, BookListProps>(
  ({ books, ...props }, ref) => {
    const findManyBook = useFindManyBook(
      {
        select: {
          id: true,
          sort: true,
          name: true,
          status: true,
        },
        orderBy: { sort: "asc" },
      },
      {
        initialData: books,
      },
    )
    return (
      <div ref={ref} {...props}>
        {findManyBook.data ? (
          <DataTable columns={columns} data={findManyBook.data} />
        ) : null}
      </div>
    )
  },
)

BookList.displayName = "BookList"

export default BookList

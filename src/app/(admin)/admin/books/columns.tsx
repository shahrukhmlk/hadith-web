"use client"

import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { IBook } from "@/data/models/book/book"
import { ILanguage } from "@/data/models/language/language"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IBook>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
]

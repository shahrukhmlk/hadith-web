"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { getSelectColumn } from "@/components/ui/data-table/columns"
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { ROUTES } from "@/constants/routs"
import { IHadithEditable } from "@/data/models/hadith"
import { Status } from "@/data/models/status"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Route } from "next"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IHadithEditable>[] = [
  getSelectColumn<IHadithEditable>(),
  {
    accessorKey: "number",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Number" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      return row.original.date.toDateString()
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const hadith = row.original
      return (
        <Link href={`${ROUTES.ADMIN_HADITH}/${hadith.number}` as Route}>
          Edit
        </Link>
      )
    },
  },
]

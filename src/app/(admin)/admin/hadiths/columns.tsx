"use client"

import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { IHadith } from "@/data/models/hadith/hadith"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<IHadith>[] = [
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
    cell: ({ row }) => row.original.date.toDateString(),
  },
  {
    accessorKey: "topic",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic" />
    ),
  },
  {
    accessorKey: "text",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Text" />
    ),
  },
  {
    accessorKey: "fontScale",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Font Scale" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
]

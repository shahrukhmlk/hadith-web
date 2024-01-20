"use client"

import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { ILanguage } from "@/data/models/language/language"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ILanguage>[] = [
  {
    accessorKey: "code",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Code" />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "rtl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="RTL" />
    ),
  },
]

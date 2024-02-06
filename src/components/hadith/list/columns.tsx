"use client"

import StatusBadge from "@/components/badges/status/StatusBadge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { IHadith } from "@/data/models/hadith/hadith"
import { ColumnDef } from "@tanstack/react-table"
import { Delete } from "lucide-react"
import Link from "next/link"

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
    accessorKey: "text",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Text" />
    ),
    cell: ({ row }) => (
      <div dir="rtl" className="line-clamp-1">
        {row.original.text}
      </div>
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
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant={"secondary"} asChild>
          <Link href={`/admin/hadiths/${row.original.id}`}>Edit</Link>
        </Button>
        <Button variant={"destructive"} size={"icon"}>
          <Delete />
        </Button>
      </div>
    ),
  },
]

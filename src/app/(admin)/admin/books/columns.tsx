"use client"

import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { ROUTES } from "@/constants/routes"
import { IBook } from "@/data/models/book/book"
import { ILanguage } from "@/data/models/language/language"
import { ColumnDef } from "@tanstack/react-table"
import { Route } from "next"
import Link from "next/link"

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
  {
    id: "actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button variant={"ghost"} asChild>
          <Link href={`${ROUTES.ADMIN.BOOKS}/${row.original.id}` as Route}>
            Edit
          </Link>
        </Button>
      </div>
    ),
  },
]

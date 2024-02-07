"use client"

import StatusBadge from "@/components/badges/status/StatusBadge"
import { Button } from "@/components/ui/button"
import { DataTableColumnHeader } from "@/components/ui/data-table/DataTableColumnHeader"
import { ROUTES } from "@/constants/routes"
import { ILanguage } from "@/data/models/language/language"
import { ITopic } from "@/data/models/topic/topic"
import { ColumnDef } from "@tanstack/react-table"
import { Route } from "next"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<ITopic>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Topic" />
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
        <Button variant={"ghost"} asChild>
          <Link href={`${ROUTES.ADMIN.TOPICS}/${row.original.id}` as Route}>
            Edit
          </Link>
        </Button>
      </div>
    ),
  },
]

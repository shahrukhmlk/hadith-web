"use client"

import { BookEditForm } from "@/components/forms/book/BookEditForm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ROUTES } from "@/constants/routes"
import { Plus } from "lucide-react"
import { Route } from "next"
import { useRouter } from "next/navigation"
import { forwardRef, useState } from "react"

export interface BookCreateDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const BookCreateDialog = forwardRef<HTMLDivElement, BookCreateDialogProps>(
  ({ ...props }, ref) => {
    const router = useRouter()
    return (
      <div ref={ref} {...props}>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"sm"} className="h-8" variant={"secondary"}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Book
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Book</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <BookEditForm
              onSave={(id) => {
                router.push(`${ROUTES.ADMIN.BOOKS}/${id}` as Route)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  },
)

BookCreateDialog.displayName = "BookCreateDialog"

export default BookCreateDialog

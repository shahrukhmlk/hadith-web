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
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { forwardRef, useState } from "react"

export interface BookCreateDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const BookCreateDialog = forwardRef<HTMLDivElement, BookCreateDialogProps>(
  ({ ...props }, ref) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    return (
      <div ref={ref} {...props}>
        <Dialog open={open} onOpenChange={setOpen}>
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
                setOpen(false)
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

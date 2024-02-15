"use client"

import { BookEditForm } from "@/components/forms/book/BookEditForm"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
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
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button size={"sm"} className="h-8" variant={"secondary"}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Book
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader>
                <DrawerTitle>Create New Book</DrawerTitle>
                <DrawerDescription></DrawerDescription>
              </DrawerHeader>
              <BookEditForm
                className="p-4 pt-0"
                onSave={(id) => {
                  setOpen(false)
                }}
              />
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    )
  },
)

BookCreateDialog.displayName = "BookCreateDialog"

export default BookCreateDialog

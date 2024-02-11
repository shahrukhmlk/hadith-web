"use client"

import HadithEditForm from "@/components/forms/hadith/HadithEditForm"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ITopic } from "@/data/models/topic/topic"
import { Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { forwardRef, useState } from "react"

export interface HadithCreateDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  topics: ITopic[]
}

const HadithCreateDialog = forwardRef<HTMLDivElement, HadithCreateDialogProps>(
  ({ topics, ...props }, ref) => {
    const [open, setOpen] = useState(false)

    const router = useRouter()
    return (
      <div ref={ref} {...props}>
        <Dialog open={open} onOpenChange={setOpen} modal={false}>
          <DialogTrigger asChild>
            <Button size={"sm"} className="h-8" variant={"secondary"}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Hadith
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Hadith</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <HadithEditForm
              topics={topics}
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

HadithCreateDialog.displayName = "HadithCreateDialog"

export default HadithCreateDialog

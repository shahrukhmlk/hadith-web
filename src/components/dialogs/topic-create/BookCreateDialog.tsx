"use client"

import { TopicEditForm } from "@/components/forms/topic/TopicEditForm"
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

export interface TopicCreateDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TopicCreateDialog = forwardRef<HTMLDivElement, TopicCreateDialogProps>(
  ({ ...props }, ref) => {
    const router = useRouter()
    return (
      <div ref={ref} {...props}>
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"sm"} className="h-8" variant={"secondary"}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Topic
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Topic</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <TopicEditForm
              onSave={(id) => {
                router.push(`${ROUTES.ADMIN.TOPICS}/${id}` as Route)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>
    )
  },
)

TopicCreateDialog.displayName = "TopicCreateDialog"

export default TopicCreateDialog

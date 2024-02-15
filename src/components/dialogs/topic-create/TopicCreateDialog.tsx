"use client"

import { TopicEditForm } from "@/components/forms/topic/TopicEditForm"
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
import { forwardRef, useState } from "react"

export interface TopicCreateDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const TopicCreateDialog = forwardRef<HTMLDivElement, TopicCreateDialogProps>(
  ({ ...props }, ref) => {
    const [open, setOpen] = useState(false)
    return (
      <div ref={ref} {...props}>
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button size={"sm"} className="h-8" variant={"secondary"}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Topic
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader>
                <DrawerTitle>Create New Topic</DrawerTitle>
                <DrawerDescription></DrawerDescription>
              </DrawerHeader>
              <TopicEditForm
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

TopicCreateDialog.displayName = "TopicCreateDialog"

export default TopicCreateDialog

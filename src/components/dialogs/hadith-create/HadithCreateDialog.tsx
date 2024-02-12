"use client"

import HadithEditForm from "@/components/forms/hadith/HadithEditForm"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
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
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button size={"sm"} className="h-8" variant={"secondary"}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Hadith
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-lg">
              <DrawerHeader>
                <DrawerTitle>Create New Hadith</DrawerTitle>
                <DrawerDescription></DrawerDescription>
              </DrawerHeader>
              <HadithEditForm
                className="p-4 pt-0"
                topics={topics}
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

HadithCreateDialog.displayName = "HadithCreateDialog"

export default HadithCreateDialog

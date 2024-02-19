"use client"

import { ButtonConfirm } from "@/components/ui/buttons/ButtonConfirm"
import { useDeleteHadith } from "@/lib/hooks/query"
import { forwardRef } from "react"
import { toast } from "sonner"

export interface HadithDeleteButtonrops {
  hadithID: number
}

const HadithDeleteButton = forwardRef<
  HTMLButtonElement,
  HadithDeleteButtonrops
>(({ hadithID, ...props }, ref) => {
  const deleteHadith = useDeleteHadith({
    onSuccess(data, variables, context) {
      toast.success(`Hadith ${data?.number} deleted.`)
    },
  })
  return (
    <ButtonConfirm
      ref={ref}
      isLoading={deleteHadith.isPending}
      onClick={() => {
        deleteHadith.mutate({
          where: {
            id: hadithID,
          },
          select: {
            number: true,
          },
        })
      }}
      variant={"destructive"}
      {...props}
    >
      Delete
    </ButtonConfirm>
  )
})

HadithDeleteButton.displayName = "HadithDeleteButton"

export default HadithDeleteButton

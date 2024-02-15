import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { forwardRef } from "react"
import { useMediaQuery } from "usehooks-ts"
import { Button } from "../button"
import { ButtonLoading, ButtonLoadingProps } from "./ButtonLoading"

export interface ButtonConfirmProps extends ButtonLoadingProps {
  confirmTitle?: string
  confirmDesc?: string
}

const ButtonConfirm = forwardRef<HTMLButtonElement, ButtonConfirmProps>(
  (
    {
      confirmTitle = "Are you absolutely sure?",
      confirmDesc,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
      return (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <ButtonLoading ref={ref} {...props}>
              {children}
            </ButtonLoading>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
              <AlertDialogDescription>{confirmDesc}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onClick}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )
    }

    return (
      <Drawer>
        <DrawerTrigger asChild>
          <ButtonLoading ref={ref} {...props}>
            {children}
          </ButtonLoading>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader>
              <DrawerTitle>{confirmTitle}</DrawerTitle>
              <DrawerDescription></DrawerDescription>
            </DrawerHeader>
            <p className="p-4 pt-0">{confirmDesc}</p>
            <DrawerFooter>
              <Button onClick={onClick}>Yes</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    )
  },
)
ButtonConfirm.displayName = "ButtonConfirm"

export { ButtonConfirm }

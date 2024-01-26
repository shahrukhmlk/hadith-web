import { ReloadIcon } from "@radix-ui/react-icons"
import { forwardRef } from "react"
import { Button, ButtonProps } from "../button"

export interface ButtonLoadingProps extends ButtonProps {
  isLoading: boolean
}

const ButtonLoading = forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  ({ isLoading, children, disabled, ...props }, ref) => {
    return (
      <Button ref={ref} disabled={disabled || isLoading} {...props}>
        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </Button>
    )
  },
)
ButtonLoading.displayName = "ButtonLoading"

export { ButtonLoading }

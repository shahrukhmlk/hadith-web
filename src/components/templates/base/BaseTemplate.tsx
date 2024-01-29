import { forwardRef } from "react"

export interface BaseTemplateProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const BaseTemplate = forwardRef<HTMLDivElement, BaseTemplateProps>(
  ({ ...props }, ref) => {
    return <div ref={ref} {...props}></div>
  },
)

BaseTemplate.displayName = "BaseTemplate"

export default BaseTemplate

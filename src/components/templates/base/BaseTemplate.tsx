export interface BaseTemplateProps {
  className?: string
}

const BaseTemplate = ({ className }: BaseTemplateProps) => {
  return <div className={className}></div>
}

export default BaseTemplate

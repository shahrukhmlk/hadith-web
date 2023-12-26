export interface IBaseTemplate {
  className?: string
}

const BaseTemplate = ({ className }: IBaseTemplate) => {
  return <div className={className}></div>
}

export default BaseTemplate

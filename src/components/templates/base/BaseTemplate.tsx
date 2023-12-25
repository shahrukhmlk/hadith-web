export interface IBaseTemplate {
  className?: string
}

const BaseTemplate: React.FC<IBaseTemplate> = ({ className }) => {
  return <div className={className}></div>
}

export default BaseTemplate

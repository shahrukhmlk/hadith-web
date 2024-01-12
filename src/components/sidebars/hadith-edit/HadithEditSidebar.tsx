import clsx from "clsx"

export interface HadithEditSidebarProps {
  className?: string
  children?: React.ReactNode
}

const HadithEditSidebar = ({ className, children }: HadithEditSidebarProps) => {
  return (
    <div className={clsx("flex w-full flex-col p-4 md:max-w-80", className)}>
      {children}
    </div>
  )
}

export default HadithEditSidebar

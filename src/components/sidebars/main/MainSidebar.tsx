import clsx from "clsx"

export interface MainSidebarProps {
  className?: string
  children?: React.ReactNode
}

const MainSidebar = ({ className, children }: MainSidebarProps) => {
  return (
    <div className={clsx("flex w-full flex-col p-4 md:max-w-80", className)}>
      {children}
    </div>
  )
}

export default MainSidebar

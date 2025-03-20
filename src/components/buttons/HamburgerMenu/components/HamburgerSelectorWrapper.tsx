import { Icon } from '@iconify/react'

function HamburgerSelectorWrapper({
  icon,
  title,
  children,
  className
}: {
  icon: string
  title: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={className}>
      <span className="flex items-center gap-4 p-4 text-bg-500">
        <Icon className="size-5" icon={icon} />
        {title}
      </span>
      <div className="p-4 pt-0">
        <ul className="flex flex-col divide-y divide-bg-200 overflow-hidden rounded-md bg-bg-200/50 shadow-custom dark:divide-bg-700 dark:bg-bg-700/50">
          {children}
        </ul>
      </div>
    </div>
  )
}

export default HamburgerSelectorWrapper

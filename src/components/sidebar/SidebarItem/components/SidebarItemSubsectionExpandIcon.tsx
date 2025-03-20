import { Icon } from '@iconify/react'
import clsx from 'clsx'

function SidebarItemSubsectionExpandIcon({
  toggleSubsection,
  subsectionExpanded
}: {
  toggleSubsection: () => void
  subsectionExpanded: boolean
}) {
  return (
    <div className="relative flex-between flex">
      <button
        className="rounded-full p-1 hover:bg-bg-100 dark:hover:bg-bg-700/50"
        onClick={toggleSubsection}
      >
        <Icon
          className={clsx(
            'stroke-[2px] text-bg-500 transition-all',
            subsectionExpanded && 'rotate-90'
          )}
          icon="tabler:chevron-right"
        />
      </button>
    </div>
  )
}

export default SidebarItemSubsectionExpandIcon

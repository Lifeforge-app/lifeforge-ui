import clsx from 'clsx'

import { Button } from '@components/buttons'

function SidebarCollapseButton({
  onClick,
  isCollapsed
}: {
  onClick: () => void
  isCollapsed: boolean
}) {
  return (
    <Button
      className="p-2!"
      icon="tabler:chevron-down"
      iconClassName={clsx('transition', isCollapsed && 'rotate-180')}
      variant="plain"
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        onClick()
      }}
    />
  )
}

export default SidebarCollapseButton

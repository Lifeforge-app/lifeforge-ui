import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { memo } from 'react'

function InputIcon({
  icon,
  active,
  isFocused,
  className
}: {
  icon: string
  active: boolean
  isFocused?: boolean
  className?: string
}) {
  return (
    <Icon
      className={clsx(
        'size-6 shrink-0 transition-all group-focus-within:text-custom-500! group-data-open:text-custom-500!',
        !active && 'text-bg-500',
        isFocused && 'text-custom-500',
        className
      )}
      icon={icon}
    />
  )
}

export default memo(InputIcon)

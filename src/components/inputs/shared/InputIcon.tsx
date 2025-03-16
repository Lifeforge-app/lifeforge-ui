import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { memo } from 'react'

function InputIcon({
  icon,
  active,
  listboxOrCombobox,
  isCombobox,
  className
}: {
  icon: string
  active: boolean
  listboxOrCombobox?: 'listbox' | 'combobox'
  isCombobox?: boolean
  className?: string
}) {
  return (
    <Icon
      className={clsx(
        'size-6 shrink-0 transition-all',
        !active && 'text-bg-500',
        isCombobox && 'group-focus-within:text-custom-500!',
        listboxOrCombobox !== undefined && 'group-data-open:text-custom-500!',
        className
      )}
      icon={icon}
    />
  )
}

export default memo(InputIcon)

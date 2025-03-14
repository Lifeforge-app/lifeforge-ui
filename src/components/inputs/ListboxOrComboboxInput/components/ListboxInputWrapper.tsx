import { Listbox } from '@headlessui/react'
import clsx from 'clsx'
import React from 'react'

function ListboxInputWrapper({
  value,
  onChange,
  multiple = false,
  className,
  children
}: {
  value: string | string[] | null
  onChange: (value: any) => void
  multiple?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <Listbox
      as="div"
      className={clsx(
        'border-bg-500 bg-bg-200/50 shadow-custom hover:bg-bg-200 data-open:border-custom-500! dark:bg-bg-800/50 dark:hover:bg-bg-800/80 relative flex items-center gap-1 rounded-t-lg border-b-2 transition-all',
        className
      )}
      multiple={multiple}
      value={value}
      onChange={onChange}
    >
      {children}
    </Listbox>
  )
}

export default ListboxInputWrapper

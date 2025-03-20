import { Listbox } from '@headlessui/react'
import clsx from 'clsx'

function ListboxInputWrapper<T>({
  value,
  onChange,
  multiple = false,
  className,
  children,
  disabled
}: {
  value: T
  onChange: (value: T) => void
  multiple?: boolean
  className?: string
  children: React.ReactNode
  disabled?: boolean
}) {
  return (
    <Listbox
      as="div"
      className={clsx(
        'relative flex items-center gap-1 rounded-t-lg border-b-2 border-bg-500 bg-bg-200/50 shadow-custom transition-all hover:bg-bg-200 data-open:border-custom-500! dark:bg-bg-800/50 dark:hover:bg-bg-800/80',
        className,
        disabled ? 'pointer-events-none! opacity-50' : ''
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

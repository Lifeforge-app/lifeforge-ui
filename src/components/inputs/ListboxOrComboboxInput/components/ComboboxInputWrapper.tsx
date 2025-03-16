import { Combobox } from '@headlessui/react'
import clsx from 'clsx'

function ComboboxInputWrapper({
  value,
  onChange,
  setQuery,
  children,
  className,
  disabled
}: {
  value: string | string[] | undefined
  onChange: (value: any) => void
  setQuery: (query: string) => void
  children: React.ReactNode
  className?: string
  disabled?: boolean
}) {
  return (
    <Combobox
      as="div"
      className={clsx(
        'border-bg-500 bg-bg-200/50 shadow-custom hover:bg-bg-200 focus-within:border-custom-500! data-[open]:border-custom-500! dark:bg-bg-800/50 dark:hover:bg-bg-800/80 relative flex items-center gap-1 rounded-t-lg border-b-2 transition-all',
        className,
        disabled ? 'pointer-events-none! opacity-50' : ''
      )}
      value={value}
      onChange={onChange}
      onClose={() => {
        setQuery('')
      }}
    >
      {children}
    </Combobox>
  )
}

export default ComboboxInputWrapper

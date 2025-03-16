import clsx from 'clsx'

import { Scrollbar } from '@components/utilities'

function ModuleWrapper({
  children,
  className = ''
}: {
  children: any
  className?: string
}) {
  return (
    <Scrollbar
      className={clsx(
        'no-overflow-x flex min-h-0 flex-col transition-all',
        className
      )}
    >
      <div className="flex w-full flex-1 flex-col px-4 pt-8 sm:px-12">
        {children}
      </div>
    </Scrollbar>
  )
}

export default ModuleWrapper

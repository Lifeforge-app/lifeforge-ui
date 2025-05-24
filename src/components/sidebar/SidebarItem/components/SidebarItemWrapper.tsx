import clsx from 'clsx'

function SidebarItemWrapper({
  active,
  children,
  onClick
}: {
  active: boolean
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <li
      className={clsx(
        'sidebar-item relative isolate flex-center px-4 transition-all',
        active
          ? "font-semibold text-bg-800 after:absolute after:top-1/2 after:right-0 after:h-8 after:w-1 after:-translate-y-1/2 after:rounded-full after:bg-custom-500 after:content-[''] dark:text-bg-50"
          : 'text-bg-500 dark:text-bg-500'
      )}
    >
      <div
        className={clsx(
          'group relative flex-between flex h-14 w-full cursor-pointer gap-4 rounded-lg pr-3 pl-4 text-left whitespace-nowrap transition-all duration-100',
          active
            ? 'bg-bg-200/50 shadow-custom dark:bg-bg-800'
            : 'hover:bg-bg-200/30 dark:hover:bg-bg-800/30'
        )}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onClick?.()
          }
        }}
      >
        {children}
      </div>
    </li>
  )
}

export default SidebarItemWrapper

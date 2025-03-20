import clsx from 'clsx'

function SidebarDivider({ noMargin = false }: { noMargin?: boolean }) {
  return (
    <li
      className={clsx(
        'h-px shrink-0 bg-bg-200 dark:bg-bg-700/50',
        !noMargin && 'my-4'
      )}
    />
  )
}

export default SidebarDivider

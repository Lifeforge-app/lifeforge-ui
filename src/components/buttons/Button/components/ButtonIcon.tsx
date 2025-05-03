import { Icon } from '@iconify/react/dist/iconify.js'
import clsx from 'clsx'
import { memo, useMemo } from 'react'

function ButtonIcon({
  icon,
  disabled,
  loading,
  iconClassName
}: {
  icon: string
  disabled?: boolean
  loading?: boolean
  iconClassName?: string
}) {
  const finalIcon = useMemo(() => {
    if (loading) {
      return 'svg-spinners:180-ring'
    }

    if (disabled) {
      return 'tabler:ban'
    }

    return icon
  }, [icon, disabled, loading])

  return (
    <Icon className={clsx('size-5 shrink-0', iconClassName)} icon={finalIcon} />
  )
}

export default memo(ButtonIcon)

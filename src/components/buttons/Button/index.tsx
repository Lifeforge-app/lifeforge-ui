import { Icon } from '@iconify/react'
import clsx from 'clsx'
import _ from 'lodash'
import React, { memo } from 'react'
import { useTranslation } from 'react-i18next'

import useThemeColors from '@hooks/useThemeColor'

import { generateClassName } from './buttonUtils'

export interface ButtonProps {
  children?: React.ReactNode
  icon: string
  iconAtEnd?: boolean
  iconClassName?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  loading?: boolean
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary' | 'tertiary' | 'plain'
  isRed?: boolean
  namespace?: string
  tKey?: string
  tProps?: Record<string, unknown>
}

type ButtonComponentProps<C extends React.ElementType = 'button'> = {
  as?: C
} & ButtonProps &
  Omit<React.ComponentPropsWithoutRef<C>, keyof ButtonProps>

const defaultProps = {
  iconAtEnd: false,
  loading: false,
  disabled: false,
  className: '',
  variant: 'primary',
  isRed: false,
  namespace: 'common.buttons'
}

const renderIcon = (icon: string, loading: boolean, iconClassName?: string) => (
  <Icon
    className={clsx('size-5 shrink-0', iconClassName)}
    icon={loading ? 'svg-spinners:180-ring' : icon}
  />
)

function Button<C extends React.ElementType = 'button'>({
  as,
  children,
  icon,
  onClick,
  ...props
}: ButtonComponentProps<C>) {
  const { theme } = useThemeColors()
  const Component = as || 'button'
  const finalProps = React.useMemo(
    () => ({ ...defaultProps, ...props }),
    [props]
  )
  const finalClassName = generateClassName(
    theme,
    Boolean(children),
    finalProps.iconAtEnd,
    finalProps.isRed,
    finalProps.variant,
    finalProps.className
  )
  const { t } = useTranslation(finalProps.namespace)

  const memoizedOnClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e)
    },
    [onClick]
  )

  return (
    <Component
      {...props}
      className={finalClassName}
      disabled={finalProps.loading || finalProps.disabled}
      type="button"
      onClick={memoizedOnClick}
    >
      {!finalProps.iconAtEnd &&
        renderIcon(icon, finalProps.loading, finalProps.iconClassName)}
      {children && typeof children === 'string'
        ? t(
            [
              `common.buttons:${_.camelCase(children as string)}`,
              `buttons.${_.camelCase(children as string)}`,
              `${finalProps.tKey}.buttons.${_.camelCase(children as string)}`,
              children
            ],
            finalProps.tProps
          )
        : children}
      {finalProps.iconAtEnd &&
        renderIcon(icon, finalProps.loading, finalProps.iconClassName)}
    </Component>
  )
}

export default memo(Button) as typeof Button

/* eslint-disable sonarjs/no-internal-api-use */
import {
  Menu,
  MenuButton,
  MenuItems,
  Transition,
  TransitionChild
} from '@headlessui/react'
import clsx from 'clsx'
import { AnchorProps } from 'node_modules/@headlessui/react/dist/internal/floating'
import { useCallback } from 'react'

import Button from '../Button'

interface MenuProps {
  children: React.ReactNode
  anchor?: AnchorProps
  classNames?: {
    wrapper?: string
    button?: string
    icon?: string
    menu?: string
  }
  iconClassName?: string
  customIcon?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onClose?: () => void
}

function HamburgerMenu(props: MenuProps) {
  const { children, anchor, classNames, customIcon, onClick, onClose } = props

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (onClick !== undefined) {
        onClick(e)
      }
    },
    [onClick]
  )

  return (
    <Menu as="div" className={classNames?.wrapper}>
      <Button
        as={MenuButton}
        className={classNames?.button}
        icon={customIcon ?? 'tabler:dots-vertical'}
        iconClassName={classNames?.icon}
        variant="plain"
        onClick={handleClick}
      />
      <Transition
        afterLeave={onClose}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <TransitionChild>
          <MenuItems
            transition
            anchor={anchor ?? 'bottom end'}
            className={clsx(
              'z-9999 min-w-[var(--button-width)] overflow-auto rounded-md border border-bg-200 bg-bg-100 text-base text-bg-500 shadow-lg transition duration-100 ease-out [--anchor-gap:12px] empty:invisible focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 dark:border-bg-700 dark:bg-bg-800',
              classNames?.menu
            )}
          >
            {children}
          </MenuItems>
        </TransitionChild>
      </Transition>
    </Menu>
  )
}

export default HamburgerMenu

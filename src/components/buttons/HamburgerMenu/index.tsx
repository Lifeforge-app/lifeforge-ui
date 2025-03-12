/* eslint-disable import/no-unresolved */
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
import React, { useState } from 'react'

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

  const [isOpen, setIsOpen] = useState(false)

  return (
    <Menu as="div" className={classNames?.wrapper}>
      <Button
        as={MenuButton}
        className={classNames?.button}
        icon={customIcon ?? 'tabler:dots-vertical'}
        iconClassName={classNames?.icon}
        variant="plain"
        onClick={e => {
          e.stopPropagation()
          setIsOpen(!isOpen)
          if (onClick !== undefined) {
            onClick(e)
          }
        }}
      />
      <Transition
        afterLeave={() => {
          if (onClose !== undefined) {
            onClose()
          }
        }}
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
              'min-w-[var(--button-width)] border-bg-200 dark:border-bg-700 z-9999 overflow-auto rounded-md border bg-bg-100 text-bg-500 text-base shadow-lg transition duration-100 ease-out [--anchor-gap:12px] dark:border-bg-700 dark:bg-bg-800 empty:invisible focus:outline-hidden data-closed:scale-95 data-closed:opacity-0',
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

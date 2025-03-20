import { Menu, MenuButton, MenuItems } from '@headlessui/react'
import { Icon } from '@iconify/react'
import { useLifeforgeUIContext } from '@providers/LifeforgeUIProvider'
import clsx from 'clsx'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import { Button } from '@components/buttons'

interface ModuleHeaderProps {
  icon?: string
  title: string | React.ReactNode
  totalItems?: number
  tips?: string
  hamburgerMenuItems?: React.ReactNode
  hamburgerMenuClassName?: string
  actionButton?: React.ReactNode
  customElement?: React.ReactNode
  namespace?: string
  tKey?: string
}

function ModuleHeader({
  icon,
  title,
  totalItems,
  tips = '',
  hamburgerMenuItems,
  hamburgerMenuClassName,
  actionButton,
  customElement,
  namespace,
  tKey
}: ModuleHeaderProps) {
  const { t } = useTranslation([
    `apps.${_.camelCase(title?.toString() ?? '')}`,
    `core.${_.camelCase(title?.toString() ?? '')}`,
    'common.misc',
    namespace ?? ''
  ])
  const { toggleSidebar, sidebarExpanded } = useLifeforgeUIContext()

  return (
    <header className="z-9980 flex-between flex w-full min-w-0 gap-8">
      <div className="flex w-full min-w-0 items-center gap-2">
        {!sidebarExpanded && (
          <Button
            className="flex sm:hidden"
            icon="tabler:menu"
            variant="plain"
            onClick={toggleSidebar}
          />
        )}
        {icon !== undefined && (
          <div className="hidden size-14 shrink-0 items-center justify-center rounded-lg bg-custom-500/20 sm:flex sm:size-16">
            <Icon className="size-6 text-custom-500 sm:size-8" icon={icon} />
          </div>
        )}
        <div className="w-full min-w-0 sm:space-y-1">
          <h1 className="flex w-full min-w-0 items-end gap-3 text-2xl font-semibold whitespace-nowrap sm:text-3xl">
            <span className="block truncate">
              {t([
                `${namespace}:${tKey}.${_.camelCase(title?.toString() ?? '')}.title`,
                `${namespace}:${_.camelCase(title?.toString() ?? '')}.title`,
                `apps..camelCase(title?.toString() ?? '')}:title`,
                `core.${_.camelCase(title?.toString() ?? '')}:title`,
                'common.misc:title',
                'title',
                title?.toString() ?? ''
              ])}
            </span>
            <span className="min-w-0 text-sm font-medium text-bg-500 sm:text-base">
              {totalItems !== undefined
                ? `(${totalItems.toLocaleString()})`
                : ''}
            </span>
          </h1>
          <div className="w-full min-w-0 truncate text-sm whitespace-nowrap text-bg-500 sm:text-base">
            {t([
              `${namespace}:${tKey}.${_.camelCase(title?.toString() ?? '')}.description`,
              `${namespace}:${_.camelCase(title?.toString() ?? '')}.description`,
              `apps..camelCase(title?.toString() ?? '')}:description`,
              `core.${_.camelCase(title?.toString() ?? '')}:description`,
              'common.misc:description',
              'description',
              `Description for ${title?.toString() ?? ''}`
            ])}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {actionButton}
        {tips !== '' && (
          <div className="relative hidden md:block">
            <Menu as="div" className="relative z-50">
              <MenuButton className="rounded-lg p-4 text-bg-500 transition-all hover:bg-bg-200/50 hover:text-bg-800 dark:hover:bg-bg-900 dark:hover:text-bg-50">
                <Icon className="size-5" icon="tabler:question-circle" />
              </MenuButton>
              <MenuItems
                transition
                anchor="bottom end"
                className="w-96 overflow-hidden overscroll-contain rounded-md bg-bg-100 shadow-lg outline-hidden transition duration-100 ease-out [--anchor-gap:8px] focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 dark:bg-bg-800"
              >
                <div className="flex items-center gap-2 p-4 text-bg-800 dark:border-bg-700 dark:text-bg-200">
                  <Icon className="size-6" icon="tabler:question-circle" />
                  <h2 className="text-lg font-semibold">
                    {t('common.misc:tipsAndTricks')}
                  </h2>
                </div>
                <div className="p-4 pt-0 text-bg-500">{tips}</div>
              </MenuItems>
            </Menu>
          </div>
        )}
        {customElement}
        {hamburgerMenuItems !== undefined && (
          <Menu
            as="div"
            className={clsx(
              'relative z-50 overscroll-contain',
              hamburgerMenuClassName
            )}
          >
            <MenuButton className="rounded-lg p-4 text-bg-500 transition-all hover:bg-bg-200/50 hover:text-bg-800 dark:hover:bg-bg-900 dark:hover:text-bg-50">
              <Icon className="size-5" icon="tabler:dots-vertical" />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="mt-2 min-w-48 overflow-hidden overscroll-contain rounded-md bg-bg-100 shadow-lg outline-hidden transition duration-100 ease-out focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 dark:bg-bg-800"
            >
              {hamburgerMenuItems}
            </MenuItems>
          </Menu>
        )}
      </div>
    </header>
  )
}

export default ModuleHeader

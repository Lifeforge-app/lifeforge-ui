import { Icon } from '@iconify/react/dist/iconify.js'
import { useLifeforgeUIContext } from '@providers/LifeforgeUIProvider'
import clsx from 'clsx'
import _ from 'lodash'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router'

function SidebarSubsectionItem({
  subsectionName,
  icon,
  name,
  path
}: {
  subsectionName: string
  icon: string | React.ReactElement
  name: string
  path: string
}) {
  const { sidebarExpanded, toggleSidebar } = useLifeforgeUIContext()
  const { t } = useTranslation('common.sidebar')

  const locationDependentStyles = useMemo(
    () =>
      location.pathname.split('/').slice(1)[0] === _.kebabCase(name) &&
      (location.pathname.split('/').slice(1)[1] === path ||
        (location.pathname.replace(_.kebabCase(name), '').replace(/\//g, '') ===
          '' &&
          subsectionName === 'Dashboard'))
        ? 'bg-bg-200/30 shadow-custom dark:bg-bg-800'
        : 'text-bg-500',
    [name, path, subsectionName]
  )

  const handleClick = useCallback(() => {
    if (window.innerWidth < 1024) {
      toggleSidebar?.()
    }
  }, [])

  return (
    <Link
      key={subsectionName}
      className={clsx(
        'mx-4 flex w-full items-center gap-4 rounded-lg py-4 font-medium transition-all hover:bg-bg-100/50 dark:hover:bg-bg-800/50',
        !sidebarExpanded ? 'justify-center' : '',
        sidebarExpanded ? 'pl-[3.8rem]' : 'px-2',
        locationDependentStyles
      )}
      to={`./${_.kebabCase(name)}/${path}`}
      onClick={handleClick}
    >
      <div className="flex size-7 items-center justify-center">
        {typeof icon === 'string' ? (
          <Icon className="size-6" icon={icon} />
        ) : (
          icon
        )}
      </div>

      {sidebarExpanded && (
        <span className="w-full truncate pr-4">
          {t(
            `apps.${_.camelCase(name)}.subsections.${_.camelCase(
              subsectionName
            )}`
          )}{' '}
        </span>
      )}
    </Link>
  )
}

export default SidebarSubsectionItem

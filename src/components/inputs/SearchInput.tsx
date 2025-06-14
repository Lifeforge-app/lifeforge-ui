import { Icon } from '@iconify/react'
import { useLifeforgeUIContext } from '@providers/LifeforgeUIProvider'
import clsx from 'clsx'
import _ from 'lodash'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../buttons'

function SearchInput({
  searchQuery,
  setSearchQuery,
  stuffToSearch,
  onKeyUp,
  customIcon,
  onFilterIconClick,
  filterAmount,
  sideButtonIcon,
  sideButtonLoading,
  onSideButtonClick,
  className,
  namespace,
  tKey = ''
}: {
  searchQuery: string
  setSearchQuery: (query: string) => void
  stuffToSearch: string
  onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  customIcon?: string
  onFilterIconClick?: () => void
  filterAmount?: number
  sideButtonIcon?: string
  sideButtonLoading?: boolean
  onSideButtonClick?: () => void
  className?: string
  namespace: string
  tKey?: string
}) {
  const { t } = useTranslation(['common.misc', namespace])
  const { bgImage } = useLifeforgeUIContext()
  const componentBgLighterWithHover = useMemo(() => {
    if (bgImage !== '') {
      return 'bg-bg-50 dark:bg-bg-800/50 hover:bg-bg-200/50 dark:hover:bg-bg-700/50 transition-all'
    }
    return 'bg-bg-50 dark:bg-bg-800/50 dark:hover:bg-bg-800/80 hover:bg-bg-50/50 transition-all'
  }, [bgImage])

  return (
    <search
      className={clsx(
        'shadow-custom flex min-h-14 w-full cursor-text items-center gap-3 rounded-lg px-4 transition-all',
        componentBgLighterWithHover,
        className
      )}
      onClick={e => {
        e.currentTarget.querySelector('input')?.focus()
      }}
    >
      <Icon
        className="text-bg-500 size-5 shrink-0"
        icon={customIcon ?? 'tabler:search'}
      />
      <input
        className="caret-custom-500 placeholder:text-bg-500 w-full bg-transparent"
        placeholder={t(`search`, {
          item: t([
            `${namespace}:${[tKey, 'items', _.camelCase(stuffToSearch)]
              .filter(e => e)
              .join('.')}`,
            stuffToSearch
          ])
        })}
        type="text"
        value={searchQuery}
        onChange={e => {
          setSearchQuery(e.target.value)
        }}
        onKeyUp={onKeyUp}
      />
      {onFilterIconClick !== undefined && (
        <button
          className={clsx(
            'flex items-center gap-1 rounded-lg p-2',
            filterAmount !== undefined && filterAmount > 0
              ? 'text-bg-900 dark:text-bg-100'
              : 'text-bg-500 hover:text-bg-900 dark:hover:text-bg-100',
            'hover:bg-bg-200 dark:hover:bg-bg-700/50 transition-all'
          )}
          onClick={onFilterIconClick}
        >
          <Icon className="text-xl" icon="tabler:filter" />
          {filterAmount !== undefined && filterAmount > 0 && (
            <span className="-mt-0.5">({filterAmount})</span>
          )}
        </button>
      )}
      {sideButtonIcon !== undefined && onSideButtonClick !== undefined && (
        <Button
          className="p-2!"
          icon={sideButtonIcon}
          loading={sideButtonLoading}
          variant="plain"
          onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            onSideButtonClick()
          }}
        />
      )}
    </search>
  )
}

export default SearchInput

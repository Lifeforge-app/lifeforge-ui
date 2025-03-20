import {
  ComboboxOption as HeadlessComboboxOption,
  ListboxOption as HeadlessListboxOption
} from '@headlessui/react'
import { Icon } from '@iconify/react'
import clsx from 'clsx'

function ListboxOrComboboxOption({
  value,
  text,
  icon,
  iconAtEnd = false,
  color,
  type = 'listbox',
  matchedSubstrings,
  noCheckmark = false
}: {
  value: string | number | Record<string, any> | null
  text: string
  icon?: string | React.ReactElement
  iconAtEnd?: boolean
  color?: string
  type?: 'listbox' | 'combobox'
  matchedSubstrings?: Array<{ length: number; offset: number }>
  noCheckmark?: boolean
}) {
  const Element =
    type === 'listbox' ? HeadlessListboxOption : HeadlessComboboxOption

  const getCharClassNames = (
    matchedSubstrings: Array<{ length: number; offset: number }> | undefined,
    index: number
  ) => {
    if (
      matchedSubstrings === undefined ||
      !matchedSubstrings.some(
        ({ offset, length }) => index >= offset && index < offset + length
      )
    )
      return ''

    return 'font-medium text-bg-800 dark:text-bg-100'
  }

  return (
    <Element
      className="relative flex-between flex cursor-pointer gap-8 p-4 transition-all select-none hover:bg-bg-200 dark:hover:bg-bg-700/50"
      value={value}
    >
      {({ selected }: { selected: boolean }) => (
        <>
          <div
            className={clsx(
              'flex w-full items-center',
              color !== undefined ? 'gap-3' : 'gap-2',
              selected && 'font-semibold text-bg-800 dark:text-bg-100',
              iconAtEnd && 'flex-between flex flex-row-reverse'
            )}
          >
            {icon !== undefined ? (
              <span
                className={clsx('rounded-md', color ? 'p-2' : 'pr-2')}
                style={
                  color !== undefined
                    ? {
                        backgroundColor: color + '20',
                        color
                      }
                    : {}
                }
              >
                {typeof icon === 'string' ? (
                  <Icon className="size-5" icon={icon} />
                ) : (
                  icon
                )}
              </span>
            ) : (
              color !== undefined && (
                <span
                  className="block size-4 rounded-full border border-bg-200 dark:border-bg-700"
                  style={{ backgroundColor: color }}
                />
              )
            )}
            <span>
              {text.split('').map((char, index) => (
                <span
                  key={index}
                  className={getCharClassNames(matchedSubstrings, index)}
                >
                  {char}
                </span>
              ))}
            </span>
          </div>
          {!noCheckmark && selected && (
            <Icon
              className="block shrink-0 text-lg text-custom-500"
              icon="tabler:check"
            />
          )}
        </>
      )}
    </Element>
  )
}

export default ListboxOrComboboxOption

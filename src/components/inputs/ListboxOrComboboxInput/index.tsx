import { ComboboxInput, ListboxButton } from '@headlessui/react'
import { Icon } from '@iconify/react'
import _ from 'lodash'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import InputIcon from '../shared/InputIcon'
import InputLabel from '../shared/InputLabel'
import ComboboxInputWrapper from './components/ComboboxInputWrapper'
import ListboxInputWrapper from './components/ListboxInputWrapper'
import ListboxOrComboboxOptions from './components/ListboxOrComboboxOptions'

interface IGeneralProps<T> {
  name: string
  icon: string
  value: T
  setValue: (value: T) => void
  disabled?: boolean
  className?: string
  children: React.ReactNode
  customActive?: boolean
  required?: boolean
  namespace: string | false
  tKey?: string
}

interface IListboxProps<T> extends IGeneralProps<T> {
  type: 'listbox'
  buttonContent: React.ReactElement
  multiple?: boolean
}

interface IComboboxProps<T> extends IGeneralProps<T> {
  type: 'combobox'
  setQuery: (query: string) => void
  displayValue: (value: T) => string
}

type IListboxOrComboboxInputProps<T> = IListboxProps<T> | IComboboxProps<T>

function ListboxOrComboboxInput<T>(
  props: IListboxOrComboboxInputProps<T>
): React.ReactElement {
  const {
    name,
    icon,
    value,
    setValue,
    disabled,
    type,
    children,
    required,
    customActive,
    namespace,
    tKey = ''
  } = props
  const { t } = useTranslation(namespace ? namespace : undefined)
  const isActive = useMemo(() => {
    if (typeof customActive === 'boolean') {
      return customActive
    }

    if (Array.isArray(value)) {
      return value.length > 0
    }

    if (typeof value === 'number') {
      return true
    }

    return !!value
  }, [value, customActive])

  switch (type) {
    case 'listbox':
    case undefined:
      return (
        <ListboxInputWrapper
          className={props.className}
          disabled={disabled}
          multiple={props.multiple}
          value={value}
          onChange={setValue}
        >
          <ListboxButton className="group flex w-full min-w-64 items-center pl-6">
            <InputIcon active={isActive} icon={icon} />
            <InputLabel
              isListboxOrCombobox
              active={isActive}
              label={t(
                namespace !== false
                  ? t([
                      [tKey, 'inputs', _.camelCase(name), 'label']
                        .filter(e => e)
                        .join('.'),
                      [tKey, 'inputs', _.camelCase(name)]
                        .filter(e => e)
                        .join('.')
                    ])
                  : name
              )}
              required={required === true}
            />
            <div className="relative mt-10 mb-3 flex min-h-[1.2rem] w-full items-center gap-2 rounded-lg pr-10 pl-5 text-left focus:outline-hidden">
              {isActive && props.buttonContent}
            </div>
            <span className="pointer-events-none absolute inset-y-0 right-0 mt-1 mr-2 flex items-center pr-4">
              <Icon
                className="size-6 text-zinc-500"
                icon="heroicons:chevron-up-down-16-solid"
              />
            </span>
          </ListboxButton>
          <ListboxOrComboboxOptions>{children}</ListboxOrComboboxOptions>
        </ListboxInputWrapper>
      )
    case 'combobox':
      return (
        <ComboboxInputWrapper
          className={props.className}
          disabled={disabled}
          setQuery={props.setQuery}
          value={value}
          onChange={setValue}
        >
          <div className="group relative flex w-full items-center">
            <InputIcon
              active={!!value || customActive === true}
              className="absolute left-6"
              icon={icon}
            />
            <InputLabel
              isCombobox
              isListboxOrCombobox
              active={!!value || customActive === true}
              label={t(`inputs.${_.camelCase(name)}`)}
              required={required === true}
            />
            <ComboboxInput
              className="relative mt-10 mb-3 flex w-full items-center gap-2 rounded-lg bg-transparent! pr-5 pl-17.5 text-left focus:outline-hidden"
              displayValue={props.displayValue}
              onChange={e => {
                props.setQuery(e.target.value)
              }}
            />
          </div>
          <ListboxOrComboboxOptions type="combobox">
            {children}
          </ListboxOrComboboxOptions>
        </ComboboxInputWrapper>
      )
  }
}

export default ListboxOrComboboxInput

import { Icon } from '@iconify/react'
import clsx from 'clsx'
import _ from 'lodash'
import { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { useModalStore } from '@components/modals'

import InputIcon from '../shared/InputIcon'
import InputLabel from '../shared/InputLabel'
import InputWrapper from '../shared/InputWrapper'

function ColorInput({
  name,
  color,
  setColor,
  hasTopMargin = true,
  className,
  namespace,
  required,
  disabled
}: {
  name: string
  color: string
  setColor: (value: string) => void
  hasTopMargin?: boolean
  className?: string
  namespace: string
  required?: boolean
  disabled?: boolean
}) {
  const open = useModalStore(state => state.open)
  const { t } = useTranslation(namespace)
  const ref = useRef<HTMLInputElement | null>(null)

  const handleColorPickerOpen = useCallback(() => {
    open('colorPicker', {
      color,
      setColor
    })
  }, [])

  return (
    <InputWrapper
      darker
      className={clsx(hasTopMargin && 'mt-4', className)}
      disabled={disabled}
      inputRef={ref}
    >
      <InputIcon active={color !== ''} icon="tabler:palette" />
      <div className="flex w-full items-center gap-2">
        <InputLabel
          active={!!color}
          label={t(`inputs.${_.camelCase(name)}`)}
          required={required}
        />
        <div className="mt-6 mr-4 flex w-full items-center gap-2 pl-4">
          <div
            className="mt-0.5 size-3 shrink-0 rounded-full"
            style={{
              backgroundColor: color
            }}
          ></div>
          <input
            ref={ref}
            className="h-8 w-full min-w-28 rounded-lg bg-transparent p-6 pl-0 tracking-wide placeholder:text-transparent focus:outline-hidden focus:placeholder:text-bg-500"
            placeholder="#FFFFFF"
            value={color}
            onChange={e => {
              setColor(e.target.value)
            }}
          />
        </div>
        <button
          type="button"
          className="mr-4 shrink-0 rounded-lg p-2 text-bg-500 transition-all hover:bg-bg-200 hover:text-bg-800 focus:outline-hidden dark:hover:bg-bg-700/70 dark:hover:text-bg-200"
          onClick={handleColorPickerOpen}
        >
          <Icon className="size-6" icon="tabler:color-picker" />
        </button>
      </div>
    </InputWrapper>
  )
}

export default ColorInput

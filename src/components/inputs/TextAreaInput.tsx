import _ from 'lodash'
import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import InputIcon from './shared/InputIcon'
import InputLabel from './shared/InputLabel'
import InputWrapper from './shared/InputWrapper'

export interface ITextAreaInputProps {
  icon: string
  name: string
  placeholder: string
  value: string
  setValue: (value: string) => void

  className?: string
  darker?: boolean
  disabled?: boolean
  onActionButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  required?: boolean
  namespace: string | false
  tKey?: string
}

function TextAreaInput({
  className = '',
  darker = false,
  disabled = false,
  icon,
  name,
  placeholder,
  required,
  setValue,
  value,
  namespace,
  tKey
}: ITextAreaInputProps) {
  const { t } = useTranslation(namespace ? namespace : undefined)
  const ref = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (!ref.current) return

    ref.current.style.height = 'auto'
    ref.current.style.height = ref.current.scrollHeight + 'px'
  }, [value])

  return (
    <InputWrapper
      inputRef={ref}
      className={className}
      darker={darker}
      disabled={disabled}
    >
      <InputIcon active={!!value && String(value).length > 0} icon={icon} />
      <div className="flex w-full items-center gap-2">
        <InputLabel
          active={!!value && String(value).length > 0}
          label={
            namespace !== false
              ? t([
                  [tKey, 'inputs', _.camelCase(name), 'label']
                    .filter(e => e)
                    .join('.'),
                  [tKey, 'inputs', _.camelCase(name)].filter(e => e).join('.')
                ])
              : name
          }
          required={required === true}
        />
        <textarea
          ref={ref}
          className="mt-3 -mb-3 min-h-8 w-full resize-none rounded-lg bg-transparent p-6 pl-4 tracking-wide outline-hidden placeholder:text-transparent focus:outline-hidden focus:placeholder:text-bg-500"
          placeholder={placeholder}
          value={value}
          onInput={e => {
            setValue(e.currentTarget.value)
          }}
        />
      </div>
    </InputWrapper>
  )
}

export default TextAreaInput

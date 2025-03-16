import _ from 'lodash'
import { memo, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '../../buttons/Button'
import InputActionButton from '../shared/InputActionButton'
import InputBox from '../shared/InputBox'
import InputIcon from '../shared/InputIcon'
import InputLabel from '../shared/InputLabel'
import InputWrapper from '../shared/InputWrapper'

export interface IInputProps {
  icon: string
  name: string
  placeholder: string
  value: string
  setValue: (value: string) => void

  inputMode?:
    | 'text'
    | 'none'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
  actionButtonIcon?: string
  actionButtonLoading?: boolean
  autoFocus?: boolean
  className?: string
  darker?: boolean
  disabled?: boolean
  isPassword?: boolean
  noAutoComplete?: boolean
  onActionButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  ref?: React.RefObject<HTMLInputElement | null>
  required?: boolean
  namespace: string | false
  tKey?: string
}

function TextInput({
  actionButtonIcon = '',
  actionButtonLoading = false,
  autoFocus = false,
  className = '',
  darker = false,
  disabled = false,
  icon,
  inputMode = 'text',
  isPassword = false,
  name,
  noAutoComplete = true,
  onActionButtonClick = () => {},
  onKeyDown = () => {},
  placeholder,
  ref,
  required,
  setValue: setValue,
  value,
  namespace,
  tKey
}: IInputProps) {
  const { t } = useTranslation(namespace ? namespace : undefined)
  const [showPassword, setShowPassword] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  return (
    <InputWrapper
      className={className}
      darker={darker}
      disabled={disabled}
      inputRef={inputRef}
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
        <InputBox
          disabled={disabled}
          inputMode={inputMode}
          inputRef={inputRef}
          isPassword={isPassword}
          noAutoComplete={noAutoComplete}
          placeholder={placeholder}
          reference={ref}
          setValue={setValue}
          showPassword={showPassword}
          value={value}
          onKeyDown={onKeyDown}
        />
        {isPassword && (
          <Button
            className="mr-2"
            icon={showPassword ? 'tabler:eye' : 'tabler:eye-off'}
            variant="plain"
            onMouseDown={() => {
              setShowPassword(true)
            }}
            onMouseUp={() => {
              setShowPassword(false)
            }}
            onTouchEnd={() => {
              setShowPassword(false)
            }}
            onTouchStart={() => {
              setShowPassword(true)
            }}
          />
        )}
        {actionButtonIcon && (
          <InputActionButton
            actionButtonIcon={actionButtonIcon}
            actionButtonLoading={actionButtonLoading}
            onActionButtonClick={onActionButtonClick}
          />
        )}
      </div>
    </InputWrapper>
  )
}

export default memo(TextInput)

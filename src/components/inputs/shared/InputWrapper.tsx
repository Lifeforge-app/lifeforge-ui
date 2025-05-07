import clsx from 'clsx'
import { useCallback } from 'react'

import useThemeColors from '@hooks/useThemeColor'

function InputWrapper({
  darker = false,
  className = '',
  disabled = false,
  inputRef,
  children
}: {
  darker?: boolean
  className?: string
  disabled?: boolean
  inputRef?: React.RefObject<HTMLInputElement | HTMLTextAreaElement | null>
  children: React.ReactNode
}) {
  const { componentBgWithHover, componentBgLighterWithHover } = useThemeColors()

  const focusInput = useCallback(
    (e: React.MouseEvent | React.FocusEvent) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON') {
        return
      }

      if (inputRef?.current !== undefined && inputRef.current !== null) {
        inputRef.current.focus()
        if (
          !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)
        ) {
          inputRef.current.setSelectionRange(
            inputRef.current.value.length,
            inputRef.current.value.length
          )
        }
      }
    },
    [inputRef]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault()
        if (inputRef?.current !== undefined && inputRef.current !== null) {
          inputRef.current.focus()
        }
      }
    },
    [inputRef]
  )

  return (
    <div
      className={clsx(
        'group relative flex shrink-0 items-center gap-1 rounded-t-lg border-b-2 border-bg-500 bg-bg-200/50 pl-6 shadow-custom transition-all focus-within:!border-custom-500 hover:bg-bg-200',
        darker ? componentBgLighterWithHover : componentBgWithHover,
        className,
        disabled ? 'pointer-events-none! opacity-50' : 'cursor-text'
      )}
      role="button"
      tabIndex={0}
      onClick={focusInput}
      onFocus={focusInput}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

export default InputWrapper

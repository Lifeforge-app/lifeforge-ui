import { MORANDI_COLORS } from '@constants/morandi_colors'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { sortFn } from 'color-sorter'
import React from 'react'
import tinycolor from 'tinycolor2'

import { ModalHeader, ModalWrapper } from '@components/modals'

function MorandiColorPaletteModal({
  isOpen,
  onClose,
  color,
  setColor
}: {
  isOpen: boolean
  onClose: () => void
  color: string
  setColor: React.Dispatch<React.SetStateAction<string>>
}) {
  return (
    <ModalWrapper isOpen={isOpen} minWidth="60vw">
      <ModalHeader
        icon="tabler:flower"
        title="colorPicker.modals.morandiColorPalette"
        onClose={onClose}
      />
      <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(4rem,1fr))] gap-4 p-4 pt-0">
        {MORANDI_COLORS.sort(sortFn).map((morandiColor, index) => (
          <button
            key={index}
            className={clsx(
              'flex-center shadow-custom aspect-square size-full cursor-pointer rounded-md',
              color === morandiColor &&
                'ring-bg-900 ring-offset-bg-100 dark:ring-bg-50 dark:ring-offset-bg-900 ring-2 ring-offset-2'
            )}
            style={{ backgroundColor: morandiColor }}
            onClick={() => {
              setColor(morandiColor)
              onClose()
            }}
          >
            {color === morandiColor && (
              <Icon
                className={clsx(
                  'size-8',
                  tinycolor(morandiColor).isLight()
                    ? 'text-bg-800'
                    : 'text-bg-50'
                )}
                icon="tabler:check"
              />
            )}
          </button>
        ))}
      </div>
    </ModalWrapper>
  )
}

export default MorandiColorPaletteModal

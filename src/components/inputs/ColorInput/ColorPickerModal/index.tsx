import { type ColorResult, Colorful, EditableInput } from '@uiw/react-color'
import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Button } from '@components/buttons'
import { ModalHeader } from '@components/modals'

import MorandiColorPaletteModal from './components/MorandiColorPaletteModal'
import TailwindCSSColorsModal from './components/TailwindCSSColorPalette'

function checkContrast(hexColor: string): string {
  const r = parseInt(hexColor.substr(1, 2), 16)
  const g = parseInt(hexColor.substr(3, 2), 16)
  const b = parseInt(hexColor.substr(5, 2), 16)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000
  return yiq >= 128 ? '#000000' : '#ffffff'
}

function ColorPickerModal({
  setOpen,
  color,
  setColor
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  color: string
  setColor: (color: string) => void
}) {
  const [innerColor, setInnerColor] = useState(color.toLowerCase())
  const [morandiColorPaletteModalOpen, setMorandiColorPaletteModalOpen] =
    useState(false)
  const [tailwindCSSColorsModalOpen, setTailwindCSSColorsModalOpen] =
    useState(false)

  const confirmColor = useCallback(() => {
    setColor(innerColor)
    setOpen(false)
  }, [innerColor, setColor, setOpen])

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen])

  const handleColorChange = useCallback((color: ColorResult) => {
    setInnerColor(color.hex)
  }, [])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInnerColor(`#${e.target.value}`)
    },
    []
  )

  const finalRenderedComponent = useMemo(() => {
    if (tailwindCSSColorsModalOpen) {
      return (
        <TailwindCSSColorsModal
          color={innerColor}
          setColor={setInnerColor}
          onClose={() => {
            setTailwindCSSColorsModalOpen(false)
          }}
        />
      )
    }

    if (morandiColorPaletteModalOpen) {
      return (
        <MorandiColorPaletteModal
          color={innerColor}
          setColor={setInnerColor}
          onClose={() => {
            setMorandiColorPaletteModalOpen(false)
          }}
        />
      )
    }

    return (
      <>
        <Colorful
          disableAlpha
          className="w-full!"
          color={innerColor}
          onChange={handleColorChange}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `.w-color-editable-input input {
        background-color: ${innerColor} !important;
        color: ${checkContrast(innerColor)} !important;
      }`
          }}
        />
        <EditableInput
          className="mt-4 border-0 p-4 text-2xl font-semibold"
          label="Hex"
          value={innerColor}
          onChange={handleInputChange}
        />
        <Button
          className="mb-2"
          icon="tabler:flower"
          variant="secondary"
          onClick={() => {
            setMorandiColorPaletteModalOpen(true)
          }}
        >
          Morandi Color Palette
        </Button>
        <Button
          className="mb-2 bg-teal-500! hover:bg-teal-600!"
          icon="tabler:brand-tailwind"
          variant="primary"
          onClick={() => {
            setTailwindCSSColorsModalOpen(true)
          }}
        >
          Tailwind CSS Color Palette
        </Button>
        <Button icon="tabler:check" onClick={confirmColor}>
          Select
        </Button>
      </>
    )
  }, [
    confirmColor,
    handleColorChange,
    handleInputChange,
    innerColor,
    morandiColorPaletteModalOpen,
    tailwindCSSColorsModalOpen
  ])

  useEffect(() => {
    setInnerColor(color.toLowerCase())
  }, [color])

  return (
    <>
      <ModalHeader
        icon="tabler:color-picker"
        title="colorPicker.title"
        onClose={handleClose}
      />
      {finalRenderedComponent}
    </>
  )
}

export default ColorPickerModal

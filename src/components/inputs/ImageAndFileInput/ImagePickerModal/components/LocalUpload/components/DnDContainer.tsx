import { Icon } from '@iconify/react'
import { DropzoneInputProps, DropzoneRootProps } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import { Button } from '@components/buttons'

function DnDContainer({
  getRootProps,
  getInputProps,
  isDragActive,
  setPreview,
  setFile
}: {
  getRootProps: (props?: DropzoneRootProps) => DropzoneRootProps
  getInputProps: (props?: DropzoneInputProps) => DropzoneInputProps
  isDragActive: boolean
  setPreview: (preview: string | null) => void
  setFile: (file: File | string | null) => void
}) {
  const { t } = useTranslation('common.misc')

  const pasteFromClipboard = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read()
      const items = Array.from(clipboardItems)
      const imageItem = items.find(item =>
        item.types.some(type => type.startsWith('image/'))
      )

      if (imageItem) {
        const blob = await imageItem.getType('image/png')
        const file = new File([blob], 'pasted-image.png', { type: 'image/png' })
        setFile(file)
        setPreview(URL.createObjectURL(file))
      }
    } catch (error) {
      console.error('Failed to paste from clipboard:', error)
    }
  }

  return (
    <div
      className="flex-center size-full min-h-96 flex-1 flex-col rounded-lg border-[3px] border-dashed border-bg-500 py-12"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon className="size-20 text-bg-500" icon="tabler:drag-drop" />
      <div className="mt-4 text-center text-2xl font-medium text-bg-500">
        {isDragActive ? t('dnd.dropHere') : t('dnd.dragAndDropToUpload')}
      </div>
      <div className="mt-4 text-center text-lg font-semibold tracking-widest text-bg-500 uppercase">
        {t('dnd.or')}
      </div>
      <Button
        as="label"
        className="mt-4 min-w-1/2 cursor-pointer"
        icon="tabler:upload"
        variant="secondary"
      >
        upload
      </Button>
      <Button
        className="mt-2 min-w-1/2 cursor-pointer"
        icon="tabler:clipboard"
        variant="tertiary"
        tKey="dnd"
        onClick={pasteFromClipboard}
      >
        paste from clipboard
      </Button>
    </div>
  )
}

export default DnDContainer

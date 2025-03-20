import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'

import { Button } from '@components/buttons'

function DnDContainer({
  getRootProps,
  getInputProps,
  isDragActive
}: {
  getRootProps: any
  getInputProps: any
  isDragActive: boolean
}) {
  const { t } = useTranslation('common.misc')

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
        className="mt-4 cursor-pointer"
        icon="tabler:upload"
        variant="secondary"
      >
        upload
      </Button>
    </div>
  )
}

export default DnDContainer

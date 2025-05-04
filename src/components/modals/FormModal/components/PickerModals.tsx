import { IFieldProps, IFormState } from '@interfaces/modal_interfaces'

import {
  IconPickerModal,
  ImagePickerModal,
  QRCodeScanner
} from '@components/inputs'

function PickerModals<T extends IFormState>({
  fields,
  setData,
  iconSelectorOpen,
  setIconSelectorOpen,
  imagePickerModalOpen,
  setImagePickerModalOpen,
  qrScannerModalOpen,
  setQRScannerModalOpen
}: {
  fields: IFieldProps<T>[]
  setData: React.Dispatch<React.SetStateAction<T>>
  iconSelectorOpen: string | null
  setIconSelectorOpen: (id: string | null) => void
  imagePickerModalOpen: string | null
  setImagePickerModalOpen: (id: string | null) => void
  qrScannerModalOpen: string | null
  setQRScannerModalOpen: (id: string | null) => void
}) {
  return (
    <>
      {fields.some(f => f.type === 'icon') && (
        <IconPickerModal
          isOpen={iconSelectorOpen !== null}
          setOpen={() => {
            setIconSelectorOpen(null)
          }}
          setSelectedIcon={value => {
            setData(prev => ({
              ...prev,
              [iconSelectorOpen ?? '']: value
            }))
          }}
        />
      )}
      {fields.some(f => f.type === 'file') && (
        <ImagePickerModal
          enablePixabay
          enableUrl
          enableAI={
            (
              fields.find(
                f => f.id === imagePickerModalOpen
              ) as IFieldProps<T> & { type: 'file' }
            )?.enableAIImageGeneration
          }
          defaultAIPrompt={
            (
              fields.find(
                f => f.id === imagePickerModalOpen
              ) as IFieldProps<T> & { type: 'file' }
            )?.defaultImageGenerationPrompt
          }
          acceptedMimeTypes={{
            images: ['image/png', 'image/jpeg', 'image/webp']
          }}
          isOpen={imagePickerModalOpen !== null}
          onClose={() => {
            setImagePickerModalOpen(null)
          }}
          onSelect={async (file, preview) => {
            setData(prev => ({
              ...prev,
              [imagePickerModalOpen ?? '']: {
                image: file,
                preview
              }
            }))
          }}
        />
      )}
      {fields.some(f => Object.keys(f).includes('qrScanner')) && (
        <QRCodeScanner
          isOpen={qrScannerModalOpen !== null}
          onClose={() => {
            setQRScannerModalOpen(null)
          }}
          onScanned={data => {
            setData(prev => ({
              ...prev,
              [qrScannerModalOpen ?? '']: data
            }))
          }}
        />
      )}
    </>
  )
}

export default PickerModals

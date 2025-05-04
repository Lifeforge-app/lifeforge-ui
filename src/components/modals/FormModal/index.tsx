import { useLifeforgeUIContext } from '@providers/LifeforgeUIProvider'
import { useQueryClient } from '@tanstack/react-query'
import type { RecordModel } from 'pocketbase'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import type { IFieldProps, IFormState } from '@interfaces/modal_interfaces'

import { Button } from '@components/buttons'
import {
  ColorPickerModal,
  IconPickerModal,
  ImagePickerModal,
  QRCodeScanner
} from '@components/inputs'
import { LoadingScreen } from '@components/screens'

import useModifyMutation from '@hooks/useModifyMutation'

import ModalHeader from '../ModalHeader'
import ModalWrapper from '../ModalWrapper'
import FormInputs from './components/FormInputs'
import SubmitButton from './components/SubmitButton'

function FormModal<T extends IFormState, U extends RecordModel>({
  // fields stuff
  fields,
  additionalFields,
  data,
  setData,

  // modal stuff
  title,
  icon,
  isOpen,
  openType,
  onClose,
  loading = false,

  // submit stuff
  onSubmit,
  id,
  endpoint,
  queryKey,
  getFinalData,
  sortBy,
  sortMode,
  submitButtonProps = {
    children: 'Submit',
    icon: 'tabler:check'
  },
  customUpdateDataList,

  // action button stuff
  actionButtonIcon,
  actionButtonIsRed,
  onActionButtonClick,

  // misc stuff
  namespace,
  modalRef
}: {
  modalRef?: React.RefObject<HTMLDivElement | null>
  fields: IFieldProps<T>[]
  additionalFields?: React.ReactNode
  data: T
  setData: React.Dispatch<React.SetStateAction<T>>
  title: string
  icon: string
  isOpen: boolean
  openType?: 'create' | 'update' | null
  onClose: () => void
  submitButtonProps?: React.ComponentProps<typeof Button>
  onSubmit?: () => Promise<void>
  queryKey?: unknown[]
  endpoint?: string
  id?: string
  loading?: boolean
  actionButtonIcon?: string
  actionButtonIsRed?: boolean
  onActionButtonClick?: () => void
  namespace: string
  getFinalData?: (originalData: T) => Promise<Record<string, unknown>>
  sortBy?: keyof U
  sortMode?: 'asc' | 'desc'
  customUpdateDataList?: {
    create?: (newData: U) => void
    update?: (newData: U) => void
  }
}) {
  const { apiHost } = useLifeforgeUIContext()
  const queryClient = useQueryClient()
  const [colorPickerOpen, setColorPickerOpen] = useState<string | null>(null)
  const [iconSelectorOpen, setIconSelectorOpen] = useState<string | null>(null)
  const [imagePickerModalOpen, setImagePickerModalOpen] = useState<
    string | null
  >(null)
  const [qrCodeScannerModalOpen, setQRCodeScannerModalOpen] = useState<
    string | null
  >(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const entryCreateMutation = useModifyMutation<U>(
    'create',
    apiHost,
    endpoint ?? '',
    {
      onSettled: () => {
        setSubmitLoading(false)
      },
      onSuccess: (newData: U) => {
        if (customUpdateDataList?.create) {
          customUpdateDataList.create(newData)
        } else {
          queryClient.setQueryData<U[]>(queryKey ?? [], old => {
            if (!old) return []

            return [...old, newData].sort((a, b) => {
              if (sortBy) {
                if (sortMode === 'asc') {
                  return a[sortBy] > b[sortBy] ? 1 : -1
                }
                return a[sortBy] < b[sortBy] ? 1 : -1
              }
              return 0
            })
          })
        }
        onClose()
      }
    }
  )
  const entryUpdateMutation = useModifyMutation<U>(
    'update',
    apiHost,
    `${endpoint}/${id}`,
    {
      onSettled: () => {
        setSubmitLoading(false)
      },
      onSuccess: (newData: U) => {
        if (customUpdateDataList?.update) {
          customUpdateDataList.update(newData)
        } else {
          queryClient.setQueryData<U[]>(queryKey ?? [], old => {
            if (!old) return []

            return old
              .map(entry => {
                if (entry.id === newData.id) {
                  return newData
                }
                return entry
              })
              .sort((a, b) => {
                if (sortBy) {
                  if (sortMode === 'asc') {
                    return a[sortBy] > b[sortBy] ? 1 : -1
                  }
                  return a[sortBy] < b[sortBy] ? 1 : -1
                }
                return 0
              })
          })
        }
        onClose()
      }
    }
  )

  async function onSubmitButtonClick(): Promise<void> {
    const requiredFields = fields.filter(field => field.required)
    const missingFields = requiredFields.filter(field => {
      const value = data[field.id]
      return (
        !value ||
        (typeof value === 'string' && !value.trim()) ||
        (typeof value === 'object' && !Array.isArray(value) && !value.image)
      )
    })

    if (missingFields.length) {
      toast.error(
        `The following fields are required: ${missingFields
          .map(field => field.label)
          .join(', ')}`
      )
      return
    }

    setSubmitLoading(true)

    const finalData = Object.fromEntries(
      Object.entries(getFinalData ? await getFinalData(data) : data).map(
        ([key, value]) => {
          if (typeof value === 'object' && 'image' in (value ?? {})) {
            return [key, (value as { image: string | File | null }).image]
          }
          return JSON.parse(JSON.stringify([key, value]))
        }
      )
    )

    if (openType === 'create') {
      entryCreateMutation.mutate(finalData as Partial<U>)
    } else if (openType === 'update') {
      entryUpdateMutation.mutate(finalData as Partial<U>)
    }

    if (onSubmit) {
      await onSubmit()
      setSubmitLoading(false)
    }
  }

  const finalRenderedComponents = useMemo(() => {
    if (colorPickerOpen) {
      return (
        <ColorPickerModal
          color={(data[colorPickerOpen ?? ''] as string) ?? '#FFFFFF'}
          setColor={value => {
            setData(prev => ({
              ...prev,
              [colorPickerOpen ?? '']: value
            }))
          }}
          setOpen={() => {
            setColorPickerOpen(null)
          }}
        />
      )
    }

    if (iconSelectorOpen) {
      return (
        <IconPickerModal
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
      )
    }

    if (imagePickerModalOpen) {
      return (
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
      )
    }

    if (qrCodeScannerModalOpen) {
      return (
        <QRCodeScanner
          isOpen={qrCodeScannerModalOpen !== null}
          onClose={() => {
            setQRCodeScannerModalOpen(null)
          }}
          onScanned={data => {
            setData(prev => ({
              ...prev,
              [qrCodeScannerModalOpen ?? '']: data
            }))
          }}
        />
      )
    }

    return (
      <>
        <FormInputs
          data={data}
          fields={fields}
          namespace={namespace}
          setColorPickerOpen={setColorPickerOpen}
          setData={setData}
          setIconSelectorOpen={setIconSelectorOpen}
          setImagePickerModalOpen={setImagePickerModalOpen}
          setQrScannerModalOpen={setQRCodeScannerModalOpen}
        />
        {additionalFields}
        <SubmitButton
          openType={openType}
          submitButtonProps={submitButtonProps}
          submitLoading={submitLoading}
          onSubmitButtonClick={onSubmitButtonClick}
        />
      </>
    )
  }, [
    data,
    fields,
    namespace,
    additionalFields,
    openType,
    submitButtonProps,
    submitLoading,
    onSubmitButtonClick
  ])

  return (
    <ModalWrapper isOpen={isOpen} minWidth="50vw" modalRef={modalRef}>
      <ModalHeader
        actionButtonIcon={actionButtonIcon}
        actionButtonIsRed={actionButtonIsRed}
        icon={icon}
        namespace={namespace}
        title={title}
        onActionButtonClick={onActionButtonClick}
        onClose={onClose}
      />
      {!loading ? <>{finalRenderedComponents}</> : <LoadingScreen />}
    </ModalWrapper>
  )
}

export default FormModal

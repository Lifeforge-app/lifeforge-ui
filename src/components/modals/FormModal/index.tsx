import { useLifeforgeUIContext } from '@providers/LifeforgeUIProvider'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { type IFieldProps } from '@interfaces/modal_interfaces'

import { Button } from '@components/buttons'
import { LoadingScreen } from '@components/screens'

import useModifyMutation from '@hooks/useModifyMutation'

import ModalHeader from '../ModalHeader'
import ModalWrapper from '../ModalWrapper'
import FormInputs from './components/FormInputs'
import PickerModals from './components/PickerModals'
import SubmitButton from './components/SubmitButton'

function FormModal<T extends Record<string, any | any[]>>({
  // fields stuff
  fields,
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
  getFinalData?: (originalData: T) => Promise<Record<string, any>>
  sortBy?: keyof T
  sortMode?: 'asc' | 'desc'
  customUpdateDataList?: {
    create?: (newData: any) => void
    update?: (newData: any) => void
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
  const entryCreateMutation = useModifyMutation<T>(
    'create',
    apiHost,
    endpoint ?? '',
    {
      onSettled: () => {
        setSubmitLoading(false)
      },
      onSuccess: (newData: T) => {
        if (customUpdateDataList?.create) {
          customUpdateDataList.create(newData)
        } else {
          queryClient.setQueryData(queryKey ?? [], (old: T[]) => {
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
  const entryUpdateMutation = useModifyMutation<T>(
    'update',
    apiHost,
    `${endpoint}/${id}`,
    {
      onSettled: () => {
        setSubmitLoading(false)
      },
      onSuccess: (newData: T) => {
        if (customUpdateDataList?.update) {
          customUpdateDataList.update(newData)
        } else {
          queryClient.setQueryData(queryKey ?? [], (old: T[]) => {
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
    setSubmitLoading(true)

    const finalData = Object.fromEntries(
      Object.entries(getFinalData ? await getFinalData(data) : data).map(
        ([key, value]) => {
          if (typeof value === 'object' && 'image' in value) {
            return [key, value.image]
          }
          return JSON.parse(JSON.stringify([key, value]))
        }
      )
    )

    if (openType === 'create') {
      entryCreateMutation.mutate(finalData as any)
    } else if (openType === 'update') {
      entryUpdateMutation.mutate(finalData as any)
    }

    if (onSubmit) {
      await onSubmit()
      setSubmitLoading(false)
    }
  }

  return (
    <>
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
        {!loading ? (
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
            <SubmitButton
              openType={openType}
              submitButtonProps={submitButtonProps}
              submitLoading={submitLoading}
              onSubmitButtonClick={onSubmitButtonClick}
            />
          </>
        ) : (
          <LoadingScreen />
        )}
      </ModalWrapper>
      <PickerModals
        colorPickerOpen={colorPickerOpen}
        data={data}
        fields={fields}
        iconSelectorOpen={iconSelectorOpen}
        imagePickerModalOpen={imagePickerModalOpen}
        qrScannerModalOpen={qrCodeScannerModalOpen}
        setColorPickerOpen={setColorPickerOpen}
        setData={setData}
        setIconSelectorOpen={setIconSelectorOpen}
        setImagePickerModalOpen={setImagePickerModalOpen}
        setQRScannerModalOpen={setQRCodeScannerModalOpen}
      />
    </>
  )
}

export default FormModal

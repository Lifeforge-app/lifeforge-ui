import { useLifeforgeUIContext } from '@providers/LifeforgeUIProvider'
import { useQueryClient } from '@tanstack/react-query'
import type { RecordModel } from 'pocketbase'
import { useState } from 'react'
import { toast } from 'react-toastify'

import type { IFieldProps, IFormState } from '@interfaces/modal_interfaces'

import { Button } from '@components/buttons'
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
              setData={setData}
            />
            {additionalFields}
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
    </>
  )
}

export default FormModal

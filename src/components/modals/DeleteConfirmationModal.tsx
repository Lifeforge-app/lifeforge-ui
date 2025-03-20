import { useLifeforgeUIContext } from '@providers/LifeforgeUIProvider'
import { useQueryClient } from '@tanstack/react-query'
import { RecordModel } from 'pocketbase'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import fetchAPI from '@utils/fetchAPI'

import Button from '../buttons/Button'
import ModalWrapper from './ModalWrapper'

function DeleteConfirmationModal<T extends RecordModel>({
  itemName,
  isOpen,
  onClose,
  data,
  updateDataList,
  apiEndpoint,
  customTitle,
  customText,
  nameKey,
  customCallback,
  customConfirmButtonIcon,
  customConfirmButtonText,
  customOnClick,
  queryKey,
  queryUpdateType = 'mutate',
  multiQueryKey = false
}: {
  itemName?: string
  isOpen: boolean
  onClose: () => void
  data?: T | T[]
  updateDataList?: () => void
  apiEndpoint?: string
  customTitle?: string
  customText?: string
  nameKey?: keyof T
  customCallback?: () => Promise<void>
  customConfirmButtonIcon?: string
  customConfirmButtonText?: string
  customOnClick?: () => Promise<void>
  queryKey?: unknown[] | unknown[][]
  queryUpdateType?: 'mutate' | 'invalidate'
  multiQueryKey?: boolean
}) {
  const { apiHost } = useLifeforgeUIContext()
  const { t } = useTranslation('common.modals')
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const finalItemName = useMemo(() => {
    if (Array.isArray(data)) {
      return `${data.length} ${itemName}`
    }

    if (nameKey) {
      return data?.[nameKey]
    }

    return `the ${itemName}`
  }, [data, itemName, nameKey])

  const updateFunc = useCallback(
    (old: T[]) => {
      if (!Array.isArray(data)) {
        return old.filter(item => item.id !== data!.id)
      }
      return old.filter(item => !data.some(d => d.id === item.id))
    },
    [data]
  )

  const mutateData = useCallback(() => {
    if (!data || !queryKey) return

    if (multiQueryKey) {
      ;(queryKey as unknown[][]).forEach(key => {
        if (queryUpdateType === 'mutate') {
          queryClient.setQueryData(key, updateFunc)
        }
        if (queryUpdateType === 'invalidate') {
          queryClient.invalidateQueries({ queryKey: key })
        }
      })
    } else {
      if (queryUpdateType === 'mutate') {
        queryClient.setQueryData(queryKey as unknown[], updateFunc)
      }
      if (queryUpdateType === 'invalidate') {
        queryClient.invalidateQueries({ queryKey: queryKey as unknown[] })
      }
    }
  }, [data, queryKey, queryUpdateType, multiQueryKey, updateFunc])

  async function deleteData(): Promise<void> {
    if (data === null) return
    setLoading(true)

    await fetchAPI(
      apiHost,
      `${apiEndpoint}/${!Array.isArray(data) ? (data?.id ?? '') : ''}`,
      {
        method: 'DELETE',
        body: !Array.isArray(data) ? undefined : { ids: data }
      }
    )

    try {
      onClose()
      if (updateDataList) updateDataList()

      if (customCallback) {
        customCallback()
          .then(() => {
            setLoading(false)
            onClose()
          })
          .catch(console.error)
      }
    } catch {
      toast.error(t('deleteConfirmation.error'))
    } finally {
      mutateData()
      setLoading(false)
    }
  }

  return (
    <ModalWrapper isOpen={isOpen}>
      <h1 className="text-2xl font-semibold">
        {customTitle ??
          t('deleteConfirmation.title', {
            itemName: finalItemName
          })}
      </h1>
      <p className="mt-2 text-bg-500">
        {customText ?? t('deleteConfirmation.desc', { itemName })}
      </p>
      <div className="mt-6 flex w-full flex-col-reverse justify-around gap-2 sm:flex-row">
        <Button
          className="w-full"
          icon=""
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>
        <Button
          isRed
          className="w-full"
          icon={customConfirmButtonIcon ?? 'tabler:trash'}
          loading={loading}
          onClick={() => {
            if (customOnClick !== undefined) {
              setLoading(true)
              customOnClick().finally(() => setLoading(false))
              return
            }
            deleteData().catch(console.error)
          }}
        >
          {customConfirmButtonText ?? 'Delete'}
        </Button>
      </div>
    </ModalWrapper>
  )
}

export default DeleteConfirmationModal

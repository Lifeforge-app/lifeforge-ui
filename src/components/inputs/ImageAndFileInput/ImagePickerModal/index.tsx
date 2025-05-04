import { useEffect, useMemo, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@components/buttons'
import { ModalHeader } from '@components/modals'
import { Tabs } from '@components/utilities'

import {
  type IPixabaySearchFilter,
  type PixabaySearchFilterAction
} from '../../../../interfaces/pixabay_interfaces'
import AIImageGenerator from './components/AIImageGenerator'
import ImageURL from './components/ImageURL'
import LocalUpload from './components/LocalUpload'
import Pixabay from './components/Pixabay'
import SearchFilterModal from './components/Pixabay/components/SearchFilterModal'

const initialFilter: IPixabaySearchFilter = {
  imageType: 'all',
  category: '',
  colors: '',
  isEditorsChoice: false
}

function reducer(
  state: IPixabaySearchFilter,
  action: PixabaySearchFilterAction
): typeof initialFilter {
  switch (action.type) {
    case 'SET_IMAGE_TYPE':
      return { ...state, imageType: action.payload }
    case 'SET_CATEGORY':
      return { ...state, category: action.payload }
    case 'SET_COLORS':
      return { ...state, colors: action.payload }
    case 'SET_IS_EDITORS_CHOICE':
      return { ...state, isEditorsChoice: action.payload }
    default:
      return state
  }
}

function ImagePickerModal({
  isOpen,
  onClose,
  enablePixabay = false,
  enableUrl = false,
  enableAI = false,
  defaultAIPrompt = '',
  acceptedMimeTypes,
  onSelect
}: {
  isOpen: boolean
  onClose: () => void
  enablePixabay?: boolean
  enableUrl?: boolean
  enableAI?: boolean
  defaultAIPrompt?: string
  acceptedMimeTypes: Record<string, string[]>
  onSelect: (file: string | File, preview: string | null) => Promise<void>
}) {
  const { t } = useTranslation('common.modals')
  const [file, setFile] = useState<File | string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [mode, setMode] = useState<'local' | 'url' | 'pixabay' | 'ai'>('local')
  const [loading, setLoading] = useState(false)

  const [isSearchFilterModalOpen, setIsSearchFilterModalOpen] = useState(false)
  const [filters, updateFilters] = useReducer(reducer, initialFilter)

  useEffect(() => {
    if (!isOpen) {
      setFile(null)
      setMode('local')
    }
  }, [isOpen])

  const finalRenderedComponent = useMemo(() => {
    if (isSearchFilterModalOpen) {
      return (
        <SearchFilterModal
          filters={filters}
          isOpen={isSearchFilterModalOpen}
          updateFilters={updateFilters}
          onClose={() => {
            setIsSearchFilterModalOpen(false)
          }}
        />
      )
    }

    return (
      <>
        {(enablePixabay || enableUrl) && (
          <Tabs
            active={mode}
            enabled={(['local', 'url', 'pixabay', 'ai'] as const).filter(
              name =>
                name === 'local' ||
                (name === 'pixabay' && enablePixabay) ||
                (name === 'url' && enableUrl) ||
                (name === 'ai' && enableAI)
            )}
            items={[
              {
                name: t('imagePicker.local'),
                icon: 'tabler:upload',
                id: 'local'
              },
              {
                name: t('imagePicker.url'),
                icon: 'tabler:link',
                id: 'url'
              },
              {
                name: t('imagePicker.pixabay'),
                icon: 'simple-icons:pixabay',
                id: 'pixabay'
              },
              {
                name: t('imagePicker.ai'),
                icon: 'tabler:robot',
                id: 'ai'
              }
            ]}
            onNavClick={(id: 'local' | 'url' | 'pixabay' | 'ai') => {
              setMode(id)
              setFile(null)
            }}
          />
        )}
        <div className="flex h-full min-h-0 flex-1 flex-col overflow-auto">
          {(() => {
            switch (mode) {
              case 'local':
                return (
                  <LocalUpload
                    acceptedMimeTypes={acceptedMimeTypes}
                    file={file}
                    preview={preview}
                    setFile={setFile}
                    setPreview={setPreview}
                  />
                )
              case 'url':
                return (
                  <ImageURL
                    file={file}
                    setFile={setFile}
                    setPreview={setPreview}
                  />
                )
              case 'pixabay':
                return (
                  <Pixabay
                    file={file}
                    filters={filters}
                    setFile={setFile}
                    setIsSearchFilterModalOpen={setIsSearchFilterModalOpen}
                    setPreview={setPreview}
                  />
                )
              case 'ai':
                return (
                  <AIImageGenerator
                    file={file}
                    setFile={setFile}
                    setPreview={setPreview}
                    defaultPrompt={defaultAIPrompt || ''}
                  />
                )
            }
          })()}
        </div>
        <Button
          className="mt-4"
          disabled={file === null}
          icon="tabler:check"
          loading={loading}
          onClick={() => {
            setLoading(true)
            onSelect(file as string | File, preview)
              .catch(console.error)
              .finally(() => {
                setLoading(false)
                onClose()
              })
          }}
        >
          select
        </Button>
      </>
    )
  }, [
    acceptedMimeTypes,
    defaultAIPrompt,
    enableAI,
    enablePixabay,
    enableUrl,
    file,
    filters,
    loading,
    mode,
    onClose,
    onSelect,
    preview,
    setFile,
    setPreview,
    t
  ])

  return (
    <>
      <ModalHeader
        icon="tabler:photo"
        title="imagePicker.title"
        onClose={onClose}
      />
      {finalRenderedComponent}
    </>
  )
}

export default ImagePickerModal

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@components/buttons'
import { ModalHeader, ModalWrapper } from '@components/modals'
import { Tabs } from '@components/utilities'

import AIImageGenerator from './components/AIImageGenerator'
import ImageURL from './components/ImageURL'
import LocalUpload from './components/LocalUpload'
import Pixabay from './components/Pixabay'

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

  useEffect(() => {
    if (!isOpen) {
      setFile(null)
      setMode('local')
    }
  }, [isOpen])

  return (
    <ModalWrapper
      className="overflow-hidden"
      isOpen={isOpen}
      minWidth="70vw"
      zIndex={1000}
    >
      <ModalHeader
        icon="tabler:photo"
        title="imagePicker.title"
        onClose={onClose}
      />
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
                  setFile={setFile}
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
    </ModalWrapper>
  )
}

export default ImagePickerModal

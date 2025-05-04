import { Icon } from '@iconify/react'
import { useState } from 'react'

import { GoBackButton } from '@components/buttons'
import { ModalHeader } from '@components/modals'

import IconSet from './pages/IconSet'
import IconSetList from './pages/IconSetList/index'
import Search from './pages/Search'

function IconPickerModal({
  setOpen,
  setSelectedIcon
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedIcon: (icon: string) => void
}) {
  const [currentIconSet, setCurrentIconSet] = useState<{
    iconSet?: string
    search?: string
  } | null>(null)

  function renderContent() {
    if (currentIconSet === null) {
      return <IconSetList setCurrentIconSet={setCurrentIconSet} />
    }

    if (currentIconSet.search !== undefined) {
      return (
        <Search
          searchTerm={currentIconSet.search}
          setCurrentIconSetProp={setCurrentIconSet}
          setOpen={setOpen}
          setSelectedIcon={setSelectedIcon}
        />
      )
    }

    return (
      <IconSet
        iconSet={currentIconSet.iconSet ?? ''}
        setOpen={setOpen}
        setSelectedIcon={setSelectedIcon}
      />
    )
  }

  return (
    <>
      {currentIconSet !== null ? (
        <div className="mb-8 flex-between flex w-full">
          <GoBackButton onClick={() => setCurrentIconSet(null)} />
          <button
            className="rounded-md p-2 text-bg-500 transition-all hover:bg-bg-100 hover:text-bg-800 dark:hover:bg-bg-800 dark:hover:text-bg-50"
            onClick={() => {
              setCurrentIconSet(null)
              setSelectedIcon('')
              setOpen(false)
            }}
          >
            <Icon className="size-6" icon="tabler:x" />
          </button>
        </div>
      ) : (
        <ModalHeader
          appendTitle={
            <p className="shrink-0 text-right text-sm sm:text-base">
              powered by&nbsp;
              <a
                className="underline"
                href="https://iconify.design"
                rel="noreferrer"
                target="_blank"
              >
                Iconify
              </a>
            </p>
          }
          icon="tabler:icons"
          title="iconPicker.title"
          onClose={() => {
            setOpen(false)
          }}
        />
      )}
      {renderContent()}
    </>
  )
}

export default IconPickerModal

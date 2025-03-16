import { Switch } from '@headlessui/react'
import { Icon } from '@iconify/react'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { type PixabaySearchFilterAction } from '@interfaces/pixabay_interfaces'

interface EditorsChoiceSwitchProps {
  isEditorsChoice: boolean
  updateFilters: React.ActionDispatch<[action: PixabaySearchFilterAction]>
}

const EditorsChoiceSwitch: React.FC<EditorsChoiceSwitchProps> = ({
  isEditorsChoice,
  updateFilters
}) => {
  const { t } = useTranslation('common.modals')

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Icon className="size-6" icon="tabler:user-star" />
        <span className="text-lg">{t('imageUpload.inputs.editorsChoice')}</span>
      </div>
      <Switch
        checked={isEditorsChoice}
        className={clsx(
          'relative inline-flex h-6 w-11 items-center rounded-full',
          isEditorsChoice ? 'bg-custom-500' : 'bg-bg-300 dark:bg-bg-800'
        )}
        onChange={() => {
          updateFilters({
            type: 'SET_IS_EDITORS_CHOICE',
            payload: !isEditorsChoice
          })
        }}
      >
        <span
          className={clsx(
            'inline-block size-4 rounded-full transition',
            isEditorsChoice
              ? 'bg-bg-100 translate-x-6'
              : 'bg-bg-100 dark:bg-bg-500 translate-x-1'
          )}
        />
      </Switch>
    </div>
  )
}

export default EditorsChoiceSwitch

import { Icon } from '@iconify/react/dist/iconify.js'
import _ from 'lodash'
import { useTranslation } from 'react-i18next'

import {
  IFieldProps,
  IFormCheckboxFieldProps
} from '@interfaces/modal_interfaces'

import { Switch } from '@components/buttons'

interface FormCheckboxInputProps<T> {
  field: IFieldProps<T> & IFormCheckboxFieldProps
  selectedData: boolean
  namespace: string
  handleChange: (value: boolean) => void
}

function FormCheckboxInput<T>({
  field,
  selectedData,
  namespace,
  handleChange
}: FormCheckboxInputProps<T>) {
  const { t } = useTranslation(namespace)

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Icon className="size-6" icon={field.icon} />
        <span className="text-lg">
          {t([
            ['inputs', _.camelCase(field.label), 'label']
              .filter(e => e)
              .join('.'),
            ['inputs', _.camelCase(field.label)].filter(e => e).join('.')
          ])}
        </span>
      </div>
      <Switch
        checked={selectedData}
        onChange={() => {
          handleChange(!selectedData)
        }}
      />
    </div>
  )
}

export default FormCheckboxInput

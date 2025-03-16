import {
  IFieldProps,
  ILocationInputFieldProps
} from '@interfaces/modal_interfaces'

import { LocationInput } from '@components/inputs'

interface FormLocationInputProps<T> {
  field: IFieldProps<T> & ILocationInputFieldProps
  selectedData: string
  namespace: string
  handleChange: (value: string) => void
}

function FormLocationInput<T>({
  field,
  selectedData,
  namespace,
  handleChange
}: FormLocationInputProps<T>) {
  return (
    <LocationInput
      label={field.label}
      location={selectedData}
      namespace={namespace}
      setLocation={value => handleChange(value ?? '')}
    />
  )
}

export default FormLocationInput

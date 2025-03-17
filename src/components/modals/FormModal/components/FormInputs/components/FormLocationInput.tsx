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
      disabled={field.disabled}
      label={field.label}
      location={selectedData}
      namespace={namespace}
      required={field.required}
      setLocation={value => handleChange(value ?? '')}
    />
  )
}

export default FormLocationInput

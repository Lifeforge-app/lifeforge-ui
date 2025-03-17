import {
  IColorInputFieldProps,
  IFieldProps
} from '@interfaces/modal_interfaces'

import { ColorInput } from '@components/inputs'

interface FormColorInputProps<T> {
  field: IFieldProps<T> & IColorInputFieldProps
  selectedData: string
  namespace: string
  handleChange: (value: string) => void
  setColorPickerOpen: () => void
}

function FormColorInput<T>({
  field,
  selectedData,
  namespace,
  handleChange,
  setColorPickerOpen
}: FormColorInputProps<T>) {
  return (
    <ColorInput
      color={selectedData}
      name={field.label}
      namespace={namespace}
      required={field.required}
      setColor={handleChange}
      setColorPickerOpen={setColorPickerOpen}
    />
  )
}

export default FormColorInput

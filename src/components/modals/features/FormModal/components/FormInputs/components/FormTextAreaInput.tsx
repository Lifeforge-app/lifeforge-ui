import {
  IFieldProps,
  ITextAreaInputFieldProps
} from '@interfaces/modal_interfaces'

import { TextAreaInput } from '@components/inputs'

interface FormTextAreaInputProps<T> {
  field: IFieldProps<T> & ITextAreaInputFieldProps
  selectedData: string
  namespace: string
  handleChange: (value: string) => void
}

function FormTextAreaInput<T>({
  field,
  selectedData,
  namespace,
  handleChange
}: FormTextAreaInputProps<T>) {
  return (
    <TextAreaInput
      darker
      disabled={field.disabled}
      name={field.label}
      namespace={namespace}
      placeholder={field.placeholder}
      required={field.required}
      setValue={handleChange}
      value={selectedData}
      icon={field.icon}
    />
  )
}

export default FormTextAreaInput

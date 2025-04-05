import { TextAreaInput } from '@lifeforge/ui/components/inputs'
import {
  IFieldProps,
  ITextAreaInputFieldProps
} from '@lifeforge/ui/interfaces/modal_interfaces'

interface FormTextAreaInputProps<T> {
  field: IFieldProps<T> & ITextAreaInputFieldProps
  selectedData: string
  namespace: string
  handleChange: (value: string) => void
  setQrScannerModalOpen: (id: string) => void
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

import { IDateInputFieldProps, IFieldProps } from '@interfaces/modal_interfaces'

import { DateInput } from '@components/inputs'

interface FormDateInputProps<T> {
  field: IFieldProps<T> & IDateInputFieldProps
  selectedData: Date | null
  namespace: string
  handleChange: (value: Date | null) => void
}

function FormDateInput<T>({
  field,
  selectedData,
  namespace,
  handleChange
}: FormDateInputProps<T>) {
  return (
    <DateInput
      darker
      date={selectedData}
      disabled={field.disabled}
      hasTime={field.hasTime}
      icon={field.icon}
      name={field.label}
      namespace={namespace}
      required={field.required}
      setDate={handleChange}
    />
  )
}

export default FormDateInput

import { IDateInputFieldProps, IFieldProps } from '@interfaces/modal_interfaces'

import { DateInput } from '@components/inputs'

interface FormDateInputProps<T> {
  field: IFieldProps<T> & IDateInputFieldProps
  selectedData: string
  namespace: string
  handleChange: (value: string) => void
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
      hasTime={field.hasTime}
      icon={field.icon}
      index={field.index}
      modalRef={field.modalRef}
      name={field.label}
      namespace={namespace}
      required={field.required}
      setDate={handleChange}
    />
  )
}

export default FormDateInput

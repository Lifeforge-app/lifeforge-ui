import { IFieldProps, IIconInputFieldProps } from '@interfaces/modal_interfaces'

import { IconInput } from '@components/inputs'

interface FormIconInputProps<T> {
  field: IFieldProps<T> & IIconInputFieldProps
  selectedData: string
  namespace: string
  handleChange: (value: string) => void
  setIconSelectorOpen: () => void
}

function FormIconInput<T>({
  field,
  selectedData,
  namespace,
  handleChange,
  setIconSelectorOpen
}: FormIconInputProps<T>) {
  return (
    <IconInput
      icon={selectedData}
      name={field.label}
      namespace={namespace}
      required={field.required}
      setIcon={handleChange}
      setIconSelectorOpen={setIconSelectorOpen}
    />
  )
}

export default FormIconInput

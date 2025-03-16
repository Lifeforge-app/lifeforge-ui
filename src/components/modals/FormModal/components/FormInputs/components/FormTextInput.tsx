import { IFieldProps, ITextInputFieldProps } from '@interfaces/modal_interfaces'

import { TextInput } from '@components/inputs'

interface FormTextInputProps<T> {
  field: IFieldProps<T> & ITextInputFieldProps
  selectedData: string
  namespace: string
  handleChange: (value: string) => void
  setQrScannerModalOpen: (id: string) => void
}

function FormTextInput<T>({
  field,
  selectedData,
  namespace,
  handleChange,
  setQrScannerModalOpen
}: FormTextInputProps<T>) {
  return (
    <TextInput
      darker
      actionButtonIcon={field.qrScanner ? 'tabler:qrcode' : ''}
      disabled={field.disabled}
      icon={field.icon}
      isPassword={field.isPassword}
      name={field.label}
      namespace={namespace}
      placeholder={field.placeholder}
      setValue={handleChange}
      value={selectedData}
      onActionButtonClick={() => {
        setQrScannerModalOpen(field.id as string)
      }}
    />
  )
}

export default FormTextInput

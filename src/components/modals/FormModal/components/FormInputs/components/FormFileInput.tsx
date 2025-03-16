import {
  IFieldProps,
  IImageAndFileInputFieldProps
} from '@interfaces/modal_interfaces'

import { ImageAndFileInput } from '@components/inputs'

interface FormFileInputProps<T> {
  field: IFieldProps<T> & IImageAndFileInputFieldProps
  selectedData: {
    image: string | File | null
    preview: string | null
  }
  namespace: string
  handleChange: (value: {
    image: string | File | null
    preview: string | null
  }) => void
  setImagePickerModalOpen: () => void
}

function FormFileInput<T>({
  field,
  selectedData,
  namespace,
  handleChange,
  setImagePickerModalOpen
}: FormFileInputProps<T>) {
  return (
    <ImageAndFileInput
      icon="tabler:file"
      image={selectedData.image}
      name={field.label}
      namespace={namespace}
      preview={selectedData.preview}
      setImage={value =>
        handleChange({
          ...selectedData,
          image: value
        })
      }
      setImagePickerModalOpen={() => {
        setImagePickerModalOpen()
        field.onFileRemoved?.()
      }}
      setPreview={value =>
        handleChange({
          ...selectedData,
          preview: value
        })
      }
      onImageRemoved={() =>
        handleChange({
          image: null,
          preview: null
        })
      }
    />
  )
}

export default FormFileInput

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
}

function FormFileInput<T>({
  field,
  selectedData,
  namespace,
  handleChange
}: FormFileInputProps<T>) {
  return (
    <ImageAndFileInput
      disabled={field.disabled}
      icon="tabler:file"
      image={selectedData.image}
      name={field.label}
      namespace={namespace}
      preview={selectedData.preview}
      required={field.required}
      setImage={value =>
        handleChange({
          ...selectedData,
          image: value
        })
      }
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
      enablePixabay
      enableUrl
      enableAI={field.enableAIImageGeneration}
      defaultAIPrompt={field.defaultImageGenerationPrompt}
      acceptedMimeTypes={{
        images: ['image/png', 'image/jpeg', 'image/webp']
      }}
    />
  )
}

export default FormFileInput

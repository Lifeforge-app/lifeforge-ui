import { useCallback } from 'react'

import { IFieldProps, IFormState } from '@interfaces/modal_interfaces'

import FormCheckboxInput from './components/FormCheckboxInput'
import FormColorInput from './components/FormColorInput'
import FormDateInput from './components/FormDateInput'
import FormFileInput from './components/FormFileInput'
import FormIconInput from './components/FormIconInput'
import FormListboxInput from './components/FormListboxInput'
import FormLocationInput from './components/FormLocationInput'
import FormTextAreaInput from './components/FormTextAreaInput'
import FormTextInput from './components/FormTextInput'

function FormInputs<T>({
  fields,
  data,
  setData,
  namespace,
  setIconSelectorOpen,
  setImagePickerModalOpen,
  setQrScannerModalOpen
}: {
  fields: IFieldProps<T>[]
  data: T
  setData: React.Dispatch<React.SetStateAction<T>>
  namespace: string
  setIconSelectorOpen: (id: string) => void
  setImagePickerModalOpen: (id: string) => void
  setQrScannerModalOpen: (id: string) => void
}) {
  const handleChange = useCallback((field: IFieldProps<T>) => {
    return (value: IFormState[string]) => {
      setData(prev => ({ ...prev, [field.id]: value }))
    }
  }, [])

  return (
    <div className="space-y-4">
      {fields.map(field => {
        const selectedData = data[field.id]

        if (field.hidden) {
          return <></>
        }

        switch (field.type) {
          case 'text':
            return (
              <FormTextInput
                key={field.id as string}
                field={field as IFieldProps<T> & { type: 'text' }}
                handleChange={handleChange(field)}
                namespace={namespace}
                selectedData={selectedData as string}
                setQrScannerModalOpen={setQrScannerModalOpen}
              />
            )
          case 'textarea':
            return (
              <FormTextAreaInput
                key={field.id as string}
                field={field as IFieldProps<T> & { type: 'textarea' }}
                handleChange={handleChange(field)}
                namespace={namespace}
                selectedData={selectedData as string}
              />
            )
          case 'datetime':
            return (
              <FormDateInput
                key={field.id as string}
                field={field as IFieldProps<T> & { type: 'datetime' }}
                handleChange={handleChange(field)}
                namespace={namespace}
                selectedData={selectedData as string}
              />
            )
          case 'listbox':
            return (
              <FormListboxInput
                key={field.id as string}
                field={field as IFieldProps<T> & { type: 'listbox' }}
                handleChange={handleChange(field)}
                namespace={namespace}
                selectedData={selectedData as string | string[]}
              />
            )
          case 'color':
            return (
              <FormColorInput
                key={field.id as string}
                field={field as IFieldProps<T> & { type: 'color' }}
                handleChange={handleChange(field)}
                namespace={namespace}
                selectedData={selectedData as string}
              />
            )
          case 'icon':
            return (
              <FormIconInput
                key={field.id as string}
                field={field as IFieldProps<T> & { type: 'icon' }}
                handleChange={handleChange(field)}
                namespace={namespace}
                selectedData={selectedData as string}
                setIconSelectorOpen={() =>
                  setIconSelectorOpen(field.id as string)
                }
              />
            )
          case 'location':
            return (
              <FormLocationInput
                key={field.id as string}
                field={field as IFieldProps<T> & { type: 'location' }}
                handleChange={handleChange(field)}
                namespace={namespace}
                selectedData={selectedData as string}
              />
            )
          case 'checkbox':
            return (
              <FormCheckboxInput
                key={field.id as string}
                field={field as IFieldProps<T> & { type: 'checkbox' }}
                handleChange={handleChange(field)}
                namespace={namespace}
                selectedData={selectedData as boolean}
              />
            )
          case 'file':
            return (
              <FormFileInput
                key={field.id as string}
                field={field as IFieldProps<T> & { type: 'file' }}
                handleChange={handleChange(field)}
                namespace={namespace}
                selectedData={
                  selectedData as {
                    image: string | File | null
                    preview: string | null
                  }
                }
                setImagePickerModalOpen={() =>
                  setImagePickerModalOpen(field.id as string)
                }
              />
            )
          default:
            return <></>
        }
      })}
    </div>
  )
}

export default FormInputs

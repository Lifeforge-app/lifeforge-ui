interface ITextInputFieldProps {
  label: string
  icon: string
  type: 'text'
  isPassword?: boolean
  placeholder: string
  qrScanner?: boolean
}

interface IDateInputFieldProps {
  label: string
  icon: string
  type: 'datetime'
  index: number
  hasTime?: boolean
  modalRef: React.RefObject<HTMLDivElement | null>
}

interface IListboxInputFieldProps {
  label: string
  icon: string
  type: 'listbox'
  options: Array<{
    value: string
    text: string
    icon?: string
    color?: string
  }>
  nullOption?: string
  multiple?: boolean
}

interface IColorInputFieldProps {
  label: string
  type: 'color'
}

interface IIconInputFieldProps {
  label: string
  type: 'icon'
}

interface IImageAndFileInputFieldProps {
  label: string
  type: 'file'
  onFileRemoved?: () => void
}

interface ILocationInputFieldProps {
  label: string
  type: 'location'
}

type IFieldProps<T> = (
  | ITextInputFieldProps
  | IDateInputFieldProps
  | IListboxInputFieldProps
  | IColorInputFieldProps
  | IIconInputFieldProps
  | IImageAndFileInputFieldProps
  | ILocationInputFieldProps
) & {
  id: keyof T
  hidden?: boolean
  required?: boolean
  disabled?: boolean
}

type IFormState = Record<
  string,
  string | string[] | { image: File | string | null; preview: string | null }
>

export type {
  IFieldProps,
  IFormState,
  ITextInputFieldProps,
  IDateInputFieldProps,
  IListboxInputFieldProps,
  IColorInputFieldProps,
  IIconInputFieldProps,
  IImageAndFileInputFieldProps,
  ILocationInputFieldProps
}

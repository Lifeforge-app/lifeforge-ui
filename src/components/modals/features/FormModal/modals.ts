import { ColorPickerModal, IconPickerModal } from '@components/inputs'
import { ModalComponent } from '@components/modals/core/useModalStore'

export const FormModalModals: Record<string, ModalComponent> = {
  'formModal.iconPicker': IconPickerModal,
  'formModal.colorPicker': ColorPickerModal
}

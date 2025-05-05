/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react'

import { ModalComponent, useModalStore } from './useModalStore'

export function registerModuleModals(
  modals: Record<string, ModalComponent<any>>
) {
  const register = useModalStore.getState().register
  Object.entries(modals).forEach(([key, component]) => {
    register(key, component)
  })
}

export function unregisterModuleModals(keys: string[]) {
  const unregister = useModalStore.getState().unregister
  keys.forEach(key => {
    unregister(key)
  })
}

export default function useModalsEffect(
  modals: Record<string, ModalComponent<any>>
) {
  useEffect(() => {
    registerModuleModals(modals)
    return () => {
      unregisterModuleModals(Object.keys(modals))
    }
  }, [])
}

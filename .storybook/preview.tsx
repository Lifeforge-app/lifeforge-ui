import type { Preview } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useEffect } from 'react'
import React from 'react'

import { FileAndImagePickerModal } from '../src/components/inputs'
import ColorPickerModal from '../src/components/inputs/ColorInput/ColorPickerModal'
import IconPickerModal from '../src/components/inputs/IconInput/IconPickerModal'
import ModalManager from '../src/components/modals/core/ModalManager'
import { ModalComponent } from '../src/components/modals/core/useModalStore'
import useModalsEffect from '../src/components/modals/core/useModalsEffect'
import DeleteConfirmationModal from '../src/components/modals/features/DeleteConfirmationModal'
import '../src/index.css'
import { LifeforgeUIProvider } from '../src/providers/LifeforgeUIProvider'

const queryClient = new QueryClient()

const DEFAULT_MODALS: Record<string, ModalComponent> = {
  deleteConfirmation: DeleteConfirmationModal,
  iconPicker: IconPickerModal,
  colorPicker: ColorPickerModal,
  fileAndImagePicker: FileAndImagePickerModal
}

const withBodyClass = (Story, context) => {
  useEffect(() => {
    document.body.classList.remove('bg-bg-50', 'bg-bg-900')
    document.body.classList.add(
      'flex',
      'items-center',
      'justify-center',
      'min-h-dvh',
      'theme-blue',
      'bg-zinc',
      'transition-all',
      ...(context.globals.theme === 'dark'
        ? ['bg-bg-900', 'text-bg-100']
        : ['bg-bg-50', 'text-bg-800'])
    )

    if (context.globals.theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [context.globals.theme])

  useModalsEffect(DEFAULT_MODALS)

  return (
    <QueryClientProvider client={queryClient}>
      <LifeforgeUIProvider
        personalization={{
          theme: context.globals.theme,
          themeColor: 'blue'
        }}
      >
        <div className="bg-white">
          <div
            className={`bg-zinc theme-blue flex min-h-dvh w-full items-center justify-center transition-all ${
              context.globals.theme === 'dark' ? 'dark' : ''
            } ${context.globals.theme === 'dark' ? 'bg-bg-900' : 'bg-bg-200/50'}`}
          >
            <Story />
          </div>
        </div>
        <ModalManager />
      </LifeforgeUIProvider>
    </QueryClientProvider>
  )
}

const preview: Preview = {
  parameters: {
    toolbar: {
      hidden: ['DARK_MODE', 'zoom', 'grid']
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [withBodyClass],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Light / Dark mode',
      defaultValue: 'light',
      toolbar: {
        icon: 'circlehollow',
        items: [
          {
            value: 'light',
            title: 'Light Mode',
            icon: 'sun'
          },
          {
            value: 'dark',
            title: 'Dark Mode',
            icon: 'moon'
          }
        ],
        showName: true,
        dynamicTitle: true
      }
    }
  },
  initialGlobals: {
    theme: 'light'
  }
}

export default preview

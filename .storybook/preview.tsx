import type { Preview } from '@storybook/react'
import React, { useEffect } from 'react'

import '../src/index.css'
import { LifeforgeUIProvider } from '../src/providers/LifeforgeUIProvider'

const withBodyClass = (Story, context) => {
  useEffect(() => {
    document.body.classList.remove('bg-bg-50', 'bg-bg-900')
    document.body.classList.add(
      'flex',
      'items-center',
      'justify-center',
      'min-h-dvh',
      'theme-lime',
      'bg-zinc',
      'transition-all',
      context.globals.theme === 'dark' ? 'bg-bg-900' : 'bg-bg-50'
    )

    if (context.globals.theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [context.globals.theme])

  return (
    <LifeforgeUIProvider
      personalization={{
        theme: context.globals.theme,
        themeColor: 'blue'
      }}
    >
      <div className="bg-white">
        <div
          className={`w-full min-h-dvh flex items-center justify-center bg-zinc theme-blue transition-all ${
            context.globals.theme === 'dark' ? 'dark' : ''
          } ${context.globals.theme === 'dark' ? 'bg-bg-900' : 'bg-bg-200/50'}`}
        >
          <Story />
        </div>
      </div>
    </LifeforgeUIProvider>
  )
}

const preview: Preview = {
  parameters: {
    toolbar: {
      hidden: ['DARK_MODE', 'zoom', 'grid'] // 你可以移除多个按钮
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
      defaultValue: 'light', // 默认是 Light Mode
      toolbar: {
        icon: 'circlehollow', // Storybook Toolbar 图标
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
        ], // 切换选项
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

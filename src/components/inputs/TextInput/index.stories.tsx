import type { Meta, StoryObj } from '@storybook/react'

import Index from './index'

const meta = {
  component: Index
} satisfies Meta<typeof Index>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    icon: 'tabler:user',
    name: 'Username',
    placeholder: 'John Doe',
    setValue: () => {},
    darker: true,
    namespace: false,
    value: ''
  }
}

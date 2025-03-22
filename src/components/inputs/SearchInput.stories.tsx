import type { Meta, StoryObj } from '@storybook/react'

import SearchInput from './SearchInput'

const meta = {
  component: SearchInput
} satisfies Meta<typeof SearchInput>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    searchQuery: '',
    setSearchQuery: () => {},
    stuffToSearch: 'stuffToSearch',
    namespace: 'namespace'
  },
  render: args => (
    <div className="w-full px-32">
      <SearchInput {...args} />
    </div>
  )
}

export const WithSideIcon: Story = {
  args: {
    searchQuery: '',
    setSearchQuery: () => {},
    stuffToSearch: 'stuffToSearch',
    namespace: 'namespace',
    sideButtonIcon: 'tabler:filter',
    onSideButtonClick: () => {}
  },
  render: args => (
    <div className="w-full px-32">
      <SearchInput {...args} />
    </div>
  )
}

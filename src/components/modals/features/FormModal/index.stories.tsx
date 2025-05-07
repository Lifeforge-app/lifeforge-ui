import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import Index from './index'
import FormModal from './index'

const meta = {
  component: Index
} satisfies Meta<typeof Index>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    fields: [],
    title: 'title',
    icon: 'tabler:plus',
    onClose: () => {},
    namespace: 'namespace',
    data: {},
    setData: () => {}
  },
  render: args => {
    const [data, setData] = useState({
      name: '',
      icon: '',
      color: ''
    })

    return (
      <FormModal
        {...args}
        data={data}
        setData={setData}
        fields={[
          {
            id: 'name',
            label: 'Name',
            type: 'text',
            required: true,
            placeholder: 'Name',
            icon: 'tabler:text-caption'
          },
          {
            id: 'icon',
            label: 'Icon',
            type: 'icon',
            required: true
          },
          {
            id: 'color',
            label: 'Color',
            type: 'color',
            required: true
          }
        ]}
      />
    )
  }
}

import { Icon } from '@iconify/react'

import { type PixabaySearchFilterAction } from '@interfaces/pixabay_interfaces'

import {
  ListboxOrComboboxInput,
  ListboxOrComboboxOption
} from '@components/inputs'

import { CATEGORIES } from '../constants/filterOptions'

interface CategoryFilterProps {
  category: string
  updateFilters: React.ActionDispatch<[action: PixabaySearchFilterAction]>
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  category,
  updateFilters
}) => {
  return (
    <ListboxOrComboboxInput
      buttonContent={
        <>
          <Icon
            className="size-5"
            icon={CATEGORIES.find(l => l.id === category)?.icon ?? ''}
          />
          <span className="-mt-px block truncate">
            {CATEGORIES.find(l => l.id === category)?.name ?? 'None'}
          </span>
        </>
      }
      icon="tabler:category"
      name="image Category"
      namespace="common.modals"
      setValue={value => {
        updateFilters({ type: 'SET_CATEGORY', payload: value })
      }}
      tKey="imagePicker"
      type="listbox"
      value={category}
    >
      {CATEGORIES.map(({ name, icon, id }, i) => (
        <ListboxOrComboboxOption key={i} icon={icon} text={name} value={id} />
      ))}
    </ListboxOrComboboxInput>
  )
}

export default CategoryFilter

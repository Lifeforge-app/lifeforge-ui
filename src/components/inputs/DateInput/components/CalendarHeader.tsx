import { Select } from '@headlessui/react'
import dayjs from 'dayjs'
import { range } from 'lodash'
import React from 'react'

import { Button } from '@components/buttons'

function CalendarHeader({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled
}: {
  date: Date
  changeYear: (year: number) => void
  changeMonth: (month: number) => void
  decreaseMonth: () => void
  increaseMonth: () => void
  prevMonthButtonDisabled: boolean
  nextMonthButtonDisabled: boolean
}) {
  const years = range(1990, dayjs().year() + 10)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  return (
    <div className="flex-between px-4 py-2 text-bg-800 dark:text-bg-100">
      <Button
        icon="tabler:chevron-left"
        className="p-2! dark:hover:bg-bg-700/30!"
        variant="plain"
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
      />
      <div className="flex items-center gap-2">
        <Select
          className="rounded-md p-2 pr-3 text-base font-medium transition-all hover:bg-bg-200/30 dark:hover:bg-bg-700/30"
          value={dayjs(date).year()}
          onChange={({ target: { value } }) => changeYear(+value)}
        >
          {years.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
        <Select
          className="rounded-md p-2 pr-3 text-base font-medium transition-all hover:bg-bg-200/30 dark:hover:bg-bg-700/30"
          value={months[dayjs(date).month()]}
          onChange={({ target: { value } }) =>
            changeMonth(months.indexOf(value))
          }
        >
          {months.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>
      <Button
        icon="tabler:chevron-right"
        className="p-2! dark:hover:bg-bg-700/30!"
        variant="plain"
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
      />
    </div>
  )
}

export default CalendarHeader

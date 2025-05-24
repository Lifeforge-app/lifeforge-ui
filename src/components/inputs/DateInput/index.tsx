import _ from 'lodash'
import { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import tinycolor from 'tinycolor2'

import './index.css'
import 'react-datepicker/dist/react-datepicker.css'

import { Button } from '@components/buttons'

import useThemeColors from '@hooks/useThemeColor'

import InputIcon from '../shared/InputIcon'
import InputLabel from '../shared/InputLabel'
import InputWrapper from '../shared/InputWrapper'
import CalendarHeader from './components/CalendarHeader'

interface DateInputProps {
  date: Date | null
  setDate: (date: Date | null) => void
  name: string
  icon: string
  className?: string
  darker?: boolean
  required?: boolean
  hasTime?: boolean
  namespace: string | false
  disabled?: boolean
}

function DateInput({
  date,
  setDate,
  name,
  icon,
  className = '',
  darker = false,
  required,
  hasTime = false,
  namespace,
  disabled
}: DateInputProps) {
  const { t } = useTranslation(namespace ? namespace : undefined)
  const ref = useRef<HTMLInputElement | null>(null)
  const { theme } = useThemeColors()
  const [isCalendarOpen, setCalendarOpen] = useState(false)

  return (
    <InputWrapper className={className} darker={darker} disabled={disabled}>
      <InputIcon active={!!date} icon={icon} isFocused={isCalendarOpen} />
      <div ref={ref} className="flex w-full items-center gap-2">
        <InputLabel
          active={!!date}
          focused={isCalendarOpen}
          label={
            namespace !== false
              ? t([
                  ['inputs', _.camelCase(name), 'label']
                    .filter(e => e)
                    .join('.'),
                  ['inputs', _.camelCase(name)].filter(e => e).join('.'),
                  name
                ])
              : name
          }
          required={required === true}
        />
        <DatePicker
          className="mt-6 h-13 w-full rounded-lg border-none bg-transparent px-4 tracking-wider outline-hidden placeholder:text-transparent focus:outline-hidden focus:placeholder:text-bg-500"
          selected={date}
          calendarClassName={
            tinycolor(theme).isLight() ? 'theme-light' : 'theme-dark'
          }
          onChange={setDate}
          dateFormat={hasTime ? 'MMMM d, yyyy h:mm aa' : 'MMMM d, yyyy'}
          portalId="app"
          shouldCloseOnSelect
          showTimeSelect={hasTime}
          onCalendarOpen={() => {
            setCalendarOpen(true)
          }}
          onCalendarClose={() => {
            setCalendarOpen(false)
          }}
          showPopperArrow={false}
          renderCustomHeader={CalendarHeader}
          weekDayClassName={(date: Date) => {
            const isWeekend = date.getDay() === 0
            return isWeekend ? 'text-red-500!' : 'text-bg-500!'
          }}
        />
        {!!date && (
          <Button
            variant="plain"
            onClick={() => {
              setDate(null)
            }}
            icon="tabler:x"
            className="mr-4 p-2! hover:bg-bg-300 dark:hover:bg-bg-700/30!"
          />
        )}
      </div>
    </InputWrapper>
  )
}

export default DateInput

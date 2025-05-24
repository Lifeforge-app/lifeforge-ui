import dayjs from 'dayjs'
import _ from 'lodash'
import { useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'
import tinycolor from 'tinycolor2'

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
          shouldCloseOnSelect
          calendarClassName={
            tinycolor(theme).isLight() ? 'theme-light' : 'theme-dark'
          }
          className="h-13 outline-hidden focus:outline-hidden focus:placeholder:text-bg-500 mt-6 w-full rounded-lg border-none bg-transparent px-4 tracking-wider placeholder:text-transparent"
          dateFormat={hasTime ? 'MMMM d, yyyy h:mm aa' : 'MMMM d, yyyy'}
          formatWeekDay={(date: string) => {
            return date.slice(0, 3)
          }}
          placeholderText={`August 7, ${dayjs().year()}${
            hasTime ? ' 08:07 AM' : ''
          }`}
          popperPlacement="bottom-start"
          portalId="app"
          renderCustomHeader={CalendarHeader}
          selected={date}
          showPopperArrow={false}
          showTimeSelect={hasTime}
          weekDayClassName={(date: Date) => {
            const isWeekend = date.getDay() === 0
            return isWeekend ? 'text-red-500!' : 'text-bg-500!'
          }}
          onCalendarClose={() => {
            setCalendarOpen(false)
          }}
          onCalendarOpen={() => {
            setCalendarOpen(true)
          }}
          onChange={setDate}
        />
        {!!date && (
          <Button
            className="p-2! hover:bg-bg-300 dark:hover:bg-bg-700/30! mr-4"
            icon="tabler:x"
            variant="plain"
            onClick={() => {
              setDate(null)
            }}
          />
        )}
      </div>
    </InputWrapper>
  )
}

export default DateInput

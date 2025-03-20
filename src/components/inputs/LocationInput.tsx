import { useLifeforgeUIContext } from '@providers/LifeforgeUIProvider'
import { useDebounce } from '@uidotdev/usehooks'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ListboxOrComboboxInput,
  ListboxOrComboboxOption
} from '@components/inputs'
import { APIFallbackComponent } from '@components/screens'

import useFetch from '@hooks/useFetch'

import fetchAPI from '@utils/fetchAPI'

import { Tooltip } from '../utilities'

export interface ILocationAutoComplete {
  predictions: Prediction[]
  status: string
}

export interface Prediction {
  description: string
  matched_substrings: Array<{
    length: number
    offset: number
  }>
  place_id: string
  reference: string
  structured_formatting: {
    main_text: string
    main_text_matched_substrings: Array<{
      length: number
      offset: number
    }>
    secondary_text: string
  }
  terms: Array<{
    offset: number
    value: string
  }>
  types: string[]
}

function LocationInput({
  location,
  setLocation,
  namespace,
  label,
  required,
  disabled
}: {
  location: string | null
  setLocation: (value: string | null) => void
  namespace: string
  label?: string
  required?: boolean
  disabled?: boolean
}) {
  const { t } = useTranslation('common.misc')
  const { apiHost } = useLifeforgeUIContext()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [enabled, setEnabled] = useState(false)
  const [data, , setData] = useFetch<{
    predictions: Prediction[]
    status: string
  }>(`/locations?q=${debouncedQuery}`, debouncedQuery.trim() !== '')

  useEffect(() => {
    if (query.trim() === '') {
      setData('loading')
    }
  }, [query])

  useEffect(() => {
    fetchAPI<boolean>(apiHost, '/locations/enabled').then(enabled =>
      setEnabled(enabled)
    )
  }, [])

  return (
    <div className="relative flex w-full items-center gap-4">
      <ListboxOrComboboxInput
        className="w-full"
        customActive={Boolean(location)}
        disabled={!enabled || disabled}
        displayValue={value => value ?? ''}
        icon="tabler:map-pin"
        name={label || 'Location'}
        namespace={namespace}
        required={required}
        setQuery={setQuery}
        setValue={setLocation}
        type="combobox"
        value={location}
      >
        {query.trim() !== '' && (
          <APIFallbackComponent data={data}>
            {data => (
              <>
                {data.predictions.map((prediction: Prediction) => (
                  <ListboxOrComboboxOption
                    key={prediction.place_id}
                    matchedSubstrings={prediction.matched_substrings}
                    text={prediction.description}
                    type="combobox"
                    value={prediction.description}
                  />
                ))}
              </>
            )}
          </APIFallbackComponent>
        )}
      </ListboxOrComboboxInput>
      {!enabled && (
        <div className="absolute top-1/2 right-6 flex-center -translate-y-1/2 gap-2 text-bg-500">
          {t('locationDisabled.title')}
          <Tooltip
            icon="tabler:info-circle"
            id="location-disabled"
            tooltipProps={{
              positionStrategy: 'fixed',
              clickable: true,
              place: 'top-end'
            }}
          >
            <p className="max-w-64 text-bg-500">
              {t('locationDisabled.description')}{' '}
              <a
                className="font-medium text-custom-500 underline decoration-custom-500 decoration-2"
                href="https://docs.lifeforge.melvinchia.dev/user-guide/api-keys#location"
                rel="noopener noreferrer"
                target="_blank"
              >
                API Keys Guide
              </a>
            </p>
          </Tooltip>
        </div>
      )}
    </div>
  )
}

export default LocationInput

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
  required
}: {
  location: string | null
  setLocation: (value: string | null) => void
  namespace: string
  label?: string
  required?: boolean
}) {
  const { t } = useTranslation('common.misc')
  const { apiHost } = useLifeforgeUIContext()
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 500)
  const [enabled, setEnabled] = useState(false)
  const [data, , setData] = useFetch<any>(
    `/locations?q=${debouncedQuery}`,
    debouncedQuery.trim() !== ''
  )

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
    <div className="w-full flex items-center gap-4 relative">
      <ListboxOrComboboxInput
        className="w-full"
        customActive={Boolean(location)}
        disabled={!enabled}
        displayValue={(value: string) => value}
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
            {(data: any) => (
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
        <div className="absolute top-1/2 right-6 -translate-y-1/2 flex-center gap-2 text-bg-500">
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
                className="font-medium underline text-custom-500 decoration-custom-500 decoration-2"
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

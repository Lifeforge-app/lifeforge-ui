import { useLifeforgeUIContext } from '@providers/LifeforgeUIProvider'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@components/buttons'
import { SearchInput } from '@components/inputs'
import {
  EmptyStateScreen,
  ErrorScreen,
  LoadingScreen
} from '@components/screens'

import fetchAPI from '@utils/fetchAPI'

import {
  type IPixabaySearchFilter,
  type IPixabaySearchResult
} from '../../../../../../interfaces/pixabay_interfaces'
import SearchResults from './components/SearchResults'

function Pixabay({
  file,
  setFile,
  setPreview,
  filters,
  setIsSearchFilterModalOpen
}: {
  file: string | File | null
  setFile: React.Dispatch<React.SetStateAction<string | File | null>>
  setPreview: React.Dispatch<React.SetStateAction<string | null>>
  filters: IPixabaySearchFilter
  setIsSearchFilterModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
  const { apiHost } = useLifeforgeUIContext()
  const [query, setQuery] = useState('')

  const [results, setResults] = useState<'error' | IPixabaySearchResult | null>(
    null
  )
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  async function onSearch(page: number): Promise<void> {
    if (loading) return

    if (query === '') {
      toast.error('Please enter a search query')
      return
    }

    setResults(null)
    setLoading(true)

    const params = new URLSearchParams({
      q: query,
      page: page.toString(), // TODO
      type: filters.imageType,
      category: filters.category,
      colors: filters.colors,
      editors_choice: filters.isEditorsChoice ? 'true' : 'false'
    })

    try {
      const data = await fetchAPI<IPixabaySearchResult>(
        apiHost,
        `pixabay/search?${params.toString()}`
      )
      setResults(data)
    } catch {
      setResults('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex w-full min-w-0 flex-col items-center gap-2 sm:flex-row">
        <SearchInput
          filterAmount={
            [
              filters.imageType !== 'all',
              filters.category,
              filters.colors,
              filters.isEditorsChoice
            ].filter(e => e).length
          }
          hasTopMargin={false}
          namespace="common.modals"
          searchQuery={query}
          setSearchQuery={setQuery}
          stuffToSearch="pixabay"
          tKey="pixabay"
          onFilterIconClick={() => {
            setIsSearchFilterModalOpen(true)
          }}
          onKeyUp={e => {
            if (e.key === 'Enter') {
              setPage(1)
              onSearch(1).catch(console.error)
            }
          }}
        />
        <Button
          iconAtEnd
          className="w-full sm:w-auto"
          icon="tabler:arrow-right"
          loading={loading}
          onClick={() => {
            setPage(1)
            onSearch(1).catch(console.error)
          }}
        >
          Search
        </Button>
      </div>
      <div className="mt-6 flex h-full flex-1 flex-col">
        {(() => {
          switch (results) {
            case 'error':
              return (
                <div className="flex-center size-full flex-1">
                  <ErrorScreen message="Failed to fetch data" />
                </div>
              )
            case null:
              return loading ? (
                <div className="flex-center size-full flex-1">
                  <LoadingScreen />
                </div>
              ) : (
                <div className="flex-center mb-6 size-full flex-1">
                  <EmptyStateScreen
                    icon="simple-icons:pixabay"
                    name="pixabay"
                    namespace="common.modals"
                    tKey="imagePicker"
                  />
                </div>
              )
            default:
              return results.total === 0 ? (
                <EmptyStateScreen
                  icon="tabler:photo-off"
                  name="result"
                  namespace="common.modals"
                  tKey="imagePicker"
                />
              ) : (
                <SearchResults
                  file={file}
                  page={page}
                  results={results}
                  setFile={setFile}
                  setPage={setPage}
                  setPreview={setPreview}
                  onSearch={onSearch}
                />
              )
          }
        })()}
      </div>
    </>
  )
}

export default Pixabay

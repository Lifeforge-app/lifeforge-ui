import clsx from 'clsx'
import PhotoAlbum from 'react-photo-album'

import { type IPixabaySearchResult } from '@interfaces/pixabay_interfaces'

import { Pagination, Scrollbar } from '@components/utilities'

function SearchResults({
  results,
  page,
  setPage,
  file,
  setFile,
  setPreview,
  onSearch
}: {
  results: IPixabaySearchResult
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  file: string | File | null
  setFile: React.Dispatch<React.SetStateAction<string | File | null>>
  setPreview: React.Dispatch<React.SetStateAction<string | null>>
  onSearch: (page: number) => Promise<void>
}) {
  return (
    <Scrollbar className="size-full min-h-[50vh] flex-1">
      <Pagination
        className="mb-4"
        currentPage={page}
        totalPages={Math.ceil(results.total / 20)}
        onPageChange={page => {
          setPage(page)
          onSearch(page).catch(console.error)
        }}
      />
      <div className="px-2">
        <PhotoAlbum
          layout="rows"
          photos={results.hits.map(image => ({
            src: image.thumbnail.url,
            width: image.thumbnail.width,
            height: image.thumbnail.height,
            key: image.id,
            fullResURL: image.imageURL
          }))}
          renderPhoto={({ photo, imageProps: { src, alt, style } }) => (
            <button
              className={clsx(
                'relative isolate block overflow-hidden rounded-md bg-bg-200 outline outline-2 transition-all dark:bg-bg-800/50',
                photo.fullResURL === file
                  ? 'outline-custom-500'
                  : 'outline-transparent hover:outline-bg-500'
              )}
              style={style}
              onClick={() => {
                setFile(photo.fullResURL)
                setPreview(photo.src)
              }}
            >
              <img alt={alt} className="size-full object-cover" src={src} />
            </button>
          )}
          spacing={8}
        />
      </div>
      <Pagination
        className="mt-4"
        currentPage={page}
        totalPages={Math.ceil(results.total / 20)}
        onPageChange={page => {
          setPage(page)
          onSearch(page).catch(console.error)
        }}
      />
    </Scrollbar>
  )
}

export default SearchResults

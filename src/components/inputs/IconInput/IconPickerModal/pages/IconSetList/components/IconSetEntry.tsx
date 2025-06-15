import { Icon } from '@iconify/react'

import { type IIconSet } from '@interfaces/icon_selector_interfaces'

function IconSetEntry({
  iconSet,
  setCurrentIconSet
}: {
  iconSet: IIconSet
  setCurrentIconSet: ({ iconSet }: { iconSet: string }) => void
}) {
  return (
    <button
      key={iconSet.prefix}
      className="bg-bg-50 shadow-custom hover:bg-bg-200/70 dark:bg-bg-800 dark:hover:bg-bg-700/50 flex w-full grow flex-col overflow-hidden rounded-md transition-all"
      type="button"
      onClick={() => {
        setCurrentIconSet({ iconSet: iconSet.prefix })
      }}
    >
      <div className="flex w-full shrink-0 flex-col font-medium">
        <div className="flex-center size-full gap-5 px-4 py-6">
          {iconSet.samples?.map(sampleIcon => (
            <Icon
              key={sampleIcon}
              className="size-8 shrink-0"
              icon={`${iconSet.prefix}:${sampleIcon}`}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col justify-between px-4 pb-3 text-left">
        <h3 className="truncate text-xl font-semibold">{iconSet.name}</h3>
        <p className="mt-1 truncate text-sm">
          By&nbsp;
          <span className="underline">{iconSet.author.name}</span>
        </p>
        <div className="sssm:py-0 flex-between border-bg-200 dark:border-bg-500 mt-4 flex w-full border-t pt-4 text-sm">
          <p>{iconSet.total?.toLocaleString()} icons</p>
          {iconSet.height !== undefined && (
            <div className="flex items-center">
              <Icon
                height="20"
                icon="icon-park-outline:auto-height-one"
                width="20"
              />
              <p className="ml-1">{iconSet.height}</p>
            </div>
          )}
        </div>
      </div>
    </button>
  )
}

export default IconSetEntry

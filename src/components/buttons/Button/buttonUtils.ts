import tinycolor from 'tinycolor2'

export const generateBaseClass = (
  hasChildren: boolean,
  iconAtEnd: boolean
): string =>
  `flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg p-4 ${
    hasChildren && (iconAtEnd ? 'pl-5' : 'pr-5')
  } font-medium tracking-wide transition-all disabled:cursor-not-allowed`

export const generateColorClass = (
  isRed: boolean,
  variant: string,
  themeColor: string
): string => {
  if (isRed) {
    switch (variant) {
      case 'plain':
        return 'hover:bg-red-500/10 dark:hover:bg-red-500/10 text-red-500 hover:text-red-500 dark:hover:text-red-500 disabled:text-red-300 disabled:hover:text-red-300 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent disabled:bg-transparent dark:disabled:bg-transparent dark:disabled:text-red-900/50 dark:disabled:hover:bg-transparent'
      case 'tertiary':
        return 'text-red-500 hover:bg-red-500/10 dark:hover:bg-red-500/10 disabled:hover:shadow-none disabled:hover:bg-transparent hover:shadow-custom disabled:text-red-300 disabled:hover:text-red-300 dark:disabled:text-red-900/50 dark:disabled:hover:bg-transparent'
      case 'secondary':
        return 'border-[1.6px] border-red-500 shadow-custom text-red-500 disabled:border-red-300 hover:bg-red-500/15 disabled:text-red-300 disabled:hover:border-red-300 disabled:hover:text-red-300 disabled:hover:bg-transparent dark:disabled:border-red-900/50 dark:disabled:text-red-900/50 dark:disabled:hover:border-red-900/50 dark:disabled:hover:bg-transparent'
      case 'primary':
      default:
        return `bg-red-500 shadow-custom hover:bg-red-600 ${
          tinycolor(themeColor).isLight()
            ? 'text-bg-800 dark:text-bg-800'
            : 'text-bg-50 dark:text-bg-50'
        } disabled:bg-red-500/10 disabled:text-red-300 disabled:hover:bg-red-500/10 dark:disabled:bg-red-500/10 dark:disabled:text-red-900/50 dark:disabled:hover:bg-red-500/10`
    }
  }

  switch (variant) {
    case 'plain':
      return 'hover:bg-bg-200/50 dark:hover:bg-bg-800/50 text-bg-500 hover:text-bg-800 dark:hover:text-bg-50! disabled:hover:text-bg-300 disabled:dark:hover:text-bg-500 disabled:hover:bg-transparent disabled:dark:hover:bg-transparent disabled:text-bg-300 dark:disabled:text-bg-700 dark:disabled:hover:text-bg-700!'
    case 'tertiary':
      return 'text-custom-500 hover:bg-custom-500/15 disabled:hover:shadow-none disabled:hover:bg-transparent hover:shadow-custom dark:disabled:text-bg-700 dark:disabled:hover:text-bg-700 disabled:text-bg-300 disabled:hover:text-bg-300'
    case 'secondary':
      return 'border-[1.6px] border-custom-500 shadow-custom text-custom-500 hover:bg-custom-500/10 disabled:border-bg-300 disabled:text-bg-300 disabled:hover:border-bg-300 disabled:hover:text-bg-300 disabled:hover:bg-transparent dark:disabled:border-bg-700 dark:disabled:text-bg-700 dark:disabled:hover:border-bg-700'
    case 'primary':
    default:
      return `bg-custom-500 shadow-custom hover:bg-custom-600 ${
        tinycolor(themeColor).isLight()
          ? 'text-bg-800 dark:text-bg-800'
          : 'text-bg-50 dark:text-bg-50'
      } disabled:bg-bg-200 disabled:text-bg-400 disabled:hover:bg-bg-200 dark:disabled:bg-bg-800 dark:disabled:text-bg-700 dark:disabled:hover:bg-bg-800`
  }
}

export const generateClassName = (
  themeColor: string,
  hasChildren: boolean,
  iconAtEnd: boolean,
  isRed: boolean,
  variant: string,
  className: string
): string =>
  `${generateBaseClass(hasChildren, iconAtEnd)} ${generateColorClass(
    isRed,
    variant,
    themeColor
  )} ${className}`

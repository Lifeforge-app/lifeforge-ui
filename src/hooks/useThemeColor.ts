import { useMemo } from 'react'
import THEME_COLOR_HEX from '@constants/theme_color_hex'
import { getColorPalette } from '@utils/colors'
import _ from "lodash"
import { useLifeforgeUIContext } from '../providers/LifeforgeUIProvider'

const bgTheme = {
  slate: {
    50: 'rgb(248, 250, 252)',
    100: 'rgb(241, 245, 249)',
    200: 'rgb(226, 232, 240)',
    300: 'rgb(203, 213, 225)',
    400: 'rgb(148, 163, 184)',
    500: 'rgb(100, 116, 139)',
    600: 'rgb(71, 85, 105)',
    700: 'rgb(51, 65, 85)',
    800: 'rgb(30, 41, 59)',
    900: 'rgb(15, 23, 42)',
    950: 'rgb(2, 6, 23)'
  },
  gray: {
    50: 'rgb(249, 250, 251)',
    100: 'rgb(243, 244, 246)',
    200: 'rgb(229, 231, 235)',
    300: 'rgb(209, 213, 219)',
    400: 'rgb(156, 163, 175)',
    500: 'rgb(107, 114, 128)',
    600: 'rgb(75, 85, 99)',
    700: 'rgb(55, 65, 81)',
    800: 'rgb(31, 41, 55)',
    900: 'rgb(17, 24, 39)',
    950: 'rgb(3, 7, 18)'
  },
  zinc: {
    50: 'rgb(250, 250, 250)',
    100: 'rgb(244, 244, 245)',
    200: 'rgb(228, 228, 231)',
    300: 'rgb(212, 212, 216)',
    400: 'rgb(161, 161, 170)',
    500: 'rgb(113, 113, 122)',
    600: 'rgb(82, 82, 91)',
    700: 'rgb(63, 63, 70)',
    800: 'rgb(39, 39, 42)',
    900: 'rgb(24, 24, 27)',
    950: 'rgb(9, 9, 11)'
  },

  neutral: {
    50: 'rgb(250, 250, 250)',
    100: 'rgb(245, 245, 245)',
    200: 'rgb(229, 229, 229)',
    300: 'rgb(212, 212, 212)',
    400: 'rgb(163, 163, 163)',
    500: 'rgb(115, 115, 115)',
    600: 'rgb(82, 82, 82)',
    700: 'rgb(64, 64, 64)',
    800: 'rgb(38, 38, 38)',
    900: 'rgb(23, 23, 23)',
    950: 'rgb(10, 10, 10)'
  },

  stone: {
    50: 'rgb(250, 250, 249)',
    100: 'rgb(245, 245, 244)',
    200: 'rgb(231, 229, 228)',
    300: 'rgb(214, 211, 209)',
    400: 'rgb(168, 162, 158)',
    500: 'rgb(120, 113, 108)',
    600: 'rgb(87, 83, 78)',
    700: 'rgb(68, 64, 60)',
    800: 'rgb(41, 37, 36)',
    900: 'rgb(28, 25, 23)',
    950: 'rgb(12, 10, 9)'
  }
}

export default function useThemeColors(): {
  theme: string
  bgTemp: Record<number, string>
  componentBg: string
  componentBgWithHover: string
  componentBgLighter: string
  componentBgLighterWithHover: string
  darkerComponentBgWithHover: string
} {
  const { theme, bgImage, themeColor, bgTemp } = useLifeforgeUIContext()
  const finalTheme = useMemo(() => {
    return !themeColor.startsWith('#')
      ? THEME_COLOR_HEX[
      _.camelCase(
        themeColor.replace('theme-', '').replace(/-/g, ' ')
      ) as keyof typeof THEME_COLOR_HEX
      ]
      : themeColor
  }, [themeColor])

  const finalBgTemp = useMemo(() => {
    return !bgTemp.startsWith('#')
      ? bgTheme[bgTemp.replace('bg-', '') as keyof typeof bgTheme]
      : getColorPalette(
        bgTemp,
        'bg',
        (() => {
          if (theme === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
              ? 'dark'
              : 'light'
          }

          return theme
        })()
      )
  }, [bgTemp])

  const componentBg = useMemo(() => {
    if (bgImage !== '') return 'bg-bg-50/50 backdrop-blur-xs dark:bg-bg-900/50'
    return 'bg-bg-50 dark:bg-bg-900'
  }, [bgImage])

  const componentBgWithHover = useMemo(() => {
    if (bgImage !== '') {
      return 'bg-bg-50/50 backdrop-blur-xs dark:bg-bg-900/50 hover:bg-bg-100/50 dark:hover:bg-bg-800/50 transition-all'
    }
    return 'bg-bg-50 dark:bg-bg-900 dark:hover:bg-bg-800/70 hover:bg-bg-100 transition-all'
  }, [bgImage])

  const componentBgLighter = useMemo(() => {
    if (bgImage !== '') return 'bg-bg-100/50 dark:bg-bg-800/50'
    return 'bg-bg-100 dark:bg-bg-800/50'
  }, [bgImage])

  const componentBgLighterWithHover = useMemo(() => {
    if (bgImage !== '') {
      return 'bg-bg-100/50 dark:bg-bg-800/50 hover:bg-bg-200/50 dark:hover:bg-bg-700/50 transition-all'
    }
    return 'bg-bg-100/50 dark:bg-bg-800/50 dark:hover:bg-bg-800/80 hover:bg-bg-200/50 transition-all'
  }, [bgImage])

  const darkerComponentBgWithHover = useMemo(() => {
    if (bgImage !== '') {
      return 'bg-bg-50/50 backdrop-blur-xs dark:bg-bg-800/50 hover:bg-bg-200/50 dark:hover:bg-bg-700/50 transition-all'
    }
    return 'bg-bg-200/50 dark:bg-bg-800/50 dark:hover:bg-bg-800/80 hover:bg-bg-200 transition-all'
  }, [bgImage])

  return {
    theme: finalTheme,
    bgTemp: finalBgTemp,
    componentBg,
    componentBgWithHover,
    componentBgLighter,
    componentBgLighterWithHover,
    darkerComponentBgWithHover
  }
}

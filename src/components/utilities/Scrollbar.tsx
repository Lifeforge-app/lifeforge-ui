/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { type ScrollbarProps, Scrollbars } from 'react-custom-scrollbars'

function Scrollbar({
  children,
  ...props
}: {
  children: React.ReactNode
} & ScrollbarProps) {
  return (
    <Scrollbars
      {...props}
      autoHide
      autoHideDuration={200}
      renderThumbVertical={props => (
        <div {...props} className="rounded-lg bg-bg-300 dark:bg-bg-800" />
      )}
      renderView={props => (
        <div {...props} className="flex min-h-0 flex-1 flex-col" />
      )}
    >
      {children}
    </Scrollbars>
  )
}

export default Scrollbar

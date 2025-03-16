import _ from 'lodash'
import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

import SidebarCancelButton from './components/SidebarCancelButton'
import SidebarCollapseButton from './components/SidebarCollapseButton'
import SidebarItemContent from './components/SidebarItemContent'
import SidebarItemIcon from './components/SidebarItemIcon'
import SidebarItemSubsection from './components/SidebarItemSubsection'
import SidebarItemSubsectionExpandIcon from './components/SidebarItemSubsectionExpandIcon'
import SidebarItemWrapper from './components/SidebarItemWrapper'

type SidebarItemAutoActiveProps =
  | {
      autoActive: true
      active?: never
    }
  | {
      autoActive?: false
      active: boolean
    }

interface MainSidebarItemProps {
  isMainSidebarItem: true

  showAIIcon: boolean
  subsection?: string[][]
  prefix?: string
  sidebarExpanded: boolean
  toggleSidebar: () => void

  sideStripColor?: never
  onClick?: never

  number?: never
  onCancelButtonClick?: never
  hamburgerMenuItems?: never

  isCollapsed?: never
  onCollapseButtonClick?: never
  showCollapseSpacer?: never
  namespace?: never
  needTranslate?: never
}

interface SubSidebarItemProps {
  isMainSidebarItem?: false

  showAIIcon?: never
  subsection?: never
  prefix?: never
  sidebarExpanded?: never
  toggleSidebar?: never

  onClick: () => void
  sideStripColor?: string

  number?: number
  onCancelButtonClick?: () => void
  hamburgerMenuItems?: React.ReactElement

  isCollapsed?: boolean
  onCollapseButtonClick?: () => void
  showCollapseSpacer?: boolean
  namespace?: string
  needTranslate?: boolean
}

interface SidebarItemBaseProps {
  name: string
  icon?: string | React.ReactElement
}

type SidebarItemProps = SidebarItemAutoActiveProps &
  (MainSidebarItemProps | SubSidebarItemProps) &
  SidebarItemBaseProps

function SidebarItem({
  name,
  icon,
  sideStripColor,
  showAIIcon = false,
  subsection,
  isMainSidebarItem = false,
  sidebarExpanded,
  toggleSidebar,
  onClick,
  autoActive = false,
  active = false,
  prefix = '',
  number,
  onCancelButtonClick,
  hamburgerMenuItems,

  isCollapsed,
  onCollapseButtonClick,
  showCollapseSpacer,
  namespace,
  needTranslate = true
}: SidebarItemProps): React.ReactElement {
  const location = useLocation()
  const navigate = useNavigate()

  const [subsectionExpanded, setSubsectionExpanded] = isMainSidebarItem
    ? useState(
        subsection !== undefined &&
          location.pathname.slice(1).startsWith(_.kebabCase(name))
      )
    : [false, () => {}]

  const isLocationMatched = useMemo(
    () =>
      location.pathname
        .slice(1)
        .startsWith((prefix !== '' ? `${prefix}/` : '') + _.kebabCase(name)),
    [location.pathname, prefix, name]
  )

  return (
    <>
      <SidebarItemWrapper
        active={autoActive ? isLocationMatched : active}
        onClick={() => {
          if (window.innerWidth < 1024) {
            toggleSidebar?.()
          }
          if (onClick !== undefined) {
            onClick()
            return
          }

          if (isMainSidebarItem) {
            setSubsectionExpanded(!subsectionExpanded)
            if (!subsection?.length) {
              navigate(
                `./${prefix !== '' ? prefix + '/' : ''}${_.kebabCase(name)}`
              )
            }
          }
        }}
      >
        {onCollapseButtonClick && (
          <>
            <SidebarCollapseButton
              isCollapsed={isCollapsed === true}
              onClick={onCollapseButtonClick}
            />
          </>
        )}
        {showCollapseSpacer && !onCollapseButtonClick && (
          <div className="w-8 shrink-0"></div>
        )}

        {sideStripColor !== undefined && (
          <span
            className="block h-8 w-1 shrink-0 rounded-full"
            style={{
              backgroundColor: sideStripColor
            }}
          />
        )}
        <SidebarItemIcon
          active={autoActive ? isLocationMatched : active}
          icon={icon}
        />
        <SidebarItemContent
          active={autoActive ? isLocationMatched : active}
          hamburgerMenuItems={hamburgerMenuItems}
          hasAI={showAIIcon}
          isMainSidebarItem={isMainSidebarItem}
          name={name}
          namespace={namespace}
          needTranslate={needTranslate}
          number={number}
          sidebarExpanded={!!sidebarExpanded}
          onCancelButtonClick={onCancelButtonClick}
        />
        {sidebarExpanded && subsection !== undefined && (
          <SidebarItemSubsectionExpandIcon
            subsectionExpanded={subsectionExpanded}
            toggleSubsection={() => {
              setSubsectionExpanded(!subsectionExpanded)
            }}
          />
        )}
        {active && onCancelButtonClick !== undefined && (
          <SidebarCancelButton onClick={onCancelButtonClick} />
        )}
      </SidebarItemWrapper>
      {subsection !== undefined && (
        <SidebarItemSubsection
          name={name}
          sidebarExpanded={sidebarExpanded}
          subsection={subsection}
          subsectionExpanded={subsectionExpanded}
          toggleSidebar={toggleSidebar}
        />
      )}
    </>
  )
}

export default SidebarItem

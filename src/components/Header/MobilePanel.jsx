import cn from 'classnames'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import './mobile-panel.scss'

// global header context to handle menu state between both primary and secondary but also output area
const MobilePanelContext = createContext()

export const useMobilePanelContext = () => useContext(MobilePanelContext)

export const MobilePanel = ({ menu }) => {
  const [activePanels, setActivePanels] = useState([{ id: 0, depth: 0 }])
  const [prevVisitedPanel, setPrevVisitedPanel] = useState({})
  const [style, setStyle] = useState({ transform: 'translate3d(0, 0, 0)' })

  useEffect(() => {
    if (!activePanels?.length) return
    // change translation of wrapper based on 'depth' of active panel
    const currentPanel = activePanels[activePanels.length - 1]
    setStyle(() => ({
      transform: `translate3d(${currentPanel.depth * -100}%, 0, 0)`,
    }))
  }, [activePanels])

  const value = {
    menu,
    activePanels,
    setActivePanels,
    prevVisitedPanel,
    setPrevVisitedPanel,
  }

  return (
    <MobilePanelContext.Provider value={value}>
      <div className='mobile-panel__wrapper' style={style}>
        <MobilePanelList menu={menu} depth={0} />
      </div>
    </MobilePanelContext.Provider>
  )
}

export const MobilePanelList = ({ menu, depth = 0 }) => {
  const { items = [], id } = menu
  const { activePanels, prevVisitedPanel } = useMobilePanelContext()

  const isActive = useMemo(() => {
    const currentPanel = activePanels[activePanels.length - 1]
    return currentPanel.id === id || depth < currentPanel.depth
  }, [activePanels, depth, id])

  const isHiddenActive = useMemo(() => prevVisitedPanel.id === id, [
    prevVisitedPanel,
    id,
  ])

  return (
    <div
      className={cn('mobile-panel', `mobile-panel--depth-${depth}`, {
        'mobile-panel--active': isActive,
        'mobile-panel--hidden-active': isHiddenActive,
      })}
      aria-expanded={isActive}
    >
      <MobilePanelBackBtn depth={depth} tabIndex={isHiddenActive && -1} />
      <ul className='mobile-panel__list'>
        {items.map((item, idx) => (
          <MobilePanelItem
            item={item}
            key={idx}
            depth={depth}
            tabIndex={isHiddenActive && -1}
          />
        ))}
      </ul>
    </div>
  )
}

export const MobilePanelBackBtn = ({ depth = 0, tabIndex = 1 }) => {
  const {
    activePanels,
    setActivePanels,
    setPrevVisitedPanel,
  } = useMobilePanelContext()

  if (!depth) return null

  function handleClick() {
    const updatedPanels = activePanels.slice(0, -1)
    const prevVisitedPanel = activePanels[activePanels.length - 1]
    setActivePanels(updatedPanels)
    setPrevVisitedPanel(prevVisitedPanel)
  }

  return (
    <button
      className='mobile-panel__back-btn'
      onClick={handleClick}
      tabIndex={tabIndex}
    >
      - Back
    </button>
  )
}

export const MobilePanelItem = ({ item, depth, tabIndex = 1 }) => {
  const { id, label, items = [], path } = item
  const { setActivePanels, activePanels } = useMobilePanelContext()

  const hasSubmenu = useMemo(() => Boolean(items?.length), [items])
  const isActive = useMemo(() => activePanels.some(panel => panel.id === id), [
    activePanels,
    id,
  ])

  function handleClick() {
    setActivePanels(panels => [...panels, { id, depth }])
  }

  return (
    <li
      className={cn(
        'mobile-panel__list-item',
        `mobile-panel__list-item--${id}`
      )}
      aria-haspopup={Boolean(hasSubmenu)}
      aria-expanded={isActive}
      role='menuitem'
    >
      {path ? (
        <a
          className={cn(
            'mobile-panel__list-item-action',
            'mobile-panel__list-item-action-link'
          )}
          href={path}
          tabIndex={tabIndex}
        >
          {label}
        </a>
      ) : (
        <button
          onClick={handleClick}
          className={cn(
            'mobile-panel__list-item-action',
            'mobile-panel__list-item-action-btn'
          )}
          tabIndex={tabIndex}
        >
          {label} {hasSubmenu && <span>+</span>}
        </button>
      )}

      {hasSubmenu && <MobilePanelList menu={item} depth={++depth} />}
    </li>
  )
}

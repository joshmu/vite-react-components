import cn from 'classnames'
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

import './mobile-panel.scss'
import { useClickAway } from './useClickAway'
import { useEscapeKey } from './useEscapeKey'

// global header context to handle menu state between both primary and secondary but also output area
const MobilePanelContext = createContext()

export const useMobilePanelContext = () => useContext(MobilePanelContext)

export const MobilePanel = ({
  menu,
  activeMenu,
  transitionDurationMs = 300,
}) => {
  const initialPanel = useMemo(() => ({ id: menu?.id ?? 0, depth: 0 }), [menu])
  const [activePanels, setActivePanels] = useState([initialPanel])
  const [prevVisitedPanel, setPrevVisitedPanel] = useState({})

  const configStyle = useMemo(
    () => ({ transitionDuration: `${transitionDurationMs}ms` }),
    [transitionDurationMs]
  )
  const [style, setStyle] = useState({
    transform: 'translate3d(0, 0, 0)',
    ...configStyle,
  })

  useClickAway(reset)
  useEscapeKey(reset)

  // * if active menu changes then reset
  useEffect(() => {
    reset()
  }, [activeMenu])

  useEffect(() => {
    if (!activePanels?.length) return
    // change translation of wrapper based on 'depth' of active panel
    const currentPanel = activePanels[activePanels.length - 1]
    setStyle(() => ({
      transform: `translate3d(${currentPanel.depth * -100}%, 0, 0)`,
      ...configStyle,
    }))
  }, [activePanels])

  function reset() {
    setActivePanels([initialPanel])
  }

  function handlePrevVisitedPanel(panel) {
    setPrevVisitedPanel(panel)

    // * after transition is complete, remove the hidden prev panel so tab order is correct
    setTimeout(() => {
      setPrevVisitedPanel(currentPanel => {
        // if prev exists and timeout is complete, remove it
        if (currentPanel.id === panel.id) return {}
        // state may have already changed again thus do not interfere
        return currentPanel
      })
    }, transitionDurationMs)
  }

  const value = {
    menu,
    activePanels,
    setActivePanels,
    prevVisitedPanel,
    handlePrevVisitedPanel,
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
      <ul className='mobile-panel__list'>
        <MobilePanelBackBtn depth={depth} />
        {items.map((item, idx) => (
          <MobilePanelItem item={item} key={idx} depth={depth} />
        ))}
      </ul>
    </div>
  )
}

export const MobilePanelBackBtn = ({ depth = 0 }) => {
  const {
    activePanels,
    setActivePanels,
    handlePrevVisitedPanel,
  } = useMobilePanelContext()

  if (!depth) return null

  function handleClick() {
    const updatedPanels = activePanels.slice(0, -1)
    // if there are no more active panels, then exit
    if (!updatedPanels?.length) return
    const prevVisitedPanel = activePanels[activePanels.length - 1]
    setActivePanels(updatedPanels)
    handlePrevVisitedPanel(prevVisitedPanel)
  }

  return (
    <li
      className={cn(
        'mobile-panel__list-item',
        `mobile-panel__list-item--back-btn`
      )}
      aria-haspopup={false}
      aria-expanded={false}
      role='menuitem'
    >
      <button className='mobile-panel__back-btn' onClick={handleClick}>
        - Back
      </button>
    </li>
  )
}

export const MobilePanelItem = ({ item, depth }) => {
  const { id, label, items = [], path, render } = item
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
        >
          {label} {hasSubmenu && <span>+</span>}
        </button>
      )}

      {hasSubmenu && <MobilePanelList menu={item} depth={++depth} />}

      {render && render()}
    </li>
  )
}

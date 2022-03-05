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
  const [prevVisitedPanel, setPrevVisitedPanel] = useState({ id: 0, depth: 0 })
  const [style, setStyle] = useState({ transform: 'translate3d(0, 0, 0)' })

  useEffect(() => {
    if (!activePanels?.length) return
    console.log({ activePanels })
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

  if (isHiddenActive) {
    console.log(`prev visited panel is: ${id}`)
  }

  return (
    <div
      className={cn('mobile-panel', `mobile-panel--depth-${depth}`, {
        'mobile-panel--active': isActive,
        'mobile-panel--hidden-active': isHiddenActive,
      })}
    >
      <MobilePanelBackBtn depth={depth} />
      <ul className='mobile-panel__list'>
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
    <a onClick={handleClick} role='button' href='#'>
      Back
    </a>
  )
}

export const MobilePanelItem = ({ item, depth }) => {
  const { id, label, items = [], path = '#' } = item
  const hasSubmenu = useMemo(() => Boolean(items?.length), [items])
  const { setActivePanels } = useMobilePanelContext()

  function handleClick() {
    setActivePanels(panels => [...panels, { id, depth }])
  }

  return (
    <li
      className={cn(
        'mobile-panel__list-item',
        `mobile-panel__list-item--${id}`
      )}
    >
      <a
        role='button'
        onClick={handleClick}
        className='mobile-panel__list-item-link'
        href={path}
      >
        {label} {hasSubmenu && <span>+</span>}
      </a>

      {hasSubmenu && <MobilePanelList menu={item} depth={++depth} />}
    </li>
  )
}

import cn from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { useClickAway } from '../../Header/useClickAway'
import { useEscapeKey } from '../../Header/useEscapeKey'

/**
 * Menu Interface
 * @param {object} props props
 * @param {{items: {label: string, id: number, renderLabel?: function, path?: string, items: *, render: function }[]}} props.menu menu
 * @param {number} props.depth menu depth
 * @returns
 */
export const MobileMenu = ({ menu, depth = 0 }) => {
  const mobileMenuRef = useRef(null)

  // initial panel is first item in menu
  const [activePanels, setActivePanels] = useState([menu.id])
  const [panel, setPanel] = useState(menu)

  // used for click outside header
  useClickAway(mobileMenuRef, () => setActivePanels([menu.id]))
  useEscapeKey(() => setActivePanels([menu.id]))

  useEffect(() => {
    const current = currentPanel(activePanels)
    const p = getPanel(current, menu)
    setPanel(p)
  }, [menu, activePanels])

  function setActivePanel(panel) {
    // do nothing if no more panels ahead
    if (!panel?.items?.length) return
    setActivePanels(active =>
      active[active.length - 1] === panel.id ? active : [...active, panel.id]
    )
  }

  function goBack() {
    setActivePanels(active =>
      active.length > 1 ? active.slice(0, -1) : active
    )
  }

  function currentPanel(activePanels) {
    return activePanels[activePanels.length - 1]
  }

  function getPanel(panelID, menu) {
    if (menu.id === panelID) return menu

    if (menu.items) {
      for (const item of menu.items) {
        if (item.id === panelID) return item
        const p = getPanel(panelID, item)
        if (p) return p
      }
    }
  }

  return (
    <ul
      ref={mobileMenuRef}
      className={cn('menu-list', `menu-list-depth-${depth}`)}
    >
      {activePanels.length > 1 && <li onClick={() => goBack()}>back</li>}

      {panel.items.map(item => {
        const { label, id, render } = item

        return (
          <li
            key={id}
            className={cn('menu-item')}
            onClick={() => setActivePanel(item)}
          >
            <h3>
              {label} {item.items?.length && <span>+</span>}
            </h3>

            {render && (
              <div className={cn('menu-item__display')}>
                {render(item, depth)}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

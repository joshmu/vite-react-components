import cn from 'classnames'
import React, { useEffect, useState } from 'react'
import { useHeaderContext } from '../../Header/Header'
import '../../Header/menu-list.scss'

/**
 * Menu Interface
 * @param {object} props props
 * @param {{items: {label: string, renderLabel?: function, path: string, render: function, submenu: *, displayType?: string}[]}} props.menu menu
 * @param {number} props.depth menu depth
 * @param {'default' | 'sidebar' | 'fullscreen'} props.panelType menu display type
 * @returns
 */
export const Menu = ({ items, depth = 0, panelType = 'default' }) => {
  if (!items?.length) return null

  return (
    <ul className={cn('menu-list', `menu-list-depth-${depth}`)} role='menubar'>
      {items.map((item, idx) => (
        <MenuItem item={item} depth={depth} panelType={panelType} key={idx} />
      ))}
    </ul>
  )
}

export const MenuItem = ({ item, depth, panelType }) => {
  const { setMenu, activeMenu } = useHeaderContext()
  const { label, renderLabel, render, submenu, displayType = panelType } = item
  const [isActive, setIsActive] = useState(Boolean(label === activeMenu))
  const [contentActive, setContentActive] = useState(false)

  // active state logic
  useEffect(() => {
    if (label === activeMenu && !isActive) setIsActive(true)
    if (label !== activeMenu && isActive) setIsActive(false)
  }, [label, activeMenu, isActive])

  // content active state after next tick to allow for transition state
  useEffect(() => {
    // do nothing if inactive
    if (!isActive) {
      // clean up content active if enabled
      if (contentActive) setContentActive(false)
      return
    }
    // otherwise tick delay setting content active to support css transitions
    const timer = setTimeout(() => {
      setContentActive(true)
    })
    return () => clearTimeout(timer)
  }, [contentActive, isActive])

  function handleMouseEnter(event) {
    if (isActive) return
    setMenu(label, depth, event.target)
  }

  return (
    <li
      className={cn('menu-item', { 'menu-item--active': isActive })}
      aria-haspopup={Boolean(render)}
      aria-expanded={isActive}
      role='menuitem'
    >
      <button
        className='menu-item__btn'
        onClick={event => setMenu(label, depth, event.target)}
        onMouseEnter={handleMouseEnter}
      >
        {renderLabel ? renderLabel() : label}
      </button>

      {render && (
        <div
          className={cn('menu-item__display', {
            [`menu-item--display-type-${displayType}`]: displayType,
            'menu-item__display--active': isActive,
          })}
          aria-expanded={isActive}
        >
          <div
            className={cn('menu-item__display-content', {
              'menu-item__display-content--active': contentActive,
            })}
          >
            {render()}
          </div>
        </div>
      )}
    </li>
  )
}

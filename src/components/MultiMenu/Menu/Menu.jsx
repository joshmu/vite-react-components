import cn from 'classnames'
import React from 'react'
import { useHeaderContext } from '../../Header/Header'

/**
 * Menu Interface
 * @param {object} props props
 * @param {{items: {label: string, path: string, render: function, displayType: string}[]}} props.menu menu
 * @returns
 */
export const Menu = ({ menu }) => {
  const { setMenu, activeMenus } = useHeaderContext()

  return (
    <ul className='menu-list'>
      {menu.items.map((item, idx) => {
        const { label, render, displayType = null } = item
        const isActive = activeMenus.includes(label)
        return (
          <li
            key={idx}
            onClick={() => setMenu(label)}
            className={cn('menu-item', {
              'menu-item--active': isActive,
              [`menu-item--display-type-${displayType}`]: displayType,
            })}
          >
            {label}
            {isActive && render && (
              <div className='menu-item__wrapper'>{render(idx)}</div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

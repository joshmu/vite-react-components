import cn from 'classnames'
import React from 'react'
import { useHeaderContext } from '../../Header/Header'
import './menu.css'

/**
 * Menu Interface
 * @param {object} props props
 * @param {{items: {label: string, path: string, render: function}[]}} props.menu menu
 * @returns
 */
export const Menu = ({ menu }) => {
  const { setMenu, activeMenus } = useHeaderContext()

  return (
    <ul className={'menu'}>
      {menu.items.map((item, idx) => {
        const { label, render } = item
        const isActive = activeMenus.includes(label)
        return (
          <li
            key={idx}
            onClick={() => setMenu(label)}
            className={cn('menu-item', { 'menu-item--active': isActive })}
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

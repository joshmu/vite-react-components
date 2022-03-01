import cn from 'classnames'
import React from 'react'
import { useHeaderContext } from '../../Header/Header'

/**
 * Menu Interface
 * @param {object} props props
 * @param {{items: {label: string, renderLabel?: function, path: string, render: function, submenu: *, displayType?: string}[]}} props.menu menu
 * @param {number} props.depth menu depth
 * @returns
 */
export const Menu = ({ menu, depth = 0 }) => {
  const { setMenu, activeMenu } = useHeaderContext()

  return (
    <ul className={cn('menu-list', `menu-list-depth-${depth}`)}>
      {menu.items.map((item, idx) => {
        const { label, renderLabel, render, submenu, displayType = null } = item
        const isActive = label === activeMenu
        return (
          <li
            key={idx}
            className={cn('menu-item', { 'menu-item--active': isActive })}
            // need to leave the entire window not the button itself
            onMouseLeave={event => setMenu(null, depth, null)}
          >
            <button
              className='menu-item__btn'
              aria-haspopup='menu'
              aria-expanded={isActive}
              onClick={event => setMenu(label, depth, event.target)}
              onMouseEnter={event => setMenu(label, depth, event.target)}
            >
              {renderLabel ? renderLabel() : label}
            </button>

            {submenu?.length && <Menu menu={submenu} depth={--depth} />}

            {render && (
              <div
                className={cn('menu-item__display', {
                  [`menu-item--display-type-${displayType}`]: displayType,
                  hidden: !isActive,
                })}
              >
                {render(idx)}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

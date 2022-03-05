import cn from 'classnames'
import React from 'react'
import { useHeaderContext } from '../../Header/Header'

/**
 * Menu Interface
 * @param {object} props props
 * @param {{items: {label: string, renderLabel?: function, path: string, render: function, submenu: *, displayType?: string}[]}} props.menu menu
 * @param {number} props.depth menu depth
 * @param {'default' | 'sidebar' | 'fullscreen'} props.panelType menu display type
 * @returns
 */
export const Menu = ({ items, depth = 0, panelType = 'default' }) => {
  const { setMenu, activeMenu } = useHeaderContext()

  if (!items?.length) return null

  return (
    <ul className={cn('menu-list', `menu-list-depth-${depth}`)} role='menubar'>
      {items.map((item, idx) => {
        const {
          label,
          renderLabel,
          render,
          submenu,
          displayType = panelType,
        } = item
        const isActive = label === activeMenu

        function handleMouseEnter(event) {
          if (isActive) return
          setMenu(label, depth, event.target)
        }

        return (
          <li
            key={idx}
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
                {render(idx)}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

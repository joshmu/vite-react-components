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
export const Menu = ({ items, depth = 0 }) => {
  const { setMenu, activeMenu } = useHeaderContext()

  if (!items?.length) return null

  return (
    <ul className={cn('menu-list', `menu-list-depth-${depth}`)}>
      {items.map((item, idx) => {
        const { label, renderLabel, render, submenu, displayType = null } = item
        const isActive = label === activeMenu

        function handleMouseEnter(event) {
          if (isActive) return
          setMenu(label, depth, event.target)
        }

        return (
          <li
            key={idx}
            className={cn('menu-item', { 'menu-item--active': isActive })}
          >
            <button
              className='menu-item__btn'
              aria-haspopup={Boolean(render)}
              aria-expanded={isActive}
              onClick={event => setMenu(label, depth, event.target)}
              onMouseEnter={handleMouseEnter}
            >
              {renderLabel ? renderLabel() : label}
            </button>

            {submenu?.length && <Menu menu={submenu} depth={--depth} />}

            {/* {render && (
              <div
                className={cn('menu-item__display', {
                  [`menu-item--display-type-${displayType}`]: displayType,
                  hidden: !isActive,
                })}
                aria-expanded={!isActive}
              >
                {render(idx)}
              </div>
            )} */}
          </li>
        )
      })}
    </ul>
  )
}

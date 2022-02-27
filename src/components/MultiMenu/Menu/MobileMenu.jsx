import cn from 'classnames'
import React from 'react'

/**
 * Menu Interface
 * @param {object} props props
 * @param {{items: {label: string, id: number, renderLabel?: function, path?: string, items: *, render: function }[]}} props.menu menu
 * @param {number} props.depth menu depth
 * @returns
 */
export const MobileMenu = ({ menu, depth = 0 }) => {
  return (
    <ul className={cn('menu-list', `menu-list-depth-${depth}`)}>
      {menu.items.map(item => {
        const { label, id, render, items } = item

        return (
          <li key={id} className={cn('menu-item')}>
            <h3>{label}</h3>

            {items?.length && <MobileMenu menu={item} depth={++depth} />}

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

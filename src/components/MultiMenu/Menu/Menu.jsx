import React from 'react'
import { useHeaderContext } from '../../Header/Header'

/**
 * Menu Interface
 * @param {object} props props
 * @param {{items: {label: string, path: string, render: function}[]}} props.menu menu
 * @returns
 */
export const Menu = ({ menu }) => {
  const { setMenu, activeMenus } = useHeaderContext()

  return (
    <ul>
      {menu.items.map((item, idx) => {
        const { label, render } = item
        return (
          <li key={idx} onClick={() => setMenu(label)}>
            {label}
            {activeMenus.includes(label) && render(idx)}
          </li>
        )
      })}
    </ul>
  )
}

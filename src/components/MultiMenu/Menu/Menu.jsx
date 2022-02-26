import React from 'react'

/**
 * Menu Interface
 * @param {object} props props
 * @param {{items: {label: string}[]}} props.menu menu
 * @returns
 */
export const Menu = ({ menu }) => {
  return (
    <ul>
      {menu.items.map((item, idx) => {
        return <li key={idx}>{item.label}</li>
      })}
    </ul>
  )
}

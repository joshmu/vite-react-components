import React from 'react'
import { Menu } from '../MultiMenu/Menu/Menu'

export const Hamburger: React.FC = ({ children }) => {
  const hamburgerData = {
    items: [
      {
        label: 'hamburger',
        renderLabel: () => <div>-=-</div>,
        path: '/one',
        render: () => children,
      },
    ],
  }

  return <Menu menu={hamburgerData} />
}

import React from 'react'
import { Menu } from '../MultiMenu/Menu/Menu'

export const HamburgerMenu = ({ children }) => {
  const menu = {
    items: [
      {
        label: 'mobile-fullscreen',
        id: 'mobile-fullscreen',
        renderLabel: () => <div>-=-</div>,
        displayType: 'fullscreen',
        render: () => children,
      },
    ],
  }

  return <Menu menu={menu} />
}

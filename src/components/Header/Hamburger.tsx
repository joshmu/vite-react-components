import React from 'react'
import { Menu } from '../MultiMenu/Menu/Menu'

export const Hamburger: React.FC = ({ children }) => {
  const hamburgerData = {
    label: 'hamburger',
    renderLabel: () => <div>-=-</div>,
    path: '/one',
    render: () => children,
    displayType: 'fullscreen',
  }

  return <Menu items={[hamburgerData]} />
}

import React, { createContext, useContext, useRef, useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Menu } from '../MultiMenu/Menu/Menu'

import './header.css'
import { One, Two, Three, Four } from './Temp'
import { useCloseHeader } from './useCloseHeader'

const primaryMenuData = {
  items: [
    { label: 'one', path: '/one', render: idx => <One /> },
    { label: 'two', path: '/two', render: idx => <Two /> },
    { label: 'three', path: '/three', render: idx => <Three /> },
    { label: 'four', path: '/four', render: idx => <Four /> },
  ],
}
const secondaryMenuData = {
  items: [
    { label: '(1)', path: '/one', render: idx => <One /> },
    {
      label: '(2)',
      path: '/two',
      render: idx => <Two />,
      displayType: 'sidebar',
    },
    {
      label: '(3)',
      path: '/three',
      render: idx => <Three />,
      displayType: 'sidebar',
    },
  ],
}

const initial = {
  isMobileView: true,
  activeMenus: [],
  setMenu: (label: string) => {},
}

// global header context to handle menu state between both primary and secondary but also output area
const HeaderContext = createContext(initial)

export const useHeaderContext = () => useContext(HeaderContext)

export const Header: React.FC = () => {
  const headerRef = useRef(null)
  const { isMobileView } = useWindowSize()
  const [activeMenus, setActiveMenus] = useState([])
  useCloseHeader(headerRef, setMenu, activeMenus)

  function setMenu(label) {
    setActiveMenus([label])
  }

  return (
    <HeaderContext.Provider value={{ isMobileView, activeMenus, setMenu }}>
      <header ref={headerRef} className='header'>
        <div className='logo'>LOGO</div>

        {/* primary menu */}
        <nav className='primary-menu'>
          {isMobileView ? <div>(=)</div> : <Menu menu={primaryMenuData} />}
        </nav>

        {/* secondary menu */}
        <nav className='secondary-menu'>
          <Menu menu={secondaryMenuData} />
        </nav>
      </header>
    </HeaderContext.Provider>
  )
}

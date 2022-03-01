import React, { createContext, useContext, useRef, useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Menu } from '../MultiMenu/Menu/Menu'
import { Hamburger } from './Hamburger'

import { One, Two, Three, Four } from './Temp'
import { useClickAway } from './useClickAway'

import './header.scss'
import { useEscapeKey } from './useEscapeKey'
import cn from 'classnames'
import { MobileMenu } from '../MultiMenu/Menu/MobileMenu'
import { FocusAnimation } from './FocusAnimation'

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

const mobileMenuData = {
  label: 'mobile menu',
  id: 0,
  items: [
    {
      id: 1,
      label: 'one',
      items: [
        { id: 11, label: 'one-one' },
        { id: 12, label: 'one-two' },
      ],
    },
    {
      id: 2,
      label: 'two',
      items: [
        { id: 21, label: 'two-one' },
        { id: 22, label: 'two-two' },
        {
          id: 23,
          label: 'two-three',
          items: [
            { id: 231, label: 'two-three-one' },
            { id: 232, label: 'two-three-two' },
          ],
        },
        { id: 24, label: 'two-four' },
      ],
    },
  ],
}

const initial = {
  isMobileView: true,
  activeMenus: null,
  setMenu: (label: string, depth?: number, target?: EventTarget) => {},
}

// global header context to handle menu state between both primary and secondary but also output area
const HeaderContext = createContext(initial)

export const useHeaderContext = () => useContext(HeaderContext)

export const Header: React.FC = () => {
  const headerRef = useRef(null)
  const { isMobileView } = useWindowSize()
  const [activeMenu, setActiveMenu] = useState<string>()
  const [focusTarget, setFocusTarget] = useState<EventTarget | null>(null)

  // used for click outside header
  useClickAway(headerRef, () => setMenu(''))
  // used for Esc key when header is active
  useEscapeKey(() => setMenu(''))

  // todo: currently is only handling single menu display at a time
  function setMenu(label: string, depth?: number, target?: EventTarget) {
    setFocusTarget(target)

    setActiveMenu(current => (current === label ? null : label))
  }

  return (
    <HeaderContext.Provider value={{ isMobileView, activeMenu, setMenu }}>
      <header ref={headerRef} className='header'>
        <div className='logo'>LOGO</div>

        {/* primary menu */}
        <nav
          className={cn('primary-menu', {
            'primary-menu-mobile': isMobileView,
          })}
        >
          {isMobileView ? (
            <Hamburger>
              <MobileMenu menu={mobileMenuData} />
            </Hamburger>
          ) : (
            <Menu menu={primaryMenuData} />
          )}
        </nav>

        {/* secondary menu */}
        <nav className='secondary-menu'>
          <Menu menu={secondaryMenuData} />
        </nav>

        <FocusAnimation target={focusTarget} />
      </header>
    </HeaderContext.Provider>
  )
}

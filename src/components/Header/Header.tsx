import React, { createContext, useContext, useRef, useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Menu } from '../MultiMenu/Menu/Menu'
import { Hamburger } from './Hamburger'

import { useClickAway } from './useClickAway'

import './header.scss'
import { useEscapeKey } from './useEscapeKey'
import cn from 'classnames'
import { FocusAnimation } from './FocusAnimation'
import { Overlay } from './Overlay'
import {
  useHeaderActive,
  useHeaderActiveOnceScrolled,
  useHeaderRevealed,
} from './useHeaderActive'
import { useActiveInactiveTheme } from './useActiveInactiveTheme'
import { MobilePanel } from './MobilePanel'
import { useUpdateActiveThemeForMobile } from './useUpdateActiveThemeForMobile'
import { useUpdateHeaderActiveState } from './useUpdateHeaderActiveState'

const initial = {
  isActive: false,
  isMobileView: true,
  activeMenus: null,
  setMenu: (label: string, depth?: number, target?: EventTarget) => {},
}

// global header context to handle menu state between both primary and secondary but also output area
const HeaderContext = createContext(initial)

export const useHeaderContext = () => useContext(HeaderContext)

export const Header = ({ menu, config }) => {
  const headerRef = useRef(null)
  const { isMobileView } = useWindowSize()
  const [activeMenu, setActiveMenu] = useState<string>('')
  const [focusTarget, setFocusTarget] = useState<EventTarget | null>(null)
  // current theme
  const [theme, setTheme] = useState(
    config.theme[isMobileView ? 'mobile' : 'desktop'].inactive
  )
  // desired theme state when active
  const [activeTheme, setActiveTheme] = useState(
    config.theme[isMobileView ? 'mobile' : 'desktop'].active
  )
  // desired theme state when inactive
  const [inactiveTheme, setInactiveTheme] = useState(
    config.theme[isMobileView ? 'mobile' : 'desktop'].inactive
  )
  const { isActive, setIsActive } = useHeaderActive(activeMenu)

  const { isRevealed } = useHeaderRevealed({
    persistReveal: Boolean(activeMenu),
  })
  // useHeaderActiveOnceScrolled({ setIsActive, isRevealed, activeMenu })

  // todo: set theme if at top of the page

  // setting the theme based on the current state of the header
  useActiveInactiveTheme({
    theme,
    setTheme,
    isActive,
    activeTheme,
    inactiveTheme,
  })

  // updates the active and inactive themes configuration based on viewport
  useUpdateActiveThemeForMobile({
    isMobileView,
    themeConfig: config.theme,
    setActiveTheme,
    setInactiveTheme,
  })

  // updates the active state of the header based on whether there is a menu open
  useUpdateHeaderActiveState({ activeMenu, isActive, setIsActive })

  // used for click outside header
  useClickAway(headerRef, reset)
  // used for Esc key when header is active
  useEscapeKey(reset)

  function setMenu(label: string, depth?: number, target?: EventTarget) {
    setFocusTarget(target)
    setActiveMenu(current => (current === label ? null : label))
  }

  // this will reset the entire state if no menu is active
  function reset() {
    setMenu('')
  }

  const value = {
    isActive,
    isMobileView,
    activeMenu,
    setMenu,
    ...config,
  }

  return (
    <HeaderContext.Provider value={value}>
      <header
        className={cn('header-wrapper', 'base--theme', {
          'header-wrapper--active': isRevealed,
        })}
      >
        <div
          ref={headerRef}
          onMouseEnter={() => setTheme(activeTheme)}
          onMouseLeave={reset}
          className={cn('header', `theme--${theme}`)}
        >
          <div className='logo'>LOGO</div>
          {/* primary menu */}
          <nav
            aria-label='primary-navigation'
            className={cn('primary-menu', {
              'primary-menu-mobile': isMobileView,
            })}
          >
            {isMobileView ? (
              <Hamburger>
                <MobilePanel
                  menu={menu.mobile}
                  activeMenu={activeMenu}
                  transitionDurationMs={config.transitionDurationMs}
                />
              </Hamburger>
            ) : (
              <Menu menu={menu.primary} />
            )}
          </nav>
          {/* secondary menu */}
          <nav aria-label='secondary-navigation' className='secondary-menu'>
            <Menu menu={menu.secondary} />
          </nav>

          {/* use focus animation only for desktop */}
          {!isMobileView && <FocusAnimation target={focusTarget} />}
        </div>

        {/* only active when a menu item is active */}
        <Overlay active={Boolean(activeMenu)} />
      </header>
    </HeaderContext.Provider>
  )
}

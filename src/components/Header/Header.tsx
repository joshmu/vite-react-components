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
import { useActiveTheme } from './useActiveTheme'
import { MobilePanel } from './MobilePanel'
import { useUpdateActiveThemeForMobile } from './useUpdateActiveThemeForMobile'

const initial = {
  isActive: false,
  isMobileView: true,
  activeMenus: null,
  setMenu: (label: string, depth?: number, target?: EventTarget) => {},
}

// global header context to handle menu state between both primary and secondary but also output area
const HeaderContext = createContext(initial)

export const useHeaderContext = () => useContext(HeaderContext)

export const Header = ({ menus, config }) => {
  const { primary, secondary, mobile } = menus
  const { THEME } = config

  const headerRef = useRef(null)
  const { isMobileView } = useWindowSize()
  const [activeMenu, setActiveMenu] = useState<string>('')
  const [focusTarget, setFocusTarget] = useState<EventTarget | null>(null)
  const [theme, setTheme] = useState(config.defaultTheme)
  // desired theme state when activated
  const [activeTheme, setActiveTheme] = useState(config.activeTheme)
  const { isActive, setIsActive } = useHeaderActive(activeMenu)

  const { isRevealed } = useHeaderRevealed({
    persistReveal: Boolean(activeMenu),
  })
  useHeaderActiveOnceScrolled({ setIsActive, isRevealed, activeMenu })
  useActiveTheme({
    activeTheme,
    theme,
    setTheme,
    isActive,
  })
  // dark theme when mobile view
  // todo: check theme for mobile when transitioning from desktop opened menu, doesn't seem to be working
  // useUpdateActiveThemeForMobile({
  //   isMobileView,
  //   THEME,
  //   theme,
  //   setActiveTheme,
  // })

  // used for click outside header
  useClickAway(headerRef, reset)
  // used for Esc key when header is active
  useEscapeKey(reset)

  // todo: currently is only handling single menu display at a time
  function setMenu(label: string, depth?: number, target?: EventTarget) {
    setFocusTarget(target)

    setActiveMenu(current => (current === label ? null : label))
  }

  function reset() {
    setMenu('')
  }

  function handleHeaderLeave() {
    // setMenu(null, 0, null)
    reset()
    // inactive theme state
    setTheme(config.inactiveTheme)
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
          onMouseEnter={() => setTheme(THEME.light)}
          onMouseLeave={handleHeaderLeave}
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
                  menu={mobile}
                  activeMenu={activeMenu}
                  transitionDurationMs={config.transitionDurationMs}
                />
              </Hamburger>
            ) : (
              <Menu items={primary.items} />
            )}
          </nav>
          {/* secondary menu */}
          <nav aria-label='secondary-navigation' className='secondary-menu'>
            <Menu items={secondary.items} />
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

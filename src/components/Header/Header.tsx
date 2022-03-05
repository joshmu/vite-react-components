import React, { createContext, useContext, useRef, useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Menu } from '../MultiMenu/Menu/Menu'
import { Hamburger } from './Hamburger'

import { One, Two, Three, Four } from './Temp'
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

const THEME = {
  dark: 'dark',
  light: 'light',
}

const MENU = {
  items: [
    {
      type: 'primary',
      displayType: 'drawer',
      label: 'one',
      path: '/one',
      render: idx => <One />,
    },
    {
      type: 'primary',
      displayType: 'drawer',
      label: 'two',
      path: '/two',
      render: idx => <Two />,
    },
    {
      type: 'primary',
      displayType: 'drawer',
      label: 'three',
      path: '/three',
      render: idx => <Three />,
    },
    {
      type: 'primary',
      displayType: 'drawer',
      label: 'four',
      path: '/four',
      render: idx => <Four />,
    },
    {
      type: 'secondary',
      displayType: 'drawer',
      label: '(1)',
      path: '/one',
      render: idx => <One />,
    },
    {
      type: 'secondary',
      displayType: 'sidebar',
      label: '(2)',
      path: '/two',
      render: idx => <Two />,
    },
    {
      type: 'secondary',
      displayType: 'sidebar',
      label: '(3)',
      path: '/three',
      render: idx => <Three />,
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
        { id: 11, label: 'one-one', path: '/#' },
        { id: 12, label: 'one-two', path: '/#' },
      ],
    },
    {
      id: 2,
      label: 'two',
      items: [
        { id: 21, label: 'two-one', path: '/#' },
        { id: 22, label: 'two-two', path: '/#' },
        {
          id: 23,
          label: 'two-three',
          items: [
            { id: 231, label: 'two-three-one', path: '/#' },
            { id: 232, label: 'two-three-two', path: '/#' },
          ],
        },
        { id: 24, label: 'two-four', path: '/#' },
      ],
    },
  ],
}

const initial = {
  isActive: false,
  isMobileView: true,
  activeMenus: null,
  setMenu: (label: string, depth?: number, target?: EventTarget) => {},
}

// global header context to handle menu state between both primary and secondary but also output area
const HeaderContext = createContext(initial)

export const useHeaderContext = () => useContext(HeaderContext)

export const Header = () => {
  const headerRef = useRef(null)
  const { isMobileView } = useWindowSize()
  const [activeMenu, setActiveMenu] = useState<string>('hamburger')
  const [focusTarget, setFocusTarget] = useState<EventTarget | null>(null)
  const [theme, setTheme] = useState(THEME.dark)
  const { isActive, setIsActive } = useHeaderActive(activeMenu)

  const { isRevealed } = useHeaderRevealed({ activeMenu })
  useHeaderActiveOnceScrolled(setIsActive, isRevealed)
  useActiveTheme({
    activeTheme: THEME.light,
    theme,
    setTheme,
    isActive,
  })
  // used for click outside header
  useClickAway(headerRef, () => setMenu(''))
  // used for Esc key when header is active
  useEscapeKey(() => setMenu(''))

  // todo: currently is only handling single menu display at a time
  function setMenu(label: string, depth?: number, target?: EventTarget) {
    setFocusTarget(target)

    setActiveMenu(current => (current === label ? null : label))
  }

  function handleHeaderLeave() {
    setMenu(null, 0, null)
    setTheme(THEME.dark)
  }

  const value = {
    isActive,
    isMobileView,
    activeMenu,
    setMenu,
  }

  return (
    <HeaderContext.Provider value={value}>
      <div
        className={cn('header-wrapper', 'base--theme', {
          'header-wrapper--active': isRevealed,
        })}
      >
        <header
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
                {/* <MobileMenu menu={mobileMenuData} /> */}
                <MobilePanel menu={mobileMenuData} />
              </Hamburger>
            ) : (
              <Menu
                items={MENU.items.filter(item => item.type === 'primary')}
              />
            )}
          </nav>

          {/* <DisplayPanel
            activeMenu={activeMenu}
            items={MENU.items.filter(item => item.displayType === 'drawer')}
          />
          <DisplayPanel
            activeMenu={activeMenu}
            items={MENU.items.filter(item => item.displayType === 'sidebar')}
            type='sidebar'
          /> */}

          {/* secondary menu */}
          <nav aria-label='secondary-navigation' className='secondary-menu'>
            <Menu
              items={MENU.items.filter(item => item.type === 'secondary')}
            />
          </nav>

          <FocusAnimation target={focusTarget} />
        </header>

        {/* only active when a menu item is active */}
        <Overlay active={Boolean(activeMenu)} />
      </div>
    </HeaderContext.Provider>
  )
}

export const HeaderApp = () => {
  return (
    <>
      <Header />
      <main>
        <div className='lorem-block'>
          <h1>test</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero quam
            neque fugiat totam exercitationem autem maiores, ipsa accusamus in
            earum, sint, hic et! Similique quos necessitatibus expedita itaque
            ratione, nostrum voluptatibus nisi dignissimos labore soluta tempora
            quod suscipit possimus, fuga odit veniam corporis ut quisquam quia
            magnam veritatis facilis consequatur numquam! Fugit aspernatur
            nesciunt asperiores similique vero, sed est in quisquam voluptatum
            libero eligendi quos, ea ut veritatis voluptatibus minima quod error
            praesentium! Assumenda, iusto. Nulla neque molestiae inventore porro
            dolore voluptatum non magnam, praesentium ab nihil. Nobis illo
            beatae officiis maiores odit cumque, recusandae voluptas nisi
            aliquid praesentium. Temporibus quos fugiat nemo, optio rem ipsum
            alias blanditiis, dolorem perspiciatis a provident iusto molestias
            facere itaque non eius officiis impedit, ipsa nihil in cum
            repellendus! Molestias dicta aspernatur facere, facilis similique
            labore, consectetur commodi asperiores ex a officia! Saepe ducimus
            assumenda, voluptatem ea quaerat quasi dignissimos quam nisi?
            Delectus inventore ducimus dolores maiores odio nulla sint, tempora
            necessitatibus soluta ab doloribus sed eaque voluptas provident
            dolore praesentium, quasi et consequuntur aperiam sapiente accusamus
            excepturi eveniet recusandae ipsam! Ipsam optio praesentium
            accusamus voluptatibus deleniti? Officiis reprehenderit atque, autem
            laboriosam, maxime alias rerum eligendi magnam quia quod suscipit.
            Sit, aspernatur. Quidem, perferendis.
          </p>
        </div>
        <div className='lorem-block'>
          <h1>test</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero quam
            neque fugiat totam exercitationem autem maiores, ipsa accusamus in
            earum, sint, hic et! Similique quos necessitatibus expedita itaque
            ratione, nostrum voluptatibus nisi dignissimos labore soluta tempora
            quod suscipit possimus, fuga odit veniam corporis ut quisquam quia
            magnam veritatis facilis consequatur numquam! Fugit aspernatur
            nesciunt asperiores similique vero, sed est in quisquam voluptatum
            libero eligendi quos, ea ut veritatis voluptatibus minima quod error
            praesentium! Assumenda, iusto. Nulla neque molestiae inventore porro
            dolore voluptatum non magnam, praesentium ab nihil. Nobis illo
            beatae officiis maiores odit cumque, recusandae voluptas nisi
            aliquid praesentium. Temporibus quos fugiat nemo, optio rem ipsum
            alias blanditiis, dolorem perspiciatis a provident iusto molestias
            facere itaque non eius officiis impedit, ipsa nihil in cum
            repellendus! Molestias dicta aspernatur facere, facilis similique
            labore, consectetur commodi asperiores ex a officia! Saepe ducimus
            assumenda, voluptatem ea quaerat quasi dignissimos quam nisi?
            Delectus inventore ducimus dolores maiores odio nulla sint, tempora
            necessitatibus soluta ab doloribus sed eaque voluptas provident
            dolore praesentium, quasi et consequuntur aperiam sapiente accusamus
            excepturi eveniet recusandae ipsam! Ipsam optio praesentium
            accusamus voluptatibus deleniti? Officiis reprehenderit atque, autem
            laboriosam, maxime alias rerum eligendi magnam quia quod suscipit.
            Sit, aspernatur. Quidem, perferendis.
          </p>
        </div>
        <div className='lorem-block'>
          <h1>test</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero quam
            neque fugiat totam exercitationem autem maiores, ipsa accusamus in
            earum, sint, hic et! Similique quos necessitatibus expedita itaque
            ratione, nostrum voluptatibus nisi dignissimos labore soluta tempora
            quod suscipit possimus, fuga odit veniam corporis ut quisquam quia
            magnam veritatis facilis consequatur numquam! Fugit aspernatur
            nesciunt asperiores similique vero, sed est in quisquam voluptatum
            libero eligendi quos, ea ut veritatis voluptatibus minima quod error
            praesentium! Assumenda, iusto. Nulla neque molestiae inventore porro
            dolore voluptatum non magnam, praesentium ab nihil. Nobis illo
            beatae officiis maiores odit cumque, recusandae voluptas nisi
            aliquid praesentium. Temporibus quos fugiat nemo, optio rem ipsum
            alias blanditiis, dolorem perspiciatis a provident iusto molestias
            facere itaque non eius officiis impedit, ipsa nihil in cum
            repellendus! Molestias dicta aspernatur facere, facilis similique
            labore, consectetur commodi asperiores ex a officia! Saepe ducimus
            assumenda, voluptatem ea quaerat quasi dignissimos quam nisi?
            Delectus inventore ducimus dolores maiores odio nulla sint, tempora
            necessitatibus soluta ab doloribus sed eaque voluptas provident
            dolore praesentium, quasi et consequuntur aperiam sapiente accusamus
            excepturi eveniet recusandae ipsam! Ipsam optio praesentium
            accusamus voluptatibus deleniti? Officiis reprehenderit atque, autem
            laboriosam, maxime alias rerum eligendi magnam quia quod suscipit.
            Sit, aspernatur. Quidem, perferendis.
          </p>
        </div>
      </main>
    </>
  )
}

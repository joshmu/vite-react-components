import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
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
import { Overlay } from './Overlay'

const THEME = {
  dark: 'dark',
  light: 'light',
}

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

export const Header = () => {
  const headerRef = useRef(null)
  const { isMobileView } = useWindowSize()
  const [activeMenu, setActiveMenu] = useState<string>()
  const [focusTarget, setFocusTarget] = useState<EventTarget | null>(null)
  const [theme, setTheme] = useState(THEME.dark)

  // used for click outside header
  useClickAway(headerRef, () => setMenu(''))
  // used for Esc key when header is active
  useEscapeKey(() => setMenu(''))

  // activate the light theme upon any interaction
  useEffect(() => {
    if (activeMenu && theme !== THEME.light) setTheme(THEME.light)
  }, [activeMenu, theme])

  // todo: currently is only handling single menu display at a time
  function setMenu(label: string, depth?: number, target?: EventTarget) {
    setFocusTarget(target)

    setActiveMenu(current => (current === label ? null : label))
  }

  return (
    <HeaderContext.Provider value={{ isMobileView, activeMenu, setMenu }}>
      <div className='header-wrapper'>
        <header
          ref={headerRef}
          onMouseEnter={() => setTheme(THEME.light)}
          onMouseLeave={() => setTheme(THEME.dark)}
          className={cn('header', `theme--${theme}`)}
        >
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

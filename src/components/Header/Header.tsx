import React, { createContext, useContext, useState } from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Menu } from '../MultiMenu/Menu/Menu'

import styles from './header.module.css'
import { One, Two, Three, Four } from './Temp'

const primaryMenuData = {
  items: [
    { label: 'one', path: '/one', render: idx => <One /> },
    { label: 'two', path: '/two', render: idx => <Two /> },
    { label: 'three', path: '/three', render: idx => <Three /> },
    { label: 'four', path: '/four', render: idx => <Four /> },
  ],
}

const initial = {
  activeMenu: null,
}
const HeaderContext = createContext(initial)

export const useHeaderContext = () => useContext(HeaderContext)

export const Header: React.FC = () => {
  const { isMobileView } = useWindowSize()
  const [activeMenus, setActiveMenus] = useState([])

  function setMenu(label) {
    setActiveMenus([label])
  }

  return (
    <HeaderContext.Provider value={{ isMobileView, activeMenus, setMenu }}>
      <header className={styles.header}>
        <div className={styles.logo}>LOGO</div>

        {/* primary menu */}
        <nav className={styles.primaryMenu}>
          {isMobileView ? <div>(=)</div> : <Menu menu={primaryMenuData} />}
        </nav>

        {/* seconary menu */}
        <nav className={styles.secondaryMenu}>
          <ul>
            <li>(1)</li>
            <li>(2)</li>
            <li>(3)</li>
          </ul>
        </nav>
      </header>
    </HeaderContext.Provider>
  )
}

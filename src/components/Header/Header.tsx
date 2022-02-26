import React from 'react'
import { useWindowSize } from '../../hooks/useWindowSize'
import { Menu } from '../MultiMenu/Menu/Menu'

import styles from './header.module.css'

const primaryMenuData = {
  items: [
    { label: 'one', path: '/one' },
    { label: 'two', path: '/two' },
    { label: 'three', path: '/three' },
    { label: 'four', path: '/four' },
  ],
}

export const Header: React.FC = () => {
  const { isMobileView } = useWindowSize()

  return (
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
  )
}

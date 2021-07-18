import React from 'react'

import styles from './tabs.module.css'

export const TabContent: React.FC = ({ children }) => {
  return <div className={styles.content}>{children}</div>
}

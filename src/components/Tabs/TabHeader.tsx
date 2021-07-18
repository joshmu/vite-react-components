import React from 'react'

import styles from './tabs.module.css'

export const TabHeader = ({
  tabs,
  selectTab,
  activeTab,
}: {
  tabs: tab[]
  selectTab: (tab: tab) => void
  activeTab: tab
}) => {
  return (
    <div className={styles.header}>
      {tabs.map((tab, idx) => (
        <div
          key={idx}
          onClick={() => selectTab(tab)}
          className={`${styles.headerItem} ${
            tab.label === activeTab.label && styles.active
          }`}
        >
          {tab.label}
        </div>
      ))}
    </div>
  )
}

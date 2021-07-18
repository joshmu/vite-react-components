import React, { useState } from 'react'
import { TabContent } from './TabContent'
import { TabHeader } from './TabHeader'

import styles from './tabs.module.css'

export const Tabs = ({ tabs }: { tabs: tab[] }) => {
  const [activeTab, setActiveTab] = useState<tab>(tabs[0])

  return (
    <div className={styles.tabs}>
      <TabHeader
        tabs={tabs}
        selectTab={tab => setActiveTab(tab)}
        activeTab={activeTab}
      />
      <TabContent>{activeTab.content}</TabContent>
    </div>
  )
}

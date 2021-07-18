import React, { useState } from 'react'
import { TabContent } from './TabContent'
import { TabHeader } from './TabHeader'

import styles from './tabs.module.css'

const tabs = [
  {
    label: <q>one</q>,
    content: <p>here is some content</p>,
  },
  {
    label: <em>two</em>,
    content: <h1>boo ya</h1>,
  },
  {
    label: <h3>three</h3>,
    content: <div>something else</div>,
  },
]

export const Tabs = () => {
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

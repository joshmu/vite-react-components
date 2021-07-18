import React from 'react'
import './App.css'
import { Tabs } from './components/Tabs/Tabs'

import styles from './app.module.css'

const tabsData = [
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

function App() {
  return (
    <div className={styles.app}>
      <Tabs tabs={tabsData} />
    </div>
  )
}

export default App

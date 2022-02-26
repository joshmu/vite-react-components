import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './App.css'
import { routes } from './routes'

import styles from './app.module.css'

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
        <Switch>
          {routes.map(({ path, component }) => (
            <Route key={path} path={path} component={component} />
          ))}
          <Redirect to='/tabs' />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App

import { HeaderApp } from './components/Header/HeaderBrand'
import { Tabs } from './components/Tabs/Tabs'

export const routes: route[] = [
  {
    path: '/',
    component: HeaderApp,
  },
  {
    path: '/header',
    component: HeaderApp,
  },
  {
    path: '/tabs',
    component: Tabs,
  },
]

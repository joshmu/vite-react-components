import cn from 'classnames'
import React, { useMemo } from 'react'
import { useHeaderContext } from './Header'

export const DesktopDrawer = ({ isActive, items }) => {
  return (
    <div
      className={cn('drawer', { 'drawer--active': isActive })}
      aria-hidden={!isActive}
      aria-expanded={isActive}
    >
      <ul>
        {items.map((item, idx) => (
          <DrawerItem key={idx} item={item} />
        ))}
      </ul>
    </div>
  )
}

export const DrawerItem = ({ item }) => {
  const { activeMenu } = useHeaderContext()
  const { render, label } = item
  const isActive = useMemo(() => label === activeMenu, [activeMenu, label])
  return (
    <li className={cn('drawer-item', { 'drawer-item--active': isActive })}>
      {render()}
    </li>
  )
}

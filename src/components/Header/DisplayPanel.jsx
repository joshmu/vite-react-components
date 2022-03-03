import cn from 'classnames'
import React, { useMemo } from 'react'
import { useHeaderContext } from './Header'

// todo: do the same but for 'aside' sidebar
export const DisplayPanel = ({ activeMenu, items, type = 'drawer' }) => {
  const isActive = useMemo(
    () => items.some(item => item.label === activeMenu),
    [activeMenu, items]
  )

  return (
    <div
      className={cn('panel', `panel-${type}`, { 'panel--active': isActive })}
      aria-hidden={!isActive}
      aria-expanded={isActive}
    >
      <ul>
        {items.map((item, idx) => (
          <DisplayPanelItem key={idx} item={item} />
        ))}
      </ul>
    </div>
  )
}

export const DisplayPanelItem = ({ item }) => {
  const { activeMenu } = useHeaderContext()
  const { render, label } = item
  const isActive = useMemo(() => label === activeMenu, [activeMenu, label])
  return (
    <li className={cn('panel-item', { 'panel-item--active': isActive })}>
      {render()}
    </li>
  )
}

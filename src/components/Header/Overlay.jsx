import cn from 'classnames'
import React from 'react'

export const Overlay = ({ active }) => {
  return <div className={cn('overlay', { 'overlay--animate': active })}></div>
}

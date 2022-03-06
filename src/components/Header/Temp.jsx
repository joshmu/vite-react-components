import React from 'react'

import './temp.scss'

export const One = () => {
  return (
    <div>
      <h1>One</h1>
    </div>
  )
}
export const Two = () => {
  return (
    <div className='content'>
      <h2 className='title'>
        here is some random text to describe this content
      </h2>
      <div className='inner-content'>
        <div className='tiles'>
          <div className='tile'></div>
          <div className='tile'></div>
          <div className='tile'></div>
          <div className='tile'></div>
          <div className='tile'></div>
          <div className='tile'></div>
        </div>
        <div className='side-content'>
          <h3 className='title'>here is a list</h3>
          <ul className='list'>
            <li>one</li>
            <li>two</li>
            <li>three</li>
            <li>four</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export const Three = () => {
  return (
    <div className='center'>
      <ul>
        <li>
          <a href='#'>one</a>
        </li>
        <li>
          <a href='#'>two</a>
        </li>
        <li>
          <a href='#'>three</a>
        </li>
      </ul>
    </div>
  )
}
export const Four = () => {
  return <h1> -- Four -- </h1>
}

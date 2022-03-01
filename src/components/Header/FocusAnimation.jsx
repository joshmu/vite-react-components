import React, { useEffect, useRef, useState } from 'react'

// based on the target get the position and apply it to the focus animation element

export const FocusAnimation = ({ target }) => {
  const targetRef = useRef(null)
  const [style, setStyle] = useState({
    width: 0,
    opacity: 0,
    transform: 'scale(0) translate3d(-100%, 0, 0)',
  })

  useEffect(() => {
    if (target) {
      const { offsetLeft, clientWidth } = target
      setStyle({
        width: clientWidth,
        transform: `scale(1) translate3d(${offsetLeft}px, 0, 0)`,
        opacity: 1,
      })
    } else {
      setStyle(currentStyle => ({
        ...currentStyle,
        opacity: 0,
      }))
    }
  }, [target])

  return <span ref={targetRef} style={style} className='focus-animation'></span>
}

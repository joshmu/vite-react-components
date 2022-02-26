import { useState, useLayoutEffect } from 'react'

const isBrowser = typeof window !== 'undefined'

export const useWindowSize = (
  mobileBreakpoint = 768,
  initialWidth = Infinity,
  initialHeight = Infinity
) => {
  const [state, setState] = useState({
    width: isBrowser ? window.innerWidth : initialWidth,
    height: isBrowser ? window.innerHeight : initialHeight,
    isMobileView: isBrowser ? window.innerWidth < mobileBreakpoint : true,
  })

  useLayoutEffect(() => {
    if (!isBrowser) return

    const handler = () => {
      setState({
        width: window.innerWidth,
        height: window.innerHeight,
        isMobileView: window.innerWidth < mobileBreakpoint,
      })
    }

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [mobileBreakpoint])

  return state
}

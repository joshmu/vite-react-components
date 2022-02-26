import { useEffect } from 'react'

export const useCloseHeader = (ref, setMenu, activeMenus) => {
  // used for click outside header
  useEffect(() => {
    const handler = event => {
      if (
        activeMenus?.length &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        console.log(event.target)
        console.log(ref.current)
        setMenu([])
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [activeMenus])

  // used for Esc key when header is active
  useEffect(() => {
    const handler = event => {
      console.log({ event })
      if (
        (event.key === 'Escape' ||
          event.code === 'Escape' ||
          event.keyCode === 27) &&
        activeMenus?.length
      ) {
        setMenu([])
      }
    }
    document.addEventListener('keydown', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('keydown', handler)
    }
  }, [activeMenus])
}

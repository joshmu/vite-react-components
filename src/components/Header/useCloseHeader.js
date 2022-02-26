import { useEffect } from 'react'

export const useCloseHeader = (ref, setMenu, activeMenus) => {
  useEffect(() => {
    const handler = event => {
      if (
        activeMenus?.length &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
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
}

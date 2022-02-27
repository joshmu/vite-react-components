import { useEffect } from 'react'

export const useEscapeKey = (setMenu, activeMenus) => {
  useEffect(() => {
    const handler = event => {
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
      document.removeEventListener('keydown', handler)
    }
  }, [activeMenus])
}

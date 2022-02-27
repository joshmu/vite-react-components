import { useEffect } from 'react'

export const useEscapeKey = callback => {
  useEffect(() => {
    const handler = event => {
      if (
        (event.key === 'Escape' ||
          event.code === 'Escape' ||
          event.keyCode === 27) &&
        activeMenus?.length
      ) {
        callback()
      }
    }
    document.addEventListener('keydown', handler)
    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])
}

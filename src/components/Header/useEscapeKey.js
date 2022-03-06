import { useEffect } from 'react'

export const useEscapeKey = callback => {
  useEffect(() => {
    const handler = event => {
      if (
        event.key === 'Escape' ||
        event.code === 'Escape' ||
        event.keyCode === 27
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

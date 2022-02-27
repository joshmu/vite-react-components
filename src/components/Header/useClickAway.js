import { useEffect } from 'react'

export const useClickAway = (ref, callback) => {
  useEffect(() => {
    const handler = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        console.log(event.target)
        console.log(ref.current)
        callback()
      }
    }
    document.addEventListener('mousedown', handler)
    document.addEventListener('touchstart', handler)
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler)
      document.removeEventListener('touchstart', handler)
    }
  }, [])
}

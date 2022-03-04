import  useEffect, useState } from 'react'

export const useHeaderActive = activeMenu => {
  const [isActive, setIsActive] = useState(false)

  // decide on header active state based on activeMenu
  useEffect(() => {
    if (isActive) {
      if (!activeMenu) {
        setIsActive(false)
      }
    } else {
      if (activeMenu) setIsActive(true)
    }
  }, [isActive, activeMenu])

  return { isActive, setIsActive }
}

import React, { useEffect } from 'react'

export const useUpdateHeaderActiveState = ({
  activeMenu,
  isActive,
  setIsActive,
}) => {
  useEffect(() => {
    if (!isActive && Boolean(activeMenu)) setIsActive(true)
    if (isActive && !Boolean(activeMenu)) setIsActive(false)
  }, [activeMenu, isActive])
}

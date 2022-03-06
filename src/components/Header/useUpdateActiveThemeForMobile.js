import React, { useEffect } from 'react'

export const useUpdateActiveThemeForMobile = ({
  isMobileView,
  THEME,
  theme,
  setActiveTheme,
}) => {
  useEffect(() => {
    if (isMobileView) {
      if (theme === THEME.dark) return
      setActiveTheme(THEME.dark)
    } else {
      if (theme !== THEME.dark) return
      setActiveTheme(THEME.light)
    }
  }, [isMobileView, theme])
}

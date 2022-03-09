import { useEffect } from 'react'

export const useActiveInactiveTheme = ({
  isActive,
  theme,
  setTheme,
  activeTheme,
  inactiveTheme,
}) => {
  useEffect(() => {
    if (isActive && theme !== activeTheme) setTheme(activeTheme)
    if (!isActive && theme !== inactiveTheme) setTheme(inactiveTheme)
  }, [isActive, theme, activeTheme, inactiveTheme])
}

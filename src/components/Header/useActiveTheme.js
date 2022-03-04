import { useEffect } from 'react'

export const useActiveTheme = ({ isActive, theme, setTheme, activeTheme }) => {
  // activate the light theme upon any interaction
  useEffect(() => {
    if (isActive && theme !== activeTheme) setTheme(activeTheme)
  }, [isActive, theme])
}

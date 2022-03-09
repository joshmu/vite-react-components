import { useEffect } from 'react'

export const useUpdateActiveThemeForMobile = ({
  isMobileView,
  themeConfig,
  setActiveTheme,
  setInactiveTheme,
}) => {
  // when mobile view causes re-render check for current theme state
  // todo: we could improve this to conditionally not invoke a state change if unnecessary
  useEffect(() => {
    if (isMobileView) {
      setActiveTheme(themeConfig.mobile.active)
      setInactiveTheme(themeConfig.mobile.inactive)
    } else {
      setActiveTheme(themeConfig.desktop.active)
      setInactiveTheme(themeConfig.desktop.inactive)
    }
  }, [isMobileView])
}

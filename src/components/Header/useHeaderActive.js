import { useEffect, useRef, useState } from 'react'

export const useHeaderActive = activeMenu => {
  const [isActive, setIsActive] = useState(false)

  // decide on header active state based on activeMenu
  useEffect(() => {
    if (!isActive && activeMenu) {
      setIsActive(true)
    }
  }, [isActive, activeMenu])

  return { isActive, setIsActive }
}

export const useHeaderRevealed = ({ activeMenu }) => {
  // only set auto revealed at top of page on mount
  const [isRevealed, setIsRevealed] = useState(!Boolean(window.scrollY))
  const scrollYRef = useRef(window.scrollY)

  // scroll support to activate
  useEffect(() => {
    function handleScroll() {
      const { scrollY } = window

      if (scrollY === scrollYRef.current) return

      // activate when scrolling up
      if (!isRevealed) {
        if (scrollY <= scrollYRef.current) {
          setIsRevealed(true)
        }
      } else {
        // persist menu if mobile menu is open
        if (activeMenu === 'hamburger') return

        // hide menu when user is scrolling down
        if (scrollY > scrollYRef.current) {
          setIsRevealed(false)
        }
      }

      // update scrollYRef
      scrollYRef.current = scrollY
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isRevealed, activeMenu])

  return { isRevealed }
}

export const useHeaderActiveOnceScrolled = (
  setIsActive,
  isRevealed,
  waitMs = 300
) => {
  const doneRef = useRef(false)
  const [disabled, setDisabled] = useState(false)
  // scroll support to activate
  useEffect(() => {
    if (disabled) return
    // if it is currently revealed don't do anything to disturb the UI
    // this should stay disabled for minimum of 0.3s to accommodate for transitions
    if (isRevealed) {
      setDisabled(true)
      return
    }

    function handleScroll() {
      const { scrollY } = window

      if (doneRef.current) return

      if (scrollY !== 0) {
        setIsActive(true)
        doneRef.current = true
      }
    }

    if (doneRef.current) return
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isRevealed, disabled])

  // timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisabled(false)
    }, waitMs)

    return () => clearTimeout(timer)
  }, [disabled])
}

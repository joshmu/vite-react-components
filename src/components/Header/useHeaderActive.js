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
        // persist if menu is open
        if (activeMenu) return

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

export const useHeaderActiveOnceScrolled = ({
  setIsActive,
  isRevealed,
  activeMenu,
  waitMs = 300,
}) => {
  // allow logic to run only when header is out of view (hidden)
  const [notReady, setNotReady] = useState(true)
  // represents header has been activated due to scroll and now this hook is no longer required
  const doneRef = useRef(false)

  // check whether the header has had a chance to hide, upon which the header can remain active from then on
  useEffect(() => {
    if (!isRevealed && notReady) {
      // accommodate for transition time
      setTimeout(function () {
        setNotReady(false)
      }, waitMs)
    }
  }, [isRevealed, notReady])

  // scroll support to activate
  useEffect(() => {
    if (notReady) return
    if (doneRef.current) return
    if (activeMenu) return

    function handleScroll() {
      const { scrollY } = window

      if (doneRef.current) return

      if (scrollY !== 0) {
        setIsActive(true)
        doneRef.current = true
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isRevealed, activeMenu])
}

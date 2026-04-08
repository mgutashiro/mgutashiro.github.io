import { useEffect, useRef, useState } from 'react'

export default function useMemeReset(activeId) {
  const [dropNow, setDropNow] = useState(false)
  const [resetTick, setResetTick] = useState(0)

  const timers = useRef({
    holdTimer: null,
    pulseTimer: null,
    watchTop: null,
  })

  useEffect(() => {
    const clearAll = () => {
      const t = timers.current
      if (t.holdTimer) window.clearTimeout(t.holdTimer)
      if (t.pulseTimer) window.clearTimeout(t.pulseTimer)
      if (t.watchTop) window.clearInterval(t.watchTop)
      t.holdTimer = null
      t.pulseTimer = null
      t.watchTop = null
    }

    return () => clearAll()
  }, [])

  useEffect(() => {
    const scroller = document.getElementById('page-home')
    if (!scroller) return

    const t = timers.current

    const clearFlow = () => {
      if (t.holdTimer) window.clearTimeout(t.holdTimer)
      if (t.pulseTimer) window.clearTimeout(t.pulseTimer)
      if (t.watchTop) window.clearInterval(t.watchTop)

      t.holdTimer = null
      t.pulseTimer = null
      t.watchTop = null

      setDropNow(false)
    }

    if (activeId !== 'meme') {
      clearFlow()
      return
    }

    clearFlow()

    t.holdTimer = window.setTimeout(() => {
      setDropNow(true)

      scroller.scrollTo({
        top: 0,
        behavior: 'smooth',
      })

      t.pulseTimer = window.setTimeout(() => {
        setDropNow(false)
      }, 1200)

      t.watchTop = window.setInterval(() => {
        if ((scroller.scrollTop ?? 0) <= 2) {
          if (t.watchTop) {
            window.clearInterval(t.watchTop)
            t.watchTop = null
          }
          setResetTick((n) => n + 1)
        }
      }, 50)
    }, 5000)

    return () => clearFlow()
  }, [activeId])

  return { dropNow, resetTick }
}
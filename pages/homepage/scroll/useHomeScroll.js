import { useEffect, useState } from 'react'

const clamp01 = (x) => Math.max(0, Math.min(1, x))

export default function useHomeScroll() {
  const [p, setP] = useState(0)

  useEffect(() => {
    const scroller = document.getElementById('page-home')
    if (!scroller) return

    let raf = 0

    const update = () => {
      raf = 0
      const maxScroll = Math.max(1, scroller.scrollHeight - scroller.clientHeight)
      setP(clamp01(scroller.scrollTop / maxScroll))
    }

    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(update)
    }

    update()

    scroller.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      if (raf) window.cancelAnimationFrame(raf)
      scroller.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return { p }
}
import { useEffect, useRef, useState } from 'react'
import { clamp } from './mapProgress'

function getScroller() {
  return document.getElementById('page-home')
}

function computeScrollState(scroller) {
  const top = scroller?.scrollTop ?? 0
  const clientH = scroller?.clientHeight ?? 1
  const scrollH = scroller?.scrollHeight ?? clientH

  const maxScroll = Math.max(1, scrollH - clientH)
  const raw = top / maxScroll
  const p = clamp(Number.isFinite(raw) ? raw : 0, 0, 1)

  return {
    t: p,
    p,
    top,
    max: maxScroll,
    maxScroll,
    clientH,
    scrollH,
    raw,
  }
}

export default function useHomeScroll() {
  const [state, setState] = useState(() => ({
    t: 0,
    p: 0,
    top: 0,
    max: 1,
    maxScroll: 1,
    clientH: 1,
    scrollH: 1,
    raw: 0,
  }))

  const rafRef = useRef(0)

  useEffect(() => {
    const scroller = getScroller()
    if (!scroller) return

    const EPS = 0.0008

    const update = () => {
      rafRef.current = 0

      setState((prev) => {
        const next = computeScrollState(scroller)

        const sameProgress = Math.abs((prev.t ?? 0) - (next.t ?? 0)) < EPS
        const sameTop = Math.abs((prev.top ?? 0) - (next.top ?? 0)) < 1
        const sameHeight =
          prev.clientH === next.clientH &&
          prev.scrollH === next.scrollH

        if (sameProgress && sameTop && sameHeight) return prev
        return next
      })
    }

    const requestUpdate = () => {
      if (rafRef.current) return
      rafRef.current = window.requestAnimationFrame(update)
    }

    update()

    scroller.addEventListener('scroll', requestUpdate, { passive: true })
    window.addEventListener('resize', requestUpdate)

    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
      scroller.removeEventListener('scroll', requestUpdate)
      window.removeEventListener('resize', requestUpdate)
    }
  }, [])

  return { ...state, p: state.t }
}
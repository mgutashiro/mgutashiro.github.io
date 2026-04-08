import { useEffect, useRef } from 'react'

export default function useHomeScrollSnap(sectionIds = []) {
  const lockRef = useRef(false)

  useEffect(() => {
    const scroller = document.getElementById('HomePageSections')
    if (!scroller || !sectionIds.length) return

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (!sections.length) return

    const getNearestIndex = () => {
      const top = scroller.scrollTop
      let bestIdx = 0
      let bestDist = Infinity

      sections.forEach((section, idx) => {
        const dist = Math.abs(section.offsetTop - top)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = idx
        }
      })

      return bestIdx
    }

    const unlockLater = () => {
      window.setTimeout(() => {
        lockRef.current = false
      }, 380)
    }

    const onWheel = (e) => {
        if (lockRef.current) {
        e.preventDefault()
        return
      }

        const dy = e.deltaY
        if (Math.abs(dy) < 8) return

        e.preventDefault()
        lockRef.current = true

        const currentIdx = getNearestIndex()
        const nextIdx =
            dy > 0
            ? Math.min(currentIdx + 1, sections.length - 1)
            : Math.max(currentIdx - 1, 0)

        scroller.scrollTo({
            top: sections[nextIdx].offsetTop,
            behavior: 'smooth',
        })

      unlockLater()
    }

    scroller.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      scroller.removeEventListener('wheel', onWheel)
    }
  }, [sectionIds])
}
import { useMemo, useRef } from 'react'

const clamp01 = (x) => Math.max(0, Math.min(1, x))

function findByProgress(p, sections) {
  const x = clamp01(p)

  for (let i = 0; i < sections.length; i++) {
    const s = sections[i]
    const [a, b] = s.t
    const isLast = i === sections.length - 1

    if ((x >= a && x < b) || (isLast && x >= a && x <= b)) {
      const span = Math.max(1e-6, b - a)
      const tLocal = clamp01((x - a) / span)
      return { idx: i, activeId: s.id, tLocal, active: s }
    }
  }

  const s0 = sections[0]
  return { idx: 0, activeId: s0?.id ?? 'intro', tLocal: 0, active: s0 ?? null }
}

export default function useActiveSection(p, sections = []) {
  const lastRef = useRef(null)

  return useMemo(() => {
    if (!sections.length) {
      return { activeId: 'intro', tLocal: 0, active: null }
    }

    const next = findByProgress(p, sections)
    lastRef.current = { idx: next.idx }

    return {
      activeId: next.activeId,
      tLocal: next.tLocal,
      active: next.active,
    }
  }, [p, sections])
}
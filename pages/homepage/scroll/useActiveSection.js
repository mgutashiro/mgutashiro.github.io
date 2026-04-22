import { useMemo } from 'react'

const clamp01 = (x) => Math.max(0, Math.min(1, x))

function findByProgress(p, sections) {
  const x = clamp01(p)

  for (let i = 0; i < sections.length; i++) {
    const s = sections[i]
    const [a, b] = s.t
    const isLast = i === sections.length - 1

    if ((x >= a && x < b) || (isLast && x >= a && x <= b)) {
      const span = Math.max(1e-6, b - a)
      return {
        activeId: s.id,
        tLocal: clamp01((x - a) / span),
        active: s,
      }
    }
  }

  return {
    activeId: sections[0]?.id ?? 'intro',
    tLocal: 0,
    active: sections[0] ?? null,
  }
}

export default function useActiveSection(p, sections = []) {
  return useMemo(() => {
    if (!sections.length) {
      return { activeId: 'intro', tLocal: 0, active: null }
    }

    return findByProgress(p, sections)
  }, [p, sections])
}
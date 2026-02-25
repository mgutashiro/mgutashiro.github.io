import './styles/tokens.css'
import './styles/components.css'
import '/pages/homepage/home.css'

import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.jsx'

function HomeDOMEffects() {
  useEffect(() => {
    const scroller = document.getElementById('page-home')
    if (!scroller) return

    const sections = Array.from(scroller.querySelectorAll(':scope > section'))
    if (sections.length === 0) return

    const last = sections[sections.length - 1]

    let returnToTopTimer = null
    let wasAtBottom = false

    const clearReturnToTopTimer = () => {
      if (returnToTopTimer) {
        window.clearTimeout(returnToTopTimer)
        returnToTopTimer = null
      }
    }

    const scheduleReturnToTop = () => {
      clearReturnToTopTimer()
      returnToTopTimer = window.setTimeout(() => {
        scroller.scrollTo({ top: 0, behavior: 'smooth' })
      }, 7000)
    }

    const update = () => {
      const viewH = scroller.clientHeight || window.innerHeight || 1
      const y = scroller.scrollTop

      // fade each section based on distance from its snap position
      for (let i = 0; i < sections.length; i++) {
        const s = sections[i]

        // distance in “screens” between section top and current scrollTop
        const dist = Math.abs((s.offsetTop - y) / viewH)

        // 1 at center/snap, 0 as it leaves toward next section
        const fade = Math.max(0, Math.min(1, 1 - dist))

        s.style.setProperty('--fade', String(fade))
      }

      // keep last section fully visible
      last.style.setProperty('--fade', '1')

      // bottom detection + 7s return
      const buffer = 8
      const isBottom = (y + scroller.clientHeight) >= (scroller.scrollHeight - buffer)

      if (isBottom && !wasAtBottom) {
        wasAtBottom = true
        scheduleReturnToTop()
      } else if (!isBottom && wasAtBottom) {
        wasAtBottom = false
        clearReturnToTopTimer()
      }
    }

    update()
    scroller.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      scroller.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      clearReturnToTopTimer()
    }
  }, [])

  return null
}

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
  <>
    {/* DOM behavior controller (doesn't render anything) */}
    <HomeDOMEffects />

    {/* WebGL */}
    <Canvas
        id="r3f-canvas"
        camera={{
            fov: 42,
            near: 0.1,
            far: 200,
            position: [6.5, -0.8, 9.5],
        }}
    >
    <Experience />
    </Canvas>
  </>
)
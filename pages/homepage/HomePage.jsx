import './home.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { HOME_SECTIONS } from './home.sections'
import { HOME_COPY } from './home.copy'
import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import HomeScene from './scene/HomeScene'
import HUDFrame from './hud/HUDFrame'
import AboutButtons from './ui/AboutButtons'
import ElevatorRig from './ui/ElevatorRig'

import useHomeScroll from './scroll/useHomeScroll'
import useHomeScrollSnap from './scroll/useHomeScrollSnap'
import useActiveSection from './scroll/useActiveSection'
import useMemeReset from './scroll/useMemeReset'




export default function HomePage() {
  const { p } = useHomeScroll()

  const { activeId, tLocal } = useActiveSection(p, HOME_SECTIONS)

  // tune 0.01 (subtle) to 0.04 (aggressive)
  const FRAME_LEAD = 0.02 
  const frameP = Math.min(1, p + FRAME_LEAD)
  const { activeId: frameActiveId } = useActiveSection(frameP, HOME_SECTIONS)

  const { dropNow, resetTick } = useMemeReset(activeId)
  const aboutPanels = HOME_COPY.about.panels
  const [aboutIndex, setAboutIndex] = useState(0)
  const titleAnchorRef = useRef(null)

  useHomeScrollSnap(HOME_SECTIONS.map((s) => s.id))

  // console.log('HomePage state', { p, activeId, tLocal })

  const goAboutNext = () => {
    setAboutIndex((i) => Math.min(i + 1, aboutPanels.length - 1))
  }

  const goAboutBack = () => {
    setAboutIndex((i) => Math.max(i - 1, 0))
  }

  useEffect (() => {
    if (activeId !== 'about') {
      setAboutIndex(0)
    }
  }, [activeId])


  const aboutTitle = HOME_COPY.about.title
  const currentPanel = aboutPanels[aboutIndex]
  

  return (
    
    <>
      <div id="webgl" aria-hidden="true">
        <Canvas
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          camera={{ position: [0, 0, 6], fov: 45 }}
        >
          <OrbitControls makeDefault enabled={false} />
          <HomeScene
            p={p}
            activeId={activeId}
            tLocal={tLocal}
            dropNow={dropNow}
            resetTick={resetTick}
            titleAnchorRef={titleAnchorRef}
          />
        </Canvas>
      </div>

      <div className="HomePageGrid" data-active-section={activeId}>

        <aside id="elevatorSpace" className="elevatorLane">
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, 0.25, 6.2], fov: 35 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ElevatorRig progress={p} dropNow={dropNow}/>
          </Canvas>
        </aside>

        <div className="HomePageMainSpace">
          <main
            id="page-home"
            className="uiLayer HomePageSections"
            aria-label="Home page sections"
          >
            {HOME_SECTIONS.map((s) => {
              if (s.id === 'intro') {
                return (
                  <section
                    key={s.id}
                    id={s.id}
                    aria-label={s.label}
                    className='homeSection introSection'
                  >
                    <div className="introPanel">
                      {/* optional invisible anchor for TitleRig alignment */}
                      <div
                        ref={titleAnchorRef}
                        className="titleAnchor"
                        aria-hidden="true"
                      />

                      <div className="introMark">
                        <p>© M.G.U</p>
                      </div>
                    </div>
                  </section>
                )
              }

              if (s.id === 'meme') {
                return (
                  <section
                    key={s.id}
                    id={s.id}
                    aria-label={s.label}
                    className="homeSection memeSection"
                  >
                    <div className="memePanel">
                      
                    </div>
                  </section>
                )
              }

              if (s.id === 'about') {
                return (
                  <section
                    key={s.id}
                    id={s.id}
                    aria-label={s.label}
                    className='homeSection framedSection aboutSection'
                  >
                    <div className="sectionPanelShell aboutPanel">
                      <HUDFrame
                        activeSection="about"
                        className={`sectionFrame aboutFrame ${frameActiveId === 'about' ? 'isActive' : 'isHidden'}`}
                      />

                      <div className="aboutText">
                        <h2 className="aboutTitle">{aboutTitle}</h2>
                        <p className="aboutBody">{currentPanel.body}</p>
                      </div>
                    </div>
                    <div className="aboutControls">
                      <AboutButtons
                        index={aboutIndex}
                        total={HOME_COPY.about.panels.length}
                        onBack={goAboutBack}
                        onNext={goAboutNext}
                      />
                    </div>
                    
                    
                  </section>
                )
              }

              const sectionCopy = HOME_COPY[s.id]

              return (
                <section
                  key={s.id}
                  id={s.id}
                  aria-label={s.label}
                  className={`homeSection framedSection ${s.id}Section`}
                >
                  <div className={`${s.id}Panel sectionPanelShell`}>

                    <HUDFrame
                      activeSection={s.id}
                      className={`sectionFrame ${s.id}Frame ${frameActiveId === s.id ? 'isActive' : 'isHidden'}`}
                    />

                    <div className={`${s.id}Text sectionText`}>
                      <header className="sectionTextHeader">
                        <h2 className = "sectionTitle">{sectionCopy.title}</h2>
                      </header>
                      <div className={`sectionBodyWrap`}>
                        <p className="sectionBody">{sectionCopy.body}</p>
                      </div>
                    </div>
                  </div>
                  <div className={`${s.id}Actions LinkToSubPage`}>
                    {s.hasCTA && s.route ? (
                      <Link to={s.route} className={`sectionCTA ${s.id}CTA`}>
                        {s.ctaLabel}
                      </Link>
                    ) : null}
                  </div>
                </section>
              )
            })}
          </main>
        </div>
      </div>
    </>
  )
}
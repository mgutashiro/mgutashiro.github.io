import './hud/HUDFrame.css'
import './home.css'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Center } from '@react-three/drei'
import { HOME_SECTIONS } from './home.sections'
import { HOME_COPY } from './home.copy'
import { useCallback, useEffect, useState, useRef } from 'react'

import HomeScene from './scene/HomeScene'
import HUDFrame from './hud/HUDFrame'
import AboutButtons from './ui/AboutButtons'
import SectionLinkButton from './ui/SectionLinkButton'

import useHomeScroll from './scroll/useHomeScroll'
import useActiveSection from './scroll/useActiveSection'

import linkedinLogo from '../../src/assets/SVG/linkedinLogo.svg'
import githubLogo from '../../src/assets/SVG/githubLogo.svg'
import HomeLoadingScreen from './loading/HomeLoadingScreen'
import HomeSectionNav from './ui/HomeSectionNav'

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(() => {
        const params = new URLSearchParams(window.location.search);
        const forceBoot = params.get('boot') === '1';
        if (forceBoot) {
            sessionStorage.removeItem('homeBootSeen');
        }
        return forceBoot || sessionStorage.getItem('homeBootSeen') !== 'true';
    });

    const handleLoadingComplete = useCallback(() => {
        sessionStorage.setItem('homeBootSeen', 'true');
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <HomeLoadingScreen onComplete={handleLoadingComplete} />;
    }

    return <HomePageContent />;
}

function HomePageContent() {
    const { p } = useHomeScroll()
    const { activeId, tLocal } = useActiveSection(p, HOME_SECTIONS)

    const aboutPanels = HOME_COPY.about.panels
    const [ aboutIndex, setAboutIndex ] = useState(0)
    const titleAnchorRef = useRef(null)

    useEffect(() => {
        if (activeId !== 'about') {
            setAboutIndex(0)
        }
    }, [activeId])

    const goAboutNext = () => {
        setAboutIndex((i) => Math.min(i + 1, aboutPanels.length - 1))
    }

    const goAboutBack = () => {
        setAboutIndex((i) => Math.max(i - 1, 0))
    }
    
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
                        titleAnchorRef={titleAnchorRef}
                    />
                </Canvas>
            </div>

            <div className="HomePageGrid" data-active-section={activeId}>
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
                                            <div
                                                ref={titleAnchorRef}
                                                className="titleAnchor"
                                                aria-hidden="true"
                                            />
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
                                        className="homeSection framedSection aboutSection"
                                    >
                                        <div className="sectionPanelShell aboutPanel">
                                            <div className="sectionContentStack aboutContentStack">
                                                <header className="sectionHeading">
                                                    <h2 className="aboutTitle">
                                                        {aboutTitle}
                                                    </h2>
                                                </header>

                                                <div className="aboutFrameTarget sectionFrameTarget">
                                                    <HUDFrame
                                                        activeSection="about"
                                                        className={`sectionFrame aboutFrame ${
                                                            activeId === 'about' ? 'isActive' : ''
                                                        }`}
                                                    />

                                                    <div className="aboutText">
                                                        <p className="aboutBody">
                                                            {currentPanel.body}
                                                        </p>
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
                                            </div>
                                        </div>
                                    </section>
                                )
                            }
                            
                            const sectionCopy = HOME_COPY[s.id]
                            if (!sectionCopy) return null
                            
                            return (
                                <section
                                    key={s.id}
                                    id={s.id}
                                    aria-label={s.label}
                                    className={`homeSection framedSection ${s.id}Section`}
                                >
                                    <div className={`${s.id}Panel sectionPanelShell`}>
                                        <div className="sectionContentStack">
                                            <header className="sectionHeading">
                                                <h2 className="sectionTitle">
                                                    {sectionCopy.title}
                                                </h2>
                                            </header>

                                            <div className={`${s.id}FrameTarget sectionFrameTarget`}>
                                                <HUDFrame
                                                    activeSection={s.id}
                                                    className={`sectionFrame ${s.id}Frame ${
                                                        activeId === s.id ? 'isActive' : ''
                                                    }`}
                                                />

                                                <div className={`${s.id}Text sectionText`}>
                                                    <div className="sectionBodyWrap">
                                                        <p className="sectionBody">
                                                            {sectionCopy.body}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {s.hasCTA && s.route ? (
                                            <div className={`${s.id}Actions LinkToSubPage`}>
                                                <SectionLinkButton 
                                                    to={s.route}
                                                    label={s.ctaLabel}
                                                    variant={s.id}
                                                    kind="primary"
                                                    icon="→"
                                                />
                                            </div>
                                        ) : null}
                                    </div>
                                </section>
                            )
                        })}
                    </main>
                </div>
                <div className="homePageChrome">
                    <div className="homePageTopBar">
                        <HomeSectionNav activeId={activeId} tLocal={tLocal} />
                        <nav
                            className="aboutSocials"
                            aria-label="External links"
                        >
                            <a
                                className="aboutSocialLink aboutSocialLink--linkedin"
                                href="https://www.linkedin.com/in/monica-utashiro-hahn-450748171/"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                            >
                                <img src={linkedinLogo} alt="" />
                            </a>

                            <a
                                className="aboutSocialLink aboutSocialLink--github"
                                href="https://github.com/mgutashiro"
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                            >
                                <img src={githubLogo} alt="" />
                            </a>
                        </nav>
                    </div>

                    <div className="homePageMGUMark" aria-hidden="true">
                        <p>© M.G.U</p>
                    </div>
                </div>
            </div>
        </>
    )
}
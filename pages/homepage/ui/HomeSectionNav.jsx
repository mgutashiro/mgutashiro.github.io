import { useState } from 'react';
import SkullLogo from '/src/assets/components/logo/SkullLogo';
import './HomeSectionNav.css';

const NAV_ITEMS = [
    { id: 'about', label: 'About' },
    { id: 'spec', label: 'Spec' },
    { id: 'dft', label: 'DFT' },
    { id: 'philosophy', label: 'Philosophy' },
]

function scrollToHomeSection(sectionId) {
    const scroller = document.getElementById('page-home')
    const section = document.getElementById(sectionId)

    if (!scroller || !section) return

    const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches

    scroller.scrollTo({
        top: section.offsetTop,
        behavior: reduceMotion ? 'auto' : 'smooth',
    })
}

export default function HomeSectionNav({
    activeId,
    tLocal = 0,
}) {
    const [isShaking, setIsShaking] = useState(false)

    const activeIndex = NAV_ITEMS.findIndex(
        (item) => item.id === activeId
    )

    const isVisible = activeIndex >= 0
    const lastIndex = NAV_ITEMS.length - 1

    const trackerPosition = isVisible
        ? Math.min(
            lastIndex,
            activeIndex + (
                activeIndex < lastIndex ? tLocal : 0
            )
        )
        : 0

    function startShake() {
        setIsShaking(false)

        requestAnimationFrame(() => {
            setIsShaking(true)
        })
    }

    return (
        <nav
            className={`home-section-nav ${
                isVisible ? 'is-visible' : ''
            }`}
            style={{
                '--home-nav-position': trackerPosition,
            }}
            aria-label="Homepage sections"
            aria-hidden={!isVisible}
        >
            <div className="home-section-nav__track">
                <span
                    className="home-section-nav__line"
                    aria-hidden="true"
                />

                <span
                    className="home-section-nav__progress"
                    aria-hidden="true"
                />

                <span
                    className="home-section-nav__tracker"
                    onPointerEnter={startShake}
                    onPointerLeave={() => setIsShaking(false)}
                    onAnimationEnd={() => setIsShaking(false)}
                    aria-hidden="true"
                >
                    <SkullLogo
                        className="home-section-nav__skull"
                        size="tiny"
                        state={isShaking ? 'shake' : 'idle'}
                    />
                </span>

                {NAV_ITEMS.map((item, index) => {
                    const isActive = item.id === activeId

                    return (
                        <button
                            key={item.id}
                            type="button"
                            className={`home-section-nav__item ${
                                isActive ? 'is-active' : ''
                            }`}
                            style={{
                                '--home-nav-item-index': index,
                            }}
                            tabIndex={isVisible ? 0 : -1}
                            aria-current={
                                isActive ? 'location' : undefined
                            }
                            onClick={() => scrollToSection(item.id)}
                        >
                            <span
                                className="home-section-nav__tick"
                                aria-hidden="true"
                            />

                            <span className="home-section-nav__label">
                                {item.label}
                            </span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}
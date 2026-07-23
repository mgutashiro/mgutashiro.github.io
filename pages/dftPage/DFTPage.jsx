import { useEffect, useMemo, useRef, useState } from "react";

import titleTheUrl from "/src/assets/SVG/DFTPageTitle/The.svg?url";
import titleDensityUrl from "/src/assets/SVG/DFTPageTitle/Density.svg?url";
import titleDialUrl from "/src/assets/SVG/DFTPageTitle/Dial.svg?url";

import {
    CHAPTERS,
    EVIDENCE_TABS,
    LIMITS,
    ORCA_LAYERS,
    ORCA_PIPELINE,
    PAGE_META,
    PCET_PATHWAYS,
    PCET_STEPS,
    REFERENCES,
    SUPPORTS,
    THEORY_STEPS,
} from "./DFTContent";

import SkullReturnMenu from "/src/assets/components/navigation/ReturnMenu/SkullReturnMenu";
import HYQLandingVisual from "./visuals/HYQLandingVisual";
import StudyVisualPanel from "./visuals/study/StudyVisualPanel";
import "./DFTPage.css";

const MODE_LABELS = {
    friends: "Friends",
    colleague: "Colleague",
};

function wrapIndex(index, length) {
    return (index + length) % length;
}

function ModeToggle({ mode, onChange }) {
    return (
        <div className="dft-mode" aria-label="Explanation level">
            <span className="dft-mode__label">Explanation Mode</span>
            <div className="dft-mode__buttons" role="group" aria-label="Choose explanation level">
                {Object.entries(MODE_LABELS).map(([value, label]) => (
                    <button
                        key={value}
                        type="button"
                        className={mode === value ? "is-active" : ""}
                        aria-pressed={mode === value}
                        onClick={() => onChange(value)}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}

function StepControls({ index, count, onChange, label }) {
    const current = String(index + 1).padStart(2, "0");
    const total = String(count).padStart(2, "0");

    return (
        <div className="dft-step-controls" aria-label={label}>
            <button
                type="button"
                onClick={() =>
                    onChange(wrapIndex(index - 1, count))
                }
            >
                ← Previous
            </button>

            <span
                className="dft-step-controls__index"
                aria-label={`Step ${index + 1} of ${count}`}
            >
                <strong>{current}</strong>

                <span
                    className="dft-step-controls__divider"
                    aria-hidden="true"
                >
                    /
                </span>

                <span className="dft-step-controls__total">
                    {total}
                </span>
            </span>

            <button
                type="button"
                onClick={() =>
                    onChange(wrapIndex(index + 1, count))
                }
            >
                Next →
            </button>
        </div>
    );
}

function TheoryPanel({ mode, theoryIndex, setTheoryIndex }) {
    const step = THEORY_STEPS[theoryIndex];
    const copy = step[mode];

    return (
        <div className="dft-subpanel">
            <div className="dft-subnav" role="tablist" aria-label="DFT history steps">
                {THEORY_STEPS.map((item, index) => (
                    <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={index === theoryIndex}
                        className={index === theoryIndex ? "is-active" : ""}
                        onClick={() => setTheoryIndex(index)}
                    >
                        {item.short}
                    </button>
                ))}
            </div>

            <article
                className="
                    dft-card
                    dft-card--accent-violet
                    dft-theory-card
                "
            >
                <h3>{copy.title}</h3>
                <p>{copy.body}</p>
                {copy.equation && <p className="dft-equation">{copy.equation}</p>}
                <ul className="dft-chip-list">
                    {copy.bullets.map((bullet) => (
                        <li key={bullet}>
                            <span>{bullet}</span>
                        </li>
                    ))}
                </ul>
            </article>

            <StepControls
                index={theoryIndex}
                count={THEORY_STEPS.length}
                onChange={setTheoryIndex}
                label="Move through DFT history"
            />

        </div>
    );
}

function PCETPanel({ mode, pathway, setPathway }) {
  return (
    <div className="dft-subpanel">
            <div className="dft-literature">
                <span>Literature model</span>
                <strong>Excited [RuII(bpy)₂(bpz)]²⁺ quenched by hydroquinone</strong>
            </div>

            <ol className="dft-mechanism">
                {PCET_STEPS.map((step, index) => (
                    <li key={step}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{step}</p>
                    </li>
                ))}
            </ol>

            <div className="dft-transfer-key" aria-label="Transfer color key">
                <span><i className="is-electron" /> Cyan: electron motion</span>
                <span><i className="is-proton" /> Pink: proton motion</span>
            </div>

            <div className="dft-subnav" role="tablist" aria-label="PCET pathway families">
                {PCET_PATHWAYS.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={pathway === item.id}
                        className={pathway === item.id ? "is-active" : ""}
                        onClick={() => setPathway(item.id)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <article className="dft-card dft-card--accent-split">
                <h3>{PCET_PATHWAYS.find((item) => item.id === pathway)?.detail}</h3>
                <p>
                    {mode === "friends"
                    ? "This control changes the conceptual pathway shown by the placeholder visual. It does not generate numerical kinetics."
                    : "This is a qualitative pathway selector. A defensible energetic preference would require explicit thermodynamic, kinetic, and reaction-coordinate analysis."}
                </p>
            </article>
        </div>
    );
}

function OrcaPanel({ mode }) {
    return (
        <div className="dft-subpanel">
            <ol className="dft-pipeline">
                {ORCA_PIPELINE.map((step, index) => (
                    <li key={step.colleague}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{step[mode]}</p>
                    </li>
                ))}
            </ol>

            <div className="dft-layer-grid">
                {ORCA_LAYERS.map((layer) => (
                    <article key={layer.title} className="dft-card dft-card--compact">
                        <h3>{layer.title}</h3>
                        <p>{layer[mode]}</p>
                    </article>
                ))}
            </div>

            <details className="dft-details">
                <summary>View example ORCA output placeholder</summary>
                <pre className="dft-output"><code>{`! B3LYP def2-SVP RIJCOSX CPCM(DMSO) OPT FREQ
                * xyz 0 1
                [optimized HYQ coordinates]
                *

                SCF CONVERGED
                FREQUENCIES: [insert verified values]
                TDDFT / EPR PROPERTY BLOCKS: [insert excerpts]`}</code></pre>
            </details>
        </div>
    );
}

function EvidencePanel({ mode, evidenceIndex, setEvidenceIndex }) {
    const tab = EVIDENCE_TABS[evidenceIndex];
    const copy = tab[mode];

    return (
        <div className="dft-subpanel">
            <div className="dft-subnav dft-subnav--wrap" role="tablist" aria-label="HYQ result categories">
                {EVIDENCE_TABS.map((item, index) => (
                    <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={index === evidenceIndex}
                        className={index === evidenceIndex ? "is-active" : ""}
                        onClick={() => setEvidenceIndex(index)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>

            <article className="dft-card dft-card--accent-cyan">
                {/* <p className="dft-kicker">Visual state: {tab.visual}</p> */}
                <h3>{copy.title}</h3>
                <p>{copy.body}</p>
                <dl className="dft-metrics">
                    {copy.metrics.map((metric, index) => (
                        <div key={metric}>
                            <dt>{String(index + 1).padStart(2, "0")}</dt>
                            <dd>{metric}</dd>
                        </div>
                    ))}
                </dl>
            </article>

            <StepControls
                index={evidenceIndex}
                count={EVIDENCE_TABS.length}
                onChange={setEvidenceIndex}
                label="Move through HYQ evidence"
            />
        </div>
    );
}

function MeaningPanel() {
    return (
        <div className="dft-subpanel">
            <div className="dft-meaning-grid">
                <article className="dft-card dft-card--support">
                    <h3>What the calculations support</h3>
                    <ul>{SUPPORTS.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
                <article className="dft-card dft-card--limit">
                    <h3>What they do not establish alone</h3>
                    <ul>{LIMITS.map((item) => <li key={item}>{item}</li>)}</ul>
                </article>
            </div>
            <blockquote className="dft-final-statement">
                Computation narrows the mechanistic possibilities. Experiment decides which possibility the system actually follows.
            </blockquote>
        </div>
    );
}

function ChapterDetails({ chapterId, mode, state }) {
    switch (chapterId) {
        case "density":
            return <TheoryPanel mode={mode} theoryIndex={state.theoryIndex} setTheoryIndex={state.setTheoryIndex} />;
        case "pcet":
            return <PCETPanel mode={mode} pathway={state.pathway} setPathway={state.setPathway} />;
        case "orca":
            return <OrcaPanel mode={mode} />;
        case "evidence":
            return <EvidencePanel mode={mode} evidenceIndex={state.evidenceIndex} setEvidenceIndex={state.setEvidenceIndex} />;
        case "meaning":
            return <MeaningPanel />;
        default:
            return null;
    }
}

function MGUMark({ variant = "study" }) {
    return (
        <div
            className={`dft-mgu-mark dft-mgu-mark--${variant}`}
        >
            <p>©M.G.U</p>
        </div>
    );
}

export default function DFTPage() {
    const initialRoute = useMemo(() => {
        if (typeof window === "undefined") {
            return { screen: "intro", chapter: 0 };
        }

        const hash = window.location.hash.replace("#", "");

        if (hash === "conclusion") {
            return { screen: "conclusion", chapter: 4 };
        }

        const found = CHAPTERS.findIndex((chapterItem) => chapterItem.id === hash);

        return found >= 0
            ? { screen: "study", chapter: found }
            : { screen: "intro", chapter: 0 };
    }, []);

    const [activeScreen, setActiveScreen] = useState(initialRoute.screen);
    const [mode, setMode] = useState("friends");
    const [activeChapter, setActiveChapter] = useState(initialRoute.chapter);
    const [theoryIndex, setTheoryIndex] = useState(0);
    const [pathway, setPathway] = useState("cpet");
    const [evidenceIndex, setEvidenceIndex] = useState(0);

    const introRef = useRef(null);
    const stageRef = useRef(null);
    const conclusionRef = useRef(null);

    const chapter = CHAPTERS[activeChapter];
    const copy = chapter.content[mode];
    const evidenceTab = EVIDENCE_TABS[evidenceIndex];

    useEffect(() => {
        if (typeof window === "undefined") return;

        const url = new URL(window.location.href);

        if (activeScreen === "study") {
            url.hash = chapter.id;
        } else if (activeScreen === "conclusion") {
            url.hash = "conclusion";
        } else {
            url.hash = "";
        }

        window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    }, [activeScreen, chapter.id]);

    useEffect(() => {
        const target =
            activeScreen === "intro"
                ? introRef.current
                : activeScreen === "study"
                    ? stageRef.current
                    : conclusionRef.current;

        requestAnimationFrame(() => {
            target?.scrollTo({ top: 0, behavior: "auto" });
        });
    }, [activeScreen]);

    useEffect(() => {
        if (activeScreen !== "study") return;

        requestAnimationFrame(() => {
            stageRef.current?.scrollTo({ top: 0, behavior: "auto" });
        });
    }, [activeChapter, mode, activeScreen]);

    function openChapter(index) {
        setActiveChapter(index);
        setActiveScreen("study");
    }

    function changeChapter(index) {
        setActiveChapter(index);
    }

    function beginStudy() {
        openChapter(0);
    }

    return (
        <main className="dft-page">
            {activeScreen === "intro" && (
                <section
                    ref={introRef}
                    className="dft-hero dft-screen-scroll"
                    aria-labelledby="dft-title"
                >
                    <div className="dft-hero__copy">
                        <div className="dft-hero__intro">
                            <p className="dft-eyebrow">
                                <span className="dft-eyebrow__lead">theoretical chemistry</span>
                                <span className="dft-eyebrow__divider" aria-hidden="true">
                                    /
                                </span>
                                <span className="dft-eyebrow__rest">
                                    Case Study
                                </span>
                            </p>

                            <h1
                                id="dft-title"
                                className="dft-hero__title"
                                aria-label="The Density Dial"
                            >
                                <span
                                    className="dft-hero__title-row"
                                    aria-hidden="true"
                                >
                                    <span
                                        className="
                                            dft-hero__title-shape
                                            dft-hero__title-prefix
                                        "
                                        style={{
                                            "--title-mask": `url("${titleTheUrl}")`,
                                        }}
                                    />

                                    <span
                                        className="
                                            dft-hero__title-shape
                                            dft-hero__title-density
                                        "
                                        style={{
                                            "--title-mask": `url("${titleDensityUrl}")`,
                                        }}
                                    />
                                </span>

                                <span
                                    className="
                                        dft-hero__title-shape
                                        dft-hero__title-dial
                                    "
                                    aria-hidden="true"
                                    style={{
                                        "--title-mask": `url("${titleDialUrl}")`,
                                    }}
                                />
                            </h1>

                            <p className="dft-hero__subtitle">
                                <span className="dft-hero__subtitle-connector">From</span>
                                <span className="dft-hero__subtitle-subject">electron density</span>
                                <span className="dft-hero__subtitle-connector">to</span>
                                <span className="dft-hero__subtitle-subject">chemical mechanism</span>
                            </p>
                        </div>

                        <div className="dft-hero__details">
                            <p className="dft-hero__lede">
                                Explore how DFT, ORCA 6, and molecular visualization reveal
                                hydroquinone’s structure, electron density, and proton-coupled
                                electron-transfer behavior.
                            </p>

                            <div className="dft-hero__actions">
                                <button
                                    type="button"
                                    className="dft-button dft-button--primary"
                                    onClick={beginStudy}
                                >
                                    Begin the Case Study
                                </button>

                                <button
                                    type="button"
                                    className="dft-button"
                                    onClick={() => openChapter(3)}
                                >
                                    Jump to Results
                                </button>
                            </div>
                        </div>
                    </div>

                    <div
                        className="dft-hero__visual"
                        role="img"
                        aria-label="Optimized hydroquinone structure with electron-density surface"
                    >
                        <span
                            className="dft-hero__static-ring"
                            aria-hidden="true"
                        />

                        <HYQLandingVisual />
                    </div>

                    <dl className="dft-meta">
                        {PAGE_META.map(([term, description]) => (
                            <div key={term}>
                                <dt>{term}</dt>
                                <dd>{description}</dd>
                            </div>
                        ))}
                    </dl>
                    <MGUMark variant="intro" />
                </section>
            )}

            {activeScreen === "study" && (
                <section
                    id="density-dial"
                    className="dft-study"
                    aria-labelledby="chapter-title"
                >
                    <header className="dft-study__header">
                        <div className="dft-study__identity">
                            <SkullReturnMenu
                                className="dft-study__return-menu"
                                label="Return"
                                hoverLabel="Click Me!"
                                logoSize="nav"
                                items={[
                                    {
                                        label: "Project Overview",
                                        tone: "liquid",
                                        onSelect: () => setActiveScreen("intro"),
                                    },
                                    {
                                        label: "Graveyard Chemist Main",
                                        tone: "liquid",
                                        to: "/",
                                    },
                                ]}
                            />
                            <h2>The Density Dial</h2>
                        </div>

                        <ModeToggle mode={mode} onChange={setMode} />
                    </header>

                    <nav className="dft-chapter-nav" aria-label="DFT case study chapters">
                        {CHAPTERS.map((item, index) => (
                            <button
                                key={item.id}
                                type="button"
                                className={index === activeChapter ? "is-active" : ""}
                                aria-current={index === activeChapter ? "step" : undefined}
                                onClick={() => changeChapter(index)}
                            >
                                <span>{item.number}</span>
                                {item.nav}
                            </button>
                        ))}
                    </nav>

                    <div ref={stageRef} className="dft-stage">
                        <StudyVisualPanel
                            chapter={chapter}
                            activeChapter={activeChapter}
                            evidenceTab={evidenceTab}
                            mode={mode}
                            state={{
                                theoryIndex,
                                pathway,
                                evidenceIndex,
                            }}
                        />

                        <div className="dft-reading" key={`${chapter.id}-${mode}`}>
                            <h2 id="chapter-title">
                                {copy.title.split("\n").map((line) => (
                                    <span key={line}>
                                        {line}
                                    </span>
                                ))}
                            </h2>

                            <p className="dft-reading__summary">
                                {copy.summary}
                            </p>

                            <ChapterDetails
                                chapterId={chapter.id}
                                mode={mode}
                                state={{
                                    theoryIndex,
                                    setTheoryIndex,
                                    pathway,
                                    setPathway,
                                    evidenceIndex,
                                    setEvidenceIndex,
                                }}
                            />
                        </div>
                        <footer className="dft-stage__footer">
                            <span
                                className="dft-stage__metal-line"
                                aria-hidden="true"
                            />

                            <p className="dft-stage__mgu">
                                ©M.G.U
                            </p>
                        </footer>
                    </div>
                </section>
            )}

            {activeScreen === "conclusion" && (
                <footer
                    ref={conclusionRef}
                    className="dft-footer dft-screen-scroll"
                >
                    <div>
                        <button
                            type="button"
                            className="dft-text-button"
                            onClick={() => setActiveScreen("study")}
                        >
                            ← Return to guided calculation
                        </button>
                        <p className="dft-eyebrow">Research position</p>
                        <h2>Use theory to sharpen the question—not replace the experiment.</h2>

                        <div className="dft-hero__actions">
                            <button
                                type="button"
                                className="dft-button"
                                onClick={() => setActiveScreen("intro")}
                            >
                                Project overview
                            </button>
                        </div>
                    </div>

                    <div className="dft-footer__references">
                        <span>Selected references</span>
                        {REFERENCES.map((reference) => (
                            <a
                                key={reference.href}
                                href={reference.href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {reference.label} ↗
                            </a>
                        ))}
                    </div>
                </footer>
            )}
        </main>
    );
}
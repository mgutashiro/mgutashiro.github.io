import { useEffect, useMemo, useRef, useState } from "react";
import {
    CHAPTERS,
    DFT_SCOPE,
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
            <span className="dft-mode__label">Explanation level</span>
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

function VisualPlaceholder({ chapter, activeChapter, evidenceTab }) {
    const visualLabel =
        chapter.id === "evidence"
            ? evidenceTab.visual
            : chapter.visual;

    return (
        <figure
            className="dft-visual-stack"
            aria-label={`${chapter.nav} visual placeholder`}
        >
            <div className="dft-visual">
                <div
                    className="dft-ring__track"
                    style={{
                        "--ring-rotation": `${activeChapter * -72}deg`,
                    }}
                    aria-hidden="true"
                />

                <span
                    className="dft-ring__pointer"
                    aria-hidden="true"
                />

                {CHAPTERS.map((item, index) => {
                    const angle =
                        (index / CHAPTERS.length) * Math.PI * 2 -
                        Math.PI / 2;

                    const left = 50 + Math.cos(angle) * 43;
                    const top = 50 + Math.sin(angle) * 43;

                    return (
                        <span
                            key={item.id}
                            className={`dft-ring__station ${
                                index === activeChapter
                                    ? "is-active"
                                    : ""
                            }`}
                            style={{
                                left: `${left}%`,
                                top: `${top}%`,
                            }}
                            aria-hidden="true"
                        >
                            {item.number}
                        </span>
                    );
                })}

                <div
                    className="dft-molecule-placeholder"
                    aria-hidden="true"
                >
                    <span className="dft-atom dft-atom--one" />
                    <span className="dft-atom dft-atom--two" />
                    <span className="dft-atom dft-atom--three" />
                    <span className="dft-atom dft-atom--four" />

                    <span className="dft-bond dft-bond--one" />
                    <span className="dft-bond dft-bond--two" />
                    <span className="dft-bond dft-bond--three" />
                </div>

                <div className="dft-visual__placeholder-note">
                    Three.js / Blender placeholder
                </div>
            </div>

            <figcaption className="dft-visual__label">
                {visualLabel}
            </figcaption>
        </figure>
    );
}

function StepControls({ index, count, onChange, label }) {
    return (
        <div className="dft-step-controls" aria-label={label}>
            <button type="button" onClick={() => onChange(wrapIndex(index - 1, count))}>
                ← Previous
            </button>
            <span>{String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}</span>
            <button type="button" onClick={() => onChange(wrapIndex(index + 1, count))}>
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

            <article className="dft-card dft-card--accent-violet">
                <p className="dft-kicker">Visual state: {step.visual}</p>
                <h3>{copy.title}</h3>
                <p>{copy.body}</p>
                {copy.equation && <p className="dft-equation">{copy.equation}</p>}
                <ul className="dft-chip-list">
                    {copy.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
            </article>

            <StepControls
                index={theoryIndex}
                count={THEORY_STEPS.length}
                onChange={setTheoryIndex}
                label="Move through DFT history"
            />

            <details className="dft-details">
                <summary>What DFT can and cannot do</summary>
                <div className="dft-scope-grid">
                    <div>
                        <h4>Strong for</h4>
                        <ul>{DFT_SCOPE.strong.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                    <div>
                        <h4>Model-dependent</h4>
                        <ul>{DFT_SCOPE.dependent.map((item) => <li key={item}>{item}</li>)}</ul>
                    </div>
                </div>
                <p className="dft-callout">{DFT_SCOPE.limit}</p>
            </details>
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
                <p className="dft-kicker">Visual state: {tab.visual}</p>
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
                        <p className="dft-eyebrow">Independent computational chemistry case study</p>
                        <h1 id="dft-title">The Density Dial</h1>
                        <p className="dft-hero__subtitle">From electron density to chemical mechanism</p>
                        <p className="dft-hero__lede">
                            An interactive study of how Density Functional Theory, ORCA 6, and molecular visualization can help investigate hydroquinone as a model proton-coupled electron-transfer reagent.
                        </p>

                        <div className="dft-hero__actions">
                            <button
                                type="button"
                                className="dft-button dft-button--primary"
                                onClick={beginStudy}
                            >
                                Start from Beginning
                            </button>

                            <button
                                type="button"
                                className="dft-button"
                                onClick={() => openChapter(3)}
                            >
                                View Calculation Results
                            </button>
                        </div>
                    </div>

                    <div className="dft-hero__visual" aria-label="HYQ molecule placeholder">
                        <span className="dft-hero__orbit" aria-hidden="true" />
                        <strong>HYQ</strong>
                        <small>optimized structure placeholder</small>
                    </div>

                    <dl className="dft-meta">
                        {PAGE_META.map(([term, description]) => (
                            <div key={term}>
                                <dt>{term}</dt>
                                <dd>{description}</dd>
                            </div>
                        ))}
                    </dl>
                </section>
            )}

            {activeScreen === "study" && (
                <section
                    id="density-dial"
                    className="dft-study"
                    aria-labelledby="chapter-title"
                >
                    <header className="dft-study__header">
                        <div>
                            <button
                                type="button"
                                className="dft-text-button"
                                onClick={() => setActiveScreen("intro")}
                            >
                                ← Project overview
                            </button>
                            <p className="dft-eyebrow">Independent computational chemistry case study</p>
                            <h2>The guided calculation</h2>
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
                        <VisualPlaceholder
                            chapter={chapter}
                            activeChapter={activeChapter}
                            evidenceTab={evidenceTab}
                        />

                        <div className="dft-reading" key={`${chapter.id}-${mode}`}>
                            <h2 id="chapter-title">
                                {copy.title}
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

                            <div className="dft-chapter-controls">
                                <button
                                    type="button"
                                    onClick={() =>
                                        changeChapter(
                                            wrapIndex(activeChapter - 1, CHAPTERS.length)
                                        )
                                    }
                                >
                                    ← {CHAPTERS[wrapIndex(activeChapter - 1, CHAPTERS.length)].nav}
                                </button>

                                {activeChapter === CHAPTERS.length - 1 ? (
                                    <button
                                        type="button"
                                        onClick={() => setActiveScreen("conclusion")}
                                    >
                                        Research position →
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => changeChapter(activeChapter + 1)}
                                    >
                                        {CHAPTERS[activeChapter + 1].nav} →
                                    </button>
                                )}
                            </div>
                        </div>
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

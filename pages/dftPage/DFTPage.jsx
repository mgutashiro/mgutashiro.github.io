import {
    Suspense,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, useGLTF } from "@react-three/drei";
import hyqLandingModelUrl from "/src/assets/models/HYQModels/DFTPageLandingHYQAnimation.glb?url";

import titleTheUrl from "/src/assets/SVG/DFTPageTitle/The.svg?url";
import titleDensityUrl from "/src/assets/SVG/DFTPageTitle/Density.svg?url";
import titleDialUrl from "/src/assets/SVG/DFTPageTitle/Dial.svg?url";

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

import SkullReturnMenu from "/src/assets/components/navigation/ReturnMenu/SkullReturnMenu";
import "./DFTPage.css";

const MODE_LABELS = {
    friends: "Friends",
    colleague: "Colleague",
};

function HYQModel({
    animate = false,
    densityOpacity = 0.28,
    rotation = [0, 0, 0],
}) {
    const { scene } = useGLTF(hyqLandingModelUrl);

    const model = useMemo(
        () => scene.clone(true),
        [scene]
    );

    const modelRoot = useRef(null);


    useLayoutEffect(() => {
        let webDensityMaterial = null;

        model.traverse((object) => {
            if (!object.isMesh) return;

            const isDensity =
                object.name === "ElectronDensity" ||
                object.material?.name === "ElectronCloud";

            if (!isDensity) return;

            webDensityMaterial = object.material.clone();

            webDensityMaterial.name = "ElectronCloud_Web";
            webDensityMaterial.transparent = true;
            webDensityMaterial.opacity = densityOpacity;
            webDensityMaterial.depthWrite = false;
            webDensityMaterial.color.set("#7446B8");
            webDensityMaterial.needsUpdate = true;

            object.material = webDensityMaterial;
            object.renderOrder = 2;
        });

        return () => {
            webDensityMaterial?.dispose();
        };
    }, [model, densityOpacity]);

    useFrame((_, delta) => {
        if (!animate || !modelRoot.current) return;

        modelRoot.current.rotation.y += delta * 0.12;
    });

    return (
        <group
            ref={modelRoot}
            rotation={rotation}
        >
            <primitive
                object={model}
                dispose={null}
            />
        </group>
    );
}

function HYQLandingVisual() {
    return (
        <div
            className="dft-hero-model"
            aria-hidden="true"
        >
            <Canvas
                frameloop="always"
                dpr={[1, 1.5]}
                camera={{
                    position: [0, 0, 8],
                    fov: 28,
                    near: 0.1,
                    far: 100,
                }}
                gl={{
                    alpha: true,
                    antialias: true,
                    powerPreference: "high-performance",
                }}
            >
                <ambientLight intensity={0.85} />

                <directionalLight
                    position={[4, 5, 7]}
                    intensity={3.6}
                />

                <directionalLight
                    position={[-4, 1, 5]}
                    color="#9B5CFF"
                    intensity={0.65}
                />

                <directionalLight
                    position={[0, -4, 4]}
                    color="#C19A3F"
                    intensity={0.45}
                />

                <Suspense fallback={null}>
                    <Bounds
                        fit
                        clip
                        observe
                        margin={1.13}
                    >
                        <HYQModel
                            animate
                            densityOpacity={0.28}
                        />
                    </Bounds>
                </Suspense>
            </Canvas>
        </div>
    );
}

function HYQDensityChapterVisual({
    showFriendsLabels,
}) {
    return (
        <div className="dft-chapter-hyq">
            <span
                className="dft-chapter-hyq__ring"
                aria-hidden="true"
            />

            <div
                className="dft-chapter-hyq__canvas"
                aria-hidden="true"
            >
                <Canvas
                    frameloop="demand"
                    dpr={[1, 1.5]}
                    camera={{
                        position: [0, 0, 8],
                        fov: 28,
                        near: 0.1,
                        far: 100,
                    }}
                    gl={{
                        alpha: true,
                        antialias: true,
                        powerPreference: "high-performance",
                    }}
                >
                    <ambientLight intensity={0.85} />

                    <directionalLight
                        position={[4, 5, 7]}
                        intensity={3.6}
                    />

                    <directionalLight
                        position={[-4, 1, 5]}
                        color="#9B5CFF"
                        intensity={0.65}
                    />

                    <directionalLight
                        position={[0, -4, 4]}
                        color="#C19A3F"
                        intensity={0.45}
                    />

                    <Suspense fallback={null}>
                        <Bounds
                            fit
                            clip
                            observe
                            margin={1.18}
                        >
                            <HYQModel
                                animate={false}
                                densityOpacity={0.24}
                                rotation={[
                                    0.12,
                                    -0.08,
                                    -0.05,
                                ]}
                            />
                        </Bounds>
                    </Suspense>
                </Canvas>
            </div>

            {showFriendsLabels && (
                <>
                    <svg
                        className="dft-hyq-callout-lines"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <polyline
                            className="
                                dft-hyq-callout-line
                                dft-hyq-callout-line--density
                            "
                            points="25,20 37,35"
                        />

                        <circle
                            className="
                                dft-hyq-callout-point
                                dft-hyq-callout-point--density
                            "
                            cx="37"
                            cy="35"
                            r="1.15"
                        />

                        <polyline
                            className="
                                dft-hyq-callout-line
                                dft-hyq-callout-line--molecule
                            "
                            points="75,85 57,59"
                        />

                        <circle
                            className="
                                dft-hyq-callout-point
                                dft-hyq-callout-point--molecule
                            "
                            cx="57"
                            cy="59"
                            r="1.15"
                        />
                    </svg>

                    <span
                        className="
                            dft-hyq-callout
                            dft-hyq-callout--density
                        "
                    >
                        Electron Density
                    </span>

                    <span
                        className="
                            dft-hyq-callout
                            dft-hyq-callout--molecule
                        "
                    >
                        Molecule
                    </span>
                </>
            )}
        </div>
    );
}

useGLTF.preload(hyqLandingModelUrl);

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
function VisualPlaceholder({
    chapter,
    activeChapter,
    evidenceTab,
    mode,
}) {
    const visualLabel =
        chapter.id === "evidence"
            ? evidenceTab.visual
            : chapter.visual;

    const isDensityChapter =
        chapter.id === "density";

    return (
        <figure
            className="dft-visual-stack"
            aria-label={`${chapter.nav} visual`}
        >
            <div
                className={`dft-visual ${
                    isDensityChapter
                        ? "dft-visual--hyq-density"
                        : ""
                }`}
            >
                {isDensityChapter ? (
                    <HYQDensityChapterVisual
                        showFriendsLabels={
                            mode === "friends"
                        }
                    />
                ) : (
                    <>
                        <div
                            className="dft-ring__track"
                            style={{
                                "--ring-rotation":
                                    `${activeChapter * -72}deg`,
                            }}
                            aria-hidden="true"
                        />

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
                    </>
                )}
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
                        <VisualPlaceholder
                            chapter={chapter}
                            activeChapter={activeChapter}
                            evidenceTab={evidenceTab}
                            mode={mode}
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
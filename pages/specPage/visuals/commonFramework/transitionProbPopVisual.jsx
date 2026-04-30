import './transitionProbPopVisual.css'
import { useId } from "react";


const TP_VIEWBOX = {
    width: 750,
    height: 480,
};

const TP_FRAME = {
    x: 34,
    y: 34,
    width: 690,
    height: 400,
};

const TP_SCENE_CENTER = {
    x: 374,
    y: 234,
};

const TP_CORNER_INSET = 33;
const TP_CORNER_SIZE = 24;

const leftX = TP_FRAME.x + TP_CORNER_INSET;
const rightX = TP_FRAME.x + TP_FRAME.width - TP_CORNER_INSET;
const topY = TP_FRAME.y + TP_CORNER_INSET;
const bottomY = TP_FRAME.y + TP_FRAME.height - TP_CORNER_INSET;


const TP_LEFT_LEVELS = [
    {
        id: "i-ground",
        x1: 128,
        x2: 272,
        y: 315,
        population: 5,
        tone: "high",
        label: "i₀",
    },
    {
        id: "i-mid",
        x1: 136,
        x2: 264,
        y: 259,
        population: 3,
        tone: "mid",
        label: "i₁",
    },
    {
        id: "i-upper",
        x1: 144,
        x2: 256,
        y: 203,
        population: 1,
        tone: "low",
        label: "i₂",
    },
];

const TP_RIGHT_LEVELS = [
    {
        id: "f-low",
        x1: 340,
        x2: 452,
        y: 175,
        label: "f₀",
    },
    {
        id: "f-mid",
        x1: 326,
        x2: 464,
        y: 228,
        label: "f₁",
    },
    {
        id: "f-high",
        x1: 318,
        x2: 472,
        y: 286,
        label: "f₂",
    },
];

const TP_SIGNAL_PORT = {
    x: 548,
    y: 222,
};

const TP_READOUT_BARS = [
    { id: "bar-1", x: 600, y: 188, width: 12, height: 76, tone: "strong" },
    { id: "bar-2", x: 618, y: 202, width: 12, height: 48, tone: "mid" },
    { id: "bar-3", x: 636, y: 216, width: 12, height: 20, tone: "weak" },
];

const TP_TRANSITIONS = [
    {
        id: "combo-strong",
        from: "i-ground",
        to: "f-mid",
        strength: "strong",
        signal: "strong",
        curveLift: -30,
        signalLift: -8,
        delay: "0.65s",
    },
    {
        id: "combo-pop-high-couple-weak",
        from: "i-ground",
        to: "f-low",
        strength: "weak",
        signal: "weak",
        curveLift: -58,
        signalLift: -24,
        delay: "2.75s",
    },
    {
        id: "combo-medium",
        from: "i-mid",
        to: "f-high",
        strength: "mid",
        signal: "mid",
        curveLift: 28,
        signalLift: 18,
        delay: "1.7s",
    },
    {
        id: "combo-pop-low-couple-strong",
        from: "i-upper",
        to: "f-mid",
        strength: "strong",
        signal: "weak",
        curveLift: 8,
        signalLift: 10,
        delay: "2.95s",
    },
];

/* quick lookup so transitions can reference levels by id */
const TP_LEVEL_LOOKUP = [...TP_LEFT_LEVELS, ...TP_RIGHT_LEVELS].reduce(
    (acc, level) => {
        acc[level.id] = level;
        return acc;
    },
    {}
);

/** HELPER FUNCTIONS */

// start point for a transition from the right edge of an initial level
function getStartPoint(level) {
    return {
        x: level.x2,
        y: level.y,
    };
}

// end point for transition at the left edge of a final level
function getEndPoint(level) {
    return {
        x: level.x1,
        y: level.y,
    };
}

// soft bazier used for coupling channels
function buildCouplingPath(fromLevel, toLevel, lift = 0) {
    const start = getStartPoint(fromLevel);
    const end = getEndPoint(toLevel);
    const dx = end.x - start.x;

    const c1x = start.x + dx * 0.32;
    const c2x = start.x + dx * 0.72;

    return `
        M ${start.x} ${start.y}
        C ${c1x} ${start.y + lift},
        ${c2x} ${end.y - lift},
        ${end.x} ${end.y}
    `;
}

// path from final level out to the measured signal port
function buildSignalPath(level, signalLift = 0) {
    const start = {
        x: level.x2,
        y: level.y,
    };

    const end = TP_SIGNAL_PORT;
    const dx = end.x - start.x;

    return `
        M ${start.x} ${start.y}
        C ${start.x + dx * 0.28} ${start.y + signalLift},
        ${start.x + dx * 0.74} ${end.y + signalLift},
        ${end.x} ${end.y}
    `;
}

// generate the glowing population nodes on each initial state
function buildPopulationNodes(level) {
    const count = level.population;
    const inset = 18;
    const usableWidth = level.x2 - level.x1 - inset * 2;
    const step = count > 1 ? usableWidth / (count - 1) : 0;
    const yOffset = level.tone === "high" ? -10 : level.tone === "mid" ? -8 : -6;

    return Array.from({ length: count }, (_, index) => ({
        id: `${level.id}-node-${index}`,
        cx: count === 1 ? (level.x1 + level.x2) / 2 : level.x1 + inset + step * index,
        cy: level.y + yOffset,
        delay: `${0.18 * index}s`,
        tone: level.tone,
    }));
}

export default function TransitionProbabilityVisualResponse() {
    const TPBlurSoft = useId().replace(/:/g, '-');
    const TPBlurStrong = useId().replace(/:/g, '-');
    const TPDetectorHaloGrad = useId().replace(/:/g, '-');
    const TPFrameGrad = useId().replace(/:/g, '-');
    const TPSignalGrad = useId().replace(/:/g, '-');
    const TPLevelGrad = useId().replace(/:/g, '-');
    const TPGridGrad = useId().replace(/:/g, '-');
    return (
        <div className="TPVisualWrap">
            <div className="TPVisualBase" aria-label="Transition probability and population visual">
                <svg
                    className="TPVisualSvg"
                    viewBox={`0 0 ${TP_VIEWBOX.width} ${TP_VIEWBOX.height}`}
                    role="img"
                    aria-labelledby="tpTitle tpDesc"
                    preserveAspectRatio="xMidYMid meet"
                >
                    {/* DEFINITIONS: gradients, masks, and soft blurs for neon layering */}
                    <defs>

                        <filter id={TPBlurSoft} x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="6" />
                        </filter>

                        <filter id={TPBlurStrong} x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur stdDeviation="12" />
                        </filter>

                        <radialGradient id={TPDetectorHaloGrad} cx="50%" cy="50%" r="50%">
                            <stop
                                offset="0%"
                                stopColor="color-mix(in oklab, var(--c-glow-1) 28%, var(--text))"
                            />
                            <stop
                                offset="38%"
                                stopColor="color-mix(in oklab, var(--c-glow-2) 34%, transparent)"
                            />
                            <stop
                                offset="72%"
                                stopColor="color-mix(in oklab, var(--c-glow-3) 20%, transparent)"
                            />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>

                        <linearGradient id={TPFrameGrad} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="color-mix(in oklab, var(--surface) 78%, var(--c-shadow))" />
                            <stop offset="60%" stopColor="color-mix(in oklab, var(--bg) 90%, var(--c-primary-2))" />
                            <stop offset="100%" stopColor="color-mix(in oklab, var(--bg-2) 82%, var(--bg))" />
                        </linearGradient>

                        <linearGradient 
                            id={TPGridGrad}
                            x1="86"
                            y1="0"
                            x2="640"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop offset="0%" stopColor="color-mix(in oklab, var(--c-glow-2) 24%, transparent)" />
                            <stop offset="50%" stopColor="color-mix(in oklab, var(--c-glow-1) 14%, transparent)" />
                            <stop offset="100%" stopColor="color-mix(in oklab, var(--c-glow-3) 22%, transparent)" />
                        </linearGradient>

                        <linearGradient id={TPSignalGrad} x1="0%" y1="0%" x2="100%" y2="0%" >
                            <stop offset="0%" stopColor="var(--c-glow-1)" />
                            <stop offset="50%" stopColor="var(--c-glow-3)" />
                            <stop offset="100%" stopColor="color-mix(in oklab, var(--text) 88%, var(--c-glow-1))" />
                        </linearGradient>

                        <linearGradient 
                            id={TPLevelGrad} 
                            x1="116" 
                            y1="0" 
                            x2="502" 
                            y2="0" 
                            gradientUnits="userSpaceOnUse"
                        > 
                            <stop offset="0%" stopColor="color-mix(in oklab, var(--text) 22%, transparent)" /> 
                            <stop offset="50%" stopColor="color-mix(in oklab, var(--c-glow-2) 84%, var(--text) 16%)" /> 
                            <stop offset="100%" stopColor="color-mix(in oklab, var(--c-glow-1) 72%, transparent)" /> 
                        </linearGradient>

                        <linearGradient id="TPNodeGradHigh" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--c-glow-1)" />
                            <stop offset="100%" stopColor="var(--c-glow-2)" />
                        </linearGradient>

                        <linearGradient id="TPNodeGradMid" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--c-glow-2)" />
                            <stop offset="100%" stopColor="var(--c-glow-3)" />
                        </linearGradient>

                        <linearGradient id="TPNodeGradLow" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="color-mix(in oklab, var(--c-glow-2) 75%, var(--text))" />
                            <stop offset="100%" stopColor="color-mix(in oklab, var(--c-glow-3) 55%, var(--bg))" />
                        </linearGradient>

                        <linearGradient id="TPCouplingStrongGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--c-glow-2)" />
                            <stop offset="50%" stopColor="var(--c-glow-3)" />
                            <stop offset="100%" stopColor="var(--c-glow-1)" />
                        </linearGradient>

                        <linearGradient id="TPCouplingMidGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="color-mix(in oklab, var(--c-glow-2) 85%, transparent)" />
                            <stop offset="100%" stopColor="color-mix(in oklab, var(--c-glow-1) 70%, transparent)" />
                        </linearGradient>

                        <linearGradient id="TPCouplingWeakGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="color-mix(in oklab, var(--text) 38%, var(--c-glow-2))" />
                            <stop offset="100%" stopColor="color-mix(in oklab, var(--c-glow-3) 42%, transparent)" />
                        </linearGradient>
                    </defs>

                    {/* BACKDROP / HUD FRAME */}
                    <g className="TPVisualBackdrop" aria-hidden="true">
                        <rect
                            x={TP_FRAME.x}
                            y={TP_FRAME.y}
                            width={TP_FRAME.width}
                            height={TP_FRAME.height}
                            rx="28"
                            className="TPVisualPanel"
                            fill={`url(#${TPFrameGrad})`}
                        />

                        <rect
                            x={TP_FRAME.x + 14}
                            y={TP_FRAME.y + 14}
                            width={TP_FRAME.width - 28}
                            height={TP_FRAME.height - 28}
                            rx="20"
                            className="TPVisualInnerPanel"
                        />

                        {/* faint dashboard grid */}
                        <g className="TPVisualGrid" stroke={`url(#${TPGridGrad})`} >
                            {Array.from({ length: 9 }, (_, index) => {
                                const y = 90 + index * 36;
                                return (
                                    <line
                                        key={`grid-h-${index}`}
                                        x1="86"
                                        y1={y}
                                        x2="640"
                                        y2={y}
                                        className="TPVisualGridLine TPVisualGridLine--horizontal"
                                    />
                                );
                            })}

                            {Array.from({ length: 11 }, (_, index) => {
                                const x = 108 + index * 48;
                                return (
                                    <line
                                        key={`grid-v-${index}`}
                                        x1={x}
                                        y1="80"
                                        x2={x}
                                        y2="398"
                                        className="TPVisualGridLine TPVisualGridLine--vertical"
                                    />
                                );
                            })}
                        </g>

                        {/* corner brackets for the HUD feel */}
                        <g className="TPVisualCorners">
                            <path
                                d={`M ${leftX} ${topY}
                                    L ${leftX + TP_CORNER_SIZE} ${topY}
                                    L ${leftX + TP_CORNER_SIZE} ${topY + TP_CORNER_SIZE}`}
                                className="TPVisualCorner"
                            />
                            <path
                                d={`M ${rightX} ${topY}
                                    L ${rightX - TP_CORNER_SIZE} ${topY}
                                    L ${rightX - TP_CORNER_SIZE} ${topY + TP_CORNER_SIZE}`}
                                className="TPVisualCorner"
                            />
                            <path
                                d={`M ${leftX} ${bottomY}
                                    L ${leftX + TP_CORNER_SIZE} ${bottomY}
                                    L ${leftX + TP_CORNER_SIZE} ${bottomY - TP_CORNER_SIZE}`}
                                className="TPVisualCorner"
                            />
                            <path
                                d={`M ${rightX} ${bottomY}
                                    L ${rightX - TP_CORNER_SIZE} ${bottomY}
                                    L ${rightX - TP_CORNER_SIZE} ${bottomY - TP_CORNER_SIZE}`}
                                className="TPVisualCorner"
                            />
                        </g>

                        {/* soft central chamber glow */}
                        <ellipse
                            cx="332"
                            cy="238"
                            rx="164"
                            ry="118"
                            className="TPVisualCoreHalo"
                            fill={`url(#${TPDetectorHaloGrad})`}
                            filter={`url(#${TPBlurStrong})`}
                        />
                    </g>
                    
                    <g
                        className="TPVisualScene"
                        aria-hidden="true"
                        transform={`
                            translate(${TP_SCENE_CENTER.x} ${TP_SCENE_CENTER.y})
                            scale(1.2 1.5)
                            translate(${-TP_SCENE_CENTER.x} ${-TP_SCENE_CENTER.y})
                        `}
                    >

                        {/* ENERGY LEVEL SCAFFOLD */}
                        <g className="TPVisualLevels" aria-hidden="true" >
                            {TP_LEFT_LEVELS.map((level) => (
                                <g key={level.id} className="TPVisualLevelGroup TPVisualLevelGroup--initial">
                                    <line
                                        x1={level.x1}
                                        y1={level.y}
                                        x2={level.x2}
                                        y2={level.y}
                                        className="TPVisualLevel"
                                        stroke={`url(#${TPLevelGrad})`}
                                        // style={{ stroke: 'red' }}
                                    />
                                    <circle
                                        cx={level.x1}
                                        cy={level.y}
                                        r="3.5"
                                        className="TPVisualLevelCap TPVisualLevelCap--left"
                                    />
                                    <circle
                                        cx={level.x2}
                                        cy={level.y}
                                        r="3.5"
                                        className="TPVisualLevelCap TPVisualLevelCap--right"
                                    />

                                    <text x={level.x1 - 16} y={level.y + 5} className="TPVisualStateLabel">
                                        {level.label}
                                    </text>
                                </g>
                            ))}
                            {TP_RIGHT_LEVELS.map((level) => (
                                <g key={level.id} className="TPVisualLevelGroup TPVisualLevelGroup--final">
                                    <line
                                        x1={level.x1}
                                        y1={level.y}
                                        x2={level.x2}
                                        y2={level.y}
                                        className="TPVisualLevel"
                                        stroke={`url(#${TPLevelGrad})`}
                                        // style={{ stroke: 'red' }}
                                    />
                                    <circle
                                        cx={level.x1}
                                        cy={level.y}
                                        r="3.5"
                                        className="TPVisualLevelCap TPVisualLevelCap--left"
                                    />
                                    <circle
                                        cx={level.x2}
                                        cy={level.y}
                                        r="3.5"
                                        className="TPVisualLevelCap TPVisualLevelCap--right"
                                    />
                                    <text x={level.x2 + 12} y={level.y + 5} className="TPVisualStateLabel">
                                        {level.label}
                                    </text>
                                </g>
                            ))}
                        </g>

                        {/* POPULATION NODES */}
                        <g className="TPVisualPopulationLayer" aria-hidden="true">
                            {TP_LEFT_LEVELS.flatMap((level) =>
                                buildPopulationNodes(level).map((node, index) => (
                                    <g
                                        key={node.id}
                                        className={`TPVisualPopulationNode TPVisualPopulationNode--${node.tone}`}
                                        style={{
                                            "--tp-node-delay": node.delay,
                                            "--tp-node-index": index,
                                        }}
                                    >
                                        <circle
                                            cx={node.cx}
                                            cy={node.cy}
                                            r="11"
                                            className="TPVisualPopulationHalo"
                                            filter={`url(#${TPBlurSoft})`}
                                        />
                                        <circle
                                            cx={node.cx}
                                            cy={node.cy}
                                            r="6.5"
                                            className="TPVisualPopulationShell"
                                        />
                                        <circle
                                            cx={node.cx}
                                            cy={node.cy}
                                            r="3"
                                            className="TPVisualPopulationCore"
                                            fill={
                                                node.tone === "high"
                                                    ? "url(#TPNodeGradHigh)"
                                                    : node.tone === "mid"
                                                    ? "url(#TPNodeGradMid)"
                                                    : "url(#TPNodeGradLow)"
                                            }
                                        />
                                    </g>
                                ))
                            )}
                        </g>

                        {/* COUPLING PATHWAYS */}
                        <g className="TPVisualCouplingLayer" aria-hidden="true">
                            {TP_TRANSITIONS.map((transition) => {
                                const fromLevel = TP_LEVEL_LOOKUP[transition.from];
                                const toLevel = TP_LEVEL_LOOKUP[transition.to];
                                const pathD = buildCouplingPath(fromLevel, toLevel, transition.curveLift);

                                const gradId =
                                    transition.strength === "strong"
                                    ? "url(#TPCouplingStrongGrad)"
                                    : transition.strength === "mid"
                                    ? "url(#TPCouplingMidGrad)"
                                    : "url(#TPCouplingWeakGrad)";

                                return (
                                    <g
                                    key={transition.id}
                                    className={`TPVisualTransitionGroup TPVisualTransitionGroup--${transition.strength}`}
                                    style={{ "--tp-delay": transition.delay }}
                                    >
                                        <path
                                            d={pathD}
                                            className={`TPVisualTransitionGlow TPVisualTransitionGlow--${transition.strength}`}
                                            stroke={gradId}
                                            fill="none"
                                            filter={`url(#${TPBlurSoft})`}
                                        />
                                        <path
                                            d={pathD}
                                            className={`TPVisualTransitionCore TPVisualTransitionCore--${transition.strength}`}
                                            stroke={gradId}
                                            fill="none"
                                        />
                                    </g>
                                );
                            })}
                        </g>

                        {/* MEASURED SIGNAL PATHS */}
                        <g className="TPVisualSignalLayer" aria-hidden="true">
                            {TP_TRANSITIONS.map((transition) => {
                                const toLevel = TP_LEVEL_LOOKUP[transition.to];
                                const signalPath = buildSignalPath(toLevel, transition.signalLift);

                                return (
                                    <g
                                        key={`${transition.id}-signal`}
                                        className={`TPVisualSignalGroup TPVisualSignalGroup--${transition.signal}`}
                                        style={{ "--tp-delay": transition.delay }}
                                    >
                                        <path
                                            d={signalPath}
                                            className={`TPVisualSignalGlow TPVisualSignalGlow--${transition.signal}`}
                                            stroke={`url(#${TPSignalGrad})`}
                                            fill="none"
                                            filter={`url(#${TPBlurSoft})`}
                                        />
                                        <path
                                            d={signalPath}
                                            className={`TPVisualSignalCore TPVisualSignalCore--${transition.signal}`}
                                            stroke={`url(#${TPSignalGrad})`}
                                            fill="none"
                                        />
                                    </g>
                                );
                            })}

                            {/* detector lens / signal collection port */}
                            <g className="TPVisualDetector">
                                <circle
                                    cx={TP_SIGNAL_PORT.x}
                                    cy={TP_SIGNAL_PORT.y}
                                    r="22"
                                    className="TPVisualDetectorHalo"
                                    fill={`url(#${TPDetectorHaloGrad})`}
                                    filter={`url(#${TPBlurSoft})`}
                                />
                                <circle
                                    cx={TP_SIGNAL_PORT.x}
                                    cy={TP_SIGNAL_PORT.y}
                                    r="14"
                                    className="TPVisualDetectorShell"
                                />
                                <circle
                                    cx={TP_SIGNAL_PORT.x}
                                    cy={TP_SIGNAL_PORT.y}
                                    r="5.5"
                                    className="TPVisualDetectorCore"
                                />
                            </g>

                            {/* vertical readout bars to make “strongest signal” legible at a glance */}
                            <g className="TPVisualReadout">
                                {TP_READOUT_BARS.map((bar) => (
                                    <g key={bar.id} className={`TPVisualReadoutBarGroup TPVisualReadoutBarGroup--${bar.tone}`}>
                                        <rect
                                            x={bar.x}
                                            y={bar.y}
                                            width={bar.width}
                                            height={bar.height}
                                            rx="6"
                                            className="TPVisualReadoutBar TPVisualReadoutBar--base"
                                        />
                                        <rect
                                            x={bar.x}
                                            y={bar.y}
                                            width={bar.width}
                                            height={bar.height}
                                            rx="6"
                                            className={`TPVisualReadoutBar TPVisualReadoutBar--${bar.tone}`}
                                        />
                                    </g>
                                ))}
                            </g>
                        </g>
                    </g>

                    {/* SECTION HEADERS / READOUT LABELS */}
                    <g className="TPVisualHeaderLayer" aria-hidden="true">
                        <text x="115" y="124" className="TPVisualHeader TPVisualHeader--left">
                            population
                        </text>
                        <text x="333" y="94" className="TPVisualHeader TPVisualHeader--center">
                            coupling channels
                        </text>
                        <text x="560" y="124" className="TPVisualHeader TPVisualHeader--right">
                            measured signal
                        </text>

                        <text x="95" y="142" className="TPVisualSubheader">
                            occupied initial states
                        </text>
                        <text x="308" y="112" className="TPVisualSubheader">
                            transition probability pathways
                        </text>
                        <text x="576" y="142" className="TPVisualSubheader">
                            detector readout
                        </text>
                    </g>
                </svg>
            </div>

            <div className="TPVisualDescription" aria-hidden="true">
                Glowing packets on the left show the relative populations of <i>i<sub>1</sub></i>, and <i>i<sub>2</sub></i>. In the center, coupling channels connect them to accessible final states with different strengths. The detector response is brightest when high population and strong coupling coincide, illustrating that spectroscopic intensity depends on both population and coupling.
            </div>
        </div>
    );
}
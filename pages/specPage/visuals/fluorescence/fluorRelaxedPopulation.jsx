import { useId } from "react";
import "./fluorRelaxedPopulation.css";

const PES_PATH =
    "M0.497955 0.0452881L2.99796 27.5453L6.49796 60.0453L8.99796 94.0453L12.998 129.045L15.998 162.045L19.998 197.045L26.498 232.045L33.498 263.045L42.998 287.545L53.998 303.545L64.498 312.045L74.498 313.545L85.498 312.045L97.998 303.545L108.498 294.045L127.998 269.545L145.498 245.045L158.498 224.045L173.998 201.045L191.498 176.045L213.498 147.045L228.498 133.545L247.498 119.545L262.998 113.045L295.498 111.045H339.498";

const STATES = [
    {
        key: "s0",
        label: "S₀",
        labelPos: [103, 384],
        transform: "translate(90 250) scale(1.12 0.48)",
        className: "fluorRelaxedPopulation_StateS0",
    },
    {
        key: "s1",
        label: "S₁",
        labelPos: [238, 206],
        transform: "translate(216 70) scale(1.05 0.48)",
        className: "fluorRelaxedPopulation_StateS1",
    },
    {
        key: "t1",
        label: "T₁",
        labelPos: [118, 278],
        transform: "translate(88 160) scale(0.9 0.39)",
        className: "fluorRelaxedPopulation_StateT1",
    },
];

const VIB_TICKS = [112, 143, 174, 205, 236, 267];

const HOT_DOTS = [
    { cx: 344, cy: 132, delay: "0s" },
    { cx: 366, cy: 145, delay: "0.15s" },
    { cx: 391, cy: 158, delay: "0.3s" },
];

function makeId(base, name) {
    return `${base.replace(/:/g, "")}-${name}`;
}

function FluorRelaxedPopulationDefs({ ids }) {
    return (
        <defs>
            <radialGradient
                id={ids.visualGrad}
                gradientUnits="userSpaceOnUse"
                cx="450"
                cy="265"
                r="620"
            >
                <stop offset="0%" stopColor="var(--primary-deep)" stopOpacity="0.3" />
                <stop offset="28%" stopColor="var(--primary)" stopOpacity="0.1" />
                <stop offset="58%" stopColor="var(--bg-2)" stopOpacity="0.2" />
                <stop offset="100%" stopColor="var(--bg)" />
            </radialGradient>
            <linearGradient id={ids.cyanGrad} x1="0%" x2="100%">
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="100%" stopColor="var(--c-glow-1)" />
            </linearGradient>

            <linearGradient id={ids.violetGrad} x1="0%" x2="100%">
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--c-glow-2)" />
            </linearGradient>

            <linearGradient id={ids.pinkGrad} x1="0%" x2="100%">
                <stop offset="0%" stopColor="var(--accent-3)" />
                <stop offset="100%" stopColor="var(--c-glow-3)" />
            </linearGradient>

            <linearGradient id={ids.tripletGrad} x1="0%" x2="100%">
                <stop offset="0%" stopColor="var(--emo1)" stopOpacity="0.48" />
                <stop offset="100%" stopColor="var(--c-glow-2)" stopOpacity="0.34" />
            </linearGradient>

            <filter id={ids.softGlow} x="-35%" y="-35%" width="170%" height="170%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    );
}

function PopulationChamber( { ids }) {
    return (
        <g className="fluorRelaxedPopulation_PopulationChamber">
            <rect
                x="6"
                y="6"
                width="748"
                height="520"
                rx="26"
                className="fluorRelaxedPopulation_Chamber"
                fill={`url(#${ids.visualGrad})`}
            />

        </g>
    );
}


function PotentialCurve({ state }) {
    return (
        <g className={`fluorRelaxedPopulation_StateCurve ${state.className}`}>
            <g transform={state.transform}>
                <path className="fluorRelaxedPopulation_CurveGlow" d={PES_PATH} />
                <path className="fluorRelaxedPopulation_CurveCore" d={PES_PATH} />

                <g className="fluorRelaxedPopulation_VibTicks">
                    {VIB_TICKS.map((y) => (
                        <line key={y} x1="42" x2="112" y1={y} y2={y} />
                    ))}
                </g>
            </g>

            <text
                x={state.labelPos[0]}
                y={state.labelPos[1]}
                className="fluorRelaxedPopulation_StateLabel"
            >
                {state.label}
            </text>
        </g>
    );
}

function ArrowPath({ d, className }) {
    return (
        <path
            d={d}
            className={`fluorRelaxedPopulation_ArrowPath ${className}`}
            pathLength="1"
        />
    );
}

function StateDot({ cx, cy, className, delay }) {
    return (
        <circle
            cx={cx}
            cy={cy}
            r="4.5"
            className={`fluorRelaxedPopulation_StateDot ${className}`}
            style={{ "--dot-delay": delay }}
        />
    );
}

function CompactLabel({ x, y, children, className = "" }) {
    return (
        <text
            x={x}
            y={y}
            className={`fluorRelaxedPopulation_Label ${className}`}
        >
                {children}
        </text>
    );
}

export default function FluorRelaxedPopulationVisual() {
    const uid = useId();

    const ids = {
        visualGrad: makeId(uid, "visualGrad"),
        cyanGrad: makeId(uid, "cyanGrad"),
        violetGrad: makeId(uid, "violetGrad"),
        pinkGrad: makeId(uid, "pinkGrad"),
        tripletGrad: makeId(uid, "tripletGrad"),
        softGlow: makeId(uid, "softGlow"),
    };
    return (
        <figure className="fluorRelaxedPopulation">
            <svg
                className="fluorRelaxedPopulation_SVG"
                viewBox="0 0 760 560"
                role="img"
            >   

                <FluorRelaxedPopulationDefs ids={ids} />

                <g className="fluorRelaxedPopulation_PanelShell">
                    <PopulationChamber ids={ids} />
                    <g
                        className="fluorRelaxedPopulation_Manifold"
                        style={{
                            "--cyan-grad": `url(#${ids.cyanGrad})`,
                            "--violet-grad": `url(#${ids.violetGrad})`,
                            "--pink-grad": `url(#${ids.pinkGrad})`,
                            "--triplet-grad": `url(#${ids.tripletGrad})`,
                            "--soft-glow": `url(#${ids.softGlow})`,
                        }}
                    >
                        {STATES.map((state) => (
                            <PotentialCurve key={state.key} state={state} />
                        ))}

                        <g className="fluorRelaxedPopulation_AbsorptionStep">
                            <ArrowPath
                                className="fluorRelaxedPopulation_AbsorptionArrow"
                                d="M 204 322 C 218 272, 250 224, 318 145"
                            />
                            <path
                                className="fluorRelaxedPopulation_ArrowHead fluorRelaxedPopulation_AbsorptionHead"
                                d="M 318 145 L 304 150 L 314 160 Z"
                            />
                            <CompactLabel x="185" y="216" className="fluorRelaxedPopulation_CyanLabel">
                                Absorption
                            </CompactLabel>
                        </g>

                        <g className="fluorRelaxedPopulation_RelaxationStep">
                            <ArrowPath
                                className="fluorRelaxedPopulation_RelaxArrow"
                                d="M 352 136 C 338 158, 321 185, 305 213"
                            />
                            <ArrowPath
                                className="fluorRelaxedPopulation_RelaxArrow fluorRelaxedPopulation_RelaxArrowSecond"
                                d="M 386 154 C 364 184, 336 207, 311 224"
                            />
                            <CompactLabel x="374" y="212" className="fluorRelaxedPopulation_VioletLabel">
                                IVR / IC
                            </CompactLabel>

                            {HOT_DOTS.map((dot) => (
                                <StateDot
                                    key={`${dot.cx}-${dot.cy}`}
                                    cx={dot.cx}
                                    cy={dot.cy}
                                    delay={dot.delay}
                                    className="fluorRelaxedPopulation_HotDot"
                                />
                            ))}

                            <StateDot
                                cx="304"
                                cy="230"
                                delay="0.55s"
                                className="fluorRelaxedPopulation_EmissiveDot"
                            />
                        </g>
                        <g className="fluorRelaxedPopulation_EmissionStep">
                            <ArrowPath
                                className="fluorRelaxedPopulation_EmissionArrow"
                                d="M 304 238 C 350 268, 362 304, 340 344"
                            />
                            <path
                                className="fluorRelaxedPopulation_ArrowHead fluorRelaxedPopulation_EmissionHead"
                                d="M 340 344 L 333 329 L 352 336 Z"
                            />
                            <CompactLabel x="390" y="296" className="fluorRelaxedPopulation_PinkLabel">
                                Fluorescence
                            </CompactLabel>
                        </g>

                        <g className="fluorRelaxedPopulation_TripletStep">
                            <ArrowPath
                                className="fluorRelaxedPopulation_IscArrow"
                                d="M 294 223 C 250 216, 208 226, 171 257"
                            />
                            <path
                                className="fluorRelaxedPopulation_ArrowHead fluorRelaxedPopulation_IscHead"
                                d="M 171 257 L 184 246 L 187 264 Z"
                            />
                            <ArrowPath
                                className="fluorRelaxedPopulation_PhosphorArrow"
                                d="M 166 282 C 162 304, 168 329, 190 352"
                            />
                            <CompactLabel x="178" y="248" className="fluorRelaxedPopulation_DimLabel">
                                ISC
                            </CompactLabel>
                        </g>
                    </g>
                    <g className="fluorRelaxedPopulation_ReadoutStrip">
                        <text x="500" y="88" className="fluorRelaxedPopulation_Kicker">
                            relaxed-state observable
                        </text>
                        <text x="500" y="116" className="fluorRelaxedPopulation_TitleText">
                            absorbed population → emissive S₁
                        </text>
                        <line x1="500" x2="650" y1="136" y2="136" />
                        <text x="500" y="162" className="fluorRelaxedPopulation_NoteText">
                            Kasha-region emission
                        </text>
                    </g>
                </g>
            </svg>

            <figcaption className="fluorRelaxedPopulation_Caption">
                Absorption prepares a non-equilibrated excited-state ensemble, while
                fluorescence is emitted after rapid relaxation populates the emissive
                region of S₁.
            </figcaption>
        </figure>
    );
}
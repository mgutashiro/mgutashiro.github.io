import { useId } from "react";
import "./fluorRelaxedPopulation.css";

const PES_PATH =
    "M0.497955 0.0452881L2.99796 27.5453L6.49796 60.0453L8.99796 94.0453L12.998 129.045L15.998 162.045L19.998 197.045L26.498 232.045L33.498 263.045L42.998 287.545L53.998 303.545L64.498 312.045L74.498 313.545L85.498 312.045L97.998 303.545L108.498 294.045L127.998 269.545L145.498 245.045L158.498 224.045L173.998 201.045L191.498 176.045L213.498 147.045L228.498 133.545L247.498 119.545L262.998 113.045L295.498 111.045H339.498";

const CURVEARROWBASE = 
    "M0.5 14.8956C0.5 19.8596 7.40416 23.5 12.6644 23.5C17.9247 23.5 24.5 17.5433 24.5 11.9173C24.5 6.29131 19.4042 0.500002 12.6644 0.5C5.92466 0.499998 0.5 3.8093 0.5 9.10425";

const STATES = [
    {
        key: "s0",
        label: "S₀",
        labelPos: [480, 345],
        transform: "translate(90 250) scale(1.1 0.8)",
        className: "fluorRelaxedPopulation_StateS0",
    },
    {
        key: "s1",
        label: "S₁",
        labelPos: [530, 150],
        transform: "translate(140 70) scale(1.1 0.7)",
        className: "fluorRelaxedPopulation_StateS1",
    },
    {
        key: "t1",
        label: "T₁",
        labelPos: [480, 195],
        transform: "translate(158 100) scale(0.9 0.8)",
        className: "fluorRelaxedPopulation_StateT1",
    },
];

const VIB_LEVELS = [
  { key: "v4", y: 230, x1: 26, x2: 154 },
  { key: "v3", y: 252, x1: 33, x2: 142 },
  { key: "v2", y: 274, x1: 42, x2: 125 },
  { key: "v1", y: 294, x1: 52, x2: 105 },
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
            <linearGradient
                id={ids.cyanpurpleGrad}
                gradientUnits="userSpaceOnUse"
                x1="130"
                y1="440"
                x2="160"
                y2="220"
            >
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="45%" stopColor="color-mix(in oklab, var(--accent-2) 60%, var(--accent) 40%)" />
                <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>

            <linearGradient 
                id={ids.violetpinkGrad} 
                gradientUnits="objectBoundingBox"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >
                <stop offset="0%" stopColor="var(--accent)" />
                <stop offset="48%" stopColor="color-mix(in oklab, var(--accent) 58%, var(--accent-3) 42%)" />
                <stop offset="100%" stopColor="var(--accent-3)" />
            </linearGradient>

            <linearGradient 
                id={ids.pinkcyanGrad} 
                gradientUnits="userSpaceOnUse"
                x1="250"
                y1="337"
                x2="250"
                y2="428"
            >
                <stop offset="0%" stopColor="var(--accent-3)" />
                <stop offset="42%" stopColor="color-mix(in oklab, var(--accent-3) 56%, var(--accent) 44%)" />
                <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>

            <filter 
                id={ids.softGlow} 
                x="0"
                y="0"
                width="760"
                height="560"
                colorInterpolationFilters="sRGB"
            >
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
                <g className="fluorRelaxedPopulation_VibLevels">
                    {VIB_LEVELS.map((level) => (
                        <line 
                            key={`${state.key} - ${level.key}`} 
                            x1={level.x1} 
                            x2={level.x2} 
                            y1={level.y} 
                            y2={level.y} 
                            className="fluorRelaxedPopulation_VibLevel"
                        />
                    ))}
                </g>
                <path className="fluorRelaxedPopulation_CurveGlow" d={PES_PATH} />
                <path className="fluorRelaxedPopulation_CurveCore" d={PES_PATH} />
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




function CompactLabel({ x, y, children, className = "", transform="", fill }) {
    return (
        <text
            x={x}
            y={y}
            transform={transform}
            fill={fill}
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
        cyanpurpleGrad: makeId(uid, "cyanpurpleGrad"),
        violetpinkGrad: makeId(uid, "violetpinkGrad"),
        pinkcyanGrad: makeId(uid, "pinkcyanGrad"),
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
                            "--cyan-purple-grad": `url(#${ids.cyanpurpleGrad})`,
                            "--violet-pink-grad": `url(#${ids.violetpinkGrad})`,
                            "--pink-cyan-grad": `url(#${ids.pinkcyanGrad})`,
                            "--soft-glow": `url(#${ids.softGlow})`,
                        }}
                    >
                        <g className="fluorRelaxedPopulation_Move" transform="translate(80 -30)">
                            {STATES.map((state) => (
                                <PotentialCurve key={state.key} state={state} />
                            ))}

                            <g className="fluorRelaxedPopulation_AbsorptionStep">
                                <path
                                    className="fluorRelaxedPopulation_ArrowShaft fluorRelaxedPopulation_AbsorptionShaft"
                                    d="M 170 432 L 170 245"
                                    stroke={`url(#${ids.cyanpurpleGrad})`}
                                    fill="none"
                                />
                                <path
                                    className="fluorRelaxedPopulation_ArrowHead fluorRelaxedPopulation_AbsorptionHead"
                                    d="M 170 230 L 158 248 L 182 248 Z"
                                    fill={`url(#${ids.cyanpurpleGrad})`}
                                />

                                <CompactLabel 
                                    x="165" 
                                    y="380" 
                                    transform="rotate(-90 165 380)"
                                    fill="var(--accent-2)"
                                    className="fluorRelaxedPopulation_AbsLabel"
                                >
                                    Abs
                                </CompactLabel>
                            </g>

                            <g className="fluorRelaxedPopulation_RelaxationStep">
                                <path
                                    className="fluorRelaxedPopulation_ArrowShaft fluorRelaxedPopulation_ICShaft"
                                    d="M 200 232 V 243"
                                    fill="none"
                                />
                                <path
                                    className="fluorRelaxedPopulation_ArrowHead fluorRelaxedPopulation_ICHead"
                                    d="M 200 248 L 195 240 L 205 240 Z"
                                />
                                <path
                                    className="fluorRelaxedPopulation_ArrowShaft fluorRelaxedPopulation_ICShaft"
                                    d="M 220 248 V 258"
                                    fill="none"
                                />
                                <path
                                    className="fluorRelaxedPopulation_ArrowHead fluorRelaxedPopulation_ICHead"
                                    d="M 220 262 L 215 254 L 225 254 Z"
                                />
                                <path
                                    className="fluorRelaxedPopulation_ArrowShaft fluorRelaxedPopulation_ICShaft"
                                    d="M 235 264 V 271"
                                    fill="none"
                                />
                                <path
                                    className="fluorRelaxedPopulation_ArrowHead fluorRelaxedPopulation_ICHead"
                                    d="M 235 275.5 L 240 269 L 230 269 Z"
                                />
                                <CompactLabel x="210" y="243" className="fluorRelaxedPopulation_ICLabel">
                                    IC
                                </CompactLabel>


                            </g>
                            <g className="fluorRelaxedPopulation_ISC">
                                <path
                                    className="fluorRelaxedPopulation_ArrowShaft fluorRelaxedPopulation_ICShaft"
                                    d={CURVEARROWBASE}
                                    transform="translate(255 252) scale(1.5 2.2)"
                                    style={{ stroke: `url(#${ids.violetpinkGrad})` }}
                                    fill="none"
                                />
                                <path
                                    className="fluorRelaxedPopulation_ArrowHead fluorRelaxedPopulation_ISCHead"
                                    d="M 256 280 L 249 290 L 263 290 Z"
                                    fill={`url(#${ids.violetpinkGrad})`}
                                />
                                <CompactLabel x="265" y="282" className="fluorRelaxedPopulation_ISCLabel">
                                    ISC
                                </CompactLabel>
                            </g>
                            <g className="fluorRelaxedPopulation_EmissionStep">
                                <path
                                    className="fluorRelaxedPopulation_ArrowShaft fluorRelaxedPopulation_FluoresShaft"
                                    d="M 200 278 V 425"
                                    stroke={`url(#${ids.cyanpurpleGrad})`}
                                    fill="none"
                                />
                                <path
                                    className="fluorRelaxedPopulation_ArrowHead fluorRelaxedPopulation_FluoresHead"
                                    d="M 200 428 L 212 415 L 188 415 Z"
                                    fill={`url(#${ids.cyanpurpleGrad})`}
                                />
                                <CompactLabel 
                                    x="195" 
                                    y="395" 
                                    className="fluorRelaxedPopulation_FluorLabel"
                                    transform="rotate(-90 195 395)"
                                >
                                    Fluor
                                </CompactLabel>

                                <path
                                    className="fluorRelaxedPopulation_ArrowShaft fluorRelaxedPopulation_FluoresShaft"
                                    d="M 250 337 V 425"
                                    fill="none"
                                    stroke={`url(#${ids.pinkcyanGrad})`}
                                />
                                <path
                                    className="fluorRelaxedPopulation_ArrowHead fluorRelaxedPopulation_FluoresHead"
                                    d="M 250 428 L 262 415 L 238 415 Z"
                                    fill={`url(#${ids.pinkcyanGrad})`}
                                    stroke={`url(#${ids.pinkcyanGrad})`}
                                />
                                <CompactLabel 
                                    x="245" 
                                    y="403" 
                                    className="fluorRelaxedPopulation_PhospLabel"
                                    transform="rotate(-90 245 403)"
                                >
                                    Phosph
                                </CompactLabel>
                            </g>
                        </g>
                    </g>
                    <g className="fluorRelaxedPopulation_Energy">
                        <path 
                            className="fluorRelaxedPopulation_EnergyArrowShaft"
                            d="M 90 480 V 50"
                            fill="none"
                            stroke="var(--text)"
                            strokeWidth= "4"
                        />
                        <path 
                            className="fluorRelaxedPopulation_EnergyArrowHead"
                            d="M 90 40 L 70 70 L 110 70 Z"
                            fill="var(--text)"
                            strokeWidth="4"
                        />

                        <CompactLabel 
                            x="55" 
                            y="280" 
                            className="fluorRelaxedPopulation_ELabel"
                        >
                            E
                        </CompactLabel>
                    </g>
                    <g className="fluorRelaxedPopulation_ReadoutStrip">
                        <text x="370" y="450" className="fluorRelaxedPopulation_TitleText">
                            excited-state relaxation
                        </text>
                        <text x="385" y="486" className="fluorRelaxedPopulation_Kicker">
                            hot S₁ → relaxed emissive S₁
                        </text>
                        <line x1="500" x2="650" y1="136" y2="136" />
                    </g>
                </g>
            </svg>

            <figcaption className="fluorRelaxedPopulation_Caption">
                Absorption promotes the molecule into a non-equilibrated, vibrationally hot S₁
                ensemble. Rapid relaxation and internal conversion redistribute that energy
                toward the lower S₁ region, where fluorescence is emitted; weaker ISC and
                phosphorescence pathways show competing routes from the excited-state manifold.
            </figcaption>
        </figure>
    );
}
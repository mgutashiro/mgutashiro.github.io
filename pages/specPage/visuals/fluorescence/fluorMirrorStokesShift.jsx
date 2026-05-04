import './fluorMirrorStokesShift.css';
import React, { useId } from "react";

const plateBox = {
    x: -10,
    y: -12,
    width: 824,
    height: 404,
    rx: 30,
};

const ABS_PATH =
    "M0.277344 230.16L4.77734 233.16L8.77734 230.16L22.7773 272.16L31.2773 268.16L44.7773 175.16L57.2773 321.16L60.2773 328.16L64.7773 331.16L69.7773 326.66L74.7773 319.16L79.2773 310.66L83.2773 304.16L85.2773 302.16L88.2773 304.16L92.2773 313.16L95.7773 322.16L100.277 332.16L107.777 340.66L111.277 343.16H117.277L126.277 347.16L137.277 350.66L147.277 349.16L158.277 345.66L166.777 341.66L172.777 339.66L178.777 338.16L190.777 329.16L202.277 319.66L211.277 312.16L220.777 304.16L229.777 299.66L240.777 293.66L249.777 288.66L256.777 282.66L262.777 275.66L269.277 262.66L274.777 244.66L280.277 224.16L285.277 203.66L289.277 183.66L295.277 159.16L298.777 146.16L302.777 129.66L305.777 115.66L308.277 99.1602L310.777 79.1602L313.777 51.1602L316.277 33.1602L318.277 20.1602L320.777 9.66022L322.777 3.66022L325.777 0.660217L329.777 3.66022L331.777 9.66022L333.777 20.1602L335.777 34.1602L337.277 47.6602L338.277 69.6602L338.777 86.1602L339.777 100.66L340.277 114.66L340.777 127.66L341.777 145.66L342.777 162.16L343.277 176.16L343.777 190.16L344.277 201.66L345.277 214.66V230.16L346.777 251.66L348.277 269.16L349.277 289.66L351.277 307.66L352.777 320.16L354.777 332.66L357.277 342.16L362.777 350.66L370.277 355.66L380.277 357.16H392.777H409.277";

const EM_PATH =
    "M0.185699 355.108L15.1857 349.108L26.6857 342.608L33.6857 330.108L39.1857 309.608L42.6857 284.608L45.6857 251.608L47.6857 220.108L49.1857 198.608L51.1857 165.608L53.1857 118.108L54.6857 78.6085L56.6857 47.6085L58.6857 19.1085L60.6857 0.108459L62.6857 9.10846L64.6857 24.6085V39.1085L66.6857 56.1085L68.1857 73.6085L71.1857 96.6085L72.6857 111.108L75.6857 124.608L79.1857 136.108L81.1857 150.608L84.6857 175.608L87.1857 196.108L89.6857 213.108L95.6857 241.108L101.686 254.108L108.686 263.108L116.186 277.608L122.186 292.108L129.686 306.608L138.686 320.108L150.186 333.108L159.186 339.608L172.186 345.108L186.186 349.108L199.186 352.108L210.186 353.608";


const PLOT = {
    x: 38,
    y: 14,
    w: 476,
    h: 326,
    baseY: 292,
    absPeak: { x: 243, y: 82 },
    emPeak: { x: 321, y: 83 },
};

const LEVELS = [
    { id: "s4", label: "S₄", y: 38 },
    { id: "s3", label: "S₃", y: 68 },
    { id: "s2", label: "S₂", y: 98 },
    { id: "s1", label: "S₁", y: 128 },
    { id: "s0", label: "S₀", y: 275 },
];

function makeId(base, name) {
    return `${base.replace(/:/g, "")}-${name}`;
}

function FluorMirrorSSDefs ( { ids }) {
    return (
        <defs>
            <linearGradient
                id={ids.plate}
                x1="18"
                y1="22"
                x2="782"
                y2="376"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--bg)" />
                <stop offset="52%" stopColor="var(--surface-2)" />
                <stop offset="100%" stopColor="var(--bg)" />
            </linearGradient>

            <radialGradient
                id={ids.plateCyan}
                cx="28%"
                cy="24%"
                r="45%"
            >
                <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.18" />
                <stop offset="62%" stopColor="var(--accent-2)" stopOpacity="0.05" />
                <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0" />
            </radialGradient>

            <radialGradient
                id={ids.platePink}
                cx="74%"
                cy="28%"
                r="48%"
            >
                <stop offset="0%" stopColor="var(--accent-3)" stopOpacity="0.2" />
                <stop offset="60%" stopColor="var(--accent-3)" stopOpacity="0.06" />
                <stop offset="100%" stopColor="var(--accent-3)" stopOpacity="0" />
            </radialGradient>

            <filter
                id={ids.plateShadow}
                x="-12%"
                y="-18%"
                width="124%"
                height="145%"
                colorInterpolationFilters="sRGB"
            >
                <feDropShadow
                    dx="0"
                    dy="20"
                    stdDeviation="22"
                    floodColor="black"
                    floodOpacity="0.48"
                />
                <feDropShadow
                    dx="0"
                    dy="0"
                    stdDeviation="18"
                    floodColor="var(--accent)"
                    floodOpacity="0.16"
                />
            </filter>

            <filter
                id={ids.glow}
                x="0"
                y="0"
                width="800"
                height="420"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
            >
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <marker
                id={ids.arrow}
                markerWidth="6"
                markerHeight="6"
                refX="3"
                refY="3"
                orient="auto-start-reverse"
            >
                <path d="M 0 0 L 6 3 L 0 6 Z" className="fluorMirrorSS_ArrowHead" fill="context-stroke"/>
            </marker>

            <marker
                id={ids.arrow2}
                markerWidth="4"
                markerHeight="4"
                refX="2"
                refY="2"
                orient="auto-start-reverse"
            >
                <path d="M 0 0 L 4 2 L 0 4 Z" className="fluorMirrorSS_ArrowHead2" fill="context-stroke"/>
            </marker>
        </defs>
    );
}

function FluorMirrorSSBackplate ({ids}) {
    return (
        <g className="fluorMirrorSS_BackPlateGroup">
            <rect
                {...plateBox}
                className="fluorMirrorSS_BackplateBase"
                fill={`url(#${ids.plate})`}
                filter={`url(#${ids.plateShadow})`}
            />

            <rect
                {...plateBox}
                className="fluorMirrorSS_BackplateGlow"
                fill={`url(#${ids.plateCyan})`}
            />

            <rect
                {...plateBox}
                className="fluorMirrorSS_BackplateGlow"
                fill={`url(#${ids.platePink})`}
            />

            <rect
                {...plateBox}
                className="fluorMirrorSS_BackplateBorder"
            />
        </g>
    );
}

function PlotLabel({ x, y, children, className = "" }) {
    return (
        <text x={x} y={y} className={`fluorMirrorSS_Label ${className}`}>
            {children}
        </text>
    );
}

function PeakMarker({ x, y, label }) {
    return (
        <g className="fluorMirrorSS_PeakMarker">
            <path d={`M ${x} ${PLOT.baseY} V ${y + 8}`} />
            <circle cx={x} cy={y} r="3.5" />
            <text x={x} y={PLOT.baseY + 20}>
                {label}
            </text>
        </g>
    );
}

function AbsFluoresPlot ({ ids }) {
    return (
        <g className="fluorMirrorSS_Plot">
            <rect
                className="fluorMirrorSS_PlotPane"
                x={PLOT.x}
                y={PLOT.y}
                width={PLOT.w}
                height={PLOT.h}
                rx="22"
            />

            <path
                className="fluorMirrorSS_Axis"
                d={`M ${PLOT.x + 40} ${PLOT.y + 30} V ${PLOT.baseY} H ${PLOT.x + PLOT.w - 28}`}
            />

            <text x="230" y="330" className="fluorMirrorSS_AxisLabel">
                wavelength / nm
            </text>

            <text
                x="65"
                y="215"
                className="fluorMirrorSS_AxisLabel"
                transform="rotate(-90 65 215)"
            >
                    ε (M
                <tspan baselineShift="super" fontSize="0.7em">−1</tspan>
                    cm
                <tspan baselineShift="super" fontSize="0.7em">−1</tspan>
                    ), I
                <tspan baselineShift="sub" fontSize="0.7em">f</tspan>
                    (a.u.)
            </text>

            <g className="fluorMirrorSS_CurveGroup">
                <path
                    d={ABS_PATH}
                    className="fluorMirrorSS_AbsCurve"
                    style={{ stroke: "var(--accent-2)", filter: `url(#${ids.glow})` }}
                    transform="translate(80 84) scale(0.5 0.58)"
                />

                <path
                    d={EM_PATH}
                    className="fluorMirrorSS_EmCurve"
                    style={{ stroke: "var(--accent-3)", filter: `url(#${ids.glow})` }}
                    transform="translate(290 86) scale(0.5 0.58)"
                />
            </g>

            <PeakMarker x={PLOT.absPeak.x} y={PLOT.absPeak.y} label="λabs,max" />
            <PeakMarker x={PLOT.emPeak.x} y={PLOT.emPeak.y} label="λem,max" />

            <path
                className="fluorMirrorSS_ShiftArrow"
                d={`M ${PLOT.absPeak.x + 5} 75 H ${PLOT.emPeak.x - 5}`}
                markerEnd={`url(#${ids.arrow})`}
                markerStart={`url(#${ids.arrow})`}
            />
            <g className="fluorMirrorSS_LabelLine" >
                <path 
                    className="fluorMirrorSS_LabelLine fluorMirrorSS_AbsLabelLine"
                    d="M 360 48 H 390"
                    style={{ stroke: "var(--accent-2)", filter: `url(#${ids.glow})` }}
                />
                <path 
                    className="fluorMirrorSS_LabelLine fluorMirrorSS_EmLabelLine"
                    d="M 360 68 H 390"
                    style={{ stroke: "var(--accent-3)", filter: `url(#${ids.glow})` }}
                />
            </g>

            <PlotLabel x="400" y="54" className="fluorMirrorSS_AbsLabel">
                Absorption
            </PlotLabel>
            <PlotLabel x="395" y="74" className="fluorMirrorSS_EmTextLabel">
                Fluorescence
            </PlotLabel>
            <PlotLabel x="235" y="65" className="fluorMirrorSS_ShiftLabel">
                Stokes shift
            </PlotLabel>
        </g>
    );
}

function JablonskiInset({ ids }) {
    return (
        <g className="fluorMirrorSS_Jablonski">
            <rect 
                className="fluorMirrorSS_InsetPane"
                x="550"
                y="14"
                width="222" 
                height="326" 
                rx="24" 
            />

            {LEVELS.map((level) => (
                <g key={level.id}>
                    <path
                        className="fluorMirrorSS_LevelLine"
                        d={`M 600 ${level.y} H 720`}
                    />
                    <text x="570" y={level.y + 5} className="fluorMirrorSS_LevelLabel">
                        {level.label}
                    </text>
                </g>
            ))}
            <g className="fluorMirrorSS_JablonksiArrow" >
                <g className="fluorMirrorSS_EmissionPath" >
                    {/* const LEVELS = [
                        { id: "s4", label: "S₄", y: 38 },
                        { id: "s3", label: "S₃", y: 68 },
                        { id: "s2", label: "S₂", y: 98 },
                        { id: "s1", label: "S₁", y: 128 },
                        { id: "s0", label: "S₀", y: 275 },
                    ]; */}
                    <path
                        d="M 690 130 V 270"
                        markerEnd={`url(#${ids.arrow})`}
                    />
                    <path
                        d="M 710 98 V 123"
                        markerEnd={`url(#${ids.arrow})`}
                    />
                    <path
                        d="M 700 68 V 93"
                        markerEnd={`url(#${ids.arrow})`}
                    />
                    <path
                        d="M 690 38 V 63"
                        markerEnd={`url(#${ids.arrow})`}
                    />
                </g>
                <g className="fluorMirrorSS_NonRadPath" >
                    <path
                        d="M 670 39 V 270"
                        markerEnd={`url(#${ids.arrow2})`}
                    />
                    <path
                        d="M 660 69 V 270"
                        markerEnd={`url(#${ids.arrow2})`}
                    />
                    <path
                        d="M 650 99 V 270"
                        markerEnd={`url(#${ids.arrow2})`}
                    />
                    <path
                        d="M 640 129 V 270"
                        markerEnd={`url(#${ids.arrow2})`}
                    />
                </g>
                <g className="fluorMirrorSS_NonRadPath2" >
                    <path
                        d="M 610 38 V 63"
                        markerEnd={`url(#${ids.arrow})`}
                    />
                    <path
                        d="M 620 68 V 93"
                        markerEnd={`url(#${ids.arrow})`}
                    />
                    <path
                        d="M 630 98 V 123"
                        markerEnd={`url(#${ids.arrow})`}
                    />
                </g>
            </g>

            <g className="fluorMirrorSS_MiniLabel fluorMirrorSS_RadLabel" >
                <text x="705" y="210" className="fluorMirrorSS_MiniLabel fluorMirrorSS_RadLabel">
                    k<tspan baselineShift="sub">rad</tspan>
                </text>
            </g>
            <g className="fluorMirrorSS_MiniLabel fluorMirrorSS_NrLabel">
                <text x="600" y="210" className="fluorMirrorSS_MiniLabel fluorMirrorSS_NrLabel">
                    k<tspan baselineShift="sub">nr</tspan>
                </text>
            </g>
            <g className="fluorMirrorSS_MiniLabel fluorMirrorSS_JablonksiLabel">
                <text x="620" y="310" className="fluorMirrorSS_MiniLabel fluorMirrorSS_JablonksiLabel">
                    k<tspan baselineShift="sub" fontSize="0.75em">nr</tspan> 
                    <tspan fontSize="1.35em" fontWeight="700">&gt;</tspan>
                        {" "}
                    k<tspan baselineShift="sub" fontSize="0.75em">rad</tspan>
                </text>
            </g>
        </g>
    );
}

export default function FluorMirrorSS() {
    const uid = useId();
    const ids = {
        plate: makeId(uid, "plate"),
        plateCyan: makeId(uid, "plateCyan"),
        platePink: makeId(uid, "platePink"),
        plateShadow: makeId(uid, "plateShadow"),
        glow: makeId(uid, "glow"),
        arrow: makeId(uid, "arrow"),
        arrow2: makeId(uid, "arrow2")
    };

    return (
        <figure className="fluorMirrorSS">
            <svg
                className="fluorMirrorSS_SVG"
                viewBox="0 0 800 420"
                role="img"
            >
                <FluorMirrorSSDefs ids={ids} />
                <g 
                    className="fluorMirrorSS_Manifold"
                    style={{
                        "--gaus-glow": `url(#${ids.glow})`,
                        "--arrow-draw": `url(#${ids.arrow})`,
                        "--arrow-2-draw": `url(#${ids.arrow})`,
                        "--plate": `url(#${ids.plate})`,
                        "--plate-shadow": `url(#${ids.plateShadow})`
                    }}

                >
                    <FluorMirrorSSBackplate ids={ids} />

                    <AbsFluoresPlot ids={ids} />

                    <JablonskiInset ids={ids} />

                </g>

                <g className="fluorMirrorSS_Title">
                    <text x="55" y="374">MIRROR RELATIONSHIP · LOWER-ENERGY EMISSION</text>
                </g>
            </svg>

            <figcaption className="fluorMirrorSS_Caption">
                Absorption and fluorescence can show related band shapes, but emission is typically shifted to lower energy because relaxation and reorganization occur before photon release.
            </figcaption>
        </figure>
    );
}
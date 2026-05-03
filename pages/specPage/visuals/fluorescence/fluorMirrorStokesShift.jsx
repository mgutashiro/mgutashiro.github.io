import './fluorMirrorStokesShift.css';
import React, { useId } from "react";

const ABS_PATH =
    "M0.185699 355.108L15.1857 349.108L26.6857 342.608L33.6857 330.108L39.1857 309.608L42.6857 284.608L45.6857 251.608L47.6857 220.108L49.1857 198.608L51.1857 165.608L53.1857 118.108L54.6857 78.6085L56.6857 47.6085L58.6857 19.1085L60.6857 0.108459L62.6857 9.10846L64.6857 24.6085V39.1085L66.6857 56.1085L68.1857 73.6085L71.1857 96.6085L72.6857 111.108L75.6857 124.608L79.1857 136.108L81.1857 150.608L84.6857 175.608L87.1857 196.108L89.6857 213.108L95.6857 241.108L101.686 254.108L108.686 263.108L116.186 277.608L122.186 292.108L129.686 306.608L138.686 320.108L150.186 333.108L159.186 339.608L172.186 345.108L186.186 349.108L199.186 352.108L210.186 353.608";

const EM_PATH =
    "M0.277344 230.16L4.77734 233.16L8.77734 230.16L22.7773 272.16L31.2773 268.16L44.7773 175.16L57.2773 321.16L60.2773 328.16L64.7773 331.16L69.7773 326.66L74.7773 319.16L79.2773 310.66L83.2773 304.16L85.2773 302.16L88.2773 304.16L92.2773 313.16L95.7773 322.16L100.277 332.16L107.777 340.66L111.277 343.16H117.277L126.277 347.16L137.277 350.66L147.277 349.16L158.277 345.66L166.777 341.66L172.777 339.66L178.777 338.16L190.777 329.16L202.277 319.66L211.277 312.16L220.777 304.16L229.777 299.66L240.777 293.66L249.777 288.66L256.777 282.66L262.777 275.66L269.277 262.66L274.777 244.66L280.277 224.16L285.277 203.66L289.277 183.66L295.277 159.16L298.777 146.16L302.777 129.66L305.777 115.66L308.277 99.1602L310.777 79.1602L313.777 51.1602L316.277 33.1602L318.277 20.1602L320.777 9.66022L322.777 3.66022L325.777 0.660217L329.777 3.66022L331.777 9.66022L333.777 20.1602L335.777 34.1602L337.277 47.6602L338.277 69.6602L338.777 86.1602L339.777 100.66L340.277 114.66L340.777 127.66L341.777 145.66L342.777 162.16L343.277 176.16L343.777 190.16L344.277 201.66L345.277 214.66V230.16L346.777 251.66L348.277 269.16L349.277 289.66L351.277 307.66L352.777 320.16L354.777 332.66L357.277 342.16L362.777 350.66L370.277 355.66L380.277 357.16H392.777H409.277";

const PLOT = {
    x: 58,
    y: 74,
    w: 456,
    h: 246,
    baseY: 292,
    absPeak: { x: 177, y: 84 },
    emPeak: { x: 382, y: 86 },
};

const LEVELS = [
    { id: "s1", label: "S₁", y: 128 },
    { id: "s0", label: "S₀", y: 258 },
];

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

function JablonskiInset({ ids }) {
    return (
        <g className="fluorMirrorSS_Jablonski" transform="translate(548 78)">
            <rect className="fluorMirrorSS_InsetPane" width="202" height="244" rx="24" />

            {LEVELS.map((level) => (
                <g key={level.id}>
                    <path
                        className="fluorMirrorSS_LevelLine"
                        d={`M 34 ${level.y} H 168`}
                    />
                    <text x="18" y={level.y + 5} className="fluorMirrorSS_LevelLabel">
                        {level.label}
                    </text>
                </g>
            ))}
            <path
                className="fluorMirrorSS_RelaxPath"
                d="M 76 88 C 98 106, 112 113, 132 128"
                markerEnd={`url(#${ids.arrow})`}
            />

            <path
                className="fluorMirrorSS_EmissionPath"
                d="M 138 132 C 146 166, 132 211, 112 252"
                markerEnd={`url(#${ids.arrow})`}
            />

            <path
                className="fluorMirrorSS_NonRadPath"
                d="M 72 136 C 58 168, 62 214, 78 254"
                markerEnd={`url(#${ids.arrow})`}
            />
            <text x="93" y="105" className="fluorMirrorSS_MiniLabel">
                relaxation
            </text>
            <text x="146" y="192" className="fluorMirrorSS_MiniLabel fluorMirrorSS_EmLabel">
                k<tspan baselineShift="sub">rad</tspan>
            </text>
            <text x="38" y="192" className="fluorMirrorSS_MiniLabel fluorMirrorSS_NrLabel">
                k<tspan baselineShift="sub">nr</tspan>
            </text>

            <circle cx="76" cy="88" r="5" className="fluorMirrorSS_PopDot" />
            <circle cx="132" cy="128" r="5" className="fluorMirrorSS_PopDot fluorMirrorSS_PopDotRelaxed" />
        </g>
    );
}

export default function FluorMirrorSS() {
    const uid = useId().replace(/:/g, "");
    const ids = {
        abs: `fluorMirrorSS_abs_${uid}`,
        em: `fluorMirrorSS_em_${uid}`,
        shift: `fluorMirrorSS_shift_${uid}`,
        glow: `fluorMirrorSS_glow_${uid}`,
        arrow: `fluorMirrorSS_arrow_${uid}`,
    };

    return (
        <figure className="fluorMirrorSS">
            <div className="fluorMirrorSS_Frame">
                <svg
                    className="fluorMirrorSS_SVG"
                    viewBox="0 0 800 420"
                    role="img"
                >

                    <defs>
                        <linearGradient id={ids.abs} x1="70" y1="0" x2="360" y2="0" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="var(--accent-2)" />
                            <stop offset="100%" stopColor="var(--accent)" />
                        </linearGradient>

                        <linearGradient id={ids.em} x1="250" y1="0" x2="500" y2="0" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="var(--accent)" />
                            <stop offset="100%" stopColor="var(--accent-3)" />
                        </linearGradient>

                        <linearGradient id={ids.shift} x1="180" y1="0" x2="385" y2="0" gradientUnits="userSpaceOnUse">
                            <stop offset="0%" stopColor="var(--lightMetal)" />
                            <stop offset="100%" stopColor="var(--accent-3)" />
                        </linearGradient>

                        <filter id={ids.glow} x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <marker
                            id={ids.arrow}
                            markerWidth="8"
                            markerHeight="8"
                            refX="6"
                            refY="4"
                            orient="auto"
                        >
                            <path d="M 0 0 L 8 4 L 0 8 Z" className="fluorMirrorSS_ArrowHead" />
                        </marker>
                    </defs>

                    <rect className="fluorMirrorSS_Backplate" x="18" y="22" width="764" height="354" rx="30" />

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
                            className="fluorMirrorSS_GridLine"
                            d="M 84 132 H 488 M 84 192 H 488 M 84 252 H 488"
                        />
                        <path
                            className="fluorMirrorSS_Axis"
                            d={`M ${PLOT.x + 30} ${PLOT.y + 26} V ${PLOT.baseY} H ${PLOT.x + PLOT.w - 28}`}
                        />

                        <text x="286" y="342" className="fluorMirrorSS_AxisLabel">
                            wavelength / nm
                        </text>

                        <text
                            x="38"
                            y="200"
                            className="fluorMirrorSS_AxisLabel"
                            transform="rotate(-90 38 200)"
                        >
                            ε / relative emission
                        </text>

                        <g className="fluorMirrorSS_CurveGroup">
                            <path
                                d={ABS_PATH}
                                className="fluorMirrorSS_AbsCurve"
                                style={{ stroke: `url(#${ids.abs})`, filter: `url(#${ids.glow})` }}
                                transform="translate(96 84) scale(1.34 0.58)"
                            />

                            <path
                                d={EM_PATH}
                                className="fluorMirrorSS_EmCurve"
                                style={{ stroke: `url(#${ids.em})`, filter: `url(#${ids.glow})` }}
                                transform="translate(220 84) scale(0.52 0.58)"
                            />
                        </g>

                        <PeakMarker x={PLOT.absPeak.x} y={PLOT.absPeak.y} label="λabs,max" />
                        <PeakMarker x={PLOT.emPeak.x} y={PLOT.emPeak.y} label="λem,max" />

                        <path
                            className="fluorMirrorSS_ShiftArrow"
                            d={`M ${PLOT.absPeak.x + 18} 118 C 244 104, 316 104, ${PLOT.emPeak.x - 18} 118`}
                            style={{ stroke: `url(#${ids.shift})` }}
                            markerEnd={`url(#${ids.arrow})`}
                        />

                        <PlotLabel x="124" y="64" className="fluorMirrorSS_AbsLabel">
                            Absorption
                        </PlotLabel>
                        <PlotLabel x="344" y="64" className="fluorMirrorSS_EmTextLabel">
                            Fluorescence
                        </PlotLabel>
                        <PlotLabel x="246" y="100" className="fluorMirrorSS_ShiftLabel">
                            Stokes shift
                        </PlotLabel>
                    </g>

                    <JablonskiInset ids={ids} />

                    <g className="fluorMirrorSS_Title">
                        <text x="58" y="404">MIRROR RELATIONSHIP · LOWER-ENERGY EMISSION</text>
                    </g>
                </svg>
            </div>

            <figcaption className="fluorMirrorSS_Caption">
                Absorption and fluorescence can show related band shapes, but emission is typically shifted to lower energy because relaxation and reorganization occur before photon release.
            </figcaption>
        </figure>
    );
}
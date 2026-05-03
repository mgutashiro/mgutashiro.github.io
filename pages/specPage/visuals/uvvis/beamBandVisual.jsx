import { useId } from 'react';
import './beamBandVisual.css'

/** PRESET CONSTANTS */
const VIEWBOX = { width: 760, height: 400 };

const BEAM_BANDS = [
    {
        id: "cyan",
        y: 154,
        color: "var(--c-glow-1)",
        opacity: 0.9,
    },
    {
        id: "lime",
        y: 174,
        color: "color-mix(in oklab, var(--c-glow-4) 70%, var(--text) 10%)",
        opacity: 0.78,
    },
    {
        id: "soft-pink",
        y: 194,
        color: "color-mix(in oklab, var(--c-glow-3) 58%, white 12%)",
        opacity: 0.72,
    },
];

const MISSING_MARKERS = [
    {
        id: "violet-loss",
        x1: 282,
        x2: 334,
        y: 121,
        color: "var(--c-glow-2)",
    },
    {
        id: "pink-loss",
        x1: 302,
        x2: 350,
        y: 135,
        color: "var(--c-glow-3)",
    },
];

const ENERGY_LEVELS = [
    {
        id: "lower",
        y: 72,
        width: 70,
        label: "low",
    },
    {
        id: "upper",
        y: 10,
        width: 56,
        label: "high",
    },
];

const SPECTRUM_POINTS = [
    [408, 324],
    [432, 320],
    [462, 318],
    [490, 278],
    [520, 316],
    [552, 310],
    [584, 252],
    [616, 308],
    [648, 318],
    [680, 316],
];

const STAGE_TRANSFORM = "translate(-35 -8) scale(1.1)";

/** HELPER FUNCTIONS */
// convert point arrays into a simple editable SVG path
function makePath(points) {
    return points.map(([x, y], index) => `${index === 0 ? "M" : "L"} ${x} ${y}`).join(" ");
}

function getBandPath(y) {
    return `M 54 ${y} C 150 ${y - 10}, 236 ${y + 10}, 356 ${y}`;
}

// build one transmitted beam lane with a soft L→R motion class
function BeamBand({ band }) {
    const beamPath = getBandPath(band.y);

    return (
        <g className={`UVV-F-P3-BeamBand UVV-F-P3-BeamBand--${band.id}`}>
            <path
                d={beamPath}
                fill="none"
                stroke={band.color}
                strokeWidth="5"
                strokeLinecap="round"
                opacity={band.opacity}
            />
            <path
                d={beamPath}
                fill="none"
                stroke={band.color}
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.12"
            />
        </g>
    );
}

// shows removed colors as absense markers
function MissingMarker({ marker }) {
    const markerPath = getBandPath(marker.y);

    return (
        <g className={`UVV-F-P3-MissingMarker UVV-F-P3-MissingMarker--${marker.id}`}>
            <path
                d={markerPath}
                fill="none"
                stroke={marker.color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="6 10"
                opacity="0.82"
            />
        </g>
    );
}

// add small electron-promotion hint that supports the text
function TransitionInset() {
    const [lower, upper] = ENERGY_LEVELS;

    const lineCenterX = 54;
    const labelX = 98;
    const electronR = 5.5;
    const arrowX = lineCenterX + 18;

    const jumpY = lower.y - upper.y;

    return (
        <g
            className="UVV-F-P3-TransitionInset"
            transform="translate(138 266)"
            style={{ "--electron-jump-y": `${-jumpY}px` }}
        >
            <rect
                x="-50"
                y="-48"
                width="250"
                height="144"
                rx="24"
                className="UVV-F-P3-InsetBackplate"
            />

            <text x={lineCenterX + 10} y="-18" className="UVV-F-P3-InsetTitle">
                electron jump
            </text>

            {ENERGY_LEVELS.map(({ id, y, width, label }) => {
                const x1 = lineCenterX - width / 2;
                const x2 = lineCenterX + width / 2;

                return (
                    <g key={id}>
                        <line
                            x1={x1 - 20}
                            x2={x2 + 20}
                            y1={y}
                            y2={y}
                            className="UVV-F-P3-EnergyLevel"
                        />
                        <text x={labelX + 20} y={y + 4} className="UVV-F-P3-TinyLabel">
                            {label}
                        </text>
                    </g>
                );
            })}

            <circle
                cx={lineCenterX - 10}
                cy={lower.y}
                r={electronR}
                className="UVV-F-P3-ElectronDot"
            />

            <path
                d={`M ${arrowX} ${lower.y - 8} L ${arrowX} ${upper.y + 10}`}
                className="UVV-F-P3-ElectronArrow"
            />

            <path
                d={`M ${arrowX} ${upper.y} L ${arrowX - 5} ${upper.y + 10} L ${arrowX + 5} ${upper.y + 10} Z`}
                className="UVV-F-P3-ElectronArrowHead"
            />
        </g>
    );
}

// draw detector/readout where transmitted light becomes measurable data
function DetectorReadout({ detectorGradId }) {
    return (
        <g className="UVV-F-P3-DetectorReadout">
            <rect
                x="366"
                y="95"
                width="320"
                height="126"
                rx="28"
                fill={`url(#${detectorGradId})`}
                className="UVV-F-P3-DetectorWindow"
            />

            <line
                x1="374"
                y1="171"
                x2="680"
                y2="171"
                className="UVV-F-P3-DetectorCenterLine"
            />

            {/* detector dots begin where each beam band ends */}
            <circle cx="356" cy="154" r="4" className="UVV-F-P3-DetectorDot" />
            <circle cx="356" cy="174" r="4" className="UVV-F-P3-DetectorDot2" />
            <circle cx="356" cy="194" r="4" className="UVV-F-P3-DetectorDot3" />

            <text x="400" y="120" className="UVV-F-P3-Label">
                detector reads the loss
            </text>
        </g>
    );
}

// draw final abs-style spec written from missing λ
function SpectrumGraph() {
    const spectrumPath = makePath(SPECTRUM_POINTS);

    return (
        <g className="UVV-F-P3-SpectrumGraph">
            <rect x="372" y="210" width="324" height="156" rx="24" className="UVVPanel3GraphPlate" />

            <line x1="408" y1="326" x2="674" y2="326" className="UVV-F-P3-Axis" />
            <line x1="408" y1="326" x2="408" y2="238" className="UVV-F-P3-Axis" />

            <path d={spectrumPath} className="UVV-F-P3SpectrumTraceGlow" />
            <path d={spectrumPath} className="UVV-F-P3-SpectrumTrace" />

            <circle cx="490" cy="278" r="4.5" className="UVV-F-P3-PeakDot UVV-F-P3-PeakDot--violet" />
            <circle cx="584" cy="252" r="4.5" className="UVV-F-P3-PeakDot UVV-F-P3-PeakDot--pink" />

            <text x="500" y="350" className="UVV-F-P3-GraphLabel">
                wavelength
            </text>

            <text x="390" y="250" className="UVV-F-P3-GraphLabel UVV-F-P3-GraphLabel--vertical" transform="rotate(180 390 290)">
                absorbance
            </text>
        </g>
    );
}

export default function BeamBandVisualReturn() {
    const uid = useId();
    const detectorGradId = `${uid}-UVV-F-P3-detector-grad`;
    const softGlowId = `${uid}-UVV-F-P3-soft-glow`;

    return (
        <figure className="UVV-F-P3-Shell">
            <svg
                className="UVV-F-P3-SVG"
                viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                role="img"
            >
                <defs>
                    <linearGradient
                        id={detectorGradId}
                        x1="374"
                        y1="118"
                        x2="680"
                        y2="224"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="color-mix(in oklab, var(--c-ink) 86%, var(--c-glow-1) 14%)" />
                        <stop offset="58%" stopColor="color-mix(in oklab, var(--c-ink) 78%, var(--c-glow-2) 18%)" />
                        <stop offset="100%" stopColor="color-mix(in oklab, var(--c-ink) 82%, var(--c-glow-3) 12%)" />
                    </linearGradient>

                    <filter id={softGlowId} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
 
                <g className="UVV-F-P3-Stage" transform={STAGE_TRANSFORM}>
                    <rect x="28" y="4" width="704" height="382" rx="36" className="UVV-F-P3-Backplate" />
                        <g className="UVV-F-P3-MainContent" transform="translate(0 -26)">
                            <g className="UVVPanel3SignalCluster" transform="translate(0, -24)">
                                <g className="UVV-F-P3-BeamGroup" filter={`url(#${softGlowId})`}>
                                    {BEAM_BANDS.map((band) => (
                                    <BeamBand key={band.id} band={band} />
                                    ))}
                                </g>

                                <g className="UVVPanel3MissingGroup">
                                    {MISSING_MARKERS.map((marker) => (
                                    <MissingMarker key={marker.id} marker={marker} />
                                    ))}
                                </g>

                                <DetectorReadout detectorGradId={detectorGradId} />
                            </g>
                            <TransitionInset />
                            <SpectrumGraph />

                        </g>
                    </g>
            </svg>
        </figure>
    );
}
import './detectorVisual.css'

/** Viewbox + Layout Anchors */
// preset constants
const VISUALBASE = {
    width: 720,
    height: 420,
};

const POSITIONS = {
    beamY: 150,
    beamStartX: 82,
    beamEndX: 510,

    detectorX: 540,
    detectorY: 92,
    detectorW: 88,
    detectorH: 126,

    traceStartX: 430,
    traceEndX: 650,
    traceBaseY: 315,

    glowCX: 584,
    glowCY: 154,
};

/** Reusable Signal Points */
const TRACEPOINTS = [
    [430, 316],
    [455, 314],
    [476, 312],
    [498, 320], // for gentle dip
    [525, 306],
    [552, 284], // for small peak
    [580, 296],
    [608, 304],
    [650, 300],
];

/** Helper functions */
// Turn Point array into smooth SVG path
function buildSoftTrace(points) {
    if (!points.length) return '';
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i += 1) {
        const [prevX, prevY] = points[i - 1];
        const [x, y] = points[i];
        const midX = (prevX + x) / 2;

        d += ` C ${midX} ${prevY}, ${midX} ${y}, ${x} ${y}`;
    }
    return d;
}

const TRACE_D = buildSoftTrace(TRACEPOINTS);

// renders altered outgoing beam
function SignalBeam() {
    return (
        <g className="DetectorVisualBeamGroup">
            {/* soft aura around beam */}
            <path
                d="M 82 150 C 180 150, 260 150, 348 150 C 410 150, 458 149, 510 148"
                className="DetectorVisualBeamGlow"
            />
            {/* main visible beam */}
            <path
                d="M 82 150 C 180 150, 260 150, 348 150 C 410 150, 458 149, 510 148"
                className="DetectorVisualBeamCore"
            />
            {/* subtle internal banding */}
            <path
                d="M 180 146 C 262 144, 356 144, 432 146"
                className="DetectorVisualBeamBand"
            />
            <path
                d="M 250 154 C 330 156, 392 156, 468 154"
                className="DetectorVisualBeamBand DetectorVisualBeamBand--dim"
            />
        </g>
    );
}

// subtle handoff glow where beam meets detector setup
function ArrivalHalo() {
    return (
        <g className="DetectorVisualArrivalGroup">
            <circle
                cx={POSITIONS.glowCX}
                cy={POSITIONS.glowCY}
                r="18"
                className="DetectorVisualArrivalCore"
            />
            <circle
                cx={POSITIONS.glowCX}
                cy={POSITIONS.glowCY}
                r="42"
                className="DetectorVisualArrivalHalo"
            />
            <circle
                cx={POSITIONS.glowCX}
                cy={POSITIONS.glowCY}
                r="64"
                className="DetectorVisualArrivalRing"
            />
        </g>
    );
}

// detector window / listening surface setup for the body
function DetectorModule() {
    return (
        <g className="DetectorVisualGrouping">
            <rect
                x={POSITIONS.detectorX}
                y={POSITIONS.detectorY}
                width={POSITIONS.detectorW}
                height={POSITIONS.detectorH}
                rx="18"
                className="DetectorVisualBody"
            />
            <rect
                x={POSITIONS.detectorX + 10}
                y={POSITIONS.detectorY + 10}
                width={POSITIONS.detectorW - 20}
                height={POSITIONS.detectorH - 20}
                rx="14"
                className="DetectorVisualInner"
            />
            <line
                x1={POSITIONS.detectorX + 22}
                y1={POSITIONS.detectorY + 18}
                x2={POSITIONS.detectorX + 22}
                y2={POSITIONS.detectorY + POSITIONS.detectorH - 18}
                className="DetectorVisualSlit"
            />
            <line
                x1={POSITIONS.detectorX + 44}
                y1={POSITIONS.detectorY + 18}
                x2={POSITIONS.detectorX + 44}
                y2={POSITIONS.detectorY + POSITIONS.detectorH - 18}
                className="DetectorVisualSensor"
            />
        </g>
    );
}

// faint guide line setup pre signal reading
function SignalBaseline() {
    return (
        <g className="DetectorVisualSignalBaseGroup">
            <line
                x1={POSITIONS.traceStartX}
                y1={POSITIONS.traceBaseY}
                x2={POSITIONS.traceEndX}
                y2={POSITIONS.traceBaseY}
                className="DetectorVisualSignalBaseline"
            />
        </g>
    );
}

// readable translated signal/data setup
function SignalTrace() {
    return (
        <g className="DetectorVisualTraceGroup">
            <path d={TRACE_D} className="DetectorVisualSignalTraceGlow" />
            <path d={TRACE_D} className="DetectorVisualSignalTrace" />

            {/* optional tiny vertical marker ticks for "measured" feeling */}
            <line x1="498" y1="320" x2="498" y2="334" className="DetectorVisualSignalTick" />
            <line x1="552" y1="284" x2="552" y2="334" className="DetectorVisualSignalTick" />
        </g>
    );
}

// setup of connector from detector to trace area
function DetectorToTraceLink() {
    return (
        <g className="DetectorVisualLinkGroup">
            <path
                d="M 584 220 C 584 246, 566 266, 542 278 C 518 290, 490 300, 456 306"
                className="DetectorVisualTraceLink"
            />
        </g>
    );
}

// label setup
function SignalLabels() {
    return (
        <g className="DetectorVisualLabelLayer" aria-hidden="true">
            <text
                x="304"
                y="132"
                textAnchor="middle"
                className="DetectorVisualLabelText DetectorVisualLabelText--incoming"
            >
                signal after sample
            </text>
            
            <g className="DetectorVisualLabelGroup DetectorVisualLabelGroup--detector">
                <line
                    x1="510"
                    y1="108"
                    x2="490"
                    y2="96"
                    className="DetectorVisualLabelTick--detector"
                />
                <text x="420" y="90" className="DetectorVisualLabelText--detector">
                    detector
                </text>
            </g>

            <g className="DetectorVisualLabelGroup DetectorVisualLabelGroup--signal">
                <line
                    x1="604"
                    y1="285"
                    x2="638"
                    y2="266"
                    className="DetectorVisualLabelTick--signal"
                />
                <text x="644" y="260" className="DetectorVisualLabelText--signal">
                    signal
                </text>
            </g>
        </g>
    );
}

export default function DetectorVisualResponse() {
    return (
        <div className="DetectorVisualPanel">
            <div className="DetectorVisualStage" aria-label="Instrument translating a hidden change into a readable signal">
                <svg
                    className="DetectorVisualSVG"
                    viewBox={`0 0 ${VISUALBASE.width} ${VISUALBASE.height}`}
                    role="img"
                >
                    <defs>
                        <filter id="DetectorVisualBlurL" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="10" />
                        </filter>

                        <filter id="DetectorVisualS" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" />
                        </filter>

                        <linearGradient id="DetectorVisualBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" className="DetectorVisualStop DetectorVisualStop--beamA" />
                            <stop offset="50%" className="DetectorVisualStop DetectorVisualStop--beamB" />
                            <stop offset="100%" className="DetectorVisualStop DetectorVisualStop--beamC" />
                        </linearGradient>

                        <linearGradient id="DetectorVisualTraceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" className="DetectorVisualStop DetectorVisualStop--traceA" />
                            <stop offset="50%" className="DetectorVisualStop DetectorVisualStop--traceB" />
                            <stop offset="100%" className="DetectorVisualStop DetectorVisualStop--traceC" /> 
                        </linearGradient>
                    </defs>

                    {/* bkgd atmosphere */}
                    <g className="DetectorVisualAtmosphere">
                        <ellipse cx="520" cy="154" rx="210" ry="120" className="DetectorVisualBackGlow" />
                        <ellipse cx="548" cy="318" rx="170" ry="64" className="DetectorVisualGlowField" />
                    </g>

                    {/* 1. altered outgoing light arrives */}
                    <SignalBeam />

                    {/* 2. beam softly meets the detector area */}
                    <ArrivalHalo />

                    {/* 3. detector body / listening surface */}
                    <DetectorModule />

                    {/* 4. translated motion from detector to data region */}
                    <DetectorToTraceLink />

                    {/* 5. Faint baseline appears first */}
                    <SignalBaseline />

                    {/* 6. Readable signal writes itself */}
                    <SignalTrace />

                    {/* 7. support labels */}
                    <SignalLabels />
                </svg>
            </div>
        </div>
    );
}
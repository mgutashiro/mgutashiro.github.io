import './sampleVisual.css'

/** Preset Constants */
const VIEWBOX = {
    width: 720,
    height: 420,
};

const CENTER = {
    x: 372,
    y: 208,
};

const BEAM = {
    startX: 78,
    endX: 308,
    y: 208,
    ctrlOffsetY: -8,
};

const OUTGOING = {
    startX: 436,
    endX: 620,
    y: 208,
    ctrlOffsetY: 10,
};

const CHAMBER = {
    rx: 92,
    ry: 108,
    innerRx: 58,
    innerRy: 70,
};

const RIPPLERADII = [54, 82, 112];
const SPARKCOUNT = 8;
const TRACECOUNT = 4;

/** Helper Functions */
// keeps beam paths reusable
function SampleVisualCurvePath(x1, y1, x2, y2, bend = 0) {
    const cx1 = x1 + (x2 - x1) * 0.38;
    const cy1 = y1 + bend;
    const cx2 = x1 + (x2 - x1) * 0.72;
    const cy2 = y2 + bend;

    return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
}

// makes expanding response rings cleaner
function SampleVisualRippleData(centerX, centerY, radii) {
    return radii.map((r, index) => ({
        key: `ripple-${index}`,
        cx: centerX,
        cy: centerY,
        rx: r,
        ry: r * 0.68,
        delay: `${index * 0.18}s`,
    }));
}

// gives the active shimmer 
function SampleVisualSparkData(centerX, centerY, count) {
    return Array.from({ length: count }, (_, index) => {
        const angle = (Math.PI * 2 * index) / count;
        const radius = index % 2 === 0 ? 26 : 36;

        return {
            key: `spark-${index}`,
            x1: centerX + Math.cos(angle) * radius,
            y1: centerY + Math.sin(angle) * radius * 0.82,
            x2: centerX + Math.cos(angle) * (radius + 11),
            y2: centerY + Math.sin(angle) * (radius + 11) * 0.82,
            delay: `${index * 0.08}s`,
        };
    });
}

// add small internal response particles to make sample feel alive
function SampleVisualTraceData(centerX, centerY, count) {
    return Array.from({ length: count }, (_, index) => ({
        key: `trace-${index}`,
        cx: centerX - 10 + index * 8,
        cy: centerY - 18 + index * 12,
        r: 2 + (index % 2),
        delay: `${0.15 + index * 0.12}s`,
    }));
}

/** Derived visual data */
// create actual SVG path string for incoming beam the left
const SampleVisualIncomingBeamPath = SampleVisualCurvePath (
    BEAM.startX,
    BEAM.y,
    BEAM.endX,
    BEAM.y,
    BEAM.ctrlOffsetY
);

// create SVG path string for the faint outgoing beam on the right
const SampleVisualOutgoingBeamPath = SampleVisualCurvePath(
    OUTGOING.startX,
    OUTGOING.y,
    OUTGOING.endX,
    OUTGOING.y,
    OUTGOING.ctrlOffsetY
);

// builds array of ripple objects centered on the sample
const SampleVisualRipples = SampleVisualRippleData(
    CENTER.x,
    CENTER.y,
    RIPPLERADII
);

// build an array of little spark line positions around sample center
const SampleVisualSparks = SampleVisualSparkData(
    CENTER.x,
    CENTER.y,
    SPARKCOUNT
);

// builds array of tiny particle or trace-marker positions inside or near the sample
const SampleVisualTraces = SampleVisualTraceData(
    CENTER.x,
    CENTER.y,
    TRACECOUNT
);

/** MAIN COMPONENT */
export default function SampleVisualResponse () {
    return (
        <div className="SampleVisualStage">
            <div className="SampleVisualBackground">
                <svg
                    className="SampleVisualSVG"
                    viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                    preserveAspectRatio="xMidYMid meet"
                    aria-hidden="true"
                >
                    <defs>
                        <radialGradient id="SampleVisualCoreGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" className="SampleVisualStopCoreA" />
                            <stop offset="45%" className="SampleVisualStopCoreB" />
                            <stop offset="100%" className="SampleVisualStopCoreC" />
                        </radialGradient>

                        <radialGradient id="SampleVisualHaloGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" className="SampleVisualStopHaloA" />
                            <stop offset="100%" className="SampleVisualStopHaloB" />
                        </radialGradient>

                        <linearGradient id="SampleVisualBeamInGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" className="SampleVisualStopBeamInA" />
                            <stop offset="100%" className="SampleVisualStopBeamInB" />
                        </linearGradient>

                        <linearGradient id="SampleVisualBeamOutGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" className="SampleVisualStopBeamOutA" />
                            <stop offset="100%" className="SampleVisualStopBeamOutB" />
                        </linearGradient>

                        <filter id="SampleVisualBlurSoft" x="-30%" y="-30%" width="160%" height="160%">
                            <feGaussianBlur stdDeviation="8" />
                        </filter>

                        <filter id="SampleVisualBlurTight" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3.5" />
                        </filter>
                    </defs>

                    {/* ambient chamber field */}
                    <g className="SampleVisualAmbientLayer">
                        <ellipse 
                            className="SampleVisualAmbientHalo"
                            cx={CENTER.x}
                            cy={CENTER.y}
                            rx="164"
                            ry="118"
                        />
                        <ellipse
                            className="SampleVisualChamberShell"
                            cx={CENTER.x}
                            cy={CENTER.y}
                            rx={CHAMBER.rx}
                            ry={CHAMBER.ry}
                        />
                        <ellipse 
                            className="SampleVisualChamberVeil"
                            cx={CENTER.x}
                            cy={CENTER.y}
                            rx={CHAMBER.innerRx}
                            ry={CHAMBER.innerRy}
                        />
                    </g>

                    {/* incoming energy */}
                    <g className="SampleVisualIncomingLayer">
                        <path 
                            d={SampleVisualIncomingBeamPath}
                            className="SampleVisualBeamInGlow"
                        />
                        <path 
                            d={SampleVisualIncomingBeamPath}
                            className="SampleVisualBeamInRibbon"
                        />
                        <path 
                            d={SampleVisualIncomingBeamPath}
                            className="SampleVisualBeamInCore"
                        />
                    </g>

                    {/* Central Sample Response */}
                    <g className="SampleVisualSampleLayer">
                        <ellipse 
                            className="SampleVisualSampleHalo"
                            cx={CENTER.x}
                            cy={CENTER.y}
                            rx="74"
                            ry="88"
                        />
                        <ellipse 
                            className="SampleVisualSampleCore"
                            cx={CENTER.x}
                            cy={CENTER.y}
                            rx="38"
                            ry="50"
                        />

                        <ellipse 
                            className="SampleVisualSampleVein"
                            cx={CENTER.x}
                            cy={CENTER.y}
                            rx="19"
                            ry="26"
                        />

                        {/* draw the response rings around sample */}
                        {SampleVisualRipples.map((ripple) => (
                            <ellipse 
                                key={ripple.key}
                                className="SampleVisualRipple"
                                cx={ripple.cx}
                                cy={ripple.cy}
                                rx={ripple.rx}
                                ry={ripple.ry}
                                style={{ animationDelay: ripple.delay }}
                            />
                        ))}

                        {/* draw small shimmer/spark lines around the sample */}
                        {SampleVisualSparks.map((spark) => (
                            <line 
                                key={spark.key}
                                className="SampleVisualSpark"
                                x1={spark.x1}
                                y1={spark.y1}
                                x2={spark.x2}
                                y2={spark.y2}
                                style={{ animationDelay: spark.delay }}
                            />
                        ))}

                        {/* draws small floating trace particles inside or near sample */}
                        {SampleVisualTraces.map((trace) => (
                            <circle 
                                key={trace.key}
                                className="SampleVisualTraceParticle"
                                cx={trace.cx}
                                cy={trace.cy}
                                r={trace.r}
                                style={{ animationDelay : trace.delay }}
                            />
                        ))}
                    </g>

                    {/* faint changed outgoing signal */}
                    <g className="SampleVisualOutgoingLayer">
                        <path
                            d={SampleVisualOutgoingBeamPath}
                            className="SampleVisualBeamOutGlow"
                        />
                        <path 
                            d={SampleVisualOutgoingBeamPath}
                            className="SampleVisualBeamOutCore"
                        />
                    </g>

                    {/* subtle baseline / instrument axis feel */}
                    <g className="SampleVisualFrameLayer">
                        <line
                            className="SampleVisualBaseLine"
                            x1="68"
                            y1={CENTER.y}
                            x2="650"
                            y2={CENTER.y}
                        />

                        <line 
                            className="SampleVisualFocusLine"
                            x1={CENTER.x}
                            y1="86"
                            x2={CENTER.x}
                            y2="330"
                        />
                    </g>
                    
                    {/* text support labels */}
                    <g className="SampleVisualLabelLayer" aria-hidden="true">
                        <text
                            x="112"
                            y={CENTER.y - 16}
                            className="SampleVisualLabel SampleVisualLabel--in"
                        >
                            energy in
                        </text>

                        <text
                            x={CENTER.x}
                            y={CENTER.y - 78}
                            textAnchor="middle"
                            className="SampleVisualLabel SampleVisualLabel--sample"
                        >
                            sample
                        </text>

                        <text
                            x="612"
                            y={CENTER.y - 16}
                            textAnchor="end"
                            className="SampleVisualLabel SampleVisualLabel--out"
                        >
                            changed signal
                        </text>
                    </g>

                </svg>
            </div>
        </div>
    )
}
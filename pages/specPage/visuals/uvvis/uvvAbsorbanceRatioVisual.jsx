import './uvvAbsorbanceRatioVisual.css'
import { useId } from "react";

const VIEWBOX = {
    width: 720,
    height: 330,
};

const DESCRIPTION = 
    "In double-beam UV–Vis spectroscopy, transmitted intensities from the sample and reference channels are compared to remove background optical losses and source variation. Absorbance is obtained from the logarithmic ratio of these corrected transmission signals.";

const CELL = {
    x: 200,
    width: 74,
    height: 65,
    rx: 10,

    fluidX: 212,
    fluidWidth: 50,
    fluidHeight: 48,
    fluidRx: 6,

    centerX: 237,
};

const SAMPLE_PARTICLES = [
    [218, 203],
    [252, 203],
    [228, 222],
    [244, 214],
    [256, 224],
];


const CHANNELS = [
    {
        id: "reference",
        y: 112,
        label: "reference",
        sublabel: "solvent + cuvette",
        beamClass: "UVVAbsRatioVisual_ReferenceBeam",
        outputClass: "UVVAbsRatioVisual_ReferenceOutput",
        particles: [],
    },
    {
        id: "sample",
        y: 212,
        label: "sample",
        sublabel: "analyte + background",
        beamClass: "UVVAbsRatioVisual_SampleBeam",
        outputClass: "UVVAbsRatioVisual_SampleOutput",
    },
];

function TechnicalLabel({ x, y, children, className = "" }) {
    return (
        <text x={x} y={y} className={`UVVAbsRatioVisual_Label ${className}`}>
            {children}
        </text>
    );
}

function CellShell({ y, hardwareGradId }) {
    return (
        <rect
            x={CELL.x}
            y={y - 32}
            width={CELL.width}
            height={CELL.height}
            rx={CELL.rx}
            fill={`url(#${hardwareGradId})`}
            className="UVVAbsRatioVisual_CellShell"
        />
    );
}

function ReferenceCuvette({ y, hardwareGradId }) {
    return (
        <g className="UVVAbsRatioVisual_CellGroup UVVAbsRatioVisual_reference">
            <CellShell y={y} hardwareGradId={hardwareGradId} />

            <rect
                x={CELL.fluidX}
                y={y - 23}
                width={CELL.fluidWidth}
                height={CELL.fluidHeight}
                rx={CELL.fluidRx}
                className="UVVAbsRatioVisual_CellFluid UVVAbsRatioVisual_ReferenceFluid"
            />

            <TechnicalLabel
                x={CELL.centerX + 1}
                y={y - 55}
                className="UVVAbsRatioVisual_CellTitle"
            >
                reference
            </TechnicalLabel>

            <TechnicalLabel
                x={CELL.centerX}
                y={y -40}
                className="UVVAbsRatioVisual_CellSubLabel"
            >
                solvent
            </TechnicalLabel>
        </g>
    );
}

function SampleCuvette({ y, hardwareGradId }) {
    return (
        <g className="UVVAbsRatioVisual_CellGroup UVVAbsRatioVisual_sample">
            <CellShell y={y} hardwareGradId={hardwareGradId} />

            <rect
                x={CELL.fluidX}
                y={y - 23}
                width={CELL.fluidWidth}
                height={CELL.fluidHeight}
                rx={CELL.fluidRx}
                className="UVVAbsRatioVisual_CellFluid UVVAbsRatioVisual_SampleFluid"
            />

            {SAMPLE_PARTICLES.map(([cx, cy], index) => (
                <circle
                    key={`sample-particle-${index}`}
                    cx={cx}
                    cy={cy}
                    r="3.5"
                    className="UVVAbsRatioVisual_AnalyteDot"
                />
            ))}

            <TechnicalLabel
                x={CELL.centerX}
                y={y + 58}
                className="UVVAbsRatioVisual_CellTitle"
            >
                sample
            </TechnicalLabel>

            <TechnicalLabel
                x={CELL.centerX + 2}
                y={y + 75}
                className="UVVAbsRatioVisual_CellSubLabel"
            >
                analyte + solvent
            </TechnicalLabel>
        </g>
    );
}

function CuvetteSystem({ hardwareGradId }) {
    return (
        <g className="UVVAbsRatioVisual_CuvetteSystem">
            <ReferenceCuvette y={112} hardwareGradId={hardwareGradId} />
            <SampleCuvette y={212} hardwareGradId={hardwareGradId} />
        </g>
    );
}
 
function BeamPath({ d, className = "" }) {
    return <path d={d} className={`UVVAbsRatioVisual_Beam ${className}`} />;
}

function ParallelBeamLayer({ channels }) {
    return (
        <g className="UVVAbsRatioVisual_ParallelBeamLayer">
            {channels.map((channel) => {
                const beamClass =
                    channel.id === "reference"
                        ? "UVVAbsRatioVisual_ParallelBeamReference"
                        : "UVVAbsRatioVisual_ParallelBeamSample";

                return (
                    <g key={`parallel-${channel.id}`}>
                        <BeamPath
                            d={`M 237 ${channel.y} H 522`}
                            className={`UVVAbsRatioVisual_ParallelBeam ${beamClass}`}
                        />
                        <BeamPath
                            d={`M 237 ${channel.y} H 522`}
                            className={`UVVAbsRatioVisual_ParallelBeam ${beamClass}`}
                        />
                    </g>
                );
            })}
        </g>
    );
}

const TRACE = {
    x: 580,
    y: 130,
    scaleX: 0.235,
    scaleY: 0.198,
};

function RatioReadout({ hardwareGradId }) {
    const PLOT = {
        panelX: 545,
        panelY: 90,
        panelW: 146,
        panelH: 146,

        axisLeft: 565,
        axisRight: 672,
        axisTop: 102,
        axisBottom: 214,

        xCenter: 618.5,
        yCenter: 158,
    };
    return (
        <g className="UVVAbsRatioVisual_RatioReadout">
            <rect
                x="530"
                y="71"
                width="180"
                height="180"
                rx="24"
                fill={`url(#${hardwareGradId})`}
                className="UVVAbsRatioVisual_ReadoutShell"
            />
            <rect 
                x={PLOT.panelX}
                y={PLOT.panelY}
                width={PLOT.panelW}
                height={PLOT.panelH}
                rx="12"
                className="UVVAbsRatioVisual_PlotPanel"
            />

            <line 
                x1={PLOT.axisLeft}
                y1={PLOT.axisBottom}
                x2={PLOT.axisRight}
                y2={PLOT.axisBottom}
                className="UVVAbsRatioVisual_Axis"
            />

            <line 
                x1={PLOT.axisLeft}
                y1={PLOT.axisBottom}
                x2={PLOT.axisLeft}
                y2={PLOT.axisTop}
                className="UVVAbsRatioVisual_Axis"
            />

            <text
                x={PLOT.axisLeft - 2}
                y={PLOT.yCenter - 5}
                transform={`rotate(-90 ${PLOT.axisLeft - 4} ${PLOT.yCenter})`}
                className="UVVAbsRatioVisual_AxisLabel"
            >
                Absorbance
            </text>

            <text
                x={PLOT.xCenter}
                y={PLOT.axisBottom + 10}
                className="UVVAbsRatioVisual_AxisLabel"
            >
                Wavelength
            </text>

            <line
                x1="548"
                y1="112"
                x2="632"
                y2="112"
                pathLength="100"
                className="UVVAbsRatioVisual_RefBar"
            />

            <line
                x1="548"
                y1="212"
                x2="606"
                y2="212"
                pathLength="100"
                className="UVVAbsRatioVisual_SampleBar"
            />
            <g
                className="UVVAbsRatioVisual_TraceGroup"
                transform={`translate(${TRACE.x} ${TRACE.y}) scale(${TRACE.scaleX} ${TRACE.scaleY})`}
            >
                <path
                    d="M0.5 0V28L4.5 69V107L7 138.5L9 156.5L12.5 163.5L18 160.5L23.5 156.5L27.5 154.5L32 138.5L38 127.5L43.5 140.5L48 173.5L52.5 216L55.5 256L61.5 307L66 332L74.5 355L79 362H85L90 367.5L95 363.5L99 367.5L110 355L113.5 357.5L125.5 336.5L136 310L143.5 282L154 253.5L160.5 243H164L166 240.5L170 243L175 256L182 282L188 310L194.5 336.5L202 357.5L209.5 367.5L217.5 369H225L237.5 371.5L251 374L280.5 379.5L314.5 385L342.5 392L382.5 394.5H409.5"
                    pathLength="100"
                    vectorEffect="non-scaling-stroke"
                    className="UVVAbsRatioVisual_MiniTrace"
                />
            </g>
            <TechnicalLabel x="622" y="270" className="UVVAbsRatioVisual_ReadoutLabel1">
                readout
            </TechnicalLabel>

            <TechnicalLabel x="622" y="285" className="UVVAbsRatioVisual_ReadoutLabel">
                corrected absorbance
            </TechnicalLabel>
        </g>
    );
}

export default function UVVAbsRatioVisual() {
    const uid = useId().replace(/:/g, "");
    const beamGradId = `UVVAbsRatioVisual_beamGrad_${uid}`;
    const hardwareGradId = `UVVAbsRatioVisual_hardwareGrad_${uid}`;
    const glowId = `UVVAbsRatioVisual_softGlow_${uid}`;

    return (
        <figure className="UVVAbsRatioVisual_Shell">
            <svg
                className="UVVAbsRatioVisual_SVG"
                viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                role="img"
            >

                <defs>
                    <linearGradient
                        id={beamGradId}
                        x1="70"
                        y1="154"
                        x2="655"
                        y2="154"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="var(--c-glow-1)" />
                        <stop offset="52%" stopColor="var(--c-glow-2)" />
                        <stop offset="100%" stopColor="var(--c-glow-3)" />
                    </linearGradient>

                    <linearGradient
                        id={hardwareGradId}
                        x1="250"
                        y1="70"
                        x2="665"
                        y2="240"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="var(--c-metal-1)" />
                        <stop offset="48%" stopColor="var(--c-metal-2)" />
                        <stop offset="100%" stopColor="var(--c-metal-3)" />
                    </linearGradient>

                    <filter id={glowId} x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                    </filter>
                </defs>

                <rect
                    x="-8" 
                    y="-5" 
                    width="736" 
                    height="324" 
                    rx="28" 
                    className="UVVAbsRatioVisual_Backplate" 
                />
                <path d="M 44 28 H 676 M 44 296 H 676" className="UVVAbsRatioVisual_ChamberLine" />

                <g
                    className="UVVAbsRatioVisual_BeamNetwork"
                    style={{ "--beam-grad": `url(#${beamGradId})`, "--soft-glow": `url(#${glowId})` }}
                    // transform="translate(-89)"
                >

                    <path
                        d="M 70 130 L 94 154 L 70 178 L 46 154 Z"
                        fill={`url(#${hardwareGradId})`}
                        className="UVVAbsRatioVisual_BeamSplitter"
                    />
                    <BeamPath d="M 2 154 H 46" className="UVVAbsRatioVisual_InputBeam" />

                    <BeamPath d="M 94 154 C 114 154, 118 112, 146 112 H 235" />
                    <BeamPath d="M 94 154 C 114 154, 118 212, 146 212 H 235" />
                </g>


                <TechnicalLabel x="72" y="195" className="UVVAbsRatioVisual_SplitterLabel">
                    <tspan x="72" dy="0">beam</tspan>
                    <tspan x="72" dy="1.15em">splitter</tspan>
                </TechnicalLabel>

                <CuvetteSystem hardwareGradId={hardwareGradId} />

                <ParallelBeamLayer channels={CHANNELS} />


                <RatioReadout hardwareGradId={hardwareGradId} />

                <TechnicalLabel x="351" y="96" className="UVVAbsRatioVisual_IntensityLabel">
                    Iₜ, ᵣ stronger
                </TechnicalLabel>

                <TechnicalLabel x="351" y="231" className="UVVAbsRatioVisual_IntensityLabel">
                    Iₜ ₛ attenuated
                </TechnicalLabel>
            </svg>

            <figcaption className="UVVAbsRatioVisual_Caption">
                {DESCRIPTION}
            </figcaption>
        </figure>
    );
}
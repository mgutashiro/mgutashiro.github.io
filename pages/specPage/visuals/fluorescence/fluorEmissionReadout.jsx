import './fluorEmissionReadout.css';
import { useId } from "react";

const VIEWBOX = "0 0 820 850";

const PANEL = {
    x: 10,
    y: 0,
    width: 800,
    height: 820,
    rx: 26,
};

const FRAME = {
    x: 20,
    y: 10,
    width: 780,
    height: 800,
    rx: 26,
};

const PANEL_CENTER_X = PANEL.x + PANEL.width / 2;

const SOURCE_RAYS = [
    [45, 43, 45, 14],
    [45, 43, 45, 72],
    [45, 43, 17, 43],
    [45, 43, 73, 43],
    [45, 43, 25, 23],
    [45, 43, 65, 23],
    [45, 43, 25, 63],
    [45, 43, 65, 63],
];


function makeIds(uid) {
    return {
        cyanBeam: `fluorEmReadout-cyan-${uid}`,
        pinkBeam: `fluorEmReadout-pink-${uid}`,
        sampleGlow: `fluorEmReadout-sample-${uid}`,
        softGlow: `fluorEmReadout-glow-${uid}`,
        discriminatorRainbow: `fluorEmReadout-discriminator-${uid}`,
    };
}

function BackgroundLayer({ uid }) {
    return (
        <>
            <defs>
                <clipPath id={`${uid}-clip`}>
                    <rect
                        x={PANEL.x}
                        y={PANEL.y}
                        width={PANEL.width}
                        height={PANEL.height}
                        rx={PANEL.rx}
                    />
                </clipPath>
            </defs>

            <g clipPath={`url(#${uid}-clip)`}>
                <rect
                    x={PANEL.x}
                    y={PANEL.y}
                    width={PANEL.width}
                    height={PANEL.height}
                    rx={PANEL.rx}
                    className="fluorEmReadout_Backdrop"
                />

                <path
                    d="M-10 165
                    C130 85, 290 65, 430 120
                    S670 305, 810 245"
                    className="fluorEmReadout_BackgroundWash fluorEmReadout_BackgroundWash--top"
                />

                <path
                    d="M-20 350
                    C120 285, 285 275, 435 325
                    S665 470, 820 420"
                    className="fluorEmReadout_BackgroundWash fluorEmReadout_BackgroundWash--mid"
                />

                <path
                    d="M-10 555
                    C150 470, 335 470, 500 540
                    S700 720, 820 660"
                    className="fluorEmReadout_BackgroundWash fluorEmReadout_BackgroundWash--low"
                />
                <path
                    d="M-20 730
                       C130 665, 320 665, 500 720
                       S700 860, 820 800"
                    className="fluorEmReadout_BackgroundWash fluorEmReadout_BackgroundWash--bottom"
                />
            </g>

            <g className="fluorEmReadout_Frame">
                <rect
                    x={FRAME.x}
                    y={FRAME.y}
                    width={FRAME.width}
                    height={FRAME.height}
                    rx={FRAME.rx}
                />
                <path d="M60 105 H760 M60 426 H760" />
            </g>
        </>
    );
}

function FluorEmissionReadoutDefs({ ids }) {
    return (
        <defs>
            <linearGradient id={ids.cyanBeam} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0" />
                <stop offset="45%" stopColor="var(--accent-2)" stopOpacity="0.9" />
                <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.35" />
            </linearGradient>

            <linearGradient id={ids.pinkBeam} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-3)" stopOpacity="0.25" />
                <stop offset="55%" stopColor="var(--accent-3)" stopOpacity="0.95" />
                <stop offset="100%" stopColor="var(--accent-3)" stopOpacity="0.55" />
            </linearGradient>

            <radialGradient id={ids.sampleGlow} cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="var(--accent-3)" stopOpacity="0.95" />
                <stop offset="48%" stopColor="var(--accent)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>

            <linearGradient id={ids.discriminatorRainbow} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0.9" />
                <stop offset="24%" stopColor="var(--accent)" stopOpacity="0.86" />
                <stop offset="48%" stopColor="var(--accent-3)" stopOpacity="0.88" />
                <stop offset="72%" stopColor="var(--lightMetal)" stopOpacity="0.78" />
                <stop offset="100%" stopColor="var(--accent-4)" stopOpacity="0.82" />
            </linearGradient>

            <filter id={ids.softGlow} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    );
}

function SvgLabel({ x, y, lines, className = "", anchor = "middle" }) {
    const textLines = Array.isArray(lines) ? lines : [lines];

    return (
        <text
            x={x}
            y={y}
            textAnchor={anchor}
            className={`fluorEmReadout_Label ${className}`}
        >
            {textLines.map((line, index) => (
                <tspan key={line} x={x} dy={index === 0 ? 0 : "1.15em"}>
                {line}
                </tspan>
            ))}
        </text>
    );
}

const SOURCE_ICON_CX = 45;
const SOURCE_ICON_CY = 43;
const SOURCE_SCALE = 2.7;

function SourceIcon() {
    return (
        <g transform="translate(100 180)">
            <rect
                x={SOURCE_ICON_CX - 90}
                y={SOURCE_ICON_CY - 90}
                width="180"
                height="180"
                rx="16"
                className="fluorEmReadout_UnitShell fluorEmReadout_SourceUnit"
            />

            <g
                className="fluorEmReadout_SourceIcon"
                transform={`
                    translate(${SOURCE_ICON_CX} ${SOURCE_ICON_CY})
                    scale(${SOURCE_SCALE})
                    translate(${-SOURCE_ICON_CX} ${-SOURCE_ICON_CY})
                `}
            >
                {SOURCE_RAYS.map(([x1, y1, x2, y2], index) => (
                    <line
                        key={`source-ray-${index}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        className="fluorEmReadout_SourceRay"
                    />
                ))}

                <circle
                    cx={SOURCE_ICON_CX}
                    cy={SOURCE_ICON_CY}
                    r="19"
                    className="fluorEmReadout_SourceHalo"
                />
                <circle
                    cx={SOURCE_ICON_CX}
                    cy={SOURCE_ICON_CY}
                    r="11"
                    className="fluorEmReadout_SourceCore"
                />
            </g>
            <SvgLabel
                x={SOURCE_ICON_CX}
                y={SOURCE_ICON_CY + 114}
                lines="source"
                className="fluorEmReadout_UnitLabel"
            />
        </g>
    );
}

function SampleChamber({ glowId }) {
    return (
        <g transform="translate(354 167)">
            <rect
                x={56 - 90}
                y={56 - 90}
                width="180"
                height="180"
                rx="16"
                className="fluorEmReadout_UnitShell fluorEmReadout_SampleUnit"
            />
            <g 
                className="fluorEmReadout_SampleIcon"
                transform={`
                    translate(56 56)
                    scale(1.6)
                    translate(-56 -56)
                `}
            >
                <rect
                    x="30"
                    y="10"
                    width="52"
                    height="92"
                    rx="16"
                    className="fluorEmReadout_Cuvette"
                />

                <ellipse
                    cx="56"
                    cy="56"
                    rx="48"
                    ry="38"
                    fill={`url(#${glowId})`}
                    className="fluorEmReadout_SampleGlow"
                />

                <path
                    d="M36 24 C46 32 66 32 76 24
                    M36 88 C46 80 66 80 76 88"
                    className="fluorEmReadout_CuvetteMeniscus"
                />
            </g>
            <SvgLabel
                x="56"
                y={56 + 114}
                lines="sample"
                className="fluorEmReadout_UnitLabel"
            />
        </g>
    );
}

function Discriminator({ gradientId }) {
    return (
        <g transform={`translate(${PANEL_CENTER_X - 56} 400)`}>
            <rect
                x={56 - 90}
                y={56 - 70}
                width="180"
                height="140"
                rx="16"
                className="fluorEmReadout_UnitShell fluorEmReadout_DiscriminatorUnit"
            />

            <ellipse
                cx="56"
                cy="56"
                rx="60"
                ry="10"
                fill={`url(#${gradientId})`}
                className="fluorEmReadout_DiscriminatorEllipse"
            />

            <SvgLabel
                x="56"
                y="150"
                lines="discriminator"
                className="fluorEmReadout_UnitLabel"
            />
        </g>
    );
}

function Detector() {
    return (
        <g transform={`translate(${PANEL_CENTER_X - 50} 600)`}>
            {/* PMT */}
            <g className="fluorEmReadout_DetectorPMT">
                <rect
                    x="-30"
                    y="0"
                    width="160"
                    height="160"
                    rx="16"
                    className="fluorEmReadout_UnitShell"
                />

                {[
                    [-6, 24], [36, 24], [78, 24],
                    [-6, 66], [36, 66], [78, 66],
                    [-6, 108], [36, 108], [78, 108],
                ].map(([x, y], index) => (
                    <rect
                        key={index}
                        x={x}
                        y={y}
                        width="28"
                        height="28"
                        rx="6"
                        className="fluorEmReadout_DetectorBody"
                    />
                ))}

                <SvgLabel
                    x="56"
                    y="190"
                    lines="detector"
                    className="fluorEmReadout_UnitLabel"
                />
            </g>

            {/* detector PC */}
            <g className="fluorEmReadout_DetectorPC" >
                <g transform="scale(0.17 0.16) translate(1200 50)">
                    <path 
                        d="M0.5 791V0.5H1178.5V791H673.5L685 937.5H866V979.5H307.5V937.5H496L506 791H0.5Z"
                        className="fluorEmReadout_DetectorPCBase"
                    />

                    <rect
                        x="78"
                        y="70"
                        width="1022"
                        height="655"
                        rx="22"
                        className="fluorEmReadout_DetectorPCScreen"
                    />

                    <g clipPath="url(#detectorPCScreenClip)">
                        <path
                            d="M0.277344 230.16L4.77734 233.16L8.77734 230.16L22.7773 272.16L31.2773 268.16L44.7773 175.16L57.2773 321.16L60.2773 328.16L64.7773 331.16L69.7773 326.66L74.7773 319.16L79.2773 310.66L83.2773 304.16L85.2773 302.16L88.2773 304.16L92.2773 313.16L95.7773 322.16L100.277 332.16L107.777 340.66L111.277 343.16H117.277L126.277 347.16L137.277 350.66L147.277 349.16L158.277 345.66L166.777 341.66L172.777 339.66L178.777 338.16L190.777 329.16L202.277 319.66L211.277 312.16L220.777 304.16L229.777 299.66L240.777 293.66L249.777 288.66L256.777 282.66L262.777 275.66L269.277 262.66L274.777 244.66L280.277 224.16L285.277 203.66L289.277 183.66L295.277 159.16L298.777 146.16L302.777 129.66L305.777 115.66L308.277 99.1602L310.777 79.1602L313.777 51.1602L316.277 33.1602L318.277 20.1602L320.777 9.66022L322.777 3.66022L325.777 0.660217L329.777 3.66022L331.777 9.66022L333.777 20.1602L335.777 34.1602L337.277 47.6602L338.277 69.6602L338.777 86.1602L339.777 100.66L340.277 114.66L340.777 127.66L341.777 145.66L342.777 162.16L343.277 176.16L343.777 190.16L344.277 201.66L345.277 214.66V230.16L346.777 251.66L348.277 269.16L349.277 289.66L351.277 307.66L352.777 320.16L354.777 332.66L357.277 342.16L362.777 350.66L370.277 355.66L380.277 357.16H392.777H409.277"
                            className="fluorEmReadout_DetectorPCTrace"
                            transform="translate(200 145) scale(1.5)"
                            pathLength="100"
                        />
                    </g>
                </g>
                <SvgLabel
                    x="307"
                    y="190"
                    lines="readout"
                    className="fluorEmReadout_UnitLabel"
                />
            </g>
        </g>
    );
}

function TraceLine() {
    return (
        <g className="fluorEmReadout_TraceLine" aria-hidden="true">
            {/* SOURCE -> SAMPLE */}
            <g className="fluorEmReadout_TraceSegment fluorEmReadout_TraceSegment--1">
                <path
                    d="M235 223 H320"
                    pathLength="100"
                    className="fluorEmReadout_TraceBase"
                />
                <path
                    d="M235 223 H320"
                    pathLength="100"
                    className="fluorEmReadout_TracePulse"
                />
            </g>

            {/* SAMPLE -> DISCRIMINATOR */}
            <g className="fluorEmReadout_TraceSegment fluorEmReadout_TraceSegment--2">
                <path
                    d="M410 345 V416"
                    pathLength="100"
                    className="fluorEmReadout_TraceBase"
                />
                <path
                    d="M410 345 V416"
                    pathLength="100"
                    className="fluorEmReadout_TracePulse"
                />
            </g>

            {/* DISCRIMINATOR -> DETECTOR */}
            <g className="fluorEmReadout_TraceSegment fluorEmReadout_TraceSegment--3">
                <path
                    d="M410 557 V598"
                    pathLength="100"
                    className="fluorEmReadout_TraceBase"
                />
                <path
                    d="M410 557 V598"
                    pathLength="100"
                    className="fluorEmReadout_TracePulse"
                />
            </g>

            {/* DETECTOR -> READOUT */}
            <g className="fluorEmReadout_TraceSegment fluorEmReadout_TraceSegment--4">
                <path
                    d="M490 680 H575"
                    pathLength="100"
                    className="fluorEmReadout_TraceBase"
                />
                <path
                    d="M490 680 H575"
                    pathLength="100"
                    className="fluorEmReadout_TracePulse"
                />
            </g>
        </g>
    );
}

export default function FluorEmReadoutVisual() {
    const uid = useId().replace(/:/g, "");
    const ids = makeIds(uid);

    return (
        <figure className="fluorEmReadout">
            <svg
                className="fluorEmReadout_SVG"
                viewBox={VIEWBOX}
                role="img"
            >   
                <FluorEmissionReadoutDefs ids={ids} />
                <BackgroundLayer uid={uid} />
                <SvgLabel
                    x={PANEL_CENTER_X}
                    y="85"
                    lines="steady-state"
                    anchor="middle"
                    className="fluorEmReadout_PathTitle fluorEmReadout_PathTitle_pink"
                />
                <SvgLabel
                    x={PANEL_CENTER_X}
                    y="50"
                    lines="basic experimental fluorescence setup"
                    anchor="middle"
                    className="fluorEmReadout_PathTitle fluorEmReadout_PathTitle_cyan"
                />

                <TraceLine />
                <SourceIcon />
                <SampleChamber glowId={ids.sampleGlow} />
                <Discriminator gradientId={ids.discriminatorRainbow} />
                <Detector />
            </svg>

            <figcaption className="fluorEmReadout_Caption">
                In a steady-state fluorescence setup, a continuous light source is filtered into an excitation wavelength, directed into the sample, and the emitted light is collected through a separate optical path. 
                The emission channel selects which wavelengths reach the photomultiplier tube, allowing the instrument to measure fluorescence intensity as a function of wavelength while reducing stray excitation light.
            </figcaption>
        </figure>
    );
}
import { useId } from "react";

const VIEWBOX = "0 0 820 480";

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

const BROAD_BEAMS = [
    "M142 203 C160 195 174 192 190 196",
    "M142 223 H190",
    "M142 243 C160 251 174 254 190 250",
];

const GRATING_LINES = [
    "M42 24 L66 82",
    "M54 24 L78 82",
    "M66 24 L90 82",
];

const MICRO_LABELS = [
    { x: 255, y: 306, lines: ["slit", "width"] },
    { x: 446, y: 144, lines: ["90°", "collection"] },
    { x: 560, y: 302, lines: ["emission", "bandpass"] },
    { x: 740, y: 300, lines: ["response", "correction"] },
];

function makeIds(uid) {
    return {
        cyanBeam: `fluorEmReadout-cyan-${uid}`,
        pinkBeam: `fluorEmReadout-pink-${uid}`,
        sampleGlow: `fluorEmReadout-sample-${uid}`,
        softGlow: `fluorEmReadout-glow-${uid}`,
    };
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

function InstrumentUnit({ x, y, w, h, title, className = "", children }) {
    return (
        <g
            className={`fluorEmReadout_Unit ${className}`}
            transform={`translate(${x} ${y})`}
        >
            <rect
                className="fluorEmReadout_UnitHalo"
                x="-5"
                y="-5"
                width={w + 10}
                height={h + 10}
                rx="18"
            />
            <rect
                className="fluorEmReadout_UnitShell"
                width={w}
                height={h}
                rx="16"
            />
            {children}
            <SvgLabel
                x={w / 2}
                y={h + 24}
                lines={title}
                className="fluorEmReadout_UnitLabel"
            />
        </g>
    );
}

function SourceIcon() {
    return (
        <g className="fluorEmReadout_SourceIcon">
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

            <circle cx="45" cy="43" r="19" className="fluorEmReadout_SourceHalo" />
            <circle cx="45" cy="43" r="9" className="fluorEmReadout_SourceCore" />
        </g>
    );
}

function MonochromatorIcon({ mode = "excitation" }) {
    return (
        <g className={`fluorEmReadout_MonoIcon fluorEmReadout_MonoIcon_${mode}`}>
            <rect x="18" y="30" width="12" height="46" rx="4" className="fluorEmReadout_Slit" />
            <rect x="100" y="30" width="12" height="46" rx="4" className="fluorEmReadout_Slit" />

            {GRATING_LINES.map((d) => (
                <path key={d} d={d} className="fluorEmReadout_GratingLine" />
            ))}

            <path
                d="M30 53 C48 38 72 38 100 53"
                className="fluorEmReadout_InternalOptic"
            />
            <path
                d="M30 55 C50 70 72 70 100 55"
                className="fluorEmReadout_InternalOptic fluorEmReadout_InternalOptic_dim"
            />
        </g>
    );
}

function SampleChamber({ glowId }) {
    return (
        <g className="fluorEmReadout_SampleIcon">
            <rect x="38" y="18" width="36" height="68" rx="12" className="fluorEmReadout_Cuvette" />
            <ellipse
                cx="56"
                cy="52"
                rx="36"
                ry="29"
                fill={`url(#${glowId})`}
                className="fluorEmReadout_SampleGlow"
            />
            <path
                d="M42 28 C51 35 62 35 71 28 M42 76 C51 69 62 69 71 76"
                className="fluorEmReadout_CuvetteMeniscus"
            />
        </g>
    );
}

function PMTIcon() {
    return (
        <g className="fluorEmReadout_PMTIcon">
            <rect x="12" y="16" width="48" height="52" rx="12" className="fluorEmReadout_PMTFace" />
            <circle cx="36" cy="42" r="15" className="fluorEmReadout_PMTSensor" />
            <circle cx="36" cy="42" r="26" className="fluorEmReadout_DetectorPulse" />
            <path
                d="M17 22 H55 M17 62 H55"
                className="fluorEmReadout_PMTDetail"
            />
        </g>
    );
}

function ReadoutTrace() {
    return (
        <g className="fluorEmReadout_ReadoutTrace">
            <rect x="0" y="0" width="78" height="92" rx="14" className="fluorEmReadout_ReadoutPanel" />

            <path d="M15 68 H65 M15 18 V68" className="fluorEmReadout_ReadoutAxis" />

            <path
                d="M17 60 C25 57 30 47 36 35 C42 24 51 28 56 42 C60 52 63 58 66 60"
                className="fluorEmReadout_ReadoutSignal"
            />

            <circle cx="48" cy="34" r="4" className="fluorEmReadout_ReadoutPeak" />

            <SvgLabel
                x={39}
                y={82}
                lines="readout"
                className="fluorEmReadout_ReadoutLabel"
            />
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
                aria-labelledby={`${uid}-title ${uid}-desc`}
            >

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

                    <filter id={ids.softGlow} x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <rect className="fluorEmReadout_Backdrop" width="820" height="480" rx="28" />
                <path
                    d="M52 124 C190 42 410 70 548 138 C650 188 728 168 784 124"
                    className="fluorEmReadout_BackgroundWash"
                />

                <g className="fluorEmReadout_Frame">
                    <rect x="30" y="34" width="760" height="392" rx="26" />
                    <path d="M60 105 H760 M60 426 H760" />
                </g>

                <SvgLabel
                    x="70"
                    y="78"
                    lines="excitation path"
                    anchor="start"
                    className="fluorEmReadout_PathTitle fluorEmReadout_PathTitle_cyan"
                />
                <SvgLabel
                    x="410"
                    y="456"
                    lines="emission channel"
                    className="fluorEmReadout_PathTitle fluorEmReadout_PathTitle_pink"
                />

                {BROAD_BEAMS.map((d) => (
                    <path
                        key={d}
                        d={d}
                        className="fluorEmReadout_BroadBeam"
                        filter={`url(#${ids.softGlow})`}
                    />
                ))}

                <path
                    d="M320 223 H390"
                    className="fluorEmReadout_CyanBeam fluorEmReadout_CyanBeam_preSample"
                    stroke={`url(#${ids.cyanBeam})`}
                    filter={`url(#${ids.softGlow})`}
                />
                <path
                    d="M388 223 H502"
                    className="fluorEmReadout_CyanBeam fluorEmReadout_CyanBeam_sample"
                    stroke="var(--accent-2)"
                    filter={`url(#${ids.softGlow})`}
                />
                <path
                    d="M502 223 H585"
                    className="fluorEmReadout_StrayBeam"
                />

                <path
                    d="M446 252 V340"
                    className="fluorEmReadout_PinkBeam fluorEmReadout_PinkBeam_vertical"
                    stroke="var(--accent-3)"
                    filter={`url(#${ids.softGlow})`}
                />
                <path
                    d="M560 382 H610"
                    className="fluorEmReadout_PinkBeam fluorEmReadout_PinkBeam_filtered"
                    stroke={`url(#${ids.pinkBeam})`}
                    filter={`url(#${ids.softGlow})`}
                />
                <path
                    d="M685 382 H704"
                    className="fluorEmReadout_DetectorToReadout"
                />

                <InstrumentUnit
                    x="52"
                    y="180"
                    w="90"
                    h="86"
                    title="Xe lamp"
                    className="fluorEmReadout_SourceUnit"
                >
                    <SourceIcon />
                </InstrumentUnit>

                <InstrumentUnit
                    x="190"
                    y="170"
                    w="130"
                    h="106"
                    title="excitation monochromator"
                    className="fluorEmReadout_ExcitationUnit"
                >
                    <MonochromatorIcon mode="excitation" />
                </InstrumentUnit>

                <InstrumentUnit
                    x="390"
                    y="172"
                    w="112"
                    h="104"
                    title="sample chamber"
                    className="fluorEmReadout_SampleUnit"
                >
                    <SampleChamber glowId={ids.sampleGlow} />
                </InstrumentUnit>

                <InstrumentUnit
                    x="410"
                    y="340"
                    w="150"
                    h="84"
                    title="emission monochromator"
                    className="fluorEmReadout_EmissionUnit"
                >
                    <MonochromatorIcon mode="emission" />
                    </InstrumentUnit>

                    <InstrumentUnit
                        x="610"
                        y="340"
                        w="75"
                        h="84"
                        title="PMT"
                        className="fluorEmReadout_PMTUnit"
                    >
                    <PMTIcon />
                </InstrumentUnit>

                <g transform="translate(704 336)" className="fluorEmReadout_ReadoutUnit">
                    <ReadoutTrace />
                </g>

                <path
                    d="M506 195 C535 178 566 180 590 196"
                    className="fluorEmReadout_StrayRejectArc"
                />
                <SvgLabel
                    x="604"
                    y="188"
                    lines={["stray-light", "rejection"]}
                    anchor="start"
                    className="fluorEmReadout_MicroLabel"
                />

                {MICRO_LABELS.map(({ x, y, lines }) => (
                    <SvgLabel
                        key={`${x}-${y}`}
                        x={x}
                        y={y}
                        lines={lines}
                        className="fluorEmReadout_MicroLabel"
                    />
                ))}

                <g className="fluorEmReadout_FlowDots">
                    <circle cx="158" cy="223" r="3.2" className="fluorEmReadout_Dot fluorEmReadout_Dot_1" />
                    <circle cx="352" cy="223" r="3.2" className="fluorEmReadout_Dot fluorEmReadout_Dot_2" />
                    <circle cx="446" cy="288" r="3.2" className="fluorEmReadout_Dot fluorEmReadout_Dot_3" />
                    <circle cx="585" cy="382" r="3.2" className="fluorEmReadout_Dot fluorEmReadout_Dot_4" />
                    <circle cx="696" cy="382" r="3.2" className="fluorEmReadout_Dot fluorEmReadout_Dot_5" />
                </g>
            </svg>

            <figcaption className="fluorEmReadout_Caption">
                A spectrofluorometer prepares excitation light, isolates the emitted signal
                in a separate optical path, and converts wavelength-selected fluorescence
                into a detector response.
            </figcaption>
        </figure>
    );
}
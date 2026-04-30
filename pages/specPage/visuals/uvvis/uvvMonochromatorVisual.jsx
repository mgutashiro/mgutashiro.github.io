import './uvvMonochromatorVisual.css'
import { useId } from "react";

const VIEWBOX = {
    width: 720,
    height: 440,
};

const DESCRIPTION =
    "Within the monochromator, broadband optical radiation is angularly dispersed and filtered so that only a narrow spectral band reaches the sample. The selected bandpass reflects a practical compromise between wavelength resolution, radiant throughput, and stray-light control.";

const DIFFRACTION_GRATING_PATH =
    "M0.5 17.8907V41.3807L319.5 40.9757V2.09571L290.5 17.8907V2.09571L261.5 17.8907V2.09571L233 17.8907V2.09571L204.5 17.8907V0.880707L176 17.8907V0.880707L147 17.8907V0.880707L118 17.8907V0.880707L89 16.6757V0.880707L60.5 16.6757V0.880707L31.5 16.6757V0.880707L0.5 17.8907Z";

const GRATING_LAYOUT = {
    x: 293,
    y: 328,
    scaleX: 0.42,
    scaleY: 0.84,
};

function gratingX(value) {
    return GRATING_LAYOUT.x + value * GRATING_LAYOUT.scaleX;
}

function gratingY(value) {
    return GRATING_LAYOUT.y + value * GRATING_LAYOUT.scaleY;
}

const FOCUS_MIRROR = {
    cx: 520,
    cy: 58,
    leftX: 486,
    rightX: 554,
};

const EXIT_SLIT = {
    frameX: 534,
    frameY: 232,
    frameW: 94,
    frameH: 22,
    openingX: 554,
    openingY: 241,
    openingW: 52,
    openingH: 4,
    centerX: 580,
    centerY: 243,
    outX: 622,
};

const READOUT_BARS = [
    { id: "resolution", label: "resolution", value: "↑", width: 58 },
    { id: "throughput", label: "throughput", value: "↓", width: 34 },
    { id: "stray", label: "stray light", value: "↓", width: 42 },
];

function makeId(base, name) {
    return `${base}-${name}`;
}

function TechnicalLabel({ x, y, children, className = "", ...textProps }) {
    return (
        <text
            x={x}
            y={y}
            className={`UVVMonochromatorVisual_Label ${className}`}
            {...textProps}
        >
            {children}
        </text>
    );
}

function ChamberFrame({ panelGradId }) {
    return (
        <g className="UVVMonochromatorVisual_ChamberFrame">
            <rect
                x="14"
                y="-12"
                width="692"
                height="450"
                rx="28"
                fill={`url(#${panelGradId})`}
                className="UVVMonochromatorVisual_Backplate"
            />

            <path
                d="M 62 30 H 658 M 62 392 H 658"
                className="UVVMonochromatorVisual_ChamberLine"
            />

        </g>
    );
}

function BroadbandInput({ glowId }) {
    return (
        <g className="UVVMonochromatorVisual_BroadbandInput">

            {/* horizontal entrance slit at bottom-left */}
            <rect
                x="98"
                y="352"
                width="58"
                height="14"
                rx="6"
                className="UVVMonochromatorVisual_EntrySlit"
            />

            {/* beam leaving slit and folding upward into monochromator */}
            <path
                d="M 127 359 L 198 58"
                stroke="color-mix(in oklab, white 86%, var(--c-emo-2) 14%)"
                className="UVVMonochromatorVisual_FoldedBeam UVVMonochromatorVisual_WhiteBeam"
                filter={`url(#${glowId})`}

            />

            <path
                d="M 127 359 L 242 58"
                stroke="white"
                className="UVVMonochromatorVisual_FoldedBeam UVVMonochromatorVisual_WhiteBeam"
                filter={`url(#${glowId})`}
            />

            <TechnicalLabel x="85" y="308">
                <tspan x="55" dy="0">broadband</tspan>
                <tspan x="90" dy="1.15em">input</tspan>
            </TechnicalLabel>

            <TechnicalLabel
                x="80"
                y="382"
                className="UVVMonochromatorVisual_SmallLabel"
            >
                entrance slit
            </TechnicalLabel>
        </g>
    );
}

const DISPERSION_ORIGIN = {
    x: gratingX(88),
    y: gratingY(13.2653),
};

const DISPERSION_RAYS = [
    {
        id: "pink",
        color: "var(--c-glow-3)",
        startX: DISPERSION_ORIGIN.x,
        startY: DISPERSION_ORIGIN.y,
        mirrorX: 490,
        mirrorY: FOCUS_MIRROR.cy,
        slitX: 562,
        slitY: EXIT_SLIT.centerY,
    },
    {
        id: "lime",
        color: "var(--c-glow-4)",
        startX: DISPERSION_ORIGIN.x,
        startY: DISPERSION_ORIGIN.y,
        mirrorX: 498,
        mirrorY: FOCUS_MIRROR.cy,
        slitX: 580,
        slitY: EXIT_SLIT.centerY,
    },
    {
        id: "violet",
        color: "var(--c-glow-2)",
        startX: DISPERSION_ORIGIN.x,
        startY: DISPERSION_ORIGIN.y,
        mirrorX: 506,
        mirrorY: FOCUS_MIRROR.cy,
        slitX: 604,
        slitY: EXIT_SLIT.centerY,
    },
];

const DISPERSION_ORIGIN_RIGHT = {
    x: gratingX(262),
    y: gratingY(13.2653),
};

const DISPERSION_RAYS_RIGHT = [
    {
        id: "pink-right",
        color: "var(--c-glow-3)",
        startX: DISPERSION_ORIGIN_RIGHT.x,
        startY: DISPERSION_ORIGIN_RIGHT.y,
        mirrorX: 540,
        mirrorY: FOCUS_MIRROR.cy,
        slitX: 575,
        slitY: EXIT_SLIT.centerY,
    },
    {
        id: "lime-right",
        color: "var(--c-glow-4)",
        startX: DISPERSION_ORIGIN_RIGHT.x,
        startY: DISPERSION_ORIGIN_RIGHT.y,
        mirrorX: 548,
        mirrorY: FOCUS_MIRROR.cy,
        slitX: 583,
        slitY: EXIT_SLIT.centerY,
    },
    {
        id: "violet-right",
        color: "var(--c-glow-2)",
        startX: DISPERSION_ORIGIN_RIGHT.x,
        startY: DISPERSION_ORIGIN_RIGHT.y,
        mirrorX: 556,
        mirrorY: FOCUS_MIRROR.cy,
        slitX: 604,
        slitY: EXIT_SLIT.centerY,
    },
];

function makeBrokenRayPath(ray) {
    return `
        M ${ray.startX} ${ray.startY}
        L ${ray.mirrorX} ${ray.mirrorY}
        L ${ray.slitX} ${ray.slitY}
    `;
}

function MirrorAssembly({ metalGradId, glowId }) {
    return (
        <g className="UVVMonochromatorVisual_MirrorAssembly">
            {/* base mirror is horizontal; rotate() can be changed later easily */}
            <g transform="translate(220 58) rotate(0)">
                <rect
                    x="-42"
                    y="-7"
                    width="84"
                    height="14"
                    rx="6"
                    fill={`url(#${metalGradId})`}
                    className="UVVMonochromatorVisual_Mirror"
                />
                <line
                    x1="-35"
                    y1="0"
                    x2="35"
                    y2="0"
                    className="UVVMonochromatorVisual_MirrorShine"
                />
            </g>

            <path
                d={`M 198 58 L ${gratingX(88)} ${gratingY(13.2653)}`}
                stroke="white"
                className="UVVMonochromatorVisual_FoldedBeam UVVMonochromatorVisual_WhiteBeam"
                filter={`url(#${glowId})`}
            />

            <path
                d={`M 242 58 L ${gratingX(262)} ${gratingY(13.2653)}`}
                stroke="white"
                className="UVVMonochromatorVisual_FoldedBeam UVVMonochromatorVisual_WhiteBeam"
                filter={`url(#${glowId})`}
            />

            <TechnicalLabel
                x="154"
                y="44"
                className="UVVMonochromatorVisual_SmallLabel"
            >
                collimating mirror
            </TechnicalLabel>

            <g transform="translate(520 58) rotate(0)">
                <rect
                    x="-54"
                    y="-7"
                    width="108"
                    height="14"
                    rx="6"
                    fill={`url(#${metalGradId})`}
                    className="UVVMonochromatorVisual_Mirror"
                />
                <line
                    x1="-45"
                    y1="0"
                    x2="45"
                    y2="0"
                    className="UVVMonochromatorVisual_MirrorShine"
                />
            </g>

            <TechnicalLabel
                x="465"
                y="44"
                className="UVVMonochromatorVisual_SmallLabel"
            >
                focusing mirror
            </TechnicalLabel>
        </g>
    );
}

function GratingModule({ metalGradId }) {
    return (
        <g className="UVVMonochromatorVisual_GratingModule">
            {/* stage behind grating, lower and tighter */}
            <rect
                x="287"
                y="324"
                width="148"
                height="46"
                rx="16"
                className="UVVMonochromatorVisual_GratingStage"
            />

            {/* zigzag grating body */}
            <g
                transform={`translate(${GRATING_LAYOUT.x} ${GRATING_LAYOUT.y}) scale(${GRATING_LAYOUT.scaleX} ${GRATING_LAYOUT.scaleY})`}
            >
                <path
                    d={DIFFRACTION_GRATING_PATH}
                    fill={`url(#${metalGradId})`}
                    className="UVVMonochromatorVisual_GratingPath"
                />
            </g>

            <TechnicalLabel x="294" y="384" className="UVVMonochromatorVisual_SmallLabel">
                diffraction grating
            </TechnicalLabel>
        </g>
    );
}
function DispersedRays({ glowId }) {
    const allRays = [...DISPERSION_RAYS, ...DISPERSION_RAYS_RIGHT];

    return (
        <g className="UVVMonochromatorVisual_DispersedRays">
            {allRays.map((ray, index) => (
                <g key={ray.id}>
                    <path
                        d={makeBrokenRayPath(ray)}
                        className="UVVMonochromatorVisual_DispersionRay"
                        style={{
                            "--ray-color": ray.color,
                            "--ray-delay": `${index * 0.22}s`,
                        }}
                        filter={`url(#${glowId})`}
                    />

                    <circle
                        cx={ray.startX}
                        cy={ray.startY}
                        r="2.4"
                        className="UVVMonochromatorVisual_RayPoint"
                        style={{ "--ray-color": ray.color }}
                    />

                    <circle
                        cx={ray.mirrorX}
                        cy={ray.mirrorY}
                        r="2.4"
                        className="UVVMonochromatorVisual_RayPoint"
                        style={{ "--ray-color": ray.color }}
                    />

                    <circle
                        cx={ray.slitX}
                        cy={ray.slitY}
                        r="2.6"
                        className="UVVMonochromatorVisual_RayPoint"
                        style={{ "--ray-color": ray.color }}
                    />
                </g>
            ))}
        </g>
    );
}

function ExitSelection({ selectedGradId, glowId }) {
    return (
        <g className="UVVMonochromatorVisual_ExitSelection">
            {/* outer slit housing: now horizontal */}
            <rect
                x={EXIT_SLIT.frameX}
                y={EXIT_SLIT.frameY}
                width={EXIT_SLIT.frameW}
                height={EXIT_SLIT.frameH}
                rx="8"
                className="UVVMonochromatorVisual_ExitSlitFrame"
            />

            {/* slit opening: thin horizontal line */}
            <rect
                x={EXIT_SLIT.openingX}
                y={EXIT_SLIT.openingY}
                width={EXIT_SLIT.openingW}
                height={EXIT_SLIT.openingH}
                rx="2"
                className="UVVMonochromatorVisual_ExitSlitOpening"
            />

            {/* selected band continues to the right after the slit */}
            <path
                d={`M ${EXIT_SLIT.outX} ${EXIT_SLIT.centerY} H 650`}
                stroke={`url(#${selectedGradId})`}
                filter={`url(#${glowId})`}
                className="UVVMonochromatorVisual_SelectedOutput"
            />


            <circle
                cx={EXIT_SLIT.centerX}
                cy={EXIT_SLIT.centerY}
                r="2.8"
                className="UVVMonochromatorVisual_SlitCenterDot"
            />

            <TechnicalLabel
                x="572"
                y="296"
                textAnchor="end"
                className="UVVMonochromatorVisual_SelectedLabel"
            >
                <tspan x="572" dy="0">narrow output</tspan>
                <tspan x="572" dy="1.15em">band</tspan>
            </TechnicalLabel>

            <TechnicalLabel
                x="602"
                y="266"
                textAnchor="start"
                className="UVVMonochromatorVisual_SmallLabel"
            >
                exit slit
            </TechnicalLabel>
        </g>
    );
}

const READOUT_PANEL = {
    x: 496,
    y: 324,
    w: 172,
    h: 82,
    topX: 496 + 172 / 2,
    topY: 324,
};

function ReadoutRay() {
    return (
        <g className="UVVMonochromatorVisual_ReadoutRayGroup">
            <path
                d={`M ${EXIT_SLIT.centerX} ${EXIT_SLIT.centerY} L ${READOUT_PANEL.topX} ${READOUT_PANEL.topY}`}
                className="UVVMonochromatorVisual_DispersionRay UVVMonochromatorVisual_ReadoutRay"
                style={{
                    "--ray-color": "var(--c-glow-4)",
                    "--ray-delay": "0s",
                }}
            />

            <circle
                cx={EXIT_SLIT.centerX}
                cy={EXIT_SLIT.centerY}
                r="2.5"
                className="UVVMonochromatorVisual_RayPoint"
                style={{ "--ray-color": "var(--c-glow-4)" }}
            />

            <circle
                cx={READOUT_PANEL.topX}
                cy={READOUT_PANEL.topY}
                r="2.5"
                className="UVVMonochromatorVisual_RayPoint"
                style={{ "--ray-color": "var(--c-glow-4)" }}
            />
        </g>
    );
}

function BandpassReadout() {
    const titleX = READOUT_PANEL.x + READOUT_PANEL.w / 2;
    const titleY = READOUT_PANEL.y + 18;

    const labelX = READOUT_PANEL.x + 18;
    const trackX = READOUT_PANEL.x + 82;
    const trackW = 58;
    const valueX = trackX + trackW + 12;

    const rowStartY = READOUT_PANEL.y + 36;
    const rowGap = 16;

    return (
        <g className="UVVMonochromatorVisual_BandpassReadout">
            <rect
                x={READOUT_PANEL.x}
                y={READOUT_PANEL.y}
                width={READOUT_PANEL.w}
                height={READOUT_PANEL.h}
                rx="16"
                className="UVVMonochromatorVisual_ReadoutPanel"
            />

            <TechnicalLabel
                x={titleX}
                y={titleY}
                textAnchor="middle"
                className="UVVMonochromatorVisual_ReadoutTitle"
            >
                bandpass tradeoff
            </TechnicalLabel>

            {READOUT_BARS.map((bar, index) => {
                const y = rowStartY + index * rowGap;

                return (
                    <g key={bar.id}>
                        <text
                            x={labelX}
                            y={y}
                            className="UVVMonochromatorVisual_ReadoutText"
                        >
                            {bar.label}
                        </text>

                        <rect
                            x={trackX}
                            y={y - 6}
                            width={trackW}
                            height="4"
                            rx="2"
                            className="UVVMonochromatorVisual_ReadoutTrack"
                        />

                        <rect
                            x={trackX}
                            y={y - 6}
                            width={bar.width}
                            height="4"
                            rx="2"
                            className="UVVMonochromatorVisual_ReadoutBar"
                        />

                        <text
                            x={valueX}
                            y={y}
                            className="UVVMonochromatorVisual_ReadoutValue"
                        >
                            {bar.value}
                        </text>
                    </g>
                );
            })}
        </g>
    );
}

export default function UVVMonochromatorVisual() {
    const rawId = useId().replace(/:/g, "");
    const panelGradId = makeId(rawId, "panelGrad");
    const metalGradId = makeId(rawId, "metalGrad");
    const selectedGradId = makeId(rawId, "selectedGrad");
    const glowId = makeId(rawId, "softGlow");

    return (
        <figure className="UVVMonochromatorVisual_Shell">
            <svg
                className="UVVMonochromatorVisual_SVG"
                viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                role="img"
            >

                <defs>
                    <linearGradient
                        id={panelGradId}
                        x1="34"
                        y1="42"
                        x2="686"
                        y2="292"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop
                            offset="0%"
                            stopColor="color-mix(in oklab, var(--surface) 82%, var(--c-glow-2) 8%)"
                        />
                        <stop offset="58%" stopColor="var(--surface-2)" />
                        <stop
                            offset="100%"
                            stopColor="color-mix(in oklab, var(--c-ink) 88%, var(--c-glow-1) 8%)"
                        />
                    </linearGradient>

                    <linearGradient
                        id={metalGradId}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="color-mix(in oklab, var(--c-metal-1) 88%, white 12%)" />
                        <stop offset="42%" stopColor="var(--c-metal-1)" />
                        <stop offset="68%" stopColor="var(--c-metal-2)" />
                        <stop offset="100%" stopColor="var(--c-metal-3)" />
                    </linearGradient>

                    <linearGradient
                        id={selectedGradId}
                        x1="333"
                        y1="174"
                        x2="650"
                        y2="174"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop
                            offset="0%"
                            stopColor="color-mix(in oklab, var(--c-glow-1) 45%, transparent)"
                        />
                        <stop offset="50%" stopColor="var(--c-glow-1)" />
                        <stop offset="100%" stopColor="var(--c-emo-2)" />
                    </linearGradient>

                    <filter
                        id={glowId}
                        x="-40%"
                        y="-40%"
                        width="180%"
                        height="180%"
                    >
                        <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <ChamberFrame panelGradId={panelGradId} />
                <BroadbandInput glowId={glowId}/>
                <MirrorAssembly metalGradId={metalGradId} glowId={glowId} />
                <GratingModule metalGradId={metalGradId} />
                <DispersedRays selectedGradId={selectedGradId} glowId={glowId} />
                <ExitSelection selectedGradId={selectedGradId} glowId={glowId} />
                <ReadoutRay />
                <BandpassReadout />
            </svg>

            <figcaption className="UVVMonochromatorVisual_Caption">
                {DESCRIPTION}
            </figcaption>
        </figure>
    );
}

import React, { useId } from "react";
import "./UltrafastSpecChirpedProbeVisual.css";

const VB = {
    width: 640,
    height: 440,
};

const BG_FRAME = {
    x: 10,
    y: 10,
    width: VB.width - 20,
    height: VB.height - 20,
    rx: 26,
};

const CHIRP_BOX = {
    width: BG_FRAME.width * 0.58,
    height: BG_FRAME.height * 0.66,
    x: BG_FRAME.x + BG_FRAME.width * 0.14,
    y: BG_FRAME.y + BG_FRAME.height * 0.29,
    rx: 14,
};

const GRATING = {
    width: 12,
    height: 108,
    rx: 5,
    angle: 28,
};

const OPTIC_COLORS = {
    g1: {
        fill: "color-mix(in oklab, var(--bg) 58%, var(--accent) 42%)",
        stroke: "color-mix(in oklab, var(--accent) 84%, white 16%)",
    },
    g2: {
        fill: "color-mix(in oklab, var(--bg) 58%, var(--accent-2) 42%)",
        stroke: "color-mix(in oklab, var(--accent-2) 84%, white 16%)",
    },
    retro: {
        fill: "color-mix(in oklab, var(--bg) 52%, var(--accent-3) 48%)",
        stroke: "color-mix(in oklab, var(--accent-3) 78%, white 22%)",
    },
};

const RAINBOW_COLORS = ["#7c3aed", "#2563eb", "#22c55e", "#facc15", "#ef4444"];



function makeSafeId(id) {
    return id.replace(/:/g, "-");
}

function BkgGradients({ ids }) {
    return (
        <defs>
            <linearGradient
                id={ids.bgBase}
                x1={BG_FRAME.x}
                y1={BG_FRAME.y}
                x2={BG_FRAME.x + BG_FRAME.width}
                y2={BG_FRAME.y + BG_FRAME.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--bg) 92%, var(--accent) 8%)" />
                <stop offset="48%" stopColor="color-mix(in oklab, var(--bg) 88%, var(--accent-2) 12%)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--bg) 94%, var(--accent-3) 6%)" />
            </linearGradient>

            <radialGradient
                id={ids.cyanGlow}
                cx={BG_FRAME.x + 120}
                cy={BG_FRAME.y + 80}
                r="260"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent-2) 18%, transparent)" />
                <stop offset="58%" stopColor="color-mix(in oklab, var(--accent-2) 5%, transparent)" />
                <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            <radialGradient
                id={ids.violetGlow}
                cx={BG_FRAME.x + BG_FRAME.width - 95}
                cy={BG_FRAME.y + BG_FRAME.height - 95}
                r="310"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent) 16%, transparent)" />
                <stop offset="62%" stopColor="color-mix(in oklab, var(--accent) 4%, transparent)" />
                <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            <linearGradient
                id={ids.frameStroke}
                x1={BG_FRAME.x}
                y1={BG_FRAME.y}
                x2={BG_FRAME.x + BG_FRAME.width}
                y2={BG_FRAME.y + BG_FRAME.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="52%" stopColor="color-mix(in oklab, var(--accent-2) 54%, var(--accent) 46%)" />
                <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>
            <radialGradient
                id={ids.bgWash}
                cx={VB.width * 0.5}
                cy={VB.height * 0.42}
                r={VB.width * 0.62}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent-2) 22%, transparent)" />
                <stop offset="48%" stopColor="color-mix(in oklab, var(--accent) 14%, transparent)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--bg) 96%, transparent)" />
            </radialGradient>

            <linearGradient
                id={ids.frameStroke}
                x1={BG_FRAME.x}
                y1={BG_FRAME.y}
                x2={BG_FRAME.x + BG_FRAME.width}
                y2={BG_FRAME.y + BG_FRAME.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="52%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-3)" />
            </linearGradient>

            <linearGradient id={ids.whiteLightCore} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="color-mix(in oklab, white 72%, var(--accent-2) 28%)" />
                <stop offset="45%" stopColor="white" />
                <stop offset="100%" stopColor="color-mix(in oklab, white 78%, var(--accent) 22%)" />
            </linearGradient>

            <linearGradient id={ids.rainbowBeam} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="22%" stopColor="#2563eb" />
                <stop offset="47%" stopColor="#22c55e" />
                <stop offset="72%" stopColor="#facc15" />
                <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>

            <linearGradient id={ids.returnWhiteBeam} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="color-mix(in oklab, white 80%, #7c3aed 20%)" />
                <stop offset="55%" stopColor="white" />
                <stop offset="100%" stopColor="color-mix(in oklab, white 82%, #2563eb 18%)" />
            </linearGradient>

            <linearGradient id={ids.sampleBeam} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="color-mix(in oklab, white 76%, #2563eb 24%)" />
                <stop offset="48%" stopColor="white" />
                <stop offset="100%" stopColor="color-mix(in oklab, white 80%, #7c3aed 20%)" />
            </linearGradient>

            <filter id={ids.beamGlow} x="-30%" y="-30%" width="160%" height="160%" gradientUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="4.5" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <radialGradient
                id={ids.sampleCore}
                cx="50%"
                cy="50%"
                r="65%"
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0%"
                    stopColor="color-mix(in oklab, var(--accent-2) 52%, white 48%)"
                    stopOpacity="0.55"
                />
                <stop
                    offset="58%"
                    stopColor="color-mix(in oklab, var(--accent) 44%, var(--accent-2) 56%)"
                    stopOpacity="0.22"
                />
                <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
        </defs>
    );
}

function BackgroundFrame({ ids }) {
    const outlinePad = 3;
    return (
        <g className="UltrafastSpecChirpedProbeVisual_BackgroundFrame">
            <rect
                x={BG_FRAME.x}
                y={BG_FRAME.y}
                width={BG_FRAME.width}
                height={BG_FRAME.height}
                rx={BG_FRAME.rx}
                fill={`url(#${ids.bgBase})`}
            />

            <rect
                x={BG_FRAME.x}
                y={BG_FRAME.y}
                width={BG_FRAME.width}
                height={BG_FRAME.height}
                rx={BG_FRAME.rx}
                fill={`url(#${ids.cyanGlow})`}
            />

            <rect
                x={BG_FRAME.x}
                y={BG_FRAME.y}
                width={BG_FRAME.width}
                height={BG_FRAME.height}
                rx={BG_FRAME.rx}
                fill={`url(#${ids.violetGlow})`}
            />

            <rect
                x={BG_FRAME.x - outlinePad}
                y={BG_FRAME.y - outlinePad}
                width={BG_FRAME.width + outlinePad * 2}
                height={BG_FRAME.height + outlinePad * 2}
                rx={BG_FRAME.rx + outlinePad}
                fill="none"
                stroke={`url(#${ids.frameStroke})`}
                strokeWidth="1.5"
            />
        </g>
    );
}

function OpticRect({ cx, cy, x, y, width, height, rx = 5, angle = 0, fill, stroke }) {
    const rectX = x ?? cx - width / 2;
    const rectY = y ?? cy - height / 2;

    return (
        <rect
            x={rectX}
            y={rectY}
            width={width}
            height={height}
            rx={rx}
            fill={fill}
            stroke={stroke}
            strokeWidth="1.2"
            transform={angle ? `rotate(${angle} ${cx} ${cy})` : undefined}
        />
    );
}

function Label({ x, y, anchor = "middle", children }) {
    return (
        <text
            x={x}
            y={y}
            className="ChirpedBase_Label"
            textAnchor={anchor}
        >
            {children}
        </text>
    );
}

function MultilineLabel({ x, y, lines }) {
    return (
        <text
            x={x}
            y={y}
            className="ChirpedBase_Label"
            textAnchor="middle"
        >
            {lines.map((line, i) => (
                <tspan key={line} x={x} dy={i === 0 ? 0 : 15}>
                    {line}
                </tspan>
            ))}
        </text>
    );
}

function ChirpedBase() {
    const { box, g1, g2, retro } = getChirpedLayout();

    return (
        <g className="ChirpedBase">
            <rect
                x={box.x}
                y={box.y}
                width={box.width}
                height={box.height}
                rx={box.rx}
                fill="none"
                stroke="color-mix(in oklab, var(--accent-2) 72%, var(--bg))"
                strokeWidth="1.5"
                strokeDasharray="8 7"
            />

            <OpticRect {...g2} {...GRATING} {...OPTIC_COLORS.g2} />
            <OpticRect {...g1} {...GRATING} {...OPTIC_COLORS.g1} />
            <OpticRect {...retro} {...OPTIC_COLORS.retro} />

            <Label x={g1.cx + 4} y={g1.cy + 34} anchor="start">
                Grating 1
            </Label>

            <Label x={g2.cx - 4} y={g2.cy - 24} anchor="end">
                Grating 2
            </Label>

            <Label x={retro.x + retro.width / 2} y={retro.y + retro.height + 20}>
                Retroreflector
            </Label>
        </g>
    );
}

function ChirpedOutsideOptics() {
    const { generator, mirror } = getChirpedLayout();

    return (
        <g className="ChirpedOutsideOptics">
            <MultilineLabel
                x={generator.x + generator.width / 2}
                y={generator.y - 25}
                lines={["White Light", "Continuum Generator" ]}
            />

            <OpticRect
                {...generator}
                fill="color-mix(in oklab, var(--bg) 56%, var(--accent-2) 44%)"
                stroke="color-mix(in oklab, var(--accent-2) 82%, white 18%)"
            />

            <OpticRect
                {...mirror}
                fill="color-mix(in oklab, var(--bg) 58%, var(--accent) 42%)"
                stroke="color-mix(in oklab, var(--accent) 84%, white 16%)"
            />

            <Label x={mirror.cx - 18} y={mirror.cy + 4} anchor="end">
                mirror
            </Label>
        </g>
    );
}

function BeamCore({
    ids,
    x1,
    y1,
    x2,
    y2,
    stroke,
    halo = null,
    coreWidth = 3.2,
    haloWidth = 10,
    haloOpacity = 0.24,
    segmentClass = "",
}) {
    return (
        <g className="ChirpedBeamCore">
            {halo && (
                <line
                    className={`ChirpedBeamAnimated ChirpedBeamHalo ${segmentClass}`}
                    pathLength="100"
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={halo}
                    strokeWidth={haloWidth}
                    strokeLinecap="round"
                    filter={`url(#${ids.beamGlow})`}
                    style={{ "--beam-opacity": haloOpacity }}
                />
            )}
            <line
                className={`ChirpedBeamAnimated ChirpedBeamLine ${segmentClass}`}
                pathLength="100"
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={stroke}
                strokeWidth={coreWidth}
                strokeLinecap="round"
                style={{ "--beam-opacity": 1 }}
            />
        </g>
    );
}

function rotateLocalPoint(cx, cy, localX, localY, angleDeg) {
    const a = (angleDeg * Math.PI) / 180;

    return {
        x: cx + localX * Math.cos(a) - localY * Math.sin(a),
        y: cy + localX * Math.sin(a) + localY * Math.cos(a),
    };
}

function axisOffsetPoint(point, axisDeg, offset) {
    const a = (axisDeg * Math.PI) / 180;

    return {
        x: point.x + Math.cos(a) * offset,
        y: point.y + Math.sin(a) * offset,
    };
}

function SurfaceSpectrumBundle({
    ids,
    start,
    end,
    startAxis = 0,
    endAxis = 0,
    startSpread = 0,
    endSpread = 12,
    width = 2.4,
    segmentClass = "",
}) {
    const mid = (RAINBOW_COLORS.length - 1) / 2;

    return (
        <g className="ChirpedSpectrumBundle">
            <line
                className={`ChirpedBeamAnimated ChirpedBeamHalo ${segmentClass}`}
                pathLength="100"
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke={`url(#${ids.rainbowBeam})`}
                strokeWidth={width * 5}
                strokeLinecap="round"
                filter={`url(#${ids.beamGlow})`}
                style={{ "--beam-opacity": 0.16 }}
            />

            {RAINBOW_COLORS.map((color, i) => {
                const t = i - mid;
                const p1 = axisOffsetPoint(start, startAxis, startSpread * t);
                const p2 = axisOffsetPoint(end, endAxis, endSpread * t);

                return (
                    <line
                        key={`${color}-${i}`}
                        className={`ChirpedBeamAnimated ChirpedBeamLine ${segmentClass}`}
                        pathLength="100"
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        stroke={color}
                        strokeWidth={width}
                        strokeLinecap="round"
                        style={{ "--beam-opacity": 1 }}
                    />
                );
            })}
        </g>
    );
}

function ChirpedSample({ ids }) {
    const { sample } = getChirpedLayout();

    return (
        <g className="ChirpedSample">
            <circle
                cx={sample.cx}
                cy={sample.cy}
                r={sample.outerR}
                fill="color-mix(in oklab, var(--bg) 82%, transparent)"
                fillOpacity="0.22"
                stroke="color-mix(in oklab, var(--accent-2) 72%, white 28%)"
                strokeWidth="1.6"
            />

            <circle
                cx={sample.cx}
                cy={sample.cy}
                r={sample.innerR}
                fill={`url(#${ids.sampleCore})`}
                stroke="color-mix(in oklab, var(--accent) 62%, var(--accent-2) 38%)"
                strokeWidth="1.1"
            />

            <text
                x={sample.cx}
                y={sample.cy + sample.outerR + 20}
                className="ChirpedBase_Label"
                textAnchor="middle"
            >
                sample
            </text>
        </g>
    );
}


function getChirpedLayout() {
    const box = CHIRP_BOX;

    const g1 = {
        cx: box.x + box.width * 0.8,
        cy: box.y + box.height * 0.2,
    };

    const g2 = {
        cx: box.x + box.width * 0.2,
        cy: box.y + box.height * 0.2,
    };

    const retro = {
        width: 92,
        height: 18,
        x: box.x + box.width * 0.5 - 56,
        y: box.y + box.height * 0.82,
        rx: 6,
    };

    const generator = {
        width: 94,
        height: 15,
        x: g1.cx - 59,
        y: box.y - 82,
        rx: 5,
    };

    const mirror = {
        width: 10,
        height: 62,
        cx: generator.x - 68,
        cy: box.y - 34,
        rx: 4,
        angle: 28,
    };

    const sample = {
        cx: VB.width - 40,
        cy: 85,
        outerR: 26,
        innerR: 20,
    };

    return { box, g1, g2, retro, generator, mirror, sample };
}


function ChirpedBeamPath({ ids }) {
    const { g1, g2, retro, generator, mirror, sample } = getChirpedLayout();

    const gratingAxis = GRATING.angle + 90;

    const generatorCenter = {
        x: generator.x + generator.width / 2,
        y: generator.y + generator.height / 2,
    };

    const g1Hit = rotateLocalPoint(
        g1.cx,
        g1.cy,
        0,
        GRATING.height * 0.34,
        GRATING.angle
    );

    const g2IncomingHit = rotateLocalPoint(
        g2.cx,
        g2.cy,
        0,
        GRATING.height * 0.06,
        GRATING.angle
    );

    const retroIn = {
        x: retro.x + retro.width * 0.34,
        y: retro.y + retro.height / 2,
    };

    const retroOut = {
        x: retro.x + retro.width * 0.66,
        y: retro.y + retro.height / 2,
    };

    const g2OutgoingHit = rotateLocalPoint(
        g2.cx,
        g2.cy,
        0,
        -GRATING.height * 0.22,
        GRATING.angle
    );

    const mirrorHit = {
        x: mirror.cx,
        y: mirror.cy,
    };

    const sampleEnd = {
        x: sample.cx,
        y: sample.cy,
    };

    const dx = sampleEnd.x - mirrorHit.x;
    const dy = sampleEnd.y - mirrorHit.y;
    const len = Math.hypot(dx, dy) || 1;
    const nx = -dy / len;
    const ny = dx / len;

    const packetTs = [0.18, 0.36, 0.54, 0.72];

    return (
        <g className="ChirpedBeamPath">
            <BeamCore
                ids={ids}
                x1={generatorCenter.x}
                y1={generatorCenter.y}
                x2={g1Hit.x}
                y2={g1Hit.y}
                stroke={`url(#${ids.whiteLightCore})`}
                halo={`url(#${ids.rainbowBeam})`}
                segmentClass="BeamSeg1"
            />

            <SurfaceSpectrumBundle
                ids={ids}
                start={g1Hit}
                end={g2IncomingHit}
                startAxis={gratingAxis}
                endAxis={gratingAxis}
                startSpread={0}
                endSpread={9}
                segmentClass="BeamSeg2"
            />

            <SurfaceSpectrumBundle
                ids={ids}
                start={g2IncomingHit}
                end={retroIn}
                startAxis={gratingAxis}
                endAxis={0}
                startSpread={9}
                endSpread={9}
                segmentClass="BeamSeg3"
            />

            <SurfaceSpectrumBundle
                ids={ids}
                start={retroOut}
                end={g2OutgoingHit}
                startAxis={0}
                endAxis={gratingAxis}
                startSpread={9}
                endSpread={9}
                segmentClass="BeamSeg4"
            />

            <SurfaceSpectrumBundle
                ids={ids}
                start={g2OutgoingHit}
                end={g1Hit}
                startAxis={gratingAxis}
                endAxis={gratingAxis}
                startSpread={9}
                endSpread={0}
                segmentClass="BeamSeg5"
            />

            <BeamCore
                ids={ids}
                x1={g1Hit.x}
                y1={g1Hit.y}
                x2={mirrorHit.x}
                y2={mirrorHit.y}
                stroke={`url(#${ids.returnWhiteBeam})`}
                halo={`url(#${ids.rainbowBeam})`}
                haloWidth={8}
                haloOpacity={0.16}
                segmentClass="BeamSeg6"
            />

            <BeamCore
                ids={ids}
                x1={mirrorHit.x}
                y1={mirrorHit.y}
                x2={sampleEnd.x}
                y2={sampleEnd.y}
                stroke={`url(#${ids.sampleBeam})`}
                coreWidth={3.4}
                haloWidth={7}
                haloOpacity={0.12}
                segmentClass="BeamSeg7"
            />

            {packetTs.map((t, i) => {
                const px = mirrorHit.x + dx * t;
                const py = mirrorHit.y + dy * t;
                const offset = i % 2 === 0 ? 4 : -4;

                return (
                    <circle
                        key={`packet-${i}`}
                        className={`ChirpedPacket Packet${i + 1}`}
                        cx={px + nx * offset}
                        cy={py + ny * offset}
                        r="2.8"
                        fill={RAINBOW_COLORS[i]}
                    />
                );
            })}
        </g>
    );
}

export default function UltrafastEvolutionColleagueVisual() {
    const rawId = useId();
    const baseId = makeSafeId(rawId);
    const ids = {
        bgBase: `${baseId}--bg-base`,
        cyanGlow: `${baseId}--cyan-glow`,
        violetGlow: `${baseId}--violet-glow`,
        frameStroke: `${baseId}--frame-stroke`,
        whiteLightCore: `${baseId}--white-light-core`,
        rainbowBeam: `${baseId}--rainbow-beam`,
        returnWhiteBeam: `${baseId}--return-white-beam`,
        sampleBeam: `${baseId}--sample-beam`,
        beamGlow: `${baseId}--beam-glow`,
        sampleCore: `${baseId}--sample-core`,
    };

    return (
        <figure className="UltrafastSpecChirpedProbeVisual">
            <svg
                className="UltrafastSpecChirpedProbeVisual_SVG"
                viewBox={`0 0 ${VB.width} ${VB.height}`}
                role="img"
            >
                <BkgGradients ids={ids} />
                <BackgroundFrame ids={ids} />
                <ChirpedBeamPath ids={ids} />
                <ChirpedBase />
                <ChirpedOutsideOptics />
                <ChirpedSample ids={ids}/>
            </svg>

            <figcaption className="UltrafastSpecChirpedProbe_Caption">
                The grating-pair stretcher chirps the white-light probe, making different wavelengths arrive at different times. Calibration turns this stretched spectrum into a time-encoded view of the sample’s transient response.
            </figcaption>
        </figure>
    )
}
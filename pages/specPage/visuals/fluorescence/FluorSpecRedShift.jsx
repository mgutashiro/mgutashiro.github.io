import { useId } from "react";
import './FluorSpecRedShift.css';

const VIEWBOX = "0 0 752 488";

const CHAMBER = { x: 270, y: 132, w: 220, h: 156, rx: 26 };
const CORE = { cx: 380, cy: 210, r: 40 };

const EXCITATION_PATH =
    "M 82 118 C 148 126 224 148 294 182 C 330 198 354 208 368 212";

const EMISSION_PATH =
    "M 392 216 C 430 228 472 246 520 274 C 548 290 574 300 606 304";

const SPECTRUM_SHAPE =
    "M0 336.107H11.5L21.5 327.107L31.5 311.107L40.5 290.607L48 260.607L56.5 224.607L63.5 180.607L68.5 139.107L73.5 103.107L80 64.1074L84.5 38.1074L91.5 17.1074L95 5.60742L102 0.607422L109.5 5.60742L113 17.1074L118.5 38.1074L123.5 59.1074L128 79.6074L132.5 103.107L138.5 139.107L146.5 180.607L155.5 218.607L167.5 255.607L178.5 281.107L193.5 306.107L210.5 321.607L229.5 336.107H249.5";

const EXCITATION_DOTS = [
    { cx: 118, cy: 121, r: 4.5 },
    { cx: 162, cy: 129, r: 4.2 },
    { cx: 212, cy: 144, r: 3.8 },
    { cx: 262, cy: 169, r: 3.4 },
    { cx: 316, cy: 194, r: 3.1 },
    { cx: 368, cy: 212, r: 3.0 },
];

const EMISSION_DOTS = [
    { cx: 392, cy: 216, r: 4.0 },
    { cx: 432, cy: 229, r: 4.6 },
    { cx: 476, cy: 247, r: 4.2 },
    { cx: 520, cy: 270, r: 3.8 },
    { cx: 560, cy: 292, r: 3.4 },
    { cx: 594, cy: 302, r: 3.1 },
];

function makeIds(rawId) {
    const uid = rawId.replace(/:/g, "");
    return {
        coolGradId: `FluorSpecRedShift-cool-grad-${uid}`,
        warmGradId: `FluorSpecRedShift-warm-grad-${uid}`,
        coreGradId: `FluorSpecRedShift-core-grad-${uid}`,
        glowId: `FluorSpecRedShift-glow-${uid}`,
    };
}

function BackgroundFrame() {
    return (
        <g className="FluorSpecRedShift_Background">
            <rect
                x="0"
                y="0"
                width="752"
                height="488"
                rx="36"
                className="FluorSpecRedShift_Backplate"
            />

        </g>
    );
}

function CenterChamber({ ids }) {
    return (
        <g className="FluorSpecRedShift_ChamberGroup">
            <rect
                x={CHAMBER.x}
                y={CHAMBER.y}
                width={CHAMBER.w}
                height={CHAMBER.h}
                rx={CHAMBER.rx}
                className="FluorSpecRedShift_Chamber"
            />
            <rect
                x={CHAMBER.x + 10}
                y={CHAMBER.y + 10}
                width={CHAMBER.w - 20}
                height={CHAMBER.h - 20}
                rx={CHAMBER.rx - 8}
                className="FluorSpecRedShift_ChamberInner"
            />

            <circle
                cx={CORE.cx}
                cy={CORE.cy}
                r={CORE.r + 14}
                className="FluorSpecRedShift_CoreHalo"
                fill={`url(#${ids.coreGradId})`}
                filter={`url(#${ids.glowId})`}
            />
            <circle
                cx={CORE.cx}
                cy={CORE.cy}
                r={CORE.r}
                className="FluorSpecRedShift_Core"
                fill={`url(#${ids.coreGradId})`}
            />
        </g>
    );
}

function BeamDots({ points, className }) {
    return (
        <g className={className}>
            {points.map((dot, i) => (
                <circle key={i} cx={dot.cx} cy={dot.cy} r={dot.r} />
            ))}
        </g>
    );
}

function ExcitationBeam({ ids }) {
    return (
        // excitation beam 
        <g className="FluorSpecRedShift_ExcitationGroup">
            <path
                d={EXCITATION_PATH}
                className="FluorSpecRedShift_Beam FluorSpecRedShift_Beam--cool"
                stroke={`url(#${ids.coolGradId})`}
            />
            <path
                d={EXCITATION_PATH}
                className="FluorSpecRedShift_BeamGlow"
                stroke={`url(#${ids.coolGradId})`}
                filter={`url(#${ids.glowId})`}
            />
            <BeamDots
                points={EXCITATION_DOTS}
                className="FluorSpecRedShift_PhotonDots FluorSpecRedShift_PhotonDots--cool"
            />
        </g>
    );
} 

function EmissionBeam({ ids }) {
    return (
        <g className="FluorSpecRedShift_EmissionGroup">
            <path
                d={EMISSION_PATH}
                className="FluorSpecRedShift_Beam FluorSpecRedShift_Beam--warm"
                stroke={`url(#${ids.warmGradId})`}
            />
            <path
                d={EMISSION_PATH}
                className="FluorSpecRedShift_BeamGlow"
                stroke={`url(#${ids.warmGradId})`}
                filter={`url(#${ids.glowId})`}
            />
            <BeamDots
                points={EMISSION_DOTS}
                className="FluorSpecRedShift_PhotonDots FluorSpecRedShift_PhotonDots--warm"
            />
        </g>
    );
}

function Detector () {
    return (
        <>
            <rect
                x="608"
                y="286"
                width="18"
                height="36"
                rx="5"
                className="FluorSpecRedShift_Slit"
            />
            <g className="FluorSpecRedShift_DetectorGroup" transform="translate(-10 0)">
                <rect
                    x="640"
                    y="254"
                    width="72"
                    height="88"
                    rx="14"
                    className="FluorSpecRedShift_Detector"
                />
                <circle
                    cx="627"
                    cy="305"
                    r="8"
                    className="FluorSpecRedShift_DetectorLens"
                />
                <path
                    d="M 650 318 C 666 300 686 296 704 282"
                    className="FluorSpecRedShift_ReadoutTrace"
                />
                <path
                    d="M 648 323 H 705"
                    className="FluorSpecRedShift_ReadoutBase"
                />
            </g>
        </>
    );
}

function TinyLabel({ x, y, title, subtitle, className = "" }) {
    return (
        <text x={x} y={y} className={`FluorSpecRedShift_Label ${className}`}>
            <tspan x={x} dy="0">
                {title}
            </tspan>
            <tspan x={x} dy="1.15em" className="FluorSpecRedShift_LabelSub">
                {subtitle}
            </tspan>
        </text>
    );
}

function Spectra( {ids }) {
    return (
        <g className="FluorSpecRedShift_SpectrumGroup">
            <path 
                d="M 116 410 H 632 M 235 400 V 420 M 460 400 V 420 M 124 400 L 116 410 L 124 420" 
                className="FluorSpecRedShift_Baseline" 
            />
            <path
                d={SPECTRUM_SHAPE}
                transform="translate(138 305) scale(0.92 0.3)"
                className="FluorSpecRedShift_SpectrumCurve FluorSpecRedShift_SpectrumCurve--cool"
                stroke={`url(#${ids.coolGradId})`}
                filter={`url(#${ids.glowId})`}
            />
            <path
                d={SPECTRUM_SHAPE}
                transform="translate(350 305) scale(1.02 0.3)"
                className="FluorSpecRedShift_SpectrumCurve FluorSpecRedShift_SpectrumCurve--warm"
                stroke={`url(#${ids.warmGradId})`}
                filter={`url(#${ids.glowId})`}
            />

            <TinyLabel
                x="190"
                y="280"
                title="absorbed"
                subtitle="energy in"
            />
            <TinyLabel
                x="170"
                y="438"
                title="light absorbed"
                subtitle="higher energy"
                className="FluorSpecRedShift_Label_Axis"
            />
            <TinyLabel
                x="415"
                y="280"
                title="emitted"
                subtitle="energy out"
                className="FluorSpecRedShift_Label--right"
            />
            <TinyLabel
                x="394"
                y="438"
                title="light returned"
                subtitle="lower energy / redder"
                className="FluorSpecRedShift_Label_Axis"
            />

        </g>
    );
}

export default function FluorSpecRedShiftVisualReturn() {
    const ids = makeIds(useId());

    return (
        <div className="FluorSpecRedShiftStage">
            <svg
                className="FluorSpecRedShift_SVG"
                viewBox={VIEWBOX}
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id={ids.coolGradId} x1="82" y1="118" x2="390" y2="210" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="var(--c-glow-1)" />
                        <stop offset="100%" stopColor="var(--c-glow-2)" />
                    </linearGradient>

                    <linearGradient id={ids.warmGradId} x1="392" y1="212" x2="618" y2="404" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="color-mix(in oklab, var(--c-glow-3) 58%, var(--c-glow-2))" />
                        <stop offset="100%" stopColor="color-mix(in oklab, var(--c-glow-3) 72%, var(--emo2))" />
                    </linearGradient>

                    <radialGradient id={ids.coreGradId} cx="50%" cy="45%" r="65%">
                        <stop offset="0%" stopColor="color-mix(in oklab, var(--c-glow-3) 24%, var(--text))" />
                        <stop offset="44%" stopColor="var(--c-glow-2)" />
                        <stop offset="100%" stopColor="color-mix(in oklab, var(--surface) 62%, var(--c-glow-2))" />
                    </radialGradient>

                    <filter id={ids.glowId} x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="6" />
                    </filter>
                </defs>

                <BackgroundFrame ids={ids} />

                <g className="FluorSpecRedShift_ForegroundOptics" transform="translate(0 -60)">
                    <CenterChamber ids={ids} />
                    <ExcitationBeam ids={ids} />
                    <EmissionBeam ids={ids} />
                    <Detector />
                </g>
                <Spectra ids={ids}/>
            </svg>

            <p className="FluorRedShift_Caption">
                Fluorescence usually returns lower-energy light because the excited
                molecule relaxes before it emits.
            </p>
        </div>
    );
}
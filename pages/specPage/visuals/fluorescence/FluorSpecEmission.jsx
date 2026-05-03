import { useId } from "react";
import './FluorSpecEmission.css';

const VIEWBOX = "0 0 720 420";

const EXCITATION_BEAM = {
    main: "M68 210 H320",
    haloTop: "M68 194 H300",
    haloBottom: "M68 226 H300",
};
 
const CHAMBER_RINGS = [
    { r: 42, opacity: 0.32 },
    { r: 58, opacity: 0.2 },
    { r: 76, opacity: 0.12 },
];

function makeIds(rawId) {
    const uid = rawId.replace(/:/g, "");
    return {
        bg: `FluorSpecEmission-bg-${uid}`,
        excitation: `FluorSpecEmission-excitation-${uid}`,
        emission: `FluorSpecEmission-emission-${uid}`,
        chamber: `FluorSpecEmission-chamber-${uid}`,
        glow: `FluorSpecEmission-glow-${uid}`,
    };
}

function BackgroundFrame({ ids }) {
    return (
        <g className="FluorSpecEmission_Background">
            <rect
                x="24"
                y="0"
                width="682"
                height="406"
                rx="32"
                fill={`url(#${ids.bg})`}
                className="FluorSpecEmission_Backdrop"
            />
            <path
                d="M70 362 H650 M92 50 H620"
                className="FluorSpecEmission_LabRails"
            />
            <path
                d="M104 362 V379 M616 362 V379"
                className="FluorSpecEmission_RailFeet"
            />
        </g>
    );
}

function ExcitationBeam({ ids }) {
    return (
        <g
            className="FluorSpecEmission_ExcitationPath"
            filter={`url(#${ids.glow})`}
        >
            <path
                d={EXCITATION_BEAM.main}
                pathLength="100"
                stroke={`url(#${ids.excitation})`}
                className="FluorSpecEmission_ExcitationBeam"
            />
            <path
                d={EXCITATION_BEAM.haloTop}
                pathLength="100"
                stroke={`url(#${ids.excitation})`}
                className="FluorSpecEmission_ExcitationHalo"
            />
            <path
                d={EXCITATION_BEAM.haloBottom}
                pathLength="100"
                stroke={`url(#${ids.excitation})`}
                className="FluorSpecEmission_ExcitationHalo"
            />
        </g>
    );
}

function ExcitationPath({ ids }) {
    return <ExcitationBeam ids={ids} />;
}

function SampleChamber({ ids }) {
    return (
        <g className="FluorSpecEmission_SampleChamber">
            <rect
                x="292"
                y="128"
                width="136"
                height="166"
                rx="38"
                fill={`url(#${ids.chamber})`}
                className="FluorSpecEmission_ChamberGlass"
            />
            <path
                d="M310 146 Q360 120 410 146"
                className="FluorSpecEmission_ChamberTopRim"
            />
            <path
                d="M310 276 Q360 302 410 276"
                className="FluorSpecEmission_ChamberBottomRim"
            />
            <g
                className="FluorSpecEmission_ShockwaveWrap"
                filter={`url(#${ids.glow})`}
            >
                <circle
                cx="360"
                cy="210"
                r="34"
                className="FluorSpecEmission_Shockwave"
                />
            </g>
            <g className="FluorSpecEmission_CoreMotion">
                <g 
                    className="FluorSpecEmission_CoreGlow" 
                    filter={`url(#${ids.glow})`}
                >samoke
                    {CHAMBER_RINGS.map((ring) => (
                        <circle
                            key={ring.r}
                            cx="360"
                            cy="210"
                            r={ring.r}
                            opacity={ring.opacity}
                            className="FluorSpecEmission_AuraRing"
                        />
                    ))}
                    <circle
                        cx="360"
                        cy="210"
                        r="28"
                        className="FluorSpecEmission_Core"
                    />
                    <circle
                        cx="372"
                        cy="198"
                        rx="8"
                        ry="6"
                        className="FluorSpecEmission_CoreHighlight"
                    />
                </g>
            </g>

            <text x="360" y="325" className="FluorSpecEmission_SoftLabel">
                sample "wakes up"
            </text>
        </g>
    );
}

function SideDetector({ ids }) {
    return (
        <g 
            className="FluorSpecEmission_Detector" 
        >
            <g 
                className="FluorSpecEmission_DetectorTransform" 
                transform="translate(0 -6) translate(635 114) scale(1.5 1) translate(-645 -100)" 
            >
                <rect
                    x="598"
                    y="52"
                    width="74"
                    height="124"
                    rx="20"
                    className="FluorSpecEmission_DetectorBody"
                />
                <rect
                    x="612"
                    y="72"
                    width="46"
                    height="78"
                    rx="14"
                    fill={`url(#${ids.emission})`}
                    className="FluorSpecEmission_DetectorWindow"
                />
                <path
                    d="M0.185699 355.108L15.1857 349.108L26.6857 342.608L33.6857 330.108L39.1857 309.608L42.6857 284.608L45.6857 251.608L47.6857 220.108L49.1857 198.608L51.1857 165.608L53.1857 118.108L54.6857 78.6085L56.6857 47.6085L58.6857 19.1085L60.6857 0.108459L62.6857 9.10846L64.6857 24.6085V39.1085L66.6857 56.1085L68.1857 73.6085L71.1857 96.6085L72.6857 111.108L75.6857 124.608L79.1857 136.108L81.1857 150.608L84.6857 175.608L87.1857 196.108L89.6857 213.108L95.6857 241.108L101.686 254.108L108.686 263.108L116.186 277.608L122.186 292.108L129.686 306.608L138.686 320.108L150.186 333.108L159.186 339.608L172.186 345.108L186.186 349.108L199.186 352.108L210.186 353.608"
                    transform="translate(612.5 72.5) scale(0.2 0.2)"
                    className="FluorSpecEmission_ReadoutLine"
                />
            </g>
            <text x="620" y="210" className="FluorSpecEmission_DetectorLabel">
                Detector
            </text>
        </g>
    );
}

export default function FluorSpecEmission() {
    const ids = makeIds(useId());
    return (
        <figure className="FluorSpecEmission">
            <svg
                className="FluorSpecEmission_SVG"
                viewBox={VIEWBOX}
                role="img"
            >
                <defs>
                    <linearGradient id={ids.bg} x1="0" y1="0" x2="1" y2="1" >
                        <stop offset="0%" stopColor="var(--bg-2)" />
                        <stop offset="58%" stopColor="var(--bg)" />
                        <stop offset="100%" stopColor="var(--surface)" />
                    </linearGradient>

                    <linearGradient 
                        id={ids.excitation} 
                        x1="68" 
                        y1="210" 
                        x2="320" 
                        y2="210"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="var(--c-glow-1)" />
                        <stop offset="100%" stopColor="var(--c-glow-2)" />
                    </linearGradient>

                    <linearGradient id={ids.emission} x1="388" y1="174" x2="586" y2="82" >
                        <stop offset="0%" stopColor="var(--c-glow-2)" />
                        <stop offset="48%" stopColor="var(--c-glow-3)" />
                        <stop offset="100%" stopColor="var(--emo2)" />
                    </linearGradient>

                    <radialGradient id={ids.chamber} cx="50%" cy="46%" r="72%">
                        <stop
                            offset="0%"
                            style={{
                            stopColor: "color-mix(in oklab, var(--c-glow-2) 52%, var(--surface))",
                            }}
                        />
                        <stop
                            offset="48%"
                            style={{
                            stopColor: "color-mix(in oklab, var(--surface) 88%, var(--bg))",
                            }}
                        />
                        <stop
                            offset="100%"
                            style={{
                            stopColor: "color-mix(in oklab, var(--bg) 78%, var(--c-glow-1))",
                            }}
                        />
                    </radialGradient>

                    <filter
                        id={ids.glow}
                        x="0"
                        y="0"
                        width="720"
                        height="420"
                        filterUnits="userSpaceOnUse"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <BackgroundFrame ids={ids} />
                <ExcitationPath ids={ids} />
                <SampleChamber ids={ids} />
                <SideDetector ids={ids} />
            </svg>

            <figcaption className="FluorSpecEmission_Caption">
                After absorbing light, the sample briefly relaxes and releases a softer glow that can be collected from a different direction.
            </figcaption>
        </figure>
    );
}
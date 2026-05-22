import React, { useId } from "react";
import "./ultrafastProbeVisual.css";

const VB = {
    width: 640,
    height: 440,
};

const BG_PAD = 10;

const BG_FRAME = {
    x: BG_PAD,
    y: 14,
    width: VB.width - BG_PAD * 2,
    height: VB.height - 28,
    rx: 26,
};

const SAMPLE = {
    cx: 300,
    cy: 218,
    r: 82,
};


function UltrafastPVDefs({ uid }) {
    return (
        <defs>
            <linearGradient 
                id={`${uid}-bg`} 
                x1="20" 
                y1="20" 
                x2="620"
                y2="420"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--surface)" />
                <stop offset="50%" stopColor="var(--surface)" />
                <stop offset="100%" stopColor="var(--surface-2)" />
            </linearGradient>
            <linearGradient
                id={`${uid}-border`}
                x1="18"
                y1="14"
                x2="622"
                y2="426"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="55%" stopColor="var(--accent-4)" />
                <stop offset="100%" stopColor="var(--accent-3)" />
            </linearGradient>
            <radialGradient
                id={`${uid}-sampleGlow`}
                cx={SAMPLE.cx}
                cy={SAMPLE.cy}
                r="105"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-4)" stopOpacity="0.36" />
                <stop offset="100%" stopColor="var(--accent-4)" stopOpacity="0" />
            </radialGradient>
            <filter id={`${uid}-softGlow`} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    );
}

function BackgroundPanel({ uid }) {
    return (
        <g className="ultrafastPV_BackgroundPanel">
            <rect
                {...BG_FRAME}
                fill={`url(#${uid}-bg)`}
                stroke={`url(#${uid}-border)`}
                strokeWidth="1.4"
            />
            <circle 
                cx={SAMPLE.cx}
                cy={SAMPLE.cy}
                r="128"
                fill={`url(#${uid}-sampleGlow)`}
                opacity="0.8"
            />
        </g>
    );
}

export default function UltrafastProbeVisual({ className="" }) {
    const rawId = useId();
    const uid = `ultrafastPV-${rawId.replace(/:/g, "-")}`;

    return (
        <figure className={`ultrafastPV ${className}`}>
            <svg
                className="ultrafastPV_SVG"
                viewBox={`0 0 ${VB.width} ${VB.height}`}
                role="img"
            >
                <UltrafastPVDefs uid={uid} />
                <BackgroundPanel uid={uid} />

            </svg>
            <figcaption className="ultrafastPV_Caption">
                testing
            </figcaption>
        </figure>
    );
}
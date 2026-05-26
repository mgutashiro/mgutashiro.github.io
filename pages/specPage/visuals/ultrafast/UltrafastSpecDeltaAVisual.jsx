import React, { useId } from "react";
import "./UltrafastSpecDeltaAVisual.css";

const VB = {
    width: 640,
    height: 440,
};

const SVG_PAD = 10;
const BG_FRAME = {
    x: SVG_PAD,
    y: SVG_PAD,
    width: VB.width - SVG_PAD * 2,
    height: VB.height - SVG_PAD * 2,
    rx: 26,
};

const CENTER = {
    x: VB.width / 2,
    y: VB.height / 2,
};

function makeIds(rawId) {
    const id = rawId.replace(/:/g, '-');

    return {
        bg: `${id}-ultrafast-delta-a-bg`
    }
}

function UltrafastDAVisualDefs({ ids }) {
    return (
        <defs>
            <linearGradient
                id={ids.bg}
                x1={BG_FRAME.x}
                y1={BG_FRAME.y}
                x2={BG_FRAME.x + BG_FRAME.width}
                y2={BG_FRAME.y + BG_FRAME.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--c-ink)" />
                <stop offset="55%" stopColor="var(--c-shadow)" />
                <stop offset="100%" stopColor="var(--c-primary-2)" />
            </linearGradient>
        </defs>
    );
}

function UltrafastDAVisualBackground({ ids }){
    return (
        <g className = "UltrafastDAVisual_Background">
            <rect
                x={BG_FRAME.x}
                y={BG_FRAME.y}
                width={BG_FRAME.width}
                height={BG_FRAME.height}
                rx={BG_FRAME.rx}
                fill={`url(#${ids.bg})`}
                className="UltrafastDAVisual_BGFrame"
            />
            <line
                x1={BG_FRAME.x}
                y1={CENTER.x}
                x2={BG_FRAME.x + BG_FRAME.width}
                y2={CENTER.y}
                className="UltrafastDAVisual_CenterGuide"
            />
            <line
                x1={CENTER.x}
                y1={BG_FRAME.y}
                x2={CENTER.x}
                y2={BG_FRAME.y + BG_FRAME.height}
                className="UltrafastDAVisual_CenterGuide"
            />
        </g>
    );
}

export default function UltrafastDAVisual() {
    const rawId = useId();
    const ids = makeIds(rawId);
    return (
        <figure className="UltrafastDAVisual">
            <svg
                className="UltrafastDAVisual_SVG"
                ViewBox={`0 0 ${VB.width} ${VB.height}`}
                role="img"
            >
                <UltrafastDAVisualDefs ids={ids} />
                <UltrafastDAVisualBackground ids={ids} />

            </svg>

            <figcaption className="UltrafastDAVisual_Caption">
                testing
            </figcaption>
        </figure>
    )
}
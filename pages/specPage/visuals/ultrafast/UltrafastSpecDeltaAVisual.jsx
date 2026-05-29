import React, { useId } from "react";
import "./UltrafastSpecDeltaAVisual.css";

const VB = {
    width: 840,
    height: 540,
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

const SECTION_LAYOUT = {
    titlePadX: 14,
    titlePadY: 22,

    axisLabelXPad: 12,
    axisStartXPad: 42,
    axisEndXPad: 14,

    traceInsetTop: 34,
    traceInsetBottom: 18,
    traceInsetLeft: 42,
    traceInsetRight: 14,
};

const SECTION_RECTS = {
    topLeft: {
        x: BG_FRAME.x,
        y: BG_FRAME.y,
        width: CENTER.x - BG_FRAME.x,
        height: CENTER.y - BG_FRAME.y,
    },
    topRight: {
        x: CENTER.x,
        y: BG_FRAME.y,
        width: BG_FRAME.x + BG_FRAME.width - CENTER.x,
        height: CENTER.y - BG_FRAME.y,
    },
    bottomLeft: {
        x: BG_FRAME.x,
        y: CENTER.y,
        width: CENTER.x - BG_FRAME.x,
        height: BG_FRAME.y + BG_FRAME.height - CENTER.y,
    },
    bottomRight: {
        x: CENTER.x,
        y: CENTER.y,
        width: BG_FRAME.x + BG_FRAME.width - CENTER.x,
        height: BG_FRAME.y + BG_FRAME.height - CENTER.y,
    },
};

const TRACE_PATHS = {
    groundStateBleach:
        "M0 0.5H9H19.5H28L38 2.5L49.5 6L59 12L70 20.5L79 30.5L87 43.5L91.5 54.5L96 65.5L100.5 74.5L105 82L109.5 85L115.5 82L119.5 74.5L125.5 58L131 42L135.5 27.5L141.5 16L149 6L155 2.5L166 0.5H179",
    stimulatedEmission:
        "M0 1.5H12H20.5L29 4.5L35.5 9L41.5 17L46 27.5L51 40.5L53.5 50L58 63.5L62 73L65.5 80.5L70 85H74.5L78.5 80.5L83 68.5L89.5 54L96 40.5L106.5 27.5L115 19L125.5 11.5L135 6.5L143.5 4L151.5 2L162 0.5H176",
    excitedStateAbsorption:
        "M262.091 23.5044H250.091L223.591 21.0044L206.091 18.0044L182.591 12.0044L153.591 5.00439L128.591 0.504395L108.591 2.50439L82.0906 8.00439L59.0906 14.5044L39.5906 20.0044L19.0906 26.0044L0.0905762 29.5044",
    productAbsorption:
        "M382.545 108.134H362.545L341.045 100.634L324.545 91.6343L309.045 83.6343L295.545 78.6343L281.045 63.1343L271.045 50.1343L261.045 25.6343L249.045 18.6343L235.545 7.63428L227.545 0.634277L217.545 7.63428L205.545 25.6343L195.045 33.1343L183.045 50.1343L162.045 63.1343H151.545L135.545 75.1343L115.045 83.6343H105.045L85.0446 88.1343L61.0446 96.6343L33.5446 107.134L0.0446167 110.134",
};

const TRACE_BOUNDS = {
    groundStateBleach: { minX: 0, maxX: 179, minY: 0.5, maxY: 85 },
    stimulatedEmission: { minX: 0, maxX: 176, minY: 0.5, maxY: 85 },
    excitedStateAbsorption: { minX: 0.0905762, maxX: 262.091, minY: 0.504395, maxY: 29.5044 },
    productAbsorption: { minX: 0.0446167, maxX: 382.545, minY: 0.634277, maxY: 110.134 },
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
                y1={CENTER.y}
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


function UltrafastDASection({
    section,
    title,
    pathD,
    bounds,
    polarity = "negative",
    traceClassName = "",
    traceScale = 1,
    traceOffsetX = 0,
    traceOffsetY = 0,
}) {
    const axisY = section.y + section.height / 2;

    const titleX = section.x + SECTION_LAYOUT.titlePadX;
    const titleY = section.y + SECTION_LAYOUT.titlePadY;

    const deltaAX = section.x + SECTION_LAYOUT.axisLabelXPad;
    const axisX1 = section.x + SECTION_LAYOUT.axisStartXPad;
    const axisX2 = section.x + section.width - SECTION_LAYOUT.axisEndXPad;

    const targetW =
        section.width -
        SECTION_LAYOUT.traceInsetLeft -
        SECTION_LAYOUT.traceInsetRight;

    const srcW = bounds.maxX - bounds.minX;
    const srcH = bounds.maxY - bounds.minY;

    const baseScaleX = targetW / srcW;

    const availableHeight =
        polarity === "negative"
            ? section.height / 2 - SECTION_LAYOUT.traceInsetBottom
            : section.height / 2 - SECTION_LAYOUT.traceInsetTop;

    const baseScaleY = availableHeight / srcH;

    const scaleX = baseScaleX * traceScale;
    const scaleY = baseScaleY * traceScale;

    const scaledW = srcW * scaleX;
    const targetCenterX = section.x + section.width / 2;
    const tx = targetCenterX - scaledW / 2 - bounds.minX * scaleX;

    const ty =
        polarity === "negative"
            ? axisY - bounds.minY * scaleY
            : axisY - bounds.maxY * scaleY;

    return (
        <g className="UltrafastDAVisual_Section">
            <text
                x={titleX + 20}
                y={titleY + 10}
                className="UltrafastDAVisual_SectionTitle"
            >
                {title}
            </text>

            <text
                x={deltaAX}
                y={axisY}
                className="UltrafastDAVisual_DeltaALabel"
                dominantBaseline="middle"
            >
                ΔA
            </text>

            <path
                d={pathD}
                transform={`translate(${tx + traceOffsetX} ${ty + traceOffsetY}) scale(${scaleX} ${scaleY})`}
                className={`UltrafastDAVisual_Trace ${traceClassName}`}
                fill="none"
            />
            <line
                x1={axisX1}
                y1={axisY}
                x2={axisX2}
                y2={axisY}
                className="UltrafastDAVisual_SectionAxis"
            />
        </g>
    );
}

function UltrafastDAGroundStateBleach() {
    return (
        <UltrafastDASection
            section={SECTION_RECTS.topLeft}
            title="Ground State Bleach"
            pathD={TRACE_PATHS.groundStateBleach}
            bounds={TRACE_BOUNDS.groundStateBleach}
            polarity="negative"
            traceClassName="is-bleach"
            traceScale={0.8}
        />
    );
}

function UltrafastDAStimulatedEmission() {
    return (
        <UltrafastDASection
            section={SECTION_RECTS.topRight}
            title="Stimulated Emission"
            pathD={TRACE_PATHS.stimulatedEmission}
            bounds={TRACE_BOUNDS.stimulatedEmission}
            polarity="negative"
            traceClassName="is-emission"
            traceScale={0.7}
        />
    );
}

function UltrafastDAExcitedStateAbsorption() {
    return (
        <UltrafastDASection
            section={SECTION_RECTS.bottomLeft}
            title="Excited State Absorption"
            pathD={TRACE_PATHS.excitedStateAbsorption}
            bounds={TRACE_BOUNDS.excitedStateAbsorption}
            polarity="positive"
            traceClassName="is-esa"
            traceScale={0.5}
            traceOffsetY={5}
        />
    );
}

function UltrafastDAProductAbsorption() {
    return (
        <UltrafastDASection
            section={SECTION_RECTS.bottomRight}
            title="Product Absorption"
            pathD={TRACE_PATHS.productAbsorption}
            bounds={TRACE_BOUNDS.productAbsorption}
            polarity="positive"
            traceClassName="is-product"
            traceScale={0.8}
        />
    );
}

export default function UltrafastDAVisual() {
    const rawId = useId();
    const ids = makeIds(rawId);
    return (
        <figure className="UltrafastDAVisual">
            <svg
                className="UltrafastDAVisual_SVG"
                viewBox={`0 0 ${VB.width} ${VB.height}`}
                role="img"
            >
                <UltrafastDAVisualDefs ids={ids} />
                <UltrafastDAVisualBackground ids={ids} />
                <UltrafastDAGroundStateBleach />
                <UltrafastDAStimulatedEmission />
                <UltrafastDAExcitedStateAbsorption />
                <UltrafastDAProductAbsorption />

            </svg>

            <figcaption className="UltrafastDAVisual_Caption">
                Representative ΔA(λ, t) signal components in transient absorption spectroscopy. The shapes shown here are schematic examples; real spectra vary with molecular structure, solvent environment, excitation conditions, probe delay, and the photophysical pathway being measured.
            </figcaption>
        </figure>
    )
}
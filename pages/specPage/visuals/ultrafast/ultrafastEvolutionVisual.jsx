import "./ultrafastEvolutionVisual.css";
import React, { useId } from "react";
const VB = {
    width: 640,
    height: 440,
};

const SVG_HALF = {
    x: VB.width / 2,
    y: VB.height / 2,
};

const BG_PAD = 10;

const BG_FRAME = {
    x: BG_PAD,
    y: 16,
    width: VB.width - BG_PAD * 2,
    height: VB.height - 32,
    rx: 26,
}

const SECTION_GAP = 14;

const PANEL_THIRDS = {
    left: {
        x: BG_FRAME.x + SECTION_GAP,
        width: BG_FRAME.width / 3 - SECTION_GAP * 1.25,
    },
    middle: {
        x: BG_FRAME.x + BG_FRAME.width / 3 + SECTION_GAP / 2,
        width: BG_FRAME.width / 3 - SECTION_GAP,
    },
    right: {
        x: BG_FRAME.x + (BG_FRAME.width * 2) / 3 + SECTION_GAP / 4,
        width: BG_FRAME.width / 3 - SECTION_GAP * 1.25,
    },
};

const EVOLUTION_TIMING = {
    cycle: 7,
    firstPartEnd: 2,
    arrowDrawEnd: 1.25,
    circleChangeStart: 1.45,
    endHoldStart: 6,
};

const TOP_SECTION_PIGMENT = {
    r: 18,
    activeR: 23,
};


PANEL_THIRDS.left.cx = PANEL_THIRDS.left.x + PANEL_THIRDS.left.width / 2;
PANEL_THIRDS.middle.cx = PANEL_THIRDS.middle.x + PANEL_THIRDS.middle.width / 2;
PANEL_THIRDS.right.cx = PANEL_THIRDS.right.x + PANEL_THIRDS.right.width / 2;

const TOP_LEFT_SECTION = {
    x: PANEL_THIRDS.left.x,
    y: BG_FRAME.y,
    width: PANEL_THIRDS.left.width,
    height: SVG_HALF.y - BG_FRAME.y,
};

TOP_LEFT_SECTION.cx = TOP_LEFT_SECTION.x + TOP_LEFT_SECTION.width / 2;
TOP_LEFT_SECTION.cy = TOP_LEFT_SECTION.y + TOP_LEFT_SECTION.height / 2;

const TOP_MIDDLE_SECTION = {
    x: PANEL_THIRDS.middle.x,
    y: BG_FRAME.y,
    width: PANEL_THIRDS.middle.width,
    height: SVG_HALF.y - BG_FRAME.y,
};

TOP_MIDDLE_SECTION.cx = TOP_MIDDLE_SECTION.x + TOP_MIDDLE_SECTION.width / 2;
TOP_MIDDLE_SECTION.cy = TOP_MIDDLE_SECTION.y + TOP_MIDDLE_SECTION.height / 2;

const TOP_RIGHT_SECTION = {
    x: PANEL_THIRDS.right.x,
    y: BG_FRAME.y,
    width: PANEL_THIRDS.right.width,
    height: SVG_HALF.y - BG_FRAME.y,
};

TOP_RIGHT_SECTION.cx = TOP_RIGHT_SECTION.x + TOP_RIGHT_SECTION.width / 2;
TOP_RIGHT_SECTION.cy = TOP_RIGHT_SECTION.y + TOP_RIGHT_SECTION.height / 2;

const TOP_RIGHT_SPLIT = {
    redShiftX: -44,
    yellowStartX: 10,
    yellowEndX: TOP_RIGHT_SECTION.width / 2 - 10,
    yellowR: 10,
    arrowY: 18,
};

const BOTTOM_LEFT_SECTION = {
    x: PANEL_THIRDS.left.x,
    y: SVG_HALF.y,
    width: PANEL_THIRDS.left.width,
    height: BG_FRAME.y + BG_FRAME.height - SVG_HALF.y,
};

const BOTTOM_MIDDLE_SECTION = {
    x: PANEL_THIRDS.middle.x,
    y: SVG_HALF.y,
    width: PANEL_THIRDS.middle.width,
    height: BG_FRAME.y + BG_FRAME.height - SVG_HALF.y,
};

const BOTTOM_RIGHT_SECTION = {
    x: PANEL_THIRDS.right.x,
    y: SVG_HALF.y,
    width: PANEL_THIRDS.right.width,
    height: BG_FRAME.y + BG_FRAME.height - SVG_HALF.y,
};

BOTTOM_LEFT_SECTION.cx = BOTTOM_LEFT_SECTION.x + BOTTOM_LEFT_SECTION.width / 2;
BOTTOM_MIDDLE_SECTION.cx = BOTTOM_MIDDLE_SECTION.x + BOTTOM_MIDDLE_SECTION.width / 2;
BOTTOM_RIGHT_SECTION.cx = BOTTOM_RIGHT_SECTION.x + BOTTOM_RIGHT_SECTION.width / 2;

const BOTTOM_DIVIDERS = {
    leftMidX: BG_FRAME.x + BG_FRAME.width / 3,
    midRightX: BG_FRAME.x + (BG_FRAME.width * 2) / 3,
};

const BOTTOM_PEAK = {
    d: "M218 169.014H197.838L180.197 167.518L165.075 164.029L152.474 160.04L143.653 154.557L132.312 144.088L118.451 123.15L109.63 109.192L103.329 95.2333L95.7688 81.7733L85.6879 59.3401L81.9075 47.8742L78.1272 38.9009L74.663 29.4291L70.5665 16.9662L66.6777 6.99587L63.0843 1.01367L59.8901 6.99587L57.9653 14.9721L56.7052 24.4439L54.185 43.8861L51.6647 61.3341L49.1445 81.7733L46.6243 100.717L45.3642 115.672L42.8439 132.123L41.5838 144.088L40.3237 151.566L39.0636 157.049L36.5434 162.533L34.0231 165.524L30.2428 167.518L22.6821 169.014H0",
    peakX: 63.0843,
    peakY: 1.01367,
    anchorY: SVG_HALF.y + 74,
    leftScaleX: 0.62,
    leftScaleY: 0.52,
    shiftScaleX: 0.42,
    shiftScaleY: 0.52,
    newScaleX: 0.24,
    newScaleY: 0.28,
};

const BOTTOM_AXIS = {
    x1: BG_FRAME.x + BG_FRAME.width - 24,
    x2: BG_FRAME.x + 26,
    y: BG_FRAME.y + BG_FRAME.height - 34,
    labelY: BG_FRAME.y + BG_FRAME.height - 14,
};

function UltrafastEvolutionDefs ({ ids }) {
    return (
        <defs>
            <linearGradient
                id={ids.bg}
                x1={BG_FRAME.x}
                y1={BG_FRAME.y}
                x2={BG_FRAME.x}
                y2={BG_FRAME.y + BG_FRAME.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--surface)" />
                <stop offset="58%" stopColor="var(--bg)" />
                <stop offset="100%" stopColor="var(--surface-2)" />
            </linearGradient>
            <radialGradient
                id={ids.wash}
                cx={SVG_HALF.x}
                cy={SVG_HALF.y}
                r={VB.width * 0.55}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-2-glow)" />
                <stop offset="55%" stopColor="color-mix(in oklab, var(--accent) 16%, transparent)" />
                <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient
                id={ids.circleGreen}
                cx="50%"
                cy="40%"
                r="70%"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent-4) 80%, white 20%)" />
                <stop offset="65%" stopColor="var(--accent-4)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--accent-4-dim) 80%, var(--bg) 20%)" />
            </radialGradient>
            <radialGradient
                id={ids.circleRed}
                cx="50%"
                cy="40%"
                r="70%"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent-3) 78%, white 22%)" />
                <stop offset="65%" stopColor="var(--accent-3)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--accent-3-dim) 82%, var(--bg) 18%)" />
            </radialGradient>
            <filter
                id={ids.redGlow}
                x="-80%"
                y="-80%"
                width="260%"
                height="260%"
            >
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feColorMatrix
                    in="blur"
                    type="matrix"
                    values="
                        1 0 0 0 0
                        0 0.3 0 0 0
                        0 0 0.55 0 0
                        0 0 0 1 0
                    "
                    result="glow"
                />
                <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    );
}

function BackgroundPanel({ ids }) {
    return (
        <g className="ultrafastEvolution_BackgroundPanel">
            <rect
                x={BG_FRAME.x}
                y={BG_FRAME.y}
                width={BG_FRAME.width}
                height={BG_FRAME.height}
                rx={BG_FRAME.rx}
                fill={`url(#${ids.bg})`}
            />
            <rect
                x={BG_FRAME.x}
                y={BG_FRAME.y}
                width={BG_FRAME.width}
                height={BG_FRAME.height}
                rx={BG_FRAME.rx}
                fill={`url(#${ids.wash})`}
                opacity="0.65"
            />
            <line
                x1={BG_FRAME.x}
                y1={SVG_HALF.y}
                x2={BG_FRAME.x + BG_FRAME.width}
                y2={SVG_HALF.y}
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.7"
            />

            <line
                x1={BG_FRAME.x + BG_FRAME.width / 3}
                y1={BG_FRAME.y}
                x2={BG_FRAME.x + BG_FRAME.width / 3}
                y2={BG_FRAME.y + BG_FRAME.height}
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.7"
            />
            <line
                x1={BG_FRAME.x + (BG_FRAME.width * 2) / 3}
                y1={BG_FRAME.y}
                x2={BG_FRAME.x + (BG_FRAME.width * 2) / 3}
                y2={BG_FRAME.y + BG_FRAME.height}
                stroke="var(--border)"
                strokeWidth="1"
                opacity="0.7"
            />
            <rect
                x={BG_FRAME.x}
                y={BG_FRAME.y}
                width={BG_FRAME.width}
                height={BG_FRAME.height}
                rx={BG_FRAME.rx}
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth="1.2"
            />
        </g>
    );
}

function UltrafastEvolutionTopLeftCircleArrow({ ids }) {
    const arrowStart = {
        x: TOP_LEFT_SECTION.x + 20,
        y: TOP_LEFT_SECTION.y + 20,
    };

    const arrowEnd = {
        x: TOP_LEFT_SECTION.cx - 28,
        y: TOP_LEFT_SECTION.cy - 28,
    };

    const arrowLength = Math.hypot(
        arrowEnd.x - arrowStart.x,
        arrowEnd.y - arrowStart.y
    );

    const arrowAngle =
        Math.atan2(arrowEnd.y - arrowStart.y, arrowEnd.x - arrowStart.x) *
        (180 / Math.PI);
    const arrowDrawKey = EVOLUTION_TIMING.arrowDrawEnd / EVOLUTION_TIMING.cycle;
    const circleStartKey = EVOLUTION_TIMING.circleChangeStart / EVOLUTION_TIMING.cycle;
    const firstPartKey = EVOLUTION_TIMING.firstPartEnd / EVOLUTION_TIMING.cycle;

    return (
        <g className="ultrafastEvolution_TopLeftCircleArrow">
            <path
                d={`M ${arrowStart.x} ${arrowStart.y} L ${arrowEnd.x} ${arrowEnd.y}`}
                fill="none"
                stroke="var(--accent-2)"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeDasharray={arrowLength}
                strokeDashoffset={arrowLength}
            >
                <animate
                    attributeName="stroke-dashoffset"
                    dur={`${EVOLUTION_TIMING.cycle}s`}
                    repeatCount="indefinite"
                    values={`${arrowLength}; 0; 0; ${arrowLength}`}
                    keyTimes={`0; ${arrowDrawKey}; 0.985; 1`}
                />
            </path>
            <path
                d="M 0 -7 L 15 0 L 0 7 Z"
                transform={`translate(${arrowEnd.x}, ${arrowEnd.y}) rotate(${arrowAngle})`}
                fill="var(--accent-2)"
                opacity="0"
            >
                <animate
                    attributeName="opacity"
                    dur={`${EVOLUTION_TIMING.cycle}s`}
                    repeatCount="indefinite"
                    values="0; 0; 1; 1; 0"
                    keyTimes={`0; ${arrowDrawKey}; ${circleStartKey}; 0.985; 1`}
                />
            </path>

            <g transform={`translate(${TOP_LEFT_SECTION.cx}, ${TOP_LEFT_SECTION.cy})`}>
                <circle
                    r={TOP_SECTION_PIGMENT.r}
                    fill={`url(#${ids.circleGreen})`}
                    stroke="color-mix(in oklab, var(--accent-4) 72%, white 28%)"
                    strokeWidth="1.4"
                    opacity="1"
                >
                    <animate
                        attributeName="r"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values={`${TOP_SECTION_PIGMENT.r}; ${TOP_SECTION_PIGMENT.r}; ${TOP_SECTION_PIGMENT.activeR}; ${TOP_SECTION_PIGMENT.activeR}; ${TOP_SECTION_PIGMENT.r}`}
                        keyTimes={`0; ${circleStartKey}; ${firstPartKey}; 0.985; 1`}
                    />

                    <animate
                        attributeName="opacity"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values="1; 1; 0; 0; 1"
                        keyTimes={`0; ${circleStartKey}; ${firstPartKey}; 0.985; 1`}
                    />
                </circle>
                <circle
                    r={TOP_SECTION_PIGMENT.r + 2}
                    fill="var(--accent-3)"
                    opacity="0"
                    filter={`url(#${ids.redGlow})`}
                >
                    <animate
                        attributeName="r"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values={`${TOP_SECTION_PIGMENT.r + 2}; ${TOP_SECTION_PIGMENT.r + 2}; ${TOP_SECTION_PIGMENT.activeR + 3}; ${TOP_SECTION_PIGMENT.activeR + 3}; ${TOP_SECTION_PIGMENT.r + 2}`}
                        keyTimes={`0; ${circleStartKey}; ${firstPartKey}; 0.985; 1`}
                    />
                    <animate
                        attributeName="opacity"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values="0; 0; 0.55; 0.55; 0"
                        keyTimes={`0; ${circleStartKey}; ${firstPartKey}; 0.985; 1`}
                    />
                </circle>
                <circle
                    r={TOP_SECTION_PIGMENT.r}
                    fill={`url(#${ids.circleRed})`}
                    stroke="color-mix(in oklab, var(--accent-3) 72%, white 28%)"
                    strokeWidth="1.4"
                    opacity="0"
                >
                    <animate
                        attributeName="r"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values={`${TOP_SECTION_PIGMENT.r}; ${TOP_SECTION_PIGMENT.r}; ${TOP_SECTION_PIGMENT.activeR}; ${TOP_SECTION_PIGMENT.activeR}; ${TOP_SECTION_PIGMENT.r}`}
                        keyTimes={`0; ${circleStartKey}; ${firstPartKey}; 0.985; 1`}
                    />

                    <animate
                        attributeName="opacity"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values="0; 0; 1; 1; 0"
                        keyTimes={`0; ${circleStartKey}; ${firstPartKey}; 0.985; 1`}
                    />
                </circle>
            </g>
        </g>
    );
}

function UltrafastEvolutionTopCenterCircleArrow({ ids }) {
    const sectionStart = 2.0;
    const arrowDrawEnd = 3.2;
    const circleChangeStart = 3.35;
    const sectionEnd = 4.0;

    const sectionStartKey = sectionStart / EVOLUTION_TIMING.cycle;
    const arrowDrawKey = arrowDrawEnd / EVOLUTION_TIMING.cycle;
    const circleStartKey = circleChangeStart / EVOLUTION_TIMING.cycle;
    const sectionEndKey = sectionEnd / EVOLUTION_TIMING.cycle;

    const startPoint = {
        x: TOP_LEFT_SECTION.cx + TOP_SECTION_PIGMENT.activeR - 8,
        y: TOP_LEFT_SECTION.cy - 18,
    };

    const endPoint = {
        x: TOP_MIDDLE_SECTION.cx - TOP_SECTION_PIGMENT.r - 12,
        y: TOP_MIDDLE_SECTION.cy - 24,
    };

    const controlPoint = {
        x: (startPoint.x + endPoint.x) / 2,
        y: Math.min(startPoint.y, endPoint.y) - 68,
    };

    const arrowAngle =
        Math.atan2(endPoint.y - controlPoint.y, endPoint.x - controlPoint.x) *
        (180 / Math.PI);

    return (
        <g className="ultrafastEvolution_TopCenterCircleArrow">
            <path
                d={`M ${startPoint.x} ${startPoint.y} Q ${controlPoint.x} ${controlPoint.y} ${endPoint.x} ${endPoint.y}`}
                fill="none"
                stroke="var(--accent-2)"
                strokeWidth="2.4"
                strokeLinecap="round"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset="100"
            >
                <animate
                    attributeName="stroke-dashoffset"
                    dur={`${EVOLUTION_TIMING.cycle}s`}
                    repeatCount="indefinite"
                    values="100; 100; 0; 0; 100"
                    keyTimes={`0; ${sectionStartKey}; ${arrowDrawKey}; 0.985; 1`}
                />
            </path>

            <path
                d="M 0 -7 L 15 0 L 0 7 Z"
                transform={`translate(${endPoint.x}, ${endPoint.y}) rotate(${arrowAngle})`}
                fill="var(--accent-2)"
                opacity="0"
            >
                <animate
                    attributeName="opacity"
                    dur={`${EVOLUTION_TIMING.cycle}s`}
                    repeatCount="indefinite"
                    values="0; 0; 0; 1; 1; 0"
                    keyTimes={`0; ${sectionStartKey}; ${arrowDrawKey}; ${circleStartKey}; 0.985; 1`}
                />
            </path>

            <g transform={`translate(${TOP_MIDDLE_SECTION.cx}, ${TOP_MIDDLE_SECTION.cy})`}>
                <circle
                    r={TOP_SECTION_PIGMENT.r}
                    fill={`url(#${ids.circleGreen})`}
                    stroke="color-mix(in oklab, var(--accent-4) 72%, white 28%)"
                    strokeWidth="1.4"
                    opacity="1"
                >
                    <animate
                        attributeName="r"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values={`${TOP_SECTION_PIGMENT.r}; ${TOP_SECTION_PIGMENT.r}; ${TOP_SECTION_PIGMENT.r}; ${TOP_SECTION_PIGMENT.activeR}; ${TOP_SECTION_PIGMENT.activeR}; ${TOP_SECTION_PIGMENT.r}`}
                        keyTimes={`0; ${sectionStartKey}; ${circleStartKey}; ${sectionEndKey}; 0.985; 1`}
                    />
                    <animate
                        attributeName="opacity"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values="1; 1; 1; 0; 0; 1"
                        keyTimes={`0; ${sectionStartKey}; ${circleStartKey}; ${sectionEndKey}; 0.985; 1`}
                    />
                </circle>

                <circle
                    r={TOP_SECTION_PIGMENT.r + 2}
                    fill="var(--accent-3)"
                    opacity="0"
                    filter={`url(#${ids.redGlow})`}
                >
                    <animate
                        attributeName="r"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values={`${TOP_SECTION_PIGMENT.r + 2}; ${TOP_SECTION_PIGMENT.r + 2}; ${TOP_SECTION_PIGMENT.r + 2}; ${TOP_SECTION_PIGMENT.activeR + 3}; ${TOP_SECTION_PIGMENT.activeR + 3}; ${TOP_SECTION_PIGMENT.r + 2}`}
                        keyTimes={`0; ${sectionStartKey}; ${circleStartKey}; ${sectionEndKey}; 0.985; 1`}
                    />
                    <animate
                        attributeName="opacity"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values="0; 0; 0; 0.6; 0.6; 0"
                        keyTimes={`0; ${sectionStartKey}; ${circleStartKey}; ${sectionEndKey}; 0.985; 1`}
                    />
                </circle>

                <circle
                    r={TOP_SECTION_PIGMENT.r}
                    fill={`url(#${ids.circleRed})`}
                    stroke="color-mix(in oklab, var(--accent-3) 72%, white 28%)"
                    strokeWidth="1.4"
                    opacity="0"
                >
                    <animate
                        attributeName="r"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values={`${TOP_SECTION_PIGMENT.r}; ${TOP_SECTION_PIGMENT.r}; ${TOP_SECTION_PIGMENT.r}; ${TOP_SECTION_PIGMENT.activeR}; ${TOP_SECTION_PIGMENT.activeR}; ${TOP_SECTION_PIGMENT.r}`}
                        keyTimes={`0; ${sectionStartKey}; ${circleStartKey}; ${sectionEndKey}; 0.985; 1`}
                    />
                    <animate
                        attributeName="opacity"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values="0; 0; 0; 1; 1; 0"
                        keyTimes={`0; ${sectionStartKey}; ${circleStartKey}; ${sectionEndKey}; 0.985; 1`}
                    />
                </circle>
            </g>
        </g>
    );
}

function UltrafastEvolutionTopRightCircleSplit({ ids }) {
    const circleChangeStart = 4.2;
    const circleChangeEnd = 4.58;

    const splitStart = 4.72;
    const yellowAppear = 4.76;
    const cycleHoldEnd = 5.9;
    const endHoldKey = EVOLUTION_TIMING.endHoldStart / EVOLUTION_TIMING.cycle;

    const circleStartKey = circleChangeStart / EVOLUTION_TIMING.cycle;
    const circleEndKey = circleChangeEnd / EVOLUTION_TIMING.cycle;
    const splitStartKey = splitStart / EVOLUTION_TIMING.cycle;
    const yellowAppearKey = yellowAppear / EVOLUTION_TIMING.cycle;
    const cycleHoldEndKey = cycleHoldEnd / EVOLUTION_TIMING.cycle;

    const splitArrow = {
        x1: TOP_RIGHT_SPLIT.yellowStartX - 15,
        x2: TOP_RIGHT_SPLIT.yellowEndX - 25,
        y: 0,
    };

    return (
        <g className="ultrafastEvolution_TopRightCircleSplit">
            <g transform={`translate(${TOP_RIGHT_SECTION.cx}, ${TOP_RIGHT_SECTION.cy})`}>
                <circle
                    r={TOP_SECTION_PIGMENT.r}
                    fill={`url(#${ids.circleGreen})`}
                    stroke="color-mix(in oklab, var(--accent-4) 72%, white 28%)"
                    strokeWidth="1.4"
                    opacity="1"
                >
                    <animate
                        attributeName="r"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values={`
                            ${TOP_SECTION_PIGMENT.r};
                            ${TOP_SECTION_PIGMENT.r};
                            ${TOP_SECTION_PIGMENT.activeR};
                            ${TOP_SECTION_PIGMENT.activeR}
                        `}
                        keyTimes={`0; ${circleStartKey}; ${circleEndKey}; 1`}
                    />

                    <animate
                        attributeName="opacity"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values="1; 1; 0; 0"
                        keyTimes={`0; ${circleStartKey}; ${circleEndKey}; 1`}
                    />
                </circle>
                <g>
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values={`
                            0 0;
                            0 0;
                            ${TOP_RIGHT_SPLIT.redShiftX} 0;
                            ${TOP_RIGHT_SPLIT.redShiftX} 0
                        `}
                        keyTimes={`0; ${splitStartKey}; ${endHoldKey}; 1`}
                    />

                    <circle
                        r={TOP_SECTION_PIGMENT.r + 2}
                        fill="var(--accent-3)"
                        opacity="0"
                        filter={`url(#${ids.redGlow})`}
                    >
                        <animate
                            attributeName="r"
                            dur={`${EVOLUTION_TIMING.cycle}s`}
                            repeatCount="indefinite"
                            values={`
                                ${TOP_SECTION_PIGMENT.r + 2};
                                ${TOP_SECTION_PIGMENT.r + 2};
                                ${TOP_SECTION_PIGMENT.activeR + 4};
                                ${TOP_SECTION_PIGMENT.activeR + 4};
                                ${TOP_SECTION_PIGMENT.r + 2};
                                ${TOP_SECTION_PIGMENT.r + 2}
                            `}
                            keyTimes={`0; ${circleStartKey}; ${circleEndKey}; ${splitStartKey}; ${endHoldKey}; 1`}
                        />
                        <animate
                            attributeName="opacity"
                            dur={`${EVOLUTION_TIMING.cycle}s`}
                            repeatCount="indefinite"
                            values="0; 0; 0.68; 0.68; 0; 0"
                            keyTimes={`0; ${circleStartKey}; ${circleEndKey}; ${splitStartKey}; ${endHoldKey}; 1`}
                        />
                    </circle>

                    <circle
                        r={TOP_SECTION_PIGMENT.r}
                        fill={`url(#${ids.circleRed})`}
                        stroke="color-mix(in oklab, var(--accent-3) 72%, white 28%)"
                        strokeWidth="1.4"
                        opacity="0"
                    >
                        <animate
                            attributeName="r"
                            dur={`${EVOLUTION_TIMING.cycle}s`}
                            repeatCount="indefinite"
                            values={`
                                ${TOP_SECTION_PIGMENT.r};
                                ${TOP_SECTION_PIGMENT.r};
                                ${TOP_SECTION_PIGMENT.activeR};
                                ${TOP_SECTION_PIGMENT.activeR};
                                ${TOP_SECTION_PIGMENT.r};
                                ${TOP_SECTION_PIGMENT.r}
                            `}
                            keyTimes={`0; ${circleStartKey}; ${circleEndKey}; ${splitStartKey}; ${endHoldKey}; 1`}
                        />
                        <animate
                            attributeName="opacity"
                            dur={`${EVOLUTION_TIMING.cycle}s`}
                            repeatCount="indefinite"
                            values="0; 0; 1; 1; 0; 0"
                            keyTimes={`0; ${circleStartKey}; ${circleEndKey}; ${splitStartKey}; ${endHoldKey}; 1`}
                        />
                    </circle>

                    <circle
                        r={TOP_SECTION_PIGMENT.r}
                        fill={`url(#${ids.circleGreen})`}
                        stroke="color-mix(in oklab, var(--accent-4) 72%, white 28%)"
                        strokeWidth="1.4"
                        opacity="0"
                    >
                        <animate
                            attributeName="r"
                            dur={`${EVOLUTION_TIMING.cycle}s`}
                            repeatCount="indefinite"
                            values={`
                                ${TOP_SECTION_PIGMENT.r};
                                ${TOP_SECTION_PIGMENT.r};
                                ${TOP_SECTION_PIGMENT.activeR};
                                ${TOP_SECTION_PIGMENT.r};
                                ${TOP_SECTION_PIGMENT.r}
                            `}
                            keyTimes={`0; ${circleEndKey}; ${splitStartKey}; ${endHoldKey}; 1`}
                        />

                        <animate
                            attributeName="opacity"
                            dur={`${EVOLUTION_TIMING.cycle}s`}
                            repeatCount="indefinite"
                            values="0; 0; 0; 1; 1"
                            keyTimes={`0; ${circleEndKey}; ${splitStartKey}; ${endHoldKey}; 1`}
                        />
                    </circle>
                </g>
                <g opacity="0">
                    <animate
                        attributeName="opacity"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values="0; 0; 1; 1; 0"
                        keyTimes={`0; ${splitStartKey}; ${yellowAppearKey}; ${cycleHoldEndKey}; 1`}
                    />

                    <line
                        x1={splitArrow.x1}
                        y1={splitArrow.y}
                        x2={splitArrow.x2}
                        y2={splitArrow.y}
                        stroke="#FFE45C"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        opacity="0.85"
                    />

                    <path
                        d="M 0 -5 L 12 0 L 0 5 Z"
                        transform={`translate(${splitArrow.x2}, ${splitArrow.y})`}
                        fill="#FFE45C"
                        opacity="0.9"
                    />
                </g>
                <g>
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values={`
                            ${TOP_RIGHT_SPLIT.yellowStartX} 0;
                            ${TOP_RIGHT_SPLIT.yellowStartX} 0;
                            ${TOP_RIGHT_SPLIT.yellowEndX} 0;
                            ${TOP_RIGHT_SPLIT.yellowEndX} 0
                        `}
                        keyTimes={`0; ${splitStartKey}; ${endHoldKey}; 1`}
                    />

                    <animate
                        attributeName="opacity"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values="0; 0; 1; 1"
                        keyTimes={`0; ${splitStartKey}; ${yellowAppearKey}; 1`}
                    />

                    <circle
                        cx="0"
                        cy="0"
                        r={TOP_RIGHT_SPLIT.yellowR}
                        fill="#FFE45C"
                        stroke="color-mix(in oklab, #FFE45C 70%, white 30%)"
                        strokeWidth="1"
                    />

                    <text
                        x="0"
                        y="0.5"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="var(--bg)"
                        fontFamily="var(--font-tech)"
                        fontSize="20"
                        fontWeight="700"
                        pointerEvents="none"
                    >
                        −
                    </text>
                </g>
            </g>
        </g>
    );
}

function UltrafastEvolutionTopLabels() {
    const labelY = SVG_HALF.y - 18;
    const twoLineLabelY = SVG_HALF.y - 32;

    return (
        <g className="ultrafastEvolution_TopLabels">
            <text
                x={TOP_LEFT_SECTION.cx}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="ultrafastEvolution_TopLabel"
            >
                excitation
            </text>

            <text
                x={TOP_MIDDLE_SECTION.cx}
                y={labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="ultrafastEvolution_TopLabel"
            >
                energy migration
            </text>

            <text
                x={TOP_RIGHT_SECTION.cx}
                y={twoLineLabelY}
                textAnchor="middle"
                dominantBaseline="middle"
                className="ultrafastEvolution_TopLabel"
            >
                <tspan x={TOP_RIGHT_SECTION.cx} dy="0">
                    relaxation +
                </tspan>
                <tspan x={TOP_RIGHT_SECTION.cx} dy="1.18em">
                    charge separation
                </tspan>
            </text>
        </g>
    );
}

function UltrafastEvolutionBottomEnergySequence() {
    const endHoldKey = EVOLUTION_TIMING.endHoldStart / EVOLUTION_TIMING.cycle;

    const firstDrawStart = 0.18 / EVOLUTION_TIMING.cycle;
    const firstDrawEnd = 0.95 / EVOLUTION_TIMING.cycle;

    const firstLabelStart = 0.82 / EVOLUTION_TIMING.cycle;
    const firstLabelEnd = 1.98 / EVOLUTION_TIMING.cycle;
    const firstSectionEnd = 1.98 / EVOLUTION_TIMING.cycle;

    const secondMoveStart = 2.08 / EVOLUTION_TIMING.cycle;
    const secondMoveEnd = 2.92 / EVOLUTION_TIMING.cycle;

    const secondLabelStart = 2.58 / EVOLUTION_TIMING.cycle;
    const secondLabelEnd = 3.95 / EVOLUTION_TIMING.cycle;
    const secondSectionEnd = 3.95 / EVOLUTION_TIMING.cycle;

    const thirdFadeStart = 4.12 / EVOLUTION_TIMING.cycle;
    const thirdPeakDrawStart = 4.30 / EVOLUTION_TIMING.cycle;
    const thirdPeakDrawEnd = 5.08 / EVOLUTION_TIMING.cycle;

    const thirdLabelStart = 4.72 / EVOLUTION_TIMING.cycle;
    const thirdLabelEnd = 5.98 / EVOLUTION_TIMING.cycle;

    return (
        <g className="ultrafastEvolution_BottomEnergySequence">
            <g className="ultrafastEvolution_EnergyAxis">
                <line
                    x1={BOTTOM_AXIS.x1}
                    y1={BOTTOM_AXIS.y}
                    x2={BOTTOM_AXIS.x2}
                    y2={BOTTOM_AXIS.y}
                    stroke="var(--text-dim)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    opacity="0.9"
                />
                <path
                    d="M 0 0 L 12 -6 L 12 6 Z"
                    transform={`translate(${BOTTOM_AXIS.x2}, ${BOTTOM_AXIS.y})`}
                    fill="var(--text-dim)"
                    opacity="0.92"
                />
                <text
                    x={(BOTTOM_AXIS.x1 + BOTTOM_AXIS.x2) / 2}
                    y={BOTTOM_AXIS.labelY}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="ultrafastEvolution_EnergyLabel"
                >
                    Energy
                </text>
            </g>

            <g className="ultrafastEvolution_MainPeak">
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    dur={`${EVOLUTION_TIMING.cycle}s`}
                    repeatCount="indefinite"
                    values={`
                        ${BOTTOM_LEFT_SECTION.cx} ${BOTTOM_PEAK.anchorY};
                        ${BOTTOM_LEFT_SECTION.cx} ${BOTTOM_PEAK.anchorY};
                        ${BOTTOM_DIVIDERS.leftMidX} ${BOTTOM_PEAK.anchorY};
                        ${BOTTOM_DIVIDERS.leftMidX} ${BOTTOM_PEAK.anchorY}
                    `}
                    keyTimes={`0; ${secondMoveStart}; ${secondMoveEnd}; 1`}
                />
                <animate
                    attributeName="opacity"
                    dur={`${EVOLUTION_TIMING.cycle}s`}
                    repeatCount="indefinite"
                    values="0; 0; 1; 1; 0.28; 0.28"
                    keyTimes={`0; ${firstDrawStart}; ${firstDrawEnd}; ${thirdFadeStart}; ${endHoldKey}; 1`}
                />

                <g>
                    <animateTransform
                        attributeName="transform"
                        type="scale"
                        dur={`${EVOLUTION_TIMING.cycle}s`}
                        repeatCount="indefinite"
                        values={`
                            ${BOTTOM_PEAK.leftScaleX} ${BOTTOM_PEAK.leftScaleY};
                            ${BOTTOM_PEAK.leftScaleX} ${BOTTOM_PEAK.leftScaleY};
                            ${BOTTOM_PEAK.shiftScaleX} ${BOTTOM_PEAK.shiftScaleY};
                            ${BOTTOM_PEAK.shiftScaleX} ${BOTTOM_PEAK.shiftScaleY}
                        `}
                        keyTimes={`0; ${secondMoveStart}; ${secondMoveEnd}; 1`}
                    />
                    <path
                        d={BOTTOM_PEAK.d}
                        transform={`translate(${-BOTTOM_PEAK.peakX}, ${-BOTTOM_PEAK.peakY})`}
                        fill="none"
                        stroke="var(--accent-2)"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        pathLength="100"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            dur={`${EVOLUTION_TIMING.cycle}s`}
                            repeatCount="indefinite"
                            values="-100; -100; 0; 0"
                            keyTimes={`0; ${firstDrawStart}; ${firstDrawEnd}; 1`}
                        />
                    </path>
                </g>
            </g>

            <g
                className="ultrafastEvolution_NewPeak"
                transform={`translate(${BOTTOM_DIVIDERS.midRightX} ${BOTTOM_PEAK.anchorY + 40})`}
                opacity="0"
            >
                <animate
                    attributeName="opacity"
                    dur={`${EVOLUTION_TIMING.cycle}s`}
                    repeatCount="indefinite"
                    values="0; 0; 1; 1; 1; 1"
                    keyTimes={`0; ${thirdPeakDrawStart}; ${thirdPeakDrawEnd}; ${thirdLabelEnd}; ${endHoldKey}; 1`}
                />

                <g transform={`scale(${BOTTOM_PEAK.newScaleX} ${BOTTOM_PEAK.newScaleY})`}>
                    <path
                        d={BOTTOM_PEAK.d}
                        transform={`translate(${-BOTTOM_PEAK.peakX}, ${-BOTTOM_PEAK.peakY})`}
                        fill="none"
                        stroke="var(--accent-3)"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        vectorEffect="non-scaling-stroke"
                        pathLength="100"
                        strokeDasharray="100"
                        strokeDashoffset="100"
                        opacity="0.95"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            dur={`${EVOLUTION_TIMING.cycle}s`}
                            repeatCount="indefinite"
                            values="-100; -100; 0; 0"
                            keyTimes={`0; ${thirdPeakDrawStart}; ${thirdPeakDrawEnd}; 1`}
                        />
                    </path>
                </g>
            </g>

            {/* labels */}
            <text
                x={BOTTOM_LEFT_SECTION.cx}
                y={BOTTOM_PEAK.anchorY - 20}
                textAnchor="middle"
                dominantBaseline="middle"
                className="ultrafastEvolution_PeakActionLabel"
                opacity="0"
            >
                <animate
                    attributeName="opacity"
                    dur={`${EVOLUTION_TIMING.cycle}s`}
                    repeatCount="indefinite"
                    values="0; 0; 1; 1; 0; 0"
                    keyTimes={`0; ${firstDrawStart}; ${firstLabelStart}; ${firstLabelEnd}; ${firstSectionEnd}; 1`}
                />
                peak appears!
            </text>

            <text
                x={BOTTOM_DIVIDERS.leftMidX}
                y={BOTTOM_PEAK.anchorY - 33}
                textAnchor="middle"
                dominantBaseline="middle"
                className="ultrafastEvolution_PeakActionLabel"
                opacity="0"
            >
                <animate
                    attributeName="opacity"
                    dur={`${EVOLUTION_TIMING.cycle}s`}
                    repeatCount="indefinite"
                    values="0; 0; 1; 1; 0; 0"
                    keyTimes={`0; ${secondMoveStart}; ${secondLabelStart}; ${secondLabelEnd}; ${secondSectionEnd}; 1`}
                />
                <tspan x={BOTTOM_DIVIDERS.leftMidX} dy="0">
                    peak shifts +
                </tspan>
                <tspan x={BOTTOM_DIVIDERS.leftMidX} dy="1.15em">
                    changes shape
                </tspan>
            </text>

            <text
                x={BOTTOM_DIVIDERS.midRightX}
                y={BOTTOM_PEAK.anchorY + 22}
                textAnchor="middle"
                dominantBaseline="middle"
                className="ultrafastEvolution_PeakActionLabel"
                opacity="0"
            >
                <animate
                    attributeName="opacity"
                    dur={`${EVOLUTION_TIMING.cycle}s`}
                    repeatCount="indefinite"
                    values="0; 0; 1; 1; 0; 0"
                    keyTimes={`0; ${thirdPeakDrawStart}; ${thirdLabelStart}; ${thirdLabelEnd}; ${endHoldKey}; 1`}
                />
                new peak appears
            </text>
        </g>
    );
}

export default function UltrafastEvolutionVisual() {
    const rawId = useId().replace(/:/g, "-");
    const ids = {
        bg: `ultrafast-evolution-bg-${rawId}`,
        wash: `ultrafast-evolution-wash-${rawId}`,
        circleGreen: `ultrafast-evolution-circle-green-${rawId}`,
        circleRed: `ultrafast-evolution-circle-red-${rawId}`,
        redGlow: `ultrafast-evolution-red-glow-${rawId}`,
    };

    return (
        <figure className="ultrafastEvolution_Figure">
            <svg
                className="ultrafastEvolution_SVG"
                viewBox={`0 0 ${VB.width} ${VB.height}`}
                role="img"
            >
                <UltrafastEvolutionDefs ids={ids} />
                <BackgroundPanel ids={ids} />
                <UltrafastEvolutionTopLeftCircleArrow ids={ids} />
                <UltrafastEvolutionTopCenterCircleArrow ids={ids} />
                <UltrafastEvolutionTopRightCircleSplit ids={ids} />
                <UltrafastEvolutionTopLabels />
                <UltrafastEvolutionBottomEnergySequence />
            </svg>
            <figcaption className="ultrafastPumpCaption">
                This animation shows one possible example of how transient absorption peaks can appear, shift, fade, or grow. Real spectra are often more complex, and their shapes depend on the unique light-driven behavior of the sample being studied.
            </figcaption>
        </figure>
    );
}
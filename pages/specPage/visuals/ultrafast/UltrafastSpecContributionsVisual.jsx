import React, { useId } from "react";
import "./ultrafastSpecContributionsVisual.css";

const VB = {
    width: 640,
    height: 540,
};

const BG_PAD = 10;
const SPLIT_GAP = 5;

const BG_FRAME = {
    x: BG_PAD,
    y: BG_PAD,
    width: VB.width - BG_PAD * 2,
    height: VB.height - BG_PAD * 2,
    rx: 26,
};

const SPLIT = {
    v: BG_FRAME.x + BG_FRAME.width / 2,
    h: BG_FRAME.y + BG_FRAME.height / 2, 
};

const AXIS = {
    leftGap: 48,
    rightGap: 34,
    topGap: 38,
    bottomGap: 42,
    yLabelGap: 10,
    xLabelGap: 20,
    zeroLabelGap: -15,
    tickHalf: 5,
};

const QUADRANTS = [
    {
        id: "top-left",
        xLabel: "Frequency Offset (ν - ν₀)",
        peakVariant: "xShrunk",
        peakColor: "pink",
        x: BG_FRAME.x,
        y: BG_FRAME.y,
        width: BG_FRAME.width / 2,
        height: BG_FRAME.height / 2,
    },
    {
        id: "top-right",
        xLabel: "Time [ps]",
        peakVariant: "wideLow",
        peakColor: "purple",
        x: SPLIT.v,
        y: BG_FRAME.y,
        width: BG_FRAME.width / 2,
        height: BG_FRAME.height / 2,
    },
    {
        id: "bottom-left",
        xLabel: "Frequency (ν - ν₀)",
        peakVariant: "wideLow",
        peakColor: "purple",
        x: BG_FRAME.x,
        y: SPLIT.h,
        width: BG_FRAME.width / 2,
        height: BG_FRAME.height / 2,
    },
    {
        id: "bottom-right",
        xLabel: "Time [ps]",
        peakVariant: "xShrunk",
        peakColor: "pink",
        x: SPLIT.v,
        y: SPLIT.h,
        width: BG_FRAME.width / 2,
        height: BG_FRAME.height / 2,
    },
];

const PEAK_PATH_D =
    "M0 345H59.5H110L139 341L173 334L207 320.5L234 301L257.5 275L285.5 235L313.5 182L339 133.5L367 81.5L386.5 47L406 19.5L421 5.5L433.5 0.5H441L453.5 5.5L467.5 19.5L486.5 47L506 81.5L533.5 133.5L554.5 173.5L573 208L594.5 245.5L613 272L627 290L649.5 311L668.5 322L690 330L717 336.5L747 339.5H807H841.5";

const PEAK_SRC = {
    width: 841.5,
    height: 345,
    baselineY: 345,
};

const CENTER_ARROW = {
    insetX: 220,
};

function makeSafeId(id) {
  return id.replace(/:/g, "-");
}

function UltrafastSpecContributionsDefs({ ids }) {
    return (
        <defs>
            <linearGradient
                id={ids.bgGradId}
                x1={BG_FRAME.x}
                y1={BG_FRAME.y}
                x2={BG_FRAME.x + BG_FRAME.width}
                y2={BG_FRAME.y + BG_FRAME.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--c-shadow)" stopOpacity="0.98" />
                <stop offset="48%" stopColor="var(--c-ink)" stopOpacity="0.96" />
                <stop offset="100%" stopColor="var(--c-glow-2)" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient
                id={ids.peakPinkGradId}
                x1="0"
                y1="0"
                x2={PEAK_SRC.width}
                y2="0"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--c-glow-3)" stopOpacity="0.30" />
                <stop offset="18%" stopColor="var(--c-glow-3)" stopOpacity="0.74" />
                <stop offset="50%" stopColor="var(--c-glow-3)" stopOpacity="1" />
                <stop offset="82%" stopColor="var(--c-glow-3)" stopOpacity="0.74" />
                <stop offset="100%" stopColor="var(--c-glow-3)" stopOpacity="0.30" />
            </linearGradient>

            <linearGradient
                id={ids.peakPurpleGradId}
                x1="0"
                y1="0"
                x2={PEAK_SRC.width}
                y2="0"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--c-glow-2)" stopOpacity="0.30" />
                <stop offset="18%" stopColor="var(--c-glow-2)" stopOpacity="0.74" />
                <stop offset="50%" stopColor="var(--c-glow-2)" stopOpacity="1" />
                <stop offset="82%" stopColor="var(--c-glow-2)" stopOpacity="0.74" />
                <stop offset="100%" stopColor="var(--c-glow-2)" stopOpacity="0.30" />
            </linearGradient>
        </defs>
    );
}

function UltrafastSpecContributionsBackground({ ids }) {
    return (
        <g className="UltrafastSpecContributions_Background">
            <rect
                className="UltrafastSpecContributions_BGFrame"
                x={BG_FRAME.x}
                y={BG_FRAME.y}
                width={BG_FRAME.width}
                height={BG_FRAME.height}
                rx={BG_FRAME.rx}
                fill={`url(#${ids.bgGradId})`}
            />
            <line
                className="UltrafastSpecContributions_SplitLine"
                x1={BG_FRAME.x + SPLIT_GAP}
                y1={SPLIT.h + 10}
                x2={BG_FRAME.x + BG_FRAME.width - SPLIT_GAP}
                y2={SPLIT.h + 10}
            />
        </g>
    );
}

function getPeakMetrics(q) {
    const axisX = q.x + AXIS.leftGap;
    const axisBottomY = q.y + q.height - AXIS.bottomGap;
    const axisRightX = q.x + q.width - AXIS.rightGap;

    const tickX = axisX + (axisRightX - axisX) / 2;

    let sx = 0.13;
    let sy = 0.22;

    if (q.peakVariant === "xShrunk") {
        sx = 0.13;
        sy = 0.22;
    }

    if (q.peakVariant === "wideLow") {
        sx = 0.29;
        sy = 0.1;
    }

    const drawWidth = PEAK_SRC.width * sx;
    const drawHeight = PEAK_SRC.height * sy;

    const tx = tickX - drawWidth / 2;
    const ty = axisBottomY - PEAK_SRC.baselineY * sy;

    return {
        axisBottomY,
        tickX,
        sx,
        sy,
        tx,
        ty,
        drawWidth,
        drawHeight,
    };
}

function UltrafastSpecContributionsPeaks({ ids }) {
    return (
        <g className="UltrafastSpecContributions_Peaks">
            {QUADRANTS.map((q) => {
                const { tx, ty, sx, sy } = getPeakMetrics(q);

                const gradId =
                    q.peakColor === "pink"
                        ? ids.peakPinkGradId
                        : ids.peakPurpleGradId;

                return (
                    <g
                        key={q.id}
                        className={`UltrafastSpecContributions_PeakGroup UltrafastSpecContributions_PeakGroup--${q.id}`}
                        transform={`translate(${tx} ${ty})`}
                    >
                        <g transform={`scale(${sx} ${sy})`}>
                            <path
                                className="UltrafastSpecContributions_PeakGlow"
                                d={PEAK_PATH_D}
                                fill="none"
                                stroke={`url(#${gradId})`}
                                strokeWidth="5"
                                strokeOpacity="0.18"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                            />
                            <path
                                className="UltrafastSpecContributions_PeakPath"
                                d={PEAK_PATH_D}
                                fill="none"
                                stroke={`url(#${gradId})`}
                                strokeWidth="4.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                            />
                        </g>
                    </g>
                );
            })}
        </g>
    );
}

function UltrafastSpecContributionsMiniAxis() {
    return (
        <g className="UltrafastSpecContributions_MiniAxes">
            {QUADRANTS.map((q) => {
                const axisX = q.x + AXIS.leftGap;
                const axisTopY = q.y + AXIS.topGap;
                const axisBottomY = q.y + q.height - AXIS.bottomGap;
                const axisRightX = q.x + q.width - AXIS.rightGap;

                const yLabelX = axisX - AXIS.yLabelGap;
                const yLabelY = axisTopY + (axisBottomY - axisTopY) / 2;

                const tickX = axisX + (axisRightX - axisX) / 2;
                const tickTopY = axisBottomY - AXIS.tickHalf;
                const tickBottomY = axisBottomY + AXIS.tickHalf;

                const zeroLabelY = axisBottomY + AXIS.zeroLabelGap;
                const xLabelY = axisBottomY + AXIS.xLabelGap;

                const xAxisLabel = q.xLabel;

                return (
                    <g
                        key={q.id}
                        className={`UltrafastSpecContributions_AxisGroup UltrafastContributions_AxisGroup--${q.id}`}
                    >
                        <line
                            className="UltrafastSpecContributions_AxisLine"
                            x1={axisX}
                            y1={axisTopY}
                            x2={axisX}
                            y2={axisBottomY + 5}
                        />
                        <line
                            className="UltrafastSpecContributions_AxisLine"
                            x1={axisX - 5}
                            y1={axisBottomY}
                            x2={axisRightX}
                            y2={axisBottomY}
                        />
                        <line
                            className="UltrafastSpecContributions_TickLine"
                            x1={tickX}
                            y1={tickTopY}
                            x2={tickX}
                            y2={tickBottomY}
                        />
                        <text
                            className="UltrafastSpecContributions_AxisLabel"
                            x={yLabelX}
                            y={yLabelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            transform={`rotate(-90 ${yLabelX} ${yLabelY})`}
                        >
                            Intensity
                        </text>

                        <text
                            className="UltrafastSpecContributions_ZeroLabel"
                            x={tickX}
                            y={zeroLabelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            0.0
                        </text>

                        <text
                            className="UltrafastSpecContributions_AxisLabel"
                            x={tickX}
                            y={xLabelY}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {q.xLabel}
                        </text>

                    </g>   
                );
            })}
        </g>
    );
}


export default function UltrafastSpecContributionsVisual() {
    const uid = makeSafeId(useId());
    const ids = {
        bgGradId: `ultrafast-spec-contributions-bg-${uid}`,
        peakPinkGradId: `ultrafast-spec-contributions-peak-pink-${uid}`,
        peakPurpleGradId: `ultrafast-spec-contributions-peak-purple-${uid}`,
    };
    return (
        <figure className="UltrafastSpecContributions_Figure">
            <svg
                className="UltrafastSpecContributions_SVG"
                viewBox={`0 0 ${VB.width} ${VB.height}`}
                role="img"
            >
                <UltrafastSpecContributionsDefs ids={ids} />
                <UltrafastSpecContributionsBackground ids={ids} />
                <UltrafastSpecContributionsPeaks ids={ids} />
                <UltrafastSpecContributionsMiniAxis />
            </svg>

            <figcaption className="UltrafastSpecContributions_Caption">
                Gaussian pulses in time and frequency domains show the time–bandwidth tradeoff that defines ultrafast resolution. A smaller temporal width, Δt, improves timing but broadens the frequency width, Δν. Narrower bandwidth improves excitation selectivity, but requires a longer pulse. Together, these limits explain how transient absorption balances femtosecond resolution with spectral sensitivity.
            </figcaption>
        </figure>
    )
}
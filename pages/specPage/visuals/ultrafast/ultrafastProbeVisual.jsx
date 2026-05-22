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

const SAMPLE_CELL = {
    outer: {
        x: SAMPLE.cx - 146 / 2,
        y: SAMPLE.cy - 146 / 2,
        size: 146,
        rx: 8,
    },
    liquid: {
        x: SAMPLE.cx - 128 / 2,
        y: SAMPLE.cy - 128 / 2,
        size: 128,
        rx: 6,
    },
    label: {
        x: SAMPLE.cx,
        y: SAMPLE.cy + 146 / 2 + 30,
    },
};

const BEAMS = {
    pump: {
        x1: 66,
        y1: 84,
        x2: 544,
        y2: 352,
        labelX: 170,
        labelY: 129,
        rotate: 29.8,
    },
    probe: {
        x1: 66,
        y1: 352,
        x2: 544,
        y2: 84,
        labelX: 170,
        labelY: 283,
        rotate: -29.8,
    },
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
            <linearGradient
                id={`${uid}-liquid`}
                x1={SAMPLE_CELL.liquid.x}
                y1={SAMPLE_CELL.liquid.y}
                x2={SAMPLE_CELL.liquid.x + SAMPLE_CELL.liquid.size}
                y2={SAMPLE_CELL.liquid.y + SAMPLE_CELL.liquid.size}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-4)" stopOpacity="0.32" />
                <stop offset="55%" stopColor="var(--accent-2)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--accent-3)" stopOpacity="0.28" />
            </linearGradient>
            <linearGradient
                id={`${uid}-pumpBeam`}
                x1={BEAMS.pump.x1}
                y1={BEAMS.pump.y1}
                x2={BEAMS.pump.x2}
                y2={BEAMS.pump.y2}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-2)" stopOpacity="0" />
                <stop offset="45%" stopColor="var(--accent-2)" />
                <stop offset="100%" stopColor="var(--accent-2)" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient
                id={`${uid}-probeBeam`}
                x1={BEAMS.probe.x1}
                y1={BEAMS.probe.y1}
                x2={BEAMS.probe.x2}
                y2={BEAMS.probe.y2}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
                <stop offset="45%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-3)" stopOpacity="0.45" />
            </linearGradient>
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

function ultrafastPVSampleChamber({ uid }) {
    return (
        <g className="ultrafastPV_SampleChamber">
            <rect
                x={SAMPLE_CELL.outer.x}
                y={SAMPLE_CELL.outer.y}
                width={SAMPLE_CELL.outer.size}
                height={SAMPLE_CELL.outer.size}
                rx={SAMPLE_CELL.outer.rx}
                className="ultrafastPV_CellOuter"
            />
            <rect
                x={SAMPLE_CELL.liquid.x}
                y={SAMPLE_CELL.liquid.y}
                width={SAMPLE_CELL.liquid.size}
                height={SAMPLE_CELL.liquid.size}
                rx={SAMPLE_CELL.liquid.rx}
                fill={`url(#${uid}-liquid)`}
                className="ultrafastPV_CellLiquid"
            />
             <rect
                x={SAMPLE_CELL.liquid.x}
                y={SAMPLE_CELL.liquid.y}
                width={SAMPLE_CELL.liquid.size}
                height={SAMPLE_CELL.liquid.size}
                rx={SAMPLE_CELL.liquid.rx}
                className="ultrafastPV_LiquidPumpGlow"
            />

            <g className="ultrafastPV_ReactionCenterState">
                <circle
                    cx={SAMPLE.cx}
                    cy={SAMPLE.cy}
                    r="18"
                    className="ultrafastPV_ReactionCenterHalo"
                />

                <circle
                    cx={SAMPLE.cx}
                    cy={SAMPLE.cy}
                    r="8"
                    className="ultrafastPV_ReactionCenterDot"
                />

                <path
                    d={`M${SAMPLE.cx - 34} ${SAMPLE.cy} H${SAMPLE.cx + 34}`}
                    className="ultrafastPV_ChargeSplitLine"
                />

                <circle
                    cx={SAMPLE.cx - 42}
                    cy={SAMPLE.cy}
                    r="14"
                    className="ultrafastPV_ChargePositive"
                />

                <circle
                    cx={SAMPLE.cx + 42}
                    cy={SAMPLE.cy}
                    r="14"
                    className="ultrafastPV_ChargeNegative"
                />

                <text
                    x={SAMPLE.cx - 42}
                    y={SAMPLE.cy + 5}
                    textAnchor="middle"
                    className="ultrafastPV_ChargeText"
                >
                    +
                </text>

                <text
                    x={SAMPLE.cx + 42}
                    y={SAMPLE.cy + 5}
                    textAnchor="middle"
                    className="ultrafastPV_ChargeText"
                >
                    −
                </text>
            </g>

            <circle
                cx={SAMPLE.cx}
                cy={SAMPLE.cy}
                r="58"
                className="ultrafastPV_ProbeCheckRing"
            />

            <text
                x={SAMPLE.cx}
                y={SAMPLE.cy - 38}
                textAnchor="middle"
                className="ultrafastPV_ChargeLabel"
            >
                early charge split
            </text>

            <text
                x={SAMPLE_CELL.label.x}
                y={SAMPLE_CELL.label.y}
                textAnchor="middle"
                className="ultrafastPV_SampleLabel"
            >
                sample cell
            </text>
        </g>
    );
}

function ultrafastPVBeams({ uid }) {
    const pulseFrac = 0.22;

    const pumpDx = (BEAMS.pump.x2 - BEAMS.pump.x1) * pulseFrac;
    const pumpDy = (BEAMS.pump.y2 - BEAMS.pump.y1) * pulseFrac;

    const probeDx = (BEAMS.probe.x2 - BEAMS.probe.x1) * pulseFrac;
    const probeDy = (BEAMS.probe.y2 - BEAMS.probe.y1) * pulseFrac;
    return (
        <g className="ultrafastPV_Beams" >
            <line
                x1={BEAMS.pump.x1}
                y1={BEAMS.pump.y1}
                x2={BEAMS.pump.x2}
                y2={BEAMS.pump.y2}
                className="ultrafastPV_BeamGuide ultrafastPV_PumpGuide"
            />
            <line
                x1={BEAMS.pump.x1}
                y1={BEAMS.pump.y1}
                x2={BEAMS.pump.x2 + pumpDx}
                y2={BEAMS.pump.y2 + pumpDy}
                stroke={`url(#${uid}-pumpBeam)`}
                className="ultrafastPV_BeamPulse ultrafastPV_PumpBeam"
                pathLength="1"
            >
                <animate
                    attributeName="x1"
                    values={`${BEAMS.pump.x1};${BEAMS.pump.x2 - pumpDx};${BEAMS.pump.x2 - pumpDx};${BEAMS.pump.x1}`}
                    keyTimes="0;0.30;0.34;1"
                    dur="4.8s"
                    begin="0s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y1"
                    values={`${BEAMS.pump.y1};${BEAMS.pump.y2 - pumpDy};${BEAMS.pump.y2 - pumpDy};${BEAMS.pump.y1}`}
                    keyTimes="0;0.30;0.34;1"
                    dur="4.8s"
                    begin="0s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="x2"
                    values={`${BEAMS.pump.x1 + pumpDx};${BEAMS.pump.x2};${BEAMS.pump.x2};${BEAMS.pump.x1 + pumpDx}`}
                    keyTimes="0;0.30;0.34;1"
                    dur="4.8s"
                    begin="0s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y2"
                    values={`${BEAMS.pump.y1 + pumpDy};${BEAMS.pump.y2};${BEAMS.pump.y2};${BEAMS.pump.y1 + pumpDy}`}
                    keyTimes="0;0.30;0.34;1"
                    dur="4.8s"
                    begin="0s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="0;1;1;0;0"
                    keyTimes="0;0.03;0.30;0.34;1"
                    dur="4.8s"
                    begin="0s"
                    repeatCount="indefinite"
                />
            </line>
            <text
                x={BEAMS.pump.labelX}
                y={BEAMS.pump.labelY}
                textAnchor="middle"
                className="ultrafastPV_BeamLabel ultrafastPV_PumpLabel" 
                transform={`rotate(${BEAMS.pump.rotate} ${BEAMS.pump.labelX} ${BEAMS.pump.labelY})`}
            >
                pump pulse
            </text>

            <line
                x1={BEAMS.probe.x1}
                y1={BEAMS.probe.y1}
                x2={BEAMS.probe.x2}
                y2={BEAMS.probe.y2}
                className="ultrafastPV_BeamGuide ultrafastPV_ProbeGuide"
            />
            <line
                x1={BEAMS.probe.x1}
                y1={BEAMS.probe.y1}
                x2={BEAMS.probe.x2 + probeDx}
                y2={BEAMS.probe.y2 + probeDy}
                stroke={`url(#${uid}-probeBeam)`}
                className="ultrafastPV_BeamPulse ultrafastPV_ProbeBeam"
                pathLength="1"
            >
                <animate
                    attributeName="x1"
                    values={`${BEAMS.probe.x1};${BEAMS.probe.x2 - probeDx};${BEAMS.probe.x2 - probeDx};${BEAMS.probe.x1}`}
                    keyTimes="0;0.30;0.34;1"
                    dur="4.8s"
                    begin="1s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y1"
                    values={`${BEAMS.probe.y1};${BEAMS.probe.y2 - probeDy};${BEAMS.probe.y2 - probeDy};${BEAMS.probe.y1}`}
                    keyTimes="0;0.30;0.34;1"
                    dur="4.8s"
                    begin="1s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="x2"
                    values={`${BEAMS.probe.x1 + probeDx};${BEAMS.probe.x2};${BEAMS.probe.x2};${BEAMS.probe.x1 + probeDx}`}
                    keyTimes="0;0.30;0.34;1"
                    dur="4.8s"
                    begin="1s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="y2"
                    values={`${BEAMS.probe.y1 + probeDy};${BEAMS.probe.y2};${BEAMS.probe.y2};${BEAMS.probe.y1 + probeDy}`}
                    keyTimes="0;0.30;0.34;1"
                    dur="4.8s"
                    begin="1s"
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="0;1;1;0;0"
                    keyTimes="0;0.03;0.30;0.34;1"
                    dur="4.8s"
                    begin="1s"
                    repeatCount="indefinite"
                />
            </line>
            <text
                x={BEAMS.probe.labelX}
                y={BEAMS.probe.labelY}
                textAnchor="middle"
                className="ultrafastPV_BeamLabel ultrafastPV_ProbeLabel"
                transform={`rotate(${BEAMS.probe.rotate} ${BEAMS.probe.labelX} ${BEAMS.probe.labelY})`}
            >
                probe pulse
            </text>
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
                {ultrafastPVBeams({ uid })}
                {ultrafastPVSampleChamber({ uid })}

            </svg>
            <figcaption className="ultrafastPV_Caption">
                The pump beam first excites the sample, then the angled probe beam arrives after a controlled delay to check what changed. Repeating this delay lets ultrafast spectroscopy follow early pigment energy transfer and the first signs of charge separation.
            </figcaption>
        </figure>
    );
}
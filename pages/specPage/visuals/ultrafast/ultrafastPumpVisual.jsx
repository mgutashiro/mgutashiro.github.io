import './ultrafastPumpVisual.css';
import React, { useId } from 'react';

const VB = {
    width: 720,
    height: 520,
};

const VB_PADDING = 20;

const BG_PANEL = {
    x: VB_PADDING,
    y: 18,
    width: VB.width - VB_PADDING,
    height: 480,
    rx: 24,
};

const FLOW_TIMING = {
    cycle: 8,
    startDelay: 0.35,
    step: 0.75,
    jumpUp: 0.22,
    holdTop: 0.28,
    dropDown: 1.15,
};

const FLOW_DELAY = {
    lhc: [
        0,
        FLOW_TIMING.startDelay,
        FLOW_TIMING.startDelay + FLOW_TIMING.step,
        FLOW_TIMING.startDelay + FLOW_TIMING.step * 2,
    ],

    ppc: [
        FLOW_TIMING.startDelay + FLOW_TIMING.step * 3.2,
        FLOW_TIMING.startDelay + FLOW_TIMING.step * 4.2,
    ],

    rc: FLOW_TIMING.startDelay + FLOW_TIMING.step * 5.25,

    donor: FLOW_TIMING.startDelay + FLOW_TIMING.step * 6.15,

    electron: FLOW_TIMING.startDelay + FLOW_TIMING.step * 6.15 + 0.58,
};

function makeIds(rawId) {
    const id = rawId.replace(/:/g, '-');

    return {
        bg: `${id}-pump-bg`,
        frameStroke: `${id}-pump-frame-stroke`,
        AntennaSystem: `${id}-antenna-system`,
        AntennaDot: `${id}-antenna-dot`,
        AntennaHotspot: `${id}-antenna-hotspot`,
        ReactionCenterBody: `${id}-reaction-center-body`,
        ChromophoreBody: `${id}-chromophore-body`,
    };
}

function UltrafastPumpDefs({ ids }) {
    return (
        <defs>
            <linearGradient 
                id={ids.bg} 
                x1="0" 
                y1="0" 
                x2="720" 
                y2="420"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--bg-2)" />
                <stop offset="55%" stopColor="var(--bg)" />
                <stop offset="100%" stopColor="var(--surface)" />
            </linearGradient>
            <linearGradient 
                id={ids.frameStroke} 
                x1="24" 
                y1="18" 
                x2="696" 
                y2="402"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="50%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-3)" />
            </linearGradient>
            <linearGradient
                id={ids.AntennaSystem}
                x1="120"
                y1="140"
                x2="360"
                y2="310"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent-4) 70%, white 12%)" />
                <stop offset="55%" stopColor="color-mix(in oklab, var(--accent-2) 62%, var(--accent-4) 38%)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--accent-2) 72%, var(--bg) 28%)" />
            </linearGradient>
            <radialGradient
                id={ids.AntennaDot}
                cx="50%"
                cy="38%"
                r="70%"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, white 72%, var(--accent-4) 28%)" />
                <stop offset="45%" stopColor="color-mix(in oklab, var(--accent-4) 68%, var(--text) 12%)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--accent-4) 38%, var(--bg) 62%" />
            </radialGradient>
            <radialGradient 
                id={ids.AntennaHotspot}
                cx="45%"
                cy="35%"
                r="72%"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, white 55%, var(--accent-3) 45%)" />
                <stop offset="45%" stopColor="var(--accent-3)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--accent) 32%, var(--accent-3) 68%)" />
            </radialGradient>
            <radialGradient
                id={ids.ReactionCenterBody}
                cx="42%"
                cy="35%"
                r="75%"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, #C7E4FF 52%, var(--accent-2) 48%)" />
                <stop offset="52%" stopColor="color-mix(in oklab, #5E7FE6 66%, var(--accent) 34%)" />
                <stop offset="100%" stopColor="color-mix(in oklab, #27356F 78%, var(--bg) 22%)" />
            </radialGradient>

            <linearGradient
                id={ids.ChromophoreBody}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent-4) 70%, white 12%)" />
                <stop offset="55%" stopColor="color-mix(in oklab, var(--accent-2) 62%, var(--accent-4) 38%)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--accent-2) 72%, var(--bg) 28%)" />
            </linearGradient>
        </defs>
    );
}

function BackgroundFrame({ ids }) {
    return (
        <g className="UltrafastPump_BG">
            <rect
                {...BG_PANEL}
                fill={`url(#${ids.bg})`}
            />
            <rect
                {...BG_PANEL}
                fill="color-mix(in oklab, var(--surface) 55%, transparent)"
                stroke={`url(#${ids.frameStroke})`}
                strokeWidth="1.8"
            />
        </g>
    );
}

function SequencedHotspot({
    ids,
    cx,
    cy,
    r = 14,
    delay = 0,
    cycle = FLOW_TIMING.cycle,
}) {
    return (
        <g className="UltrafastPump_PulsingHotspot">
            {/* outer glow */}
            <circle
                cx={cx}
                cy={cy}
                r={r * 1.15}
                fill="var(--accent-3)"
                opacity="0.16"
            >
                <animate
                    attributeName="r"
                    values={`${r * 1.15};${r * 2.2};${r * 1.15};${r * 1.15}`}
                    keyTimes="0;0.08;0.16;1"
                    dur={`${cycle}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="0.14;0.48;0.14;0.14"
                    keyTimes="0;0.08;0.16;1"
                    dur={`${cycle}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                />
            </circle>

            {/* main hotspot */}
            <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={`url(#${ids.AntennaHotspot})`}
                stroke="color-mix(in oklab, white 24%, var(--accent-3) 76%)"
                strokeWidth="1"
            >
                <animate
                    attributeName="r"
                    values={`${r};${r * 1.18};${r};${r}`}
                    keyTimes="0;0.08;0.16;1"
                    dur={`${cycle}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                />
            </circle>
        </g>
    );
}

function GlowingDonorCircle({
    cx,
    cy,
    r = 12,
    delay = 0,
    cycle = FLOW_TIMING.cycle,
}) {
    return (
        <g className="UltrafastPump_GlowingDonor">
            {/* glow halo */}
            <circle
                cx={cx}
                cy={cy}
                r={r * 1.2}
                fill="var(--accent-4)"
                opacity="0.14"
            >
                <animate
                    attributeName="r"
                    values={`${r * 1.2};${r * 2.2};${r * 1.2};${r * 1.2}`}
                    keyTimes="0;0.08;0.16;1"
                    dur={`${cycle}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                />
                <animate
                    attributeName="opacity"
                    values="0.14;0.48;0.14;0.14"
                    keyTimes="0;0.08;0.16;1"
                    dur={`${cycle}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                />
            </circle>

            {/* actual yellow circle */}
            <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="color-mix(in oklab, #FFE65C 78%, var(--accent-4) 22%)"
                stroke="color-mix(in oklab, white 45%, #FFD84D 55%)"
                strokeWidth="1"
            >
                <animate
                    attributeName="r"
                    values={`${r};${r * 1.14};${r};${r}`}
                    keyTimes="0;0.08;0.16;1"
                    dur={`${cycle}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                />
            </circle>
        </g>
    );
}

function AnimatedChromophoreElectron({
    upperLine,
    lowerLine,
    electron,
    delay = 0,
    cycle = FLOW_TIMING.cycle,
}) {
    const jumpDy = upperLine.y - lowerLine.y; // negative number

    const t1 = FLOW_TIMING.jumpUp / cycle;
    const t2 = (FLOW_TIMING.jumpUp + FLOW_TIMING.holdTop) / cycle;
    const t3 =
        (FLOW_TIMING.jumpUp + FLOW_TIMING.holdTop + FLOW_TIMING.dropDown) / cycle;

    return (
        <g className="MoveChromophoreElements" transform="translate(-15, 0)">
            {/* static energy lines */}
            <line
                x1={upperLine.x1}
                y1={upperLine.y}
                x2={upperLine.x2}
                y2={upperLine.y}
                stroke="color-mix(in oklab, var(--bg) 72%, black 28%)"
                strokeWidth="3"
                strokeLinecap="round"
            />

            <line
                x1={lowerLine.x1}
                y1={lowerLine.y}
                x2={lowerLine.x2}
                y2={lowerLine.y}
                stroke="color-mix(in oklab, var(--bg) 72%, black 28%)"
                strokeWidth="3"
                strokeLinecap="round"
            />

            {/* moving electron + minus sign */}
            <g>
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    values={`
                        0 0;
                        0 ${jumpDy};
                        0 ${jumpDy};
                        0 0;
                        0 0
                    `}
                    keyTimes={`0;${t1};${t2};${t3};1`}
                    dur={`${cycle}s`}
                    begin={`${delay}s`}
                    repeatCount="indefinite"
                />

                {/* glow halo */}
                <circle
                    cx={electron.cx}
                    cy={electron.cy}
                    r={electron.r * 1.2}
                    fill="var(--accent-4)"
                    opacity="0.12"
                >
                    <animate
                        attributeName="r"
                        values={`
                        ${electron.r * 1.2};
                        ${electron.r * 2.2};
                        ${electron.r * 1.6};
                        ${electron.r * 1.2};
                        ${electron.r * 1.2}
                        `}
                        keyTimes={`0;${t1};${t2};${t3};1`}
                        dur={`${cycle}s`}
                        begin={`${delay}s`}
                        repeatCount="indefinite"
                    />
                    <animate
                        attributeName="opacity"
                        values="0.12;0.45;0.26;0.12;0.12"
                        keyTimes={`0;${t1};${t2};${t3};1`}
                        dur={`${cycle}s`}
                        begin={`${delay}s`}
                        repeatCount="indefinite"
                    />
                </circle>

                {/* electron body */}
                <circle
                    cx={electron.cx}
                    cy={electron.cy}
                    r={electron.r}
                    fill="color-mix(in oklab, #FFE65C 78%, var(--accent-4) 22%)"
                    stroke="color-mix(in oklab, white 45%, #FFD84D 55%)"
                    strokeWidth="1"
                />

                <text
                    x={electron.cx}
                    y={electron.cy + 1.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="var(--font-tech)"
                    fontSize="22"
                    fontWeight="var(--w-black)"
                    fill="color-mix(in oklab, var(--bg) 70%, black 30%)"
                >
                    -
                </text>
            </g>
        </g>
    );
}

function LHCAntenna({ ids }) {
    const ANTENNA = {
        cx: 180,
        cy: 125,
        rx: 120,
        ry: 82,
    };

    const smallDots = [
        { cx: 105, cy: 80 }, { cx: 138, cy: 64 }, { cx: 177, cy: 58 },
        { cx: 157, cy: 58 }, { cx: 127, cy: 78 }, { cx: 150, cy: 80 },
        { cx: 137, cy: 98 }, { cx: 127, cy: 116 }, { cx: 107, cy: 130 },
        { cx: 117, cy: 150 }, { cx: 87, cy: 145 }, { cx: 108, cy: 175 },
        { cx: 130, cy: 185 }, { cx: 145, cy: 175 }, { cx: 135, cy: 145 },
        { cx: 160, cy: 135 }, { cx: 165, cy: 115 }, { cx: 172, cy: 90 },
        { cx: 180, cy: 125 }, { cx: 200, cy: 125 }, { cx: 200, cy: 85 },
        { cx: 185, cy: 75 }, { cx: 200, cy: 60 }, { cx: 220, cy: 66 },
        { cx: 210, cy: 75 }, { cx: 220, cy: 90 }, { cx: 235, cy: 80 },
        { cx: 238, cy: 98 }, { cx: 210, cy: 100 }, { cx: 210, cy: 115 },
        { cx: 220, cy: 130 }, { cx: 210, cy: 140 }, { cx: 170, cy: 150 },
        { cx: 185, cy: 160 }, { cx: 200, cy: 155 }, { cx: 200, cy: 155 },
        { cx: 180, cy: 178 }, { cx: 162, cy: 178 }, { cx: 165, cy: 165 },
        { cx: 195, cy: 168 }, { cx: 215, cy: 180 }, { cx: 215, cy: 150 },
        { cx: 235, cy: 130 }, { cx: 240, cy: 110 }, { cx: 255, cy: 105 },
        { cx: 270, cy: 95 }, { cx: 265, cy: 125 }, { cx: 252, cy: 86 }, 
        { cx: 252, cy: 145 }, { cx: 142, cy: 116 }, { cx: 278, cy: 116 },
        { cx: 270, cy: 148 }, { cx: 250, cy: 164 }, { cx: 214, cy: 165 },
        { cx: 176, cy: 196 }, { cx: 150, cy: 190 }, { cx: 100, cy: 158 },
        { cx: 88, cy: 126 }, {cx: 90, cy: 100 }, {cx: 105, cy: 110 },
        { cx: 120, cy: 98 }, { cx: 155, cy: 100 }, { cx: 225, cy: 112 },
        { cx: 190, cy: 142 }, { cx: 124, cy: 133 },
        { cx: 168, cy: 75 }, { cx: 232, cy: 148 }, { cx: 128, cy: 170 },
        { cx: 200, cy: 184 }, { cx: 250, cy: 126 }, { cx: 145, cy: 125 },
        ];

    const hotspotDots = [ { cx: 190, cy: 105, r: "14"}, { cx: 150, cy: 155, r: "14"}, { cx: 230, cy: 175, r: "14"} ];

    return (
        <g className="UltrafastPump_LHCAntenna">
            <ellipse
                cx={ANTENNA.cx}
                cy={ANTENNA.cy}
                rx={ANTENNA.rx}
                ry={ANTENNA.ry}
                fill={`url(#${ids.AntennaSystem})`}
                strope="color-mix(in oklab, var(--accent-2) 34%, var(--text) 16%"
                strokeWidth="1.5"
            />

            {smallDots.map((dot, i) => (
                <circle
                    key={`antenna-dot-${i}`}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="10"
                    fill={`url(#${ids.AntennaDot})`}
                    stroke="color-mix(in oklab, var(--text) 18%, transparent)"
                    strokeWidth="0.8"
                />
            ))}

            {hotspotDots.map((dot, i) => (
                <SequencedHotspot
                    key={`antenna-hotspot-${i}`}
                    ids={ids}
                    cx={dot.cx}
                    cy={dot.cy}
                    r={Number(dot.r)}
                    delay={FLOW_DELAY.lhc[i]}
                />
            ))}
        </g>
    )
}

function PigmentProteinComplex({ ids }) {
    const PPC = {
        cx: VB.width / 2,
        cy: VB.height / 2,
        r: 72,
  };

    const smallDots = [
        { cx: 320, cy: 220 }, { cx: 310, cy: 235 }, { cx: 305, cy: 260 },
        { cx: 320, cy: 248 }, { cx: 340, cy: 210 }, { cx: 360, cy: 220 },
        { cx: 365, cy: 240 }, { cx: 350, cy: 260 }, { cx: 330, cy: 265 }, 
        { cx: 370, cy: 260 }, { cx: 360, cy: 280 }, { cx: 340, cy: 285 },
        { cx: 318, cy: 280 }, { cx: 325, cy: 300 }, { cx: 350, cy: 302 },
        { cx: 335, cy: 315 }, { cx: 355, cy: 318 }, { cx: 375, cy: 315 },
        { cx: 370, cy: 300 }, { cx: 392, cy: 305 }, { cx: 392, cy: 305 },
        { cx: 408, cy: 290 }, { cx: 405, cy: 270 }, { cx: 390, cy: 255 },
        { cx: 410, cy: 250 }, { cx: 385, cy: 235 }, { cx: 380, cy: 215 },
        { cx: 405, cy: 228 }, { cx: 395, cy: 212 }, { cx: 362, cy: 205 },
        { cx: 392, cy: 240 }, { cx: 352, cy: 250 }, { cx: 342, cy: 270 },
    ];

    const hotspotDots = [ { cx: 340, cy: 235, r: 14 }, { cx: 385, cy: 282, r: 14 } ];

    return (
        <g className="UltrafastPump_PigmentProteinComplex">
            <circle
                cx={PPC.cx}
                cy={PPC.cy}
                r={PPC.r}
                fill="color-mix(in oklab, var(--accent-4) 82%, #FFD84D 18%)"
                stroke="color-mix(in oklab, #FFE97A 72%, var(--text) 28%)"
                strokeWidth="2"
            />

            {smallDots.map((dot, i) => (
                <circle
                    key={`ppc-dot-${i}`}
                    cx={dot.cx}
                    cy={dot.cy}
                    r="10"
                    fill={`url(#${ids.AntennaDot})`}
                    stroke="color-mix(in oklab, var(--text) 18%, transparent)"
                    strokeWidth="0.8"
                />
            ))}

            {hotspotDots.map((dot, i) => (
                <SequencedHotspot
                    key={`ppc-hotspot-${i}`}
                    ids={ids}
                    cx={dot.cx}
                    cy={dot.cy}
                    r={Number(dot.r)}
                    delay={FLOW_DELAY.ppc[i]}
                />
            ))}
        </g>
    );
}

function ReactionCenter({ ids }) {
    const RC = {
        cx: VB.width - 185,
        cy: VB.height - 145,
        r: 50,
    };

    const hotspot = {
        cx: RC.cx,
        cy: RC.cy,
        r: 14,
    };

    return (
        <g className="UltrafastPump_ReactionCenter">
            <circle
                cx={RC.cx}
                cy={RC.cy}
                r={RC.r}
                fill={`url(#${ids.ReactionCenterBody})`}
                stroke="color-mix(in oklab, #D8ECFF 58%, var(--accent-2) 42%)"
                strokeWidth="1.8"
            />

            <SequencedHotspot
                ids={ids}
                cx={hotspot.cx}
                cy={hotspot.cy}
                r={Number(hotspot.r)}
                delay={FLOW_DELAY.rc}
            />

            <GlowingDonorCircle
                cx={hotspot.cx + 100}
                cy={hotspot.cy - 80}
                r={hotspot.r}
                delay={FLOW_DELAY.donor}
            />
            <text
                x={hotspot.cx + 100}
                y={hotspot.cy - 80}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-tech)"
                fontSize="22"
                fontWeight="var(--w-black)"
                fill="color-mix(in oklab, var(--bg) 70%, black 30%)"
            >
                -
            </text>
        </g>
    );
}

function ChromophoreElectron({ ids }) {
    const CHROMO = {
        cx: VB.width - 150,
        cy: 120,
        r: 58,
    };

    const lineWidth = 50;

    const upperLine = {
        x1: CHROMO.cx - lineWidth / 2,
        x2: CHROMO.cx + lineWidth / 2,
        y: CHROMO.cy - 20,
    };

    const lowerLine = {
        x1: CHROMO.cx - lineWidth / 2,
        x2: CHROMO.cx + lineWidth / 2,
        y: CHROMO.cy + 20,
    };

    const electron = {
        cx: CHROMO.cx,
        cy: lowerLine.y,
        r: 11,
    };

    return (
        <g className="UltrafastPump_ChromophoreElectron">
            <circle
                cx={CHROMO.cx}
                cy={CHROMO.cy}
                r={CHROMO.r}
                fill={`url(#${ids.ChromophoreBody})`}
                stroke="color-mix(in oklab, var(--accent-2) 34%, var(--text) 18%)"
                strokeWidth="1.6"
            />

            <g className="MoveChromophoreElements" transform="translate(-15, 0)">
                <line
                    x1={upperLine.x1}
                    y1={upperLine.y}
                    x2={upperLine.x2}
                    y2={upperLine.y}
                    stroke="color-mix(in oklab, var(--bg) 72%, black 28%)"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                <line
                    x1={lowerLine.x1}
                    y1={lowerLine.y}
                    x2={lowerLine.x2}
                    y2={lowerLine.y}
                    stroke="color-mix(in oklab, var(--bg) 72%, black 28%)"
                    strokeWidth="3"
                    strokeLinecap="round"
                />

                <AnimatedChromophoreElectron
                    upperLine={upperLine}
                    lowerLine={lowerLine}
                    electron={electron}
                    delay={FLOW_DELAY.electron}
                />
            </g>
            <text
                x={lowerLine.x2 + 10}
                y={lowerLine.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-tech)"
                fontSize="18"
                fontWeight="var(--w-black)"
                fill="color-mix(in oklab, var(--bg) 70%, black 30%)"
            >
                low
            </text>
            <text
                x={upperLine.x2 + 10}
                y={upperLine.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-tech)"
                fontSize="18"
                fontWeight="var(--w-black)"
                fill="color-mix(in oklab, var(--bg) 70%, black 30%)"
            >
                high
            </text>
        </g>
    );
}

function ReusableArrow({
    x = 0,
    y = 0,
    length = 90,
    direction = "right",
    color = "var(--accent-2)",
    shaftWidth = 7,
    headLength = 18,
    headHeight = 18,
    opacity = 1,
    className = "UltrafastPump_Arrow",
}) {
    const directionAngles = {
        right: 0,
        down: 90,
        left: 180,
        up: -90,
    };
    const angle =
        typeof direction === "number"
            ? direction
            : directionAngles[direction] ?? 0;
    const safeHeadLength = Math.min(headLength, length * 0.45);
    const headBase = length - safeHeadLength;

    const halfShaft = shaftWidth / 2;
    const halfHead = headHeight / 2;
    const tailRound = halfShaft;
    const arrowPath = `
        M ${tailRound} ${-halfShaft}
        H ${headBase}
        V ${-halfHead}
        L ${length} 0
        L ${headBase} ${halfHead}
        V ${halfShaft}
        H ${tailRound}
        Q 0 ${halfShaft} 0 0
        Q 0 ${-halfShaft} ${tailRound} ${-halfShaft}
        Z
    `;
    return (
        <g
            className={className}
            transform={`translate(${x} ${y}) rotate(${angle})`}
            opacity={opacity}
        >
            <path d={arrowPath} fill={color} />
        </g>
    );
}

function VisualLabel({
    x,
    y,
    lines,
    anchor = "middle",
    lineTo = null,
    lineStartOffset = 8,
    className = "UltrafastPump_Label",
}) {
    const textLines = Array.isArray(lines) ? lines : [lines];
    const getLineStartX = () => {
        if (anchor === "start") return x - lineStartOffset;
        if (anchor === "end") return x + lineStartOffset;
        return x;
    };

    return (
        <g className="UltrafastPump_LabelGroup">
            {lineTo && (
                <line
                    x1={getLineStartX()}
                    y1={y + 4}
                    x2={lineTo.x}
                    y2={lineTo.y}
                    className="UltrafastPump_LabelLine"
                />
            )}

            {lineTo && (
                <circle
                    cx={lineTo.x}
                    cy={lineTo.y}
                    r="2.2"
                    className="UltrafastPump_LabelLineDot"
                />
            )}
            <text
                x={x}
                y={y}
                textAnchor={anchor}
                className={className}
            >
                {textLines.map((line, i) => (
                    <tspan
                        key={`${line}-${i}`}
                        x={x}
                        dy={i === 0 ? 0 : "1.15em"}
                    >
                        {line}
                    </tspan>
                ))}
            </text>
        </g>
    );
}

function UltrafastPumpLabels() {
    return (
        <g className="UltrafastPump_Labels">
            <VisualLabel
                x={35}
                y={45}
                lines={["light", "energy"]}
                anchor="start"
                className="UltrafastPump_Label UltrafastPump_LabelEnergy"
            />

            <VisualLabel
                x={185}
                y={225}
                lines={["light-harvesting", "center"]}
                className="UltrafastPump_Label"
            />

            <VisualLabel
                x={285}
                y={65}
                lines={["plant", "pigments"]}
                anchor="start"
                lineTo={{ x: 255, y: 85 }}
                className="UltrafastPump_Label UltrafastPump_LabelSmall"
            />

            <VisualLabel
                x={338}
                y={160}
                lines={["excited", "pigments"]}
                lineTo={{ x: 230, y: 175 }}
                anchor="middle"
                className="UltrafastPump_Label UltrafastPump_LabelSmall"
            />

            <VisualLabel
                x={500}
                y={300}
                lines={["pigments get", "energized"]}
                anchor="middle"
                className="UltrafastPump_Label UltrafastPump_LabelSmall"
            />

            <VisualLabel
                x={355}
                y={350}
                lines="core"
                className="UltrafastPump_Label"
            />

            <VisualLabel
                x={535}
                y={445}
                lines={["reaction", "center"]}
                className="UltrafastPump_Label"
            />

            <VisualLabel
                x={662}
                y={325}
                lines={["electron", "ejection"]}
                className="UltrafastPump_Label UltrafastPump_LabelSmall"
            />

            <VisualLabel
                x={575}
                y={196}
                lines={["plant pigment", "gets excited!"]}
                className="UltrafastPump_Label"
            />
        </g>
    );
}

export default function UltrafastPumpVisual({ className='' }) {
    const rawId = useId();
    const ids = makeIds(rawId);

    return (
        <figure className={`UltrafastPumpVisual ${className}`.trim()}>
            <svg
                className="UltrafastPumpVisual_SVG"
                viewBox={`0 0 ${VB.width} ${VB.height}`}
                role="img"
            >
                <UltrafastPumpDefs ids={ids} />
                <BackgroundFrame ids={ids} />
                <LHCAntenna ids={ids} />
                <PigmentProteinComplex ids={ids} />
                <ReactionCenter ids={ids} />
                <ChromophoreElectron ids={ids} />
                <ReusableArrow
                    x={103}
                    y={58}
                    length={90}
                    direction={28}
                    color="color-mix(in oklab, var(--emo1) 60%, var(--accent-4) 40%)"
                    shaftWidth={6}
                    headLength={17}
                    headHeight={14}
                />
                <ReusableArrow
                    x={190}
                    y={105}
                    length={52}
                    direction={130}
                    color="var(--accent)"
                    shaftWidth={6}
                    headLength={17}
                    headHeight={14}
                />
                <ReusableArrow
                    x={150}
                    y={155}
                    length={70}
                    direction={12}
                    color="var(--accent)"
                    shaftWidth={6}
                    headLength={17}
                    headHeight={14}
                />
                <ReusableArrow
                    x={230}
                    y={175}
                    length={114}
                    direction={27}
                    color="var(--accent)"
                    shaftWidth={6}
                    headLength={17}
                    headHeight={14}
                />
                <ReusableArrow
                    x={340}
                    y={235}
                    length={52}
                    direction={45}
                    color="var(--accent)"
                    shaftWidth={6}
                    headLength={17}
                    headHeight={14}
                />
                <ReusableArrow
                    x={385}
                    y={282}
                    length={163}
                    direction={32}
                    color="var(--accent)"
                    shaftWidth={6}
                    headLength={17}
                    headHeight={14}
                />
                <ReusableArrow
                    x={VB.width - 185}
                    y={VB.height - 145}
                    length={115}
                    direction={-39}
                    color="var(--accent-4)"
                    shaftWidth={6}
                    headLength={17}
                    headHeight={14}
                />
                <UltrafastPumpLabels />

            </svg>

            <figcaption className="ultrafastPumpCaption">
                The pump pulse mimics a flash of sunlight: pigments absorb the light, pass the energy toward the reaction center, and trigger electron release. Ultrafast transient absorption lets us follow these first photosynthetic steps as they happen.
            </figcaption>
        </figure>
    )
}
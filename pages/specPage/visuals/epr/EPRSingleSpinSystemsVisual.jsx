import "./EPRSingleSpinSystemsVisual.css";
import React, { useId } from "react";

const VIEWBOX_WIDTH = 640;
const VIEWBOX_HEIGHT = 560;
const VIEWBOX = `0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`;

const PANEL = {
    x: 10,
    y: 10,
    width: 620,
    height: 540,
    rx: 28,
};

const PANEL_MID = {
    x: PANEL.x + PANEL.width / 2,
    y: PANEL.y + PANEL.height / 2,
};

const FIELD_AXIS = {
    x: PANEL_MID.x,
    y1: PANEL.y + 72,
    y2: PANEL.y + PANEL.height - 72,
};

const SPIN_CENTER = {
    x: PANEL_MID.x,
    y: PANEL_MID.y + 12,
};

function buildId(rawId) {
    return rawId.replace(/:/g, "-");
}

function BackgroundDefs({ uid }) {
    const panelWashId = `${uid}-panel-wash`;
    const panelGlowId = `${uid}-panel-glow`;

    return (
        <defs>
            {/* soft vertical surface wash */}
            <linearGradient
                id={panelWashId}
                x1={PANEL.x}
                y1={PANEL.y}
                x2={PANEL.x}
                y2={PANEL.y + PANEL.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--surface) 92%, var(--accent) 8%)" />
                <stop offset="55%" stopColor="color-mix(in oklab, var(--bg) 86%, var(--primary) 14%)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--surface-2) 90%, var(--accent-2) 10%)" />
            </linearGradient>

            {/* center glow behind spin system */}
            <radialGradient
                id={panelGlowId}
                cx={PANEL_MID.x}
                cy={PANEL_MID.y}
                r="260"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent-2) 24%, transparent)" />
                <stop offset="58%" stopColor="color-mix(in oklab, var(--accent) 10%, transparent)" />
                <stop offset="100%" stopColor="transparent" />
            </radialGradient>
        </defs>
    );
}

function BackgroundPanel({ uid }) {
    const splitX = PANEL.x + PANEL.width / 2;

    const leftCenterX = PANEL.x + PANEL.width / 4;
    const rightCenterX = PANEL.x + (3 * PANEL.width) / 4;

    const titleY = PANEL.y + 38;
    const titleLineY = PANEL.y + 82;

    const innerSplitY = PANEL.y + 308;
    const halfPaddingX = 18;
    return (
        <g className="EPRSingleSpinSystemsVisual_Background">
            {/* main rounded visual panel */}
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill={`url(#${uid}-panel-wash)`}
            />
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill={`url(#${uid}-panel-glow)`}
            />
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth="1.5"
            />
            <line
                x1={splitX}
                y1={PANEL.y + 1}
                x2={splitX}
                y2={PANEL.y + PANEL.height - 1}
                stroke="var(--text-muted)"
                strokeWidth="1"
            />
            <text
                x={leftCenterX}
                y={titleY}
                textAnchor="middle"
                className="EPRSingleSpinSystemsVisual_PanelTitle"
            >
                <tspan x={leftCenterX} dy="0">Diamagnetic</tspan>
                <tspan x={leftCenterX} dy="1.2em">(Closed Shell)</tspan>
            </text>
            <text
                x={rightCenterX}
                y={titleY}
                textAnchor="middle"
                className="EPRSingleSpinSystemsVisual_PanelTitle"
            >
                <tspan x={rightCenterX} dy="0">Paramagnetic</tspan>
                <tspan x={rightCenterX} dy="1.2em">(Open Shell)</tspan>
            </text>
            <line
                x1={PANEL.x + halfPaddingX}
                y1={titleLineY}
                x2={PANEL.x + PANEL.width - halfPaddingX}
                y2={titleLineY}
                stroke="var(--text)"
                strokeWidth="2"
                strokeLinecap="round"
            />
            <line
                x1={PANEL.x + halfPaddingX}
                y1={innerSplitY}
                x2={PANEL.x + PANEL.width - halfPaddingX}
                y2={innerSplitY}
                stroke="var(--text-muted)"
                strokeWidth="1"
                strokeLinecap="round"
            />
        </g>
    );
}

function ThreeShellBoxes({
    x,
    y,
    boxSize = 66,
    gap = 18,
    className = "",
}) {
    const totalWidth = boxSize * 3 + gap * 2;

    return (
        <g className={`EPRSingleSpinSystemsVisual_ThreeShellBoxes ${className}`}>
            {[0, 1, 2].map((i) => (
                <rect
                    key={i}
                    x={x + i * (boxSize + gap)}
                    y={y}
                    width={boxSize}
                    height={boxSize}
                    rx={9}
                    fill="color-mix(in oklab, var(--surface) 38%, transparent)"
                    stroke="color-mix(in oklab, var(--text) 42%, var(--accent-2) 18%)"
                    strokeWidth="2"
                />
            ))}

            {/* optional invisible width guide if needed later */}
            <rect
                x={x}
                y={y}
                width={totalWidth}
                height={boxSize}
                fill="none"
                opacity="0"
            />
        </g>
    );
}

function SpinArrowUp({
    x,
    y,
    shaft = 38,
    color = "var(--accent-2)",
    strokeWidth = 3.4,
    className = "",
}) {
    const head = 8;
    return (
        <g className={`EPRSingleSpinSystemsVisual_SpinArrowUp ${className}`}>
            <line
                x1={x}
                y1={y + shaft / 2}
                x2={x}
                y2={y - shaft / 2}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
            <path
                d={`M ${x - head} ${y - shaft / 2 + head} L ${x} ${y - shaft / 2} L ${x + head} ${y - shaft / 2 + head}`}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    );
}

function SpinArrowDown({
    x,
    y,
    shaft = 38,
    color = "var(--accent-3)",
    strokeWidth = 3.4,
    className = "",
}) {
    const head = 8;
    return (
        <g className={`EPRSingleSpinSystemsVisual_SpinArrowDown ${className}`}>
            <line
                x1={x}
                y1={y - shaft / 2}
                x2={x}
                y2={y + shaft / 2}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
            <path
                d={`M ${x - head} ${y + shaft / 2 - head} L ${x} ${y + shaft / 2} L ${x + head} ${y + shaft / 2 - head}`}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
    );
}

function TopHalfShellSection() {
    const splitX = PANEL.x + PANEL.width / 2;

    const topSectionTop = PANEL.y + 82;
    const topSectionBottom = PANEL.y + 308;

    const leftHalfX1 = PANEL.x;
    const leftHalfX2 = splitX;
    const rightHalfX1 = splitX;
    const rightHalfX2 = PANEL.x + PANEL.width;

    const boxSize = 66;
    const gap = 18;
    const rowWidth = boxSize * 3 + gap * 2;

    const leftCenterX = (leftHalfX1 + leftHalfX2) / 2;
    const rightCenterX = (rightHalfX1 + rightHalfX2) / 2;

    const boxesY = topSectionTop + 48;
    const labelY = topSectionBottom - 74;

    const leftBoxesX = leftCenterX - rowWidth / 2;
    const rightBoxesX = rightCenterX - rowWidth / 2;

    const arrowYOffset = boxSize / 2;
    const pairedArrowOffset = 11;

    // box centers for left row
    const leftBox1CenterX = leftBoxesX + boxSize / 2;
    const leftBox2CenterX = leftBoxesX + (boxSize + gap) + boxSize / 2;
    const leftBox3CenterX = leftBoxesX + (boxSize + gap) * 2 + boxSize / 2;

    // box centers for right row
    const rightBox1CenterX = rightBoxesX + boxSize / 2;
    const rightBox2CenterX = rightBoxesX + (boxSize + gap) + boxSize / 2;
    const rightBox3CenterX = rightBoxesX + (boxSize + gap) * 2 + boxSize / 2;

    const arrowCenterY = boxesY + arrowYOffset;

    return (
        <g className="EPRSingleSpinSystemsVisual_TopHalfShellSection" transform="translate(0, 15)">
            <g className="EPRSingleSpinSystemsVisual_TopHalfLeft">
                <ThreeShellBoxes
                    x={leftBoxesX}
                    y={boxesY}
                    boxSize={boxSize}
                    gap={gap}
                />

                <SpinArrowUp x={leftBox1CenterX - pairedArrowOffset} y={arrowCenterY} />
                <SpinArrowDown x={leftBox1CenterX + pairedArrowOffset} y={arrowCenterY} />

                <SpinArrowUp x={leftBox2CenterX - pairedArrowOffset} y={arrowCenterY} />
                <SpinArrowDown x={leftBox2CenterX + pairedArrowOffset} y={arrowCenterY} />

                <SpinArrowUp x={leftBox3CenterX - pairedArrowOffset} y={arrowCenterY} />
                <SpinArrowDown x={leftBox3CenterX + pairedArrowOffset} y={arrowCenterY} />

                <text
                    x={leftCenterX}
                    y={labelY}
                    textAnchor="middle"
                    className="EPRSingleSpinSystemsVisual_ShellLabel"
                >
                    p-orbitals
                </text>
            </g>

            <g className="EPRSingleSpinSystemsVisual_TopHalfRight">
                <ThreeShellBoxes
                    x={rightBoxesX}
                    y={boxesY}
                    boxSize={boxSize}
                    gap={gap}
                />

                <SpinArrowUp x={rightBox1CenterX - pairedArrowOffset} y={arrowCenterY} />
                <SpinArrowDown x={rightBox1CenterX + pairedArrowOffset} y={arrowCenterY} />

                <SpinArrowUp x={rightBox2CenterX} y={arrowCenterY} />
                <SpinArrowUp x={rightBox3CenterX} y={arrowCenterY} />

                <text
                    x={rightCenterX}
                    y={labelY}
                    textAnchor="middle"
                    className="EPRSingleSpinSystemsVisual_ShellLabel"
                >
                    p-orbitals
                </text>
            </g>
        </g>
    );
}

function HorizontalArrow({
    x,
    y,
    length = 84,
    direction = "right",
    color = "var(--text)",
    strokeWidth = 3,
    headSize = 8,
    label = "",
    className = "",
}) {
    const half = length / 2;

    const x1 = x - half;
    const x2 = x + half;

    const lineStart = direction === "right" ? x1 : x2;
    const lineEnd = direction === "right" ? x2 : x1;

    const arrowHead =
        direction === "right"
            ? `M ${x2 - headSize} ${y - headSize}
               L ${x2} ${y}
               L ${x2 - headSize} ${y + headSize}`
            : `M ${x1 + headSize} ${y - headSize}
               L ${x1} ${y}
               L ${x1 + headSize} ${y + headSize}`;

    return (
        <g className={`EPRSingleSpinSystemsVisual_HorizontalArrow ${className}`}>
            <line
                x1={lineStart}
                y1={y}
                x2={lineEnd}
                y2={y}
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />

            <path
                d={arrowHead}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            {label ? (
                <text
                    x={x}
                    y={y - 10}
                    textAnchor="middle"
                    className="EPRSingleSpinSystemsVisual_FieldLabel"
                >
                    {label}
                </text>
            ) : null}
        </g>
    );
}

function BottomHalfSpinAlignmentSection() {
    const splitX = PANEL.x + PANEL.width / 2;

    const bottomSectionTop = PANEL.y + 308;
    const bottomSectionBottom = PANEL.y + PANEL.height;

    const leftHalfX1 = PANEL.x;
    const leftHalfX2 = splitX;
    const rightHalfX1 = splitX;
    const rightHalfX2 = PANEL.x + PANEL.width;

    const leftCenterX = (leftHalfX1 + leftHalfX2) / 2;
    const rightCenterX = (rightHalfX1 + rightHalfX2) / 2;

    // B0 field arrow placement
    const fieldArrowY = bottomSectionTop + 54;

    // 2x3 grid placement
    const gridRow1Y = bottomSectionTop + 122;
    const gridRow2Y = bottomSectionTop + 190;

    const colOffset = 76;

    const leftCol1X = leftCenterX - colOffset;
    const leftCol2X = leftCenterX;
    const leftCol3X = leftCenterX + colOffset;

    const rightCol1X = rightCenterX - colOffset;
    const rightCol2X = rightCenterX;
    const rightCol3X = rightCenterX + colOffset;

    return (
        <g className="EPRSingleSpinSystemsVisual_BottomHalfSpinAlignmentSection">
            {/* left half */}
            <g className="EPRSingleSpinSystemsVisual_BottomHalfLeft">
                <HorizontalArrow
                    x={leftCenterX}
                    y={fieldArrowY}
                    length={112}
                    direction="right"
                    color="var(--text)"
                    strokeWidth={3.2}
                    headSize={9}
                    label="With B₀"
                />

                <HorizontalArrow
                    x={leftCol1X}
                    y={gridRow1Y}
                    length={38}
                    direction="left"
                    color="var(--accent-3)"
                    strokeWidth={3}
                    headSize={7}
                />
                <HorizontalArrow
                    x={leftCol2X}
                    y={gridRow1Y}
                    length={38}
                    direction="left"
                    color="var(--accent-3)"
                    strokeWidth={3}
                    headSize={7}
                />
                <HorizontalArrow
                    x={leftCol3X}
                    y={gridRow1Y}
                    length={38}
                    direction="left"
                    color="var(--accent-3)"
                    strokeWidth={3}
                    headSize={7}
                />

                <HorizontalArrow
                    x={leftCol1X}
                    y={gridRow2Y}
                    length={38}
                    direction="left"
                    color="var(--accent-2)"
                    strokeWidth={3}
                    headSize={7}
                />
                <HorizontalArrow
                    x={leftCol2X}
                    y={gridRow2Y}
                    length={38}
                    direction="left"
                    color="var(--accent-2)"
                    strokeWidth={3}
                    headSize={7}
                />
                <HorizontalArrow
                    x={leftCol3X}
                    y={gridRow2Y}
                    length={38}
                    direction="left"
                    color="var(--accent-2)"
                    strokeWidth={3}
                    headSize={7}
                />
            </g>

            {/* right half */}
            <g className="EPRSingleSpinSystemsVisual_BottomHalfRight">
                <HorizontalArrow
                    x={rightCenterX}
                    y={fieldArrowY}
                    length={112}
                    direction="right"
                    color="var(--text)"
                    strokeWidth={3.2}
                    headSize={9}
                    label="With B₀"
                />

                <HorizontalArrow
                    x={rightCol1X}
                    y={gridRow1Y}
                    length={38}
                    direction="right"
                    color="var(--accent-2)"
                    strokeWidth={3}
                    headSize={7}
                />
                <HorizontalArrow
                    x={rightCol2X}
                    y={gridRow1Y}
                    length={38}
                    direction="right"
                    color="var(--accent-2)"
                    strokeWidth={3}
                    headSize={7}
                />
                <HorizontalArrow
                    x={rightCol3X}
                    y={gridRow1Y}
                    length={38}
                    direction="right"
                    color="var(--accent-2)"
                    strokeWidth={3}
                    headSize={7}
                />

                <HorizontalArrow
                    x={rightCol1X}
                    y={gridRow2Y}
                    length={38}
                    direction="right"
                    color="var(--accent-3)"
                    strokeWidth={3}
                    headSize={7}
                />
            </g>
        </g>
    );
}

export default function EPRSingleSpinSystemsVisual() {
    const rawId = useId();
    const uid = buildId(`epr-single-spin-${rawId}`);

    return (
        <figure className="EPRSingleSpinSystemsVisual">
            <svg
                className="EPRSingleSpinSystemsVisual_SVG"
                viewBox={VIEWBOX}
                role="img"
            >


                <BackgroundDefs uid={uid} />
                <BackgroundPanel uid={uid} />

                <TopHalfShellSection />
                <BottomHalfSpinAlignmentSection />
            </svg>
            <figcaption className="EPRSingleSpinSystemsVisual_Caption">
                EPR begins with unpaired electron spin. In closed-shell systems, paired electrons cancel their spin magnetic moments and are usually EPR-silent. In open-shell systems, unpaired electrons create a net magnetic moment that can interact with the applied field, B<sub>0</sub>, making the species paramagnetic and potentially EPR-active.
            </figcaption>
        </figure>
    );
}
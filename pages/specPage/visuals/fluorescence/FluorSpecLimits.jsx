import { useId } from "react";
import './FluorSpecLimits.css';


const VIEWBOX = { w: 920, h: 540 };

const PANEL = {
    x: 10,
    y: -4,
    w: 900,
    h: 500,
    r: 24,
};

const HEADER_H = 70;

const POP_BOX = {
    x: 72,
    y: 150,
    w: 240,
    h: 214,
    r: 20,
};

const SPLIT = { x: 432, y: 257 };

const TOP_BOX = {
    x: 540,
    y: 110,
    w: 276,
    h: 122,
    r: 18,
};

const BOTTOM_BOX = {
    x: 540,
    y: 296,
    w: 276,
    h: 122,
    r: 18,
};

const DOT_LAYOUT = {
    x: 116,
    y: 262,
    cols: 5,
    rows: 2,
    gapX: 34,
    gapY: 48,
    count: 10,
};

const GLOW_COUNT = 4;
const FADE_COUNT = 6;

const ARROW_GAP = 18;

const LABELS = {
    title: "ONLY SOME GLOW!",
    pop: "EXCITED",
    popSub: "10 absorbed",
    topTitle: "GIVES LIGHT BACK",
    topValue: "≈ 4 / 10",
    topTag: "36%",
    bottomTitle: "OTHER PATHS",
    bottomValue: "≈ 6 / 10",
    bottomTag: "64%",
};

const CAPTION =
  "After absorbing light, not every molecule gives light back. Some glow, while others lose their energy before fluorescence can happen.";

function buildDotGrid({ x, y, cols, rows, gapX, gapY, count }) {
    const pts = [];
    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
            if (pts.length >= count) break;
            pts.push({
                x: x + col * gapX,
                y: y + row * gapY,
            });
        }
    }
    return pts;
}

function buildPanelGrid(panel, step = 28) {
    const lines = [];

    for (let x = panel.x + step; x < panel.x + panel.w; x += step) {
        lines.push(
            <line
                key={`vx-${x}`}
                x1={x}
                y1={panel.y}
                x2={x}
                y2={panel.y + panel.h}
                className="FluorSpecLimits_GridLine"
            />
        );
    }
        
    for (let y = panel.y + step; y < panel.y + panel.h; y += step) {
        lines.push(
            <line
                key={`hy-${y}`}
                x1={panel.x}
                y1={y}
                x2={panel.x + panel.w}
                y2={y}
                className="FluorSpecLimits_GridLine"
            />
        );
    }
    return lines;
}


function BackgroundPanel({ panel, clipId, panelGradId, headerGradId }) {
    return (
        <>
            <rect
                x={panel.x - 1.5}
                y={panel.y - 1.5}
                width={panel.w + 3}
                height={panel.h + 3}
                rx={panel.r + 1}
                className="FluorSpecLimits_FrameGlow"
            />

            <rect
                x={panel.x}
                y={panel.y}
                width={panel.w}
                height={panel.h}
                rx={panel.r}
                fill={`url(#${panelGradId})`}
                className="FluorSpecLimits_Frame"
            />

            <g clipPath={`url(#${clipId})`}>
                <g className="FluorSpecLimits_Grid">{buildPanelGrid(panel)}</g>

                <rect
                    x={panel.x}
                    y={panel.y}
                    width={panel.w}
                    height={HEADER_H}
                    fill={`url(#${headerGradId})`}
                    className="FluorSpecLimits_Header"
                />
                <path
                    d={`
                        M ${panel.x + 18} ${panel.y + HEADER_H}
                        H ${panel.x + panel.w - 18}
                    `}
                    className="FluorSpecLimits_HeaderRule"
                />
                <text
                    x={panel.x + panel.w / 2}
                    y={panel.y + 8}
                    dy="0.95em"
                    textAnchor="middle"
                    className="FluorSpecLimits_Title"
                >
                    {LABELS.title}
                </text>
            </g>
        </>
    );
}


function InfoBox({ box, title, value, tag, variant = "bright", children }) {
    return (
        <g className={`FluorSpecLimits_InfoBox FluorSpecLimits_InfoBox--${variant}`}>
            <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                rx={box.r}
                className="FluorSpecLimits_InfoBoxGlow"
            />
            <rect
                x={box.x}
                y={box.y}
                width={box.w}
                height={box.h}
                rx={box.r}
                className="FluorSpecLimits_InfoBoxBody"
            />

            <text
                x={box.x + 20}
                y={box.y + 25}
                className="FluorSpecLimits_BoxTitle"
            >
                {title}
            </text>

            <text
                x={box.x + 20}
                y={box.y + 74}
                className="FluorSpecLimits_BoxValue"
            >
                {value}
            </text>

            <g transform={`translate(${box.x + box.w - 74}, ${box.y + 18})`}>
                <rect
                    x="0"
                    y="70"
                    width="54"
                    height="26"
                    rx="13"
                    className="FluorSpecLimits_Tag"
                />
                <text
                    x="27"
                    y="84"
                    textAnchor="middle"
                    className="FluorSpecLimits_TagText"
                >
                    {tag}
                </text>
            </g>

            {children}
        </g>
    );
}


function DotPopulation({ points, r = 8 }) {
    return (
        <g className="FluorSpecLimits_Population">
            {points.map((pt, i) => (
                <g key={`pop-dot-${i}`}>
                    <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={r+2}
                        className="FluorSpecLimits_PopDot"
                    />
                </g>
            ))}
        </g>
    );
}

function MiniPips({ x, y, count, variant = "bright" }) {
    return (
        <g className={`FluorSpecLimits_Pips FluorSpecLimits_Pips--${variant}`}>
            {Array.from({ length: count }).map((_, i) => {
                const px = x + i * 18;
                return (
                    <g key={`pip-${variant}-${i}`}>
                        <circle
                            cx={px}
                            cy={y + 8}
                            r="7"
                            className="FluorSpecLimits_PipHalo"
                        />
                        <circle
                            cx={px}
                            cy={y + 8}
                            r="4.2"
                            className="FluorSpecLimits_Pip"
                        />
                    </g>
                );
            })}
        </g>
    );
}

function FlowPath({ d, pathId, markerId, variant = "bright", width = 8 }) {
    return (
        <>
            <path
                id={pathId}
                d={d}
                fill="none"
                markerEnd={`url(#${markerId})`}
                strokeWidth={width}
                className={`FluorSpecLimits_Flow FluorSpecLimits_Flow--${variant}`}
            />
        </>
    );
}

function FlowPulse({ pathId, variant = "bright", r = 4.5, dur = "3.6s", begin = "0s" }) {
    return (
        <circle className={`FluorSpecLimits_Pulse FluorSpecLimits_Pulse--${variant}`} r={r}>
            <animateMotion dur={dur} begin={begin} repeatCount="indefinite" rotate="auto">
                <mpath href={`#${pathId}`} />
            </animateMotion>
        </circle>
    );
}

export default function FluorSpecLimits() {
    const uid = useId().replace(/:/g, "");

    const ids = {
        clip: `fluor-spec-limits-clip-${uid}`,
        panelGrad: `fluor-spec-limits-panel-grad-${uid}`,
        headerGrad: `fluor-spec-limits-header-grad-${uid}`,
        arrowBright: `fluor-spec-limits-arrow-bright-${uid}`,
        arrowDim: `fluor-spec-limits-arrow-dim-${uid}`,
        topPath: `fluor-spec-limits-top-path-${uid}`,
        bottomPath: `fluor-spec-limits-bottom-path-${uid}`,
    };

    const populationDots = buildDotGrid(DOT_LAYOUT);

    const topPathD = `
        M ${POP_BOX.x + POP_BOX.w + 16} ${SPLIT.y}
        C ${SPLIT.x - 38} ${SPLIT.y}, ${SPLIT.x - 12} ${SPLIT.y}, ${SPLIT.x} ${SPLIT.y}
        S ${TOP_BOX.x - 54} ${TOP_BOX.y + 52}, ${TOP_BOX.x - ARROW_GAP} ${TOP_BOX.y + 52}
    `;

    const bottomPathD = `
        M ${POP_BOX.x + POP_BOX.w + 16} ${SPLIT.y}
        C ${SPLIT.x - 38} ${SPLIT.y}, ${SPLIT.x - 12} ${SPLIT.y}, ${SPLIT.x} ${SPLIT.y}
        S ${BOTTOM_BOX.x - 54} ${BOTTOM_BOX.y + 58}, ${BOTTOM_BOX.x - ARROW_GAP} ${BOTTOM_BOX.y + 58}
    `;

    return (
        <figure className="FluorSpecLimits">
            <svg
                className="FluorSpecLimits_SVG"
                viewBox={`0 0 ${VIEWBOX.w} ${VIEWBOX.h}`}
                aria-labelledby={`fluor-spec-limits-title-${uid}`}
                role="img"
            >
                <defs>
                    <clipPath id={ids.clip}>
                    <rect
                        x={PANEL.x}
                        y={PANEL.y}
                        width={PANEL.w}
                        height={PANEL.h}
                        rx={PANEL.r}
                    />
                    </clipPath>

                    <linearGradient id={ids.panelGrad} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="var(--surface)" />
                        <stop offset="60%" stopColor="color-mix(in oklab, var(--bg) 78%, var(--primary-deep))" />
                        <stop offset="100%" stopColor="color-mix(in oklab, var(--bg) 88%, var(--c-shadow))" />
                    </linearGradient>

                    <linearGradient id={ids.headerGrad} x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="color-mix(in oklab, var(--c-glow-2) 18%, var(--surface-2))" />
                        <stop offset="50%" stopColor="color-mix(in oklab, var(--c-glow-3) 10%, var(--surface-2))" />
                        <stop offset="100%" stopColor="color-mix(in oklab, var(--c-glow-1) 18%, var(--surface-2))" />
                    </linearGradient>

                    <marker
                        id={ids.arrowBright}
                        viewBox="0 0 34 26"
                        markerWidth="34"
                        markerHeight="26"
                        refX="12"
                        refY="13"
                        orient="auto"
                        markerUnits="userSpaceOnUse"
                        overflow="visible"
                    >
                        <path
                            d="M 2 2.5 L 32 13 L 2 23.5 L 11 13 Z"
                            style={{
                                fill: "var(--c-glow-1)",
                                stroke: "var(--text)",
                                strokeWidth: 0.6,
                                opacity: 0.98,
                            }}
                        />
                    </marker>

                    <marker
                            id={ids.arrowDim}
                            viewBox="0 0 34 34"
                            markerWidth="34"
                            markerHeight="34"
                            refX="12"
                            refY="17"
                            orient="auto"
                            markerUnits="userSpaceOnUse"
                            overflow="visible"
                        >
                        <path
                            d="M 2 2 L 32 17 L 2 32 L 11 17 Z"
                            style={{
                                fill: "color-mix(in oklab, var(--c-glow-3) 58%, var(--c-glow-2) 42%)",
                                stroke: "color-mix(in oklab, var(--c-glow-3) 42%, var(--bg))",
                                strokeWidth: 0.7,
                                opacity: 0.88,
                            }}
                        />
                    </marker>
                </defs>

                <title id={`fluor-spec-limits-title-${uid}`}>{LABELS.title}</title>

                <BackgroundPanel
                    panel={PANEL}
                    clipId={ids.clip}
                    panelGradId={ids.panelGrad}
                    headerGradId={ids.headerGrad}
                />

                <g className="FluorSpecLimits_LeftBox">
                    <rect
                        x={POP_BOX.x}
                        y={POP_BOX.y}
                        width={POP_BOX.w}
                        height={POP_BOX.h}
                        rx={POP_BOX.r}
                        className="FluorSpecLimits_LeftBoxGlow"
                    />
                    <rect
                        x={POP_BOX.x}
                        y={POP_BOX.y}
                        width={POP_BOX.w}
                        height={POP_BOX.h}
                        rx={POP_BOX.r}
                        className="FluorSpecLimits_LeftBoxBody"
                    />
                    <text
                        x={POP_BOX.x + 20}
                        y={POP_BOX.y + 30}
                        className="FluorSpecLimits_BoxTitle"
                    >
                        {LABELS.pop}
                    </text>
                    <text
                        x={POP_BOX.x + 20}
                        y={POP_BOX.y + 58}
                        className="FluorSpecLimits_LeftSub"
                    >
                        {LABELS.popSub}
                    </text>
                    <DotPopulation points={populationDots} />
                </g>

                <g className="FluorSpecLimits_SplitNode">
                    <circle cx={SPLIT.x} cy={SPLIT.y} r="12" className="FluorSpecLimits_SplitHalo" />
                    <circle cx={SPLIT.x} cy={SPLIT.y} r="5.5" className="FluorSpecLimits_SplitCore" />
                </g>

                <FlowPath
                    d={topPathD}
                    pathId={ids.topPath}
                    markerId={ids.arrowBright}
                    variant="bright"
                    width={7}
                />
                <FlowPath
                    d={bottomPathD}
                    pathId={ids.bottomPath}
                    markerId={ids.arrowDim}
                    variant="dim"
                    width={11}
                />

                <FlowPulse pathId={ids.topPath} variant="bright" begin="0s" />
                <FlowPulse pathId={ids.topPath} variant="bright" begin="1.3s" />
                <FlowPulse pathId={ids.bottomPath} variant="dim" begin="0.5s" />
                <FlowPulse pathId={ids.bottomPath} variant="dim" begin="1.8s" />

                <InfoBox
                    box={TOP_BOX}
                    title={LABELS.topTitle}
                    value={LABELS.topValue}
                    tag={LABELS.topTag}
                    variant="bright"
                >
                    <MiniPips
                        x={TOP_BOX.x + 22}
                        y={TOP_BOX.y + 94}
                        count={GLOW_COUNT}
                        variant="bright"
                    />
                </InfoBox>

                <InfoBox
                    box={BOTTOM_BOX}
                    title={LABELS.bottomTitle}
                    value={LABELS.bottomValue}
                    tag={LABELS.bottomTag}
                    variant="dim"
                >
                    <MiniPips
                        x={BOTTOM_BOX.x + 22}
                        y={BOTTOM_BOX.y + 94}
                        count={FADE_COUNT}
                        variant="dim"
                    />
                </InfoBox>
            </svg>
            <figcaption className="FluorSpecLimits_Caption">{CAPTION}</figcaption>
        </figure>
    );
}
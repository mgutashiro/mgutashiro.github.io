import { useId } from "react";
import './eprElectronMagnetsVisual.css'

const VIEWBOX = "0 0 520 460";

const PANEL = {
    x: 18,
    y: 18,
    width: 484,
    height: 424,
    rx: 26,
};

const PANEL_MID = {
    x: PANEL.x + PANEL.width / 2,
    y: PANEL.y + PANEL.height / 2,
};

const SPLIT_PADDING = 18;

function cleanId(id) {
    return id.replace(/:/g, "-");
}

function EPRElectronMagnetsVisualDefs({
    backgroundGradientId,
    protonGradientId,
    electronGradientId,
}) {
    return (
        <defs>
            {/* Background wash */}
            <linearGradient
                id={backgroundGradientId}
                x1={PANEL.x}
                y1={PANEL.y}
                x2={PANEL.x}
                y2={PANEL.y + PANEL.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--surface)" />
                <stop offset="58%" stopColor="var(--bg)" />
                <stop offset="100%" stopColor="var(--primary-deep)" />
            </linearGradient>

            {/* Proton gradient — saved for later */}
            <radialGradient id={protonGradientId} cx="38%" cy="32%" r="68%">
                <stop offset="0%" stopColor="var(--accent-3)" />
                <stop offset="100%" stopColor="var(--emo1)" />
            </radialGradient>

            {/* Electron gradient — saved for later */}
            <radialGradient id={electronGradientId} cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="100%" stopColor="var(--accent)" />
            </radialGradient>
        </defs>
    );
}

function BackgroundPanel({ backgroundGradientId }) {
    return (
        <g className="EPRElectronMagnetsVisual_BackgroundPanel">
            {/* Main visual panel */}
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill={`url(#${backgroundGradientId})`}
                className="EPRElectronMagnetsVisual_PanelRect"
            />

            {/* Vertical half-split line */}
            <line
                x1={PANEL_MID.x}
                y1={PANEL.y + SPLIT_PADDING}
                x2={PANEL_MID.x}
                y2={PANEL.y + PANEL.height - SPLIT_PADDING}
                className="EPRElectronMagnetsVisual_SplitLine"
                vectorEffect="non-scaling-stroke"
            />

            {/* Horizontal half-split line */}
            <line
                x1={PANEL.x + SPLIT_PADDING}
                y1={PANEL_MID.y}
                x2={PANEL.x + PANEL.width - SPLIT_PADDING}
                y2={PANEL_MID.y}
                className="EPRElectronMagnetsVisual_SplitLine"
                vectorEffect="non-scaling-stroke"
            />
        </g>
    );
}

function UpArrow({
    x,
    centerY,
    topY,
    bottomY,
    className = "",
}) {
    const headHalfWidth = 8;
    const headHeight = 11;

    return (
        <g className={`EPRElectronMagnetsVisual_UpArrow ${className}`}>
            <line
                x1={x}
                y1={bottomY}
                x2={x}
                y2={topY + headHeight}
                className="EPRElectronMagnetsVisual_UpArrowShaft"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d={`
                    M ${x} ${topY}
                    L ${x - headHalfWidth} ${topY + headHeight}
                    L ${x + headHalfWidth} ${topY + headHeight}
                    Z
                `}
                className="EPRElectronMagnetsVisual_UpArrowHead"
            />
        </g>
    );
}

function BottomSpinArrow({
    x,
    y,
    scaleX = 0.65,
    scaleY = 0.65,
    className = "",
}) {
    const ARROW = {
        minX: 0.48938,
        minY: 0.593781,
        width: 85,
    };

    const arrowPath =
        "M0.48938 1.01369L2.0542 8.48611L5.70544 15.2666L10.6085 20.6634L16.6592 25.2299L23.2314 27.7207L30.1166 29.6579L37.0018 30.3498L46.2864 29.6579L55.1537 27.5823L62.4562 24.538L68.6112 20.2482L73.5143 14.8515L76.5396 9.59313L78.1044 5.85692L78.626 0.736935M73.5143 5.34984L78.626 0.736935L82.4894 5.85692";

    const translateX = x - (ARROW.minX + ARROW.width / 2) * scaleX;
    const translateY = y - ARROW.minY * scaleY;



    return (
        <g
            className={`EPRElectronMagnetsVisual_BottomSpinArrowGroup ${className}`}
            transform={`translate(${translateX} ${translateY}) scale(${scaleX} ${scaleY})`}
        >
            <path
                d={arrowPath}
                className="EPRElectronMagnetsVisual_BottomSpinArrow"
            />

        </g>
    );
}

function TopHalfVisualPanel({ protonGradientId, electronGradientId }) {
    const leftX = PANEL.x + PANEL.width * 0.25;
    const rightX = PANEL.x + PANEL.width * 0.75;

    const circleCenterY = PANEL.y + 100;

    const protonRadius = 45;
    const electronRadius = 14;

    return (
        <g className="EPRElectronMagnetsVisual_TopHalfVisualPanel">
            {/* Left side: proton */}
            <UpArrow
                x={leftX}
                centerY={circleCenterY}
                topY={circleCenterY - 70}
                bottomY={circleCenterY + 75}
                className="EPRElectronMagnetsVisual_UpArrow--proton"
            />

            <circle
                cx={leftX}
                cy={circleCenterY + 5}
                r={protonRadius}
                fill={`url(#${protonGradientId})`}
                className="EPRElectronMagnetsVisual_Circle EPRElectronMagnetsVisual_Circle--proton"
            />

            <BottomSpinArrow
                x={leftX + 2}
                y={circleCenterY + 40}
                scaleX={1.1}
                scaleY={0.8}
                className="EPRElectronMagnetsVisual_BottomSpinArrow--proton"
            />

            {/* Right side: electron */}
            <UpArrow
                x={rightX}
                centerY={circleCenterY + 5}
                topY={circleCenterY - 70}
                bottomY={circleCenterY + 75}
                className="EPRElectronMagnetsVisual_UpArrow--electron"
            />

            <circle
                cx={rightX}
                cy={circleCenterY}
                r={electronRadius}
                fill={`url(#${electronGradientId})`}
                className="EPRElectronMagnetsVisual_Circle EPRElectronMagnetsVisual_Circle--electron"
            />

            <BottomSpinArrow
                x={rightX + 1.5}
                y={circleCenterY + 20}
                scaleX={.4}
                scaleY={.4}
                className="EPRElectronMagnetsVisual_BottomSpinArrow--electron"
            />
        </g>
    );
}

function DownArrow({
    x,
    topY,
    bottomY,
    className = "",
}) {
    const headHalfWidth = 8;
    const headHeight = 11;

    return (
        <g className={`EPRElectronMagnetsVisual_DownArrow ${className}`}>
            <line
                x1={x}
                y1={topY}
                x2={x}
                y2={bottomY - headHeight}
                className="EPRElectronMagnetsVisual_DownArrowShaft"
                vectorEffect="non-scaling-stroke"
            />

            <path
                d={`
                    M ${x} ${bottomY}
                    L ${x - headHalfWidth} ${bottomY - headHeight}
                    L ${x + headHalfWidth} ${bottomY - headHeight}
                    Z
                `}
                className="EPRElectronMagnetsVisual_DownArrowHead"
            />
        </g>
    );
}

function BottomHalfElectronSystem({
    electronGradientId,
    x,
    lineY,
    spin = "up",
    className = "",
}) {
    const electronRadius = 13;
    const electronY = lineY - electronRadius;

    return (
        <g className={`EPRElectronMagnetsVisual_BottomElectronSystem ${className}`} transform="translate(0, -10)">
            {/* Spin arrow behind the electron */}
            {spin === "up" ? (
                <UpArrow
                    x={x}
                    topY={electronY - 34}
                    bottomY={electronY + 26}
                    className="EPRElectronMagnetsVisual_UpArrow--bottomElectron"
                />
            ) : (
                <DownArrow
                    x={x}
                    topY={electronY - 26}
                    bottomY={electronY + 34}
                    className="EPRElectronMagnetsVisual_DownArrow--bottomElectron"
                />
            )}

            {/* Electron */}
            <circle
                cx={x}
                cy={electronY}
                r={electronRadius}
                fill={`url(#${electronGradientId})`}
                className="EPRElectronMagnetsVisual_Circle EPRElectronMagnetsVisual_Circle--electron"
            />
        </g>
    );
}

function BottomHalfVisualPanel({ electronGradientId }) {
    const leftCenterX = PANEL.x + PANEL.width * 0.25;
    const rightCenterX = PANEL.x + PANEL.width * 0.75;

    const bottomLineY = PANEL.y + PANEL.height - 34;

    const leftLine = {
        x1: PANEL.x + 60,
        x2: PANEL_MID.x - 60,
        y: bottomLineY,
    };

    const rightLine = {
        x1: PANEL_MID.x + 60,
        x2: PANEL.x + PANEL.width - 60,
        y: bottomLineY,
    };

    const pairedGap = 24;

    return (
        <g className="EPRElectronMagnetsVisual_BottomHalfVisualPanel">
            {/* Left bottom: open-shell system */}
            <line
                x1={leftLine.x1}
                y1={leftLine.y}
                x2={leftLine.x2}
                y2={leftLine.y}
                className="EPRElectronMagnetsVisual_OrbitalLine"
                vectorEffect="non-scaling-stroke"
            />

            <BottomHalfElectronSystem
                electronGradientId={electronGradientId}
                x={leftCenterX}
                lineY={bottomLineY - 15}
                spin="up"
                className="EPRElectronMagnetsVisual_BottomElectronSystem--openShell"
            />

            {/* Right bottom: closed-shell system */}
            <line
                x1={rightLine.x1}
                y1={rightLine.y}
                x2={rightLine.x2}
                y2={rightLine.y}
                className="EPRElectronMagnetsVisual_OrbitalLine"
                vectorEffect="non-scaling-stroke"
            />

            <BottomHalfElectronSystem
                electronGradientId={electronGradientId}
                x={rightCenterX - 20}
                lineY={bottomLineY - 15}
                spin="up"
                className="EPRElectronMagnetsVisual_BottomElectronSystem--closedShell"
            />

            <BottomHalfElectronSystem
                electronGradientId={electronGradientId}
                x={rightCenterX + 20}
                lineY={bottomLineY - 15}
                spin="down"
                className="EPRElectronMagnetsVisual_BottomElectronSystem--closedShell"
            />
        </g>
    );
}

function PanelTextLayer() {
    const topHalfTitleY = PANEL.y + 24;
    const topHalfBottomY = PANEL_MID.y - 18;
    const bottomHalfTitleY = PANEL_MID.y + 24;

    const leftColX = PANEL.x + PANEL.width * 0.25;
    const rightColX = PANEL.x + PANEL.width * 0.75;
    const centerX = PANEL_MID.x;

    const centerY = PANEL_MID.y;

    return (
        <g className="EPRElectronMagnetsVisual_TextLayer">
            {/* Top row labels */}
            <text
                x={leftColX}
                y={topHalfTitleY}
                className="EPRElectronMagnetsVisual_Label EPRElectronMagnetsVisual_Label--heading"
                textAnchor="middle"
            >
                proton spin
            </text>

            <text
                x={centerX}
                y={centerY - 100}
                className="EPRElectronMagnetsVisual_Label EPRElectronMagnetsVisual_Label--vs"
                textAnchor="middle"
            >
                VS
            </text>

            <text
                x={rightColX}
                y={topHalfTitleY}
                className="EPRElectronMagnetsVisual_Label EPRElectronMagnetsVisual_Label--heading"
                textAnchor="middle"
            >
                electron spin
            </text>

            {/* Top row bottom comparison */}
            <text
                x={leftColX}
                y={topHalfBottomY}
                className="EPRElectronMagnetsVisual_Label EPRElectronMagnetsVisual_Label--math"
                textAnchor="middle"
            >
                mass
                <tspan baselineShift="sub" fontSize="0.72em">
                    proton
                </tspan>
            </text>

            <text
                x={centerX}
                y={topHalfBottomY}
                className="EPRElectronMagnetsVisual_Label EPRElectronMagnetsVisual_Label--equals"
                textAnchor="middle"
            >
                =
            </text>

            <text
                x={rightColX}
                y={topHalfBottomY}
                className="EPRElectronMagnetsVisual_Label EPRElectronMagnetsVisual_Label--math"
                textAnchor="middle"
            >
                ~1833 × mass
                <tspan baselineShift="sub" fontSize="0.72em">
                    electron
                </tspan>
            </text>

            {/* Bottom row labels */}
            <text
                x={leftColX}
                y={bottomHalfTitleY}
                className="EPRElectronMagnetsVisual_Label EPRElectronMagnetsVisual_Label--heading"
                textAnchor="middle"
            >
                open-shell system
            </text>

            <text
                x={rightColX}
                y={bottomHalfTitleY}
                className="EPRElectronMagnetsVisual_Label EPRElectronMagnetsVisual_Label--heading"
                textAnchor="middle"
            >
                closed-shell system
            </text>
        </g>
    );
}

export default function eprElectronMagnetsVisual({ className = "" }) {
    const uid = cleanId(useId());

    const backgroundGradientId = `epr-electron-magnets-bg-${uid}`;
    const protonGradientId = `epr-proton-gradient-${uid}`;
    const electronGradientId = `epr-electron-gradient-${uid}`;

    return (
        <figure className={`EPRElectronMagnetsVisual ${className}`}>
            <svg
                viewBox={VIEWBOX}
                role="img"
                aria-labelledby={`epr-electron-magnets-title-${uid}`}
                className="EPRElectronMagnetsVisual_SVG"
            >
                <title id={`epr-electron-magnets-title-${uid}`}>
                    EPR electron magnets visual panel
                </title>

                <EPRElectronMagnetsVisualDefs
                    backgroundGradientId={backgroundGradientId}
                    protonGradientId={protonGradientId}
                    electronGradientId={electronGradientId}
                />

                <BackgroundPanel backgroundGradientId={backgroundGradientId} />
                <TopHalfVisualPanel
                    protonGradientId={protonGradientId}
                    electronGradientId={electronGradientId}
                />

                <BottomHalfVisualPanel electronGradientId={electronGradientId} />

                <PanelTextLayer />
            </svg>
        </figure>
    );
}
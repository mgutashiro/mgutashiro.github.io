import { useId } from "react";
import "./eprVsNmrResonance.css";

const VIEWBOX = "0 0 520 500";

const PANEL = {
    x: 10,
    y: 10,
    width: 500,
    height: 480,
    rx: 26,
};

const PANEL_MID = {
    x: PANEL.x + PANEL.width / 2,
    y: PANEL.y + PANEL.height / 2,
};

const TOP_SECTION = {
    titleY: PANEL.y + 24,
    titleRuleY: PANEL.y + 34,
};

const PANEL_EDGES = {
    left: PANEL.x,
    right: PANEL.x + PANEL.width,
    top: PANEL.y,
    bottom: PANEL.y + PANEL.height,
};

const SPLIT_PADDING = 18;

const ROW_DIVIDERS = {
    y1: PANEL.y + PANEL.height * 0.25,
    y2: PANEL.y + PANEL.height * 0.5,
    y3: PANEL.y + PANEL.height * 0.75,
};

function cleanId(id) {
    return id.replace(/:/g, "-");
}

function EPRVsNMRDefs({
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

            {/* Proton gradient */}
            <radialGradient id={protonGradientId} cx="38%" cy="32%" r="68%">
                <stop offset="0%" stopColor="var(--accent-3)" />
                <stop offset="100%" stopColor="var(--emo1)" />
            </radialGradient>

            {/* Electron gradient */}
            <radialGradient id={electronGradientId} cx="35%" cy="30%" r="70%">
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="100%" stopColor="var(--accent)" />
            </radialGradient>
        </defs>
    );
}

function BackgroundPanel({ backgroundGradientId }) {
    return (
        <g className="EPRVsNMRResonance_BackgroundPanel">
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill={`url(#${backgroundGradientId})`}
                className="EPRVsNMRResonance_PanelRect"
            />

            <line
                x1={PANEL.x + 22}
                y1={TOP_SECTION.titleRuleY}
                x2={PANEL.x + PANEL.width - 22}
                y2={TOP_SECTION.titleRuleY}
                className="EPRVsNMRResonance_TitleDivider"
                vectorEffect="non-scaling-stroke"
            />

            <line
                x1={PANEL_MID.x}
                y1={PANEL.y + SPLIT_PADDING}
                x2={PANEL_MID.x}
                y2={PANEL.y + PANEL.height - SPLIT_PADDING}
                className="EPRVsNMRResonance_SplitLine"
                vectorEffect="non-scaling-stroke"
            />

            <line
                x1={PANEL.x + SPLIT_PADDING}
                y1={ROW_DIVIDERS.y1}
                x2={PANEL.x + PANEL.width - SPLIT_PADDING}
                y2={ROW_DIVIDERS.y1}
                className="EPRVsNMRResonance_SplitLine"
                vectorEffect="non-scaling-stroke"
            />

            <line
                x1={PANEL.x + SPLIT_PADDING}
                y1={ROW_DIVIDERS.y2}
                x2={PANEL.x + PANEL.width - SPLIT_PADDING}
                y2={ROW_DIVIDERS.y2}
                className="EPRVsNMRResonance_SplitLine"
                vectorEffect="non-scaling-stroke"
            />

            <line
                x1={PANEL.x + SPLIT_PADDING}
                y1={ROW_DIVIDERS.y3}
                x2={PANEL.x + PANEL.width - SPLIT_PADDING}
                y2={ROW_DIVIDERS.y3}
                className="EPRVsNMRResonance_SplitLine"
                vectorEffect="non-scaling-stroke"
            />
        </g>
    );
}

function UpArrow({
    x,
    topY,
    bottomY,
    className = "",
}) {
    const headHalfWidth = 7;
    const headHeight = 10;

    return (
        <g className={`EPRVsNMRResonance_UpArrow ${className}`}>
            <line
                x1={x}
                y1={bottomY}
                x2={x}
                y2={topY + headHeight}
                className="EPRVsNMRResonance_UpArrowShaft"
                vectorEffect="non-scaling-stroke"
            />
            <path
                d={`
                    M ${x} ${topY}
                    L ${x - headHalfWidth} ${topY + headHeight}
                    L ${x + headHalfWidth} ${topY + headHeight}
                    Z
                `}
                className="EPRVsNMRResonance_UpArrowHead"
            />
        </g>
    );
}

function TopSectionVisualPanel({
    protonGradientId,
    electronGradientId,
}) {
    const topSectionTop = PANEL.y;
    const topSectionBottom = ROW_DIVIDERS.y1;

    const leftCenterX = PANEL.x + PANEL.width * 0.25;
    const rightCenterX = PANEL.x + PANEL.width * 0.75;
    const centerX = PANEL_MID.x;

    const titleY = TOP_SECTION.titleY;

    const protonRadius = 18;
    const electronRadius = 12;

    const protonCircleY = topSectionTop + 62;
    const electronCircleY = topSectionTop + 62;

    const protonArrowTopY = protonCircleY - 34;
    const protonArrowBottomY = protonCircleY + 20;

    const electronArrowTopY = electronCircleY - 34;
    const electronArrowBottomY = electronCircleY + 18;

    const fieldLabelOffset = 18;

    return (
        <g className="EPRVsNMRResonance_TopSectionVisualPanel">
            {/* Top titles */}
            <text
                x={leftCenterX}
                y={titleY}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--heading"
                textAnchor="middle"
            >
                NMR
            </text>

            <text
                x={centerX}
                y={titleY}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--vs"
                textAnchor="middle"
            >
                VS
            </text>

            <text
                x={rightCenterX}
                y={titleY}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--heading"
                textAnchor="middle"
            >
                EPR
            </text>
            
            <g className="EPRTopSection_Translate" transform="translate(0, 10)">
                {/* Left side: proton + up arrow */}
                <UpArrow
                    x={leftCenterX}
                    topY={protonArrowTopY}
                    bottomY={protonArrowBottomY}
                    className="EPRVsNMRResonance_UpArrow--proton"
                />

                <circle
                    cx={leftCenterX}
                    cy={protonCircleY}
                    r={protonRadius}
                    fill={`url(#${protonGradientId})`}
                    className="EPRVsNMRResonance_Circle EPRVsNMRResonance_Circle--proton"
                />

                <text
                    x={leftCenterX}
                    y={protonCircleY + 5}
                    className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--charge"
                    textAnchor="middle"
                >
                    +
                </text>

                <text
                    x={leftCenterX}
                    y={protonArrowBottomY + fieldLabelOffset}
                    className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--field"
                    textAnchor="middle"
                >
                    B₀ Direction
                </text>

                {/* Right side: electron + up arrow */}
                <UpArrow
                    x={rightCenterX}
                    topY={electronArrowTopY}
                    bottomY={electronArrowBottomY}
                    className="EPRVsNMRResonance_UpArrow--electron"
                />

                <circle
                    cx={rightCenterX}
                    cy={electronCircleY}
                    r={electronRadius}
                    fill={`url(#${electronGradientId})`}
                    className="EPRVsNMRResonance_Circle EPRVsNMRResonance_Circle--electron"
                />

                <text
                    x={rightCenterX}
                    y={electronCircleY + 4}
                    className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--charge"
                    textAnchor="middle"
                >
                    –
                </text>

                <text
                    x={rightCenterX}
                    y={protonArrowBottomY + fieldLabelOffset}
                    className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--field"
                    textAnchor="middle"
                >
                    B₀ Direction
                </text>
            </g>
        </g>
    );
}

function WavePath({
    d,
    bounds,
    centerX,
    topY,
    targetWidth,
    className = "",
}) {
    const scale = targetWidth / bounds.width;

    const translateX = centerX - (bounds.minX + bounds.width / 2) * scale;
    const translateY = topY - bounds.minY * scale;

    return (
        <g
            transform={`translate(${translateX} ${translateY}) scale(${scale})`}
            className={`EPRVsNMRResonance_WaveGroup ${className}`}
        >
            <path
                d={d}
                className="EPRVsNMRResonance_WavePath"
            />
        </g>
    );
}

function SecondSectionWavePanel() {
    const rowTop = ROW_DIVIDERS.y1;
    const rowBottom = ROW_DIVIDERS.y2;
    const rowHeight = rowBottom - rowTop;

    const leftCenterX = PANEL.x + PANEL.width * 0.25;
    const rightCenterX = PANEL.x + PANEL.width * 0.75;

    const waveTopY = rowTop + 14;
    const labelY = rowBottom - 12;

    const targetWaveWidth = 172;

    const radioWavePath =
        "M400.112 3.48718L396.112 4.98718L390.112 7.98718L384.112 12.9872L377.612 20.4872L371.612 29.4872L365.112 39.4872L358.612 49.9872L353.112 58.9872L347.612 65.9872L341.112 74.4872L334.112 82.4872L328.112 88.9872L322.112 93.9872L315.612 98.4872L309.612 100.987L303.112 101.987L297.112 100.987L293.112 99.4872L287.112 96.4872L281.112 91.4872L274.612 83.9872L268.612 74.9872L262.112 64.9872L255.612 54.4872L250.112 45.4872L244.612 38.4872L238.112 29.9872L231.112 21.9872L225.112 15.4872L219.112 10.4872L212.612 5.98718L206.612 3.48718L201.112 2.48718L196.112 3.48718L190.112 6.48718L184.112 11.4872L177.612 18.9872L171.612 27.9872L165.112 37.9872L158.612 48.4872L153.112 57.4872L147.612 64.4872L141.112 72.9872L134.112 80.9872L128.112 87.4872L122.112 92.4872L115.612 96.9872L109.612 99.4872L103.112 100.487L97.1124 99.4872L93.1124 97.9872L87.1124 94.9872L81.1124 89.9872L74.6124 82.4872L68.6124 73.4872L62.1124 63.4872L55.6124 52.9872L50.1124 43.9872L44.6124 36.9872L38.1124 28.4872L31.1124 20.4872L25.1124 13.9872L19.1124 8.98718L12.6124 4.48718L6.61243 1.98718L0.112427 0.487183";

    const microwaveWavePath =
        "M470.121 99.0426L465.121 95.5426L461.121 90.0426L457.121 83.5426L453.621 75.0426L450.621 68.0426L447.121 59.5426L444.121 50.5426L440.621 41.5426L436.621 32.0426L432.121 22.5426L428.621 15.5426L424.621 9.5426L421.121 5.5426L417.121 2.5426L412.621 0.542603L407.621 2.5426L403.621 8.0426L399.621 14.5426L396.121 23.0426L393.121 30.0426L389.621 38.5426L386.621 47.5426L383.121 56.5426L379.121 66.0426L374.621 75.5426L370.621 83.5426L367.121 90.0426L364.621 93.5426L361.121 95.5426C361.121 95.5426 357.089 98.3476 354.121 98.5426C350.609 98.7734 345.621 95.5426 345.621 95.5426L340.621 90.0426L336.621 83.5426L333.121 75.0426L330.121 68.0426L326.621 59.5426L323.621 50.5426L320.121 41.5426L316.121 32.0426L311.621 22.5426L308.121 15.5426L304.121 9.54261L300.621 5.54261L296.621 2.54261L292.121 0.542609L287.121 2.54261L283.121 8.04261L279.121 14.5426L275.621 23.0426L272.621 30.0426L269.121 38.5426L266.121 47.5426L262.621 56.5426L258.621 66.0426L254.121 75.5426L250.621 82.5426L246.621 88.5426L243.121 92.5426L240.121 95.5426L235.121 97.5426L230.121 95.5426L226.121 90.0426L222.121 83.5426L218.621 75.0426L215.621 68.0426L212.121 59.5426L209.121 50.5426L205.621 41.5426L201.621 32.0426L197.121 22.5426L193.621 15.5426L189.621 9.5426L186.121 5.5426L182.121 2.5426L177.621 0.542603L172.621 2.5426L168.621 8.0426L164.621 14.5426L161.121 23.0426L158.121 30.0426L154.621 38.5426L151.621 47.5426L148.121 56.5426L144.121 66.0426L139.621 75.5426L135.621 83.5426L132.121 90.0426L129.621 93.5426L126.121 95.5426C126.121 95.5426 122.089 98.3476 119.121 98.5426C115.609 98.7734 110.621 95.5426 110.621 95.5426L105.621 90.0426L101.621 83.5426L98.1213 75.0426L95.1213 68.0426L91.6213 59.5426L88.6213 50.5426L85.1213 41.5426L81.1213 32.0426L76.6213 22.5426L73.1213 15.5426L69.1213 9.54261L65.6213 5.54261L61.6213 2.54261L57.1213 0.542609L52.1213 2.54261L48.1213 8.04261L44.1213 14.5426L40.6213 23.0426L37.6213 30.0426L34.1213 38.5426L31.1213 47.5426L27.6213 56.5426L23.6213 66.0426L19.1213 75.5426L15.6213 82.5426L11.6213 88.5426L8.12128 92.5426L4.12128 95.5426L0.121277 96.5426";

    const radioWaveBounds = {
        minX: 0.112427,
        minY: 0.487183,
        width: 400,
        height: 101.5,
    };

    const microwaveWaveBounds = {
        minX: 0.121277,
        minY: 0.542603,
        width: 470,
        height: 98.5,
    };

    return (
        <g className="EPRVsNMRResonance_SecondSectionWavePanel">
            <WavePath
                d={radioWavePath}
                bounds={radioWaveBounds}
                centerX={leftCenterX}
                topY={waveTopY + 20}
                targetWidth={targetWaveWidth}
                className="EPRVsNMRResonance_WaveGroup--radio"
            />
            <text
                x={leftCenterX}
                y={labelY}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--wave"
                textAnchor="middle"
            >
                Radio Frequency Wave
            </text>

            <WavePath
                d={microwaveWavePath}
                bounds={microwaveWaveBounds}
                centerX={rightCenterX}
                topY={waveTopY + 20}
                targetWidth={targetWaveWidth}
                className="EPRVsNMRResonance_WaveGroup--microwave"
            />
            <text
                x={rightCenterX}
                y={labelY}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--wave"
                textAnchor="middle"
            >
                Microwave Frequency Wave
            </text>
        </g>
    );
}

function DownArrow({
    x,
    topY,
    bottomY,
    className = "",
}) {
    const headHalfWidth = 7;
    const headHeight = 10;

    return (
        <g className={`EPRVsNMRResonance_DownArrow ${className}`}>
            <line
                x1={x}
                y1={topY}
                x2={x}
                y2={bottomY - headHeight}
                className="EPRVsNMRResonance_DownArrowShaft"
                vectorEffect="non-scaling-stroke"
            />

            <path
                d={`
                    M ${x} ${bottomY}
                    L ${x - headHalfWidth} ${bottomY - headHeight}
                    L ${x + headHalfWidth} ${bottomY - headHeight}
                    Z
                `}
                className="EPRVsNMRResonance_DownArrowHead"
            />
        </g>
    );
}

function DoubleHeadedHorizontalArrow({
    x1,
    x2,
    y,
    className = "",
}) {
    const headLength = 6;
    const headHalfHeight = 4;

    return (
        <g className={`EPRVsNMRResonance_DoubleArrow ${className}`}>
            <line
                x1={x1 + headLength}
                y1={y}
                x2={x2 - headLength}
                y2={y}
                className="EPRVsNMRResonance_DoubleArrowLine"
                vectorEffect="non-scaling-stroke"
            />

            {/* Left arrowhead */}
            <path
                d={`
                    M ${x1} ${y}
                    L ${x1 + headLength} ${y - headHalfHeight}
                    L ${x1 + headLength} ${y + headHalfHeight}
                    Z
                `}
                className="EPRVsNMRResonance_DoubleArrowHead"
            />

            {/* Right arrowhead */}
            <path
                d={`
                    M ${x2} ${y}
                    L ${x2 - headLength} ${y - headHalfHeight}
                    L ${x2 - headLength} ${y + headHalfHeight}
                    Z
                `}
                className="EPRVsNMRResonance_DoubleArrowHead"
            />
        </g>
    );
}

function ThirdSectionEnergyGapPanel({
    protonGradientId,
    electronGradientId,
}) {
    const rowTop = ROW_DIVIDERS.y2;
    const rowBottom = ROW_DIVIDERS.y3;

    const leftCenterX = PANEL.x + PANEL.width * 0.25;
    const rightCenterX = PANEL.x + PANEL.width * 0.75;

    const circleY = rowTop + 45;
    const energyArrowY = rowBottom - 30;
    const energyLabelY = rowBottom - 12;

    const centerX = PANEL_MID.x;
    const ratioTextX = centerX - 20;

    const protonRadius = 14;
    const electronRadius = 11;

    const protonGap = 70
    const protonLeftX = leftCenterX - protonGap / 2;
    const protonRightX = leftCenterX + protonGap / 2;

    const electronGap = 150;
    const electronLeftX = rightCenterX - electronGap / 2;
    const electronRightX = rightCenterX + electronGap / 2;

    return (
        <g className="EPRVsNMRResonance_ThirdSectionEnergyGapPanel">
            <UpArrow
                x={protonLeftX}
                topY={circleY - 28}
                bottomY={circleY + 20}
                className="EPRVsNMRResonance_UpArrow--energyGap"
            />
            <circle
                cx={protonLeftX}
                cy={circleY}
                r={protonRadius}
                fill={`url(#${protonGradientId})`}
                className="EPRVsNMRResonance_Circle EPRVsNMRResonance_Circle--proton"
            />
            <text
                x={protonLeftX}
                y={circleY + 4.5}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--charge"
                textAnchor="middle"
            >
                +
            </text>
            <DownArrow
                x={protonRightX}
                topY={circleY - 20}
                bottomY={circleY + 28}
                className="EPRVsNMRResonance_DownArrow--energyGap"
            />
            <circle
                cx={protonRightX}
                cy={circleY}
                r={protonRadius}
                fill={`url(#${protonGradientId})`}
                className="EPRVsNMRResonance_Circle EPRVsNMRResonance_Circle--proton"
            />
            <text
                x={protonRightX}
                y={circleY + 4.5}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--charge"
                textAnchor="middle"
            >
                +
            </text>
            <DoubleHeadedHorizontalArrow
                x1={protonLeftX + 8}
                x2={protonRightX - 8}
                y={energyArrowY}
                className="EPRVsNMRResonance_DoubleArrow--nmr"
            />
            <text
                x={leftCenterX}
                y={energyLabelY}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--energyGap"
                textAnchor="middle"
            >
                ΔE
                <tspan baselineShift="sub" fontSize="0.72em">
                    NMR
                </tspan>
            </text>

            <text
                x={ratioTextX}
                y={energyLabelY}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--energyCompare"
                textAnchor="end"
            >
                x 660 
            </text>

            <text
                x={centerX}
                y={energyLabelY}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--energyCompare"
                textAnchor="middle"
            >
                ≈
            </text>


            <UpArrow
                x={electronLeftX}
                topY={circleY - 28}
                bottomY={circleY + 18}
                className="EPRVsNMRResonance_UpArrow--energyGap"
            />
            <circle
                cx={electronLeftX}
                cy={circleY}
                r={electronRadius}
                fill={`url(#${electronGradientId})`}
                className="EPRVsNMRResonance_Circle EPRVsNMRResonance_Circle--electron"
            />
            <DownArrow
                x={electronRightX}
                topY={circleY - 18}
                bottomY={circleY + 28}
                className="EPRVsNMRResonance_DownArrow--energyGap"
            />
            <circle
                cx={electronRightX}
                cy={circleY}
                r={electronRadius}
                fill={`url(#${electronGradientId})`}
                className="EPRVsNMRResonance_Circle EPRVsNMRResonance_Circle--electron"
            />
            <DoubleHeadedHorizontalArrow
                x1={electronLeftX + 10}
                x2={electronRightX - 10}
                y={energyArrowY}
                className="EPRVsNMRResonance_DoubleArrow--epr"
            />
            <text
                x={rightCenterX}
                y={energyLabelY}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--energyGap"
                textAnchor="middle"
            >
                ΔE
                <tspan baselineShift="sub" fontSize="0.72em">
                    EPR
                </tspan>
            </text>
        </g>
    );
}

function SignalPath({
    d,
    bounds,
    centerX,
    topY,
    targetWidth,
    targetHeight,
    className = "",
}) {
    const scaleX = targetWidth / bounds.width;
    const scaleY = targetHeight / bounds.height;
    const scale = Math.min(scaleX, scaleY);

    const translateX = centerX - (bounds.minX + bounds.width / 2) * scale;
    const translateY = topY - bounds.minY * scale;

    return (
        <g
            transform={`translate(${translateX} ${translateY}) scale(${scale})`}
            className={`EPRVsNMRResonance_SignalGroup ${className}`}
        >
            <path
                d={d}
                className="EPRVsNMRResonance_SignalPath"
            />
        </g>
    );
}

function BottomSectionSignalPanel() {
    const rowTop = ROW_DIVIDERS.y3;
    const rowBottom = PANEL.y + PANEL.height;
    const rowHeight = rowBottom - rowTop;

    const leftCenterX = PANEL.x + PANEL.width * 0.25;
    const rightCenterX = PANEL.x + PANEL.width * 0.75;

    const signalTopY = rowTop + 10;
    const labelY = rowBottom - 12;

    const signalTargetHeight = rowHeight - 44;

    const nmrSignalPath =
        "M0 453.023H52.5666H95.0242H145.569H179.939H210.266L228.462 426.733L250.702 382.242L264.855 331.684L272.942 283.148L283.051 216.412L291.138 151.697L299.225 86.9831L303.269 0.0232544L307.312 86.9831L311.356 151.697L315.4 216.412L321.465 283.148L327.53 331.684L339.661 382.242L367.966 426.733L394.249 453.023H460.969H533.753H618.668";

    const eprSignalPath =
        "M0 207.077H64.5H75L81.5 202.077L86.5 195.077L90.5 186.077L95 174.577L99.5 157.077L104 139.077L108.5 120.077L112 102.577L115 86.0767L118.5 67.5767L122 50.0767L126.5 29.0767L131 0.0766602V29.0767L133 94.0767V157.077V216.577V263.077V291.077L134 323.577L135 344.577V365.577L136 382.577V399.577L137.5 415.077L139 399.577V382.577V364.077L140 343.577L141.5 325.577L142.5 312.077L144 296.577L145.5 284.077L147 270.577L149.5 256.577L151.5 248.077L154 237.577L158 227.577L161.5 219.577L166.5 213.077L172.5 208.077H187.5L260 207.077";

    const nmrBounds = {
        minX: 0,
        minY: 0.0232544,
        width: 618.668,
        height: 453.0,
    };

    const eprBounds = {
        minX: 0,
        minY: 0.0766602,
        width: 260,
        height: 415.0,
    };

    return (
        <g className="EPRVsNMRResonance_BottomSectionSignalPanel">
            {/* Left: NMR signal */}
            <SignalPath
                d={nmrSignalPath}
                bounds={nmrBounds}
                centerX={leftCenterX}
                topY={signalTopY}
                targetWidth={162}
                targetHeight={signalTargetHeight}
                className="EPRVsNMRResonance_SignalGroup--nmr"
            />

            <text
                x={leftCenterX}
                y={labelY}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--signal"
                textAnchor="middle"
            >
                NMR Signal
            </text>

            {/* Right: EPR signal */}
            <SignalPath
                d={eprSignalPath}
                bounds={eprBounds}
                centerX={rightCenterX}
                topY={signalTopY}
                targetWidth={145}
                targetHeight={signalTargetHeight}
                className="EPRVsNMRResonance_SignalGroup--epr"
            />

            <text
                x={rightCenterX}
                y={labelY}
                className="EPRVsNMRResonance_Label EPRVsNMRResonance_Label--signal"
                textAnchor="middle"
            >
                EPR Signal
            </text>
        </g>
    );
}

export default function EprVsNmrResonance({ className = "" }) {
    const uid = cleanId(useId());

    const backgroundGradientId = `epr-vs-nmr-bg-${uid}`;
    const protonGradientId = `epr-vs-nmr-proton-${uid}`;
    const electronGradientId = `epr-vs-nmr-electron-${uid}`;

    return (
        <figure className={`EPRVsNMRResonance ${className}`}>
            <svg
                viewBox={VIEWBOX}
                role="img"
                aria-labelledby={`epr-vs-nmr-title-${uid}`}
                className="EPRVsNMRResonance_SVG"
            >
                <title id={`epr-vs-nmr-title-${uid}`}>
                    EPR versus NMR resonance visual panel
                </title>

                <EPRVsNMRDefs
                    backgroundGradientId={backgroundGradientId}
                    protonGradientId={protonGradientId}
                    electronGradientId={electronGradientId}
                />

                <BackgroundPanel backgroundGradientId={backgroundGradientId} />

                <TopSectionVisualPanel
                    protonGradientId={protonGradientId}
                    electronGradientId={electronGradientId}
                />

                <SecondSectionWavePanel />
                <ThirdSectionEnergyGapPanel
                    protonGradientId={protonGradientId}
                    electronGradientId={electronGradientId}
                />

                <BottomSectionSignalPanel />

            </svg>
        </figure>
    );
}
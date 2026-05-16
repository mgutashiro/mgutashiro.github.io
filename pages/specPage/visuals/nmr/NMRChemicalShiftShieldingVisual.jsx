import { useId } from "react";
import "./NMRChemicalShift.css";

const CANVAS = {
    width: 800,
    height: 520,
};

const VIEWBOX = `0 0 ${CANVAS.width} ${CANVAS.height}`;

const PANEL = {
    x: 18,
    y: 5,
    width: 764,
    height: 500,
    rx: 28,
};

const CENTER = {
    x: PANEL.x + PANEL.width / 2,
    y: PANEL.y + PANEL.height / 2,
};

const CENTER_CIRCLE = {
    cx: CENTER.x,
    cy: CENTER.y,
    r: 100,
};

const FIELD_PATH_1 =
    "M0.5 166.961V179.267L1.30228 188.76L2.5057 198.253L3.70912 206.339L5.71482 216.536L8.92394 228.49L11.7319 237.631L14.941 248.179L20.9581 261.54L28.9809 275.252L40.614 291.073L51.8459 302.676C51.8459 302.676 61.472 312.041 69.0949 316.388C76.9748 320.881 82.7483 322.756 91.1576 324.826C99.0001 326.757 103.619 326.688 111.616 326.233C121.436 325.673 127.269 324.19 136.085 320.959C143.302 318.314 147.002 315.935 152.933 311.466C159.08 306.835 166.572 297.754 166.572 297.754C166.572 297.754 175.662 287.124 180.612 279.822C185.55 272.537 188.131 268.309 191.844 260.485C196.011 251.704 200.268 237.28 200.268 237.28C200.268 237.28 204.176 225.589 205.884 217.942C208.187 207.63 209.494 191.221 209.494 191.221C209.494 191.221 211.468 176.031 211.5 166.258C211.533 156.074 209.494 140.24 209.494 140.24C209.494 140.24 206.453 120.156 203.076 107.542C199.599 94.5592 191.844 74.8438 191.844 74.8438C191.844 74.8438 186.847 60.8884 181.815 52.6935C177.326 45.383 174.466 41.314 168.578 34.7623C163.843 29.4949 160.935 26.6947 155.34 22.1049C150.284 17.9575 146.791 15.097 140.899 11.9087C135.832 9.16703 132.719 7.66581 127.26 5.58007C120.991 3.18461 117.974 2.27652 111.215 1.36098C105.951 0.647963 102.892 0.263913 97.5759 0.657799C92.1236 1.06174 89.108 2.08064 83.9371 3.47053C78.5081 4.92982 70.6995 8.74442 70.6995 8.74442L60.2699 14.7215L50.2414 22.1049L41.4163 31.2464L32.5912 41.091L25.3707 51.6387L19.3536 64.2961L13.3365 80.1177L8.5228 96.291L4.91254 109.652C4.91254 109.652 2.15195 119.648 1.30228 126.176C0.573437 131.776 0.5 140.592 0.5 140.592V157.117";

const FIELD_PATH_2 =
    "M228 33.5L207 17L185.5 6.5L157.5 0.5H125.5L96.5 6.5L78 15L63.5 25.5L52.5 38.5L41.5 51.5L33 68L24 87L18.5 104L14 121.5L10 140.5L6 163L4 183L0.5 205V239.5V262V295.5V311L3 331L6.5 349L10.5 365.5L14.5 378L19.5 389.5L26 403.5L31 414.5L38.5 426.5L46.5 437L55 446.5L65 456.5L76.5 465.5L86 471.5L95 476.5L106 482L117 486L130 488";

const CENTER_SWEEP_PATH =
    "M75.5361 56H61.5361L47.0361 54L32.5361 51L20.5361 47.5L9.53607 41L2.53607 33.5L0.536072 25.5L4.53607 19L11.0361 13L20.5361 9L30.0361 6L40.0361 3.5L50.0361 1.5L61.5361 0.5H72.5361H82.0361L91.0361 1L101.036 2L109.036 3.5L116.536 5L122.536 6.5L128.036 8.5L133.536 11L139.036 14L144.036 17L147.536 21L150.036 24.5L151.036 28.5L150.536 32.5L148.536 36L144.036 40.5L139.536 43.5L134.036 46.5L129.036 48.5L123.536 50L116.036 52L109.036 53.5L103.036 54.5L96.0361 55.5L89.5361 56H82.5361H78.5361";

const MAG_FIELD = {
    innerScale: 0.8,
    outerScale: 0.8,
    innerGap: 0,
    outerGap: 0,
};

const CENTER_SWEEP = {
    minX: 0.536072,
    minY: 0.5,
    width: 150.5,
    height: 55.5,
    scale: 0.92,
};

const ARROWS = {
    centerDown: {
        x: CENTER_CIRCLE.cx,
        yTop: CENTER_CIRCLE.cy - 190,
        yBottom: CENTER_CIRCLE.cy + 190,
        shaftWidth: 4,
        headWidth: 18,
        headLength: 14,
        direction: "down",
    },

    rightUp: {
        x: CENTER_CIRCLE.cx + 250,
        yTop: CENTER_CIRCLE.cy,
        yBottom: CENTER_CIRCLE.cy + 190,
        shaftWidth: 7,
        headWidth: 24,
        headLength: 18,
        direction: "up",
    },

    leftUp: {
        x: CENTER_CIRCLE.cx - 250,
        yTop: CENTER_CIRCLE.cy - 50,
        yBottom: CENTER_CIRCLE.cy + 190,
        shaftWidth: 10,
        headWidth: 30,
        headLength: 22,
        direction: "up",
    },
};

const FIELD_LABEL_Y = CENTER_CIRCLE.cy + 200;

function VisualGradient({ backgroundGradientId, centerCircleGradientId  }) {
    return (
        <defs>
            <linearGradient
                id={backgroundGradientId}
                x1="0"
                y1="0"
                x2={CANVAS.width}
                y2={CANVAS.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0%"
                    stopColor="color-mix(in oklab, var(--bg) 92%, var(--accent-2))"
                />
                <stop
                    offset="55%"
                    stopColor="color-mix(in oklab, var(--bg) 96%, var(--accent))"
                />
                <stop
                    offset="100%"
                    stopColor="color-mix(in oklab, var(--bg) 90%, var(--accent-3))"
                />
            </linearGradient>

            <radialGradient
                id={centerCircleGradientId}
                cx={CENTER_CIRCLE.cx - 18}
                cy={CENTER_CIRCLE.cy - 20}
                r={CENTER_CIRCLE.r * 1.4}
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0%"
                    stopColor="color-mix(in oklab, var(--accent-2) 72%, white)"
                />
                <stop
                    offset="55%"
                    stopColor="color-mix(in oklab, var(--accent) 72%, var(--bg))"
                />
                <stop
                    offset="100%"
                    stopColor="color-mix(in oklab, var(--accent-3) 55%, var(--bg))"
                />
            </radialGradient>
        </defs>
    );
}


function BackgroundCanvas({ gradientId }) {
    return (
        <g className="NMRChemicalShift_BackgroundCanvas">
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill={`url(#${gradientId})`}
                className="NMRChemicalShift_BackgroundPanel"
            />

            <line
                x1={CENTER.x}
                y1={PANEL.y + 34}
                x2={CENTER.x}
                y2={PANEL.y + PANEL.height - 34}
                className="NMRChemicalShift_CenterGuide"
            />
        </g>
    );
}

function MagneticFieldLinePair({
    d,
    width,
    height,
    scale,
    gap,
    className = "",
}) {
    const scaledHeight = height * scale;

    const topY = CENTER_CIRCLE.cy - scaledHeight / 2;

    const leftX =
        CENTER_CIRCLE.cx  - gap;

    const rightAnchorX =
        CENTER_CIRCLE.cx  + gap;

    return (
        <g className={`NMRChemicalShift_FieldPair ${className}`}>
            {/* left side */}
            <path
                d={d}
                transform={`translate(${rightAnchorX} ${topY}) scale(${scale})`}
                className="NMRChemicalShift_FieldLine"
                vectorEffect="non-scaling-stroke"
                pathLength="100"
            />

            {/* right side — mirrored across vertical axis */}
            <path
                d={d}
                transform={`translate(${leftX} ${topY}) scale(${-scale} ${scale})`}
                className="NMRChemicalShift_FieldLine"
                vectorEffect="non-scaling-stroke"
                pathLength="100"
            />
        </g>
    );
}

function CenterSweepPath() {
    const scaledWidth = CENTER_SWEEP.width * CENTER_SWEEP.scale;
    const scaledHeight = CENTER_SWEEP.height * CENTER_SWEEP.scale;

    const tx =
        CENTER_CIRCLE.cx -
        scaledWidth / 2 -
        CENTER_SWEEP.minX * CENTER_SWEEP.scale;

    const ty =
        CENTER_CIRCLE.cy -
        scaledHeight / 2 -
        CENTER_SWEEP.minY * CENTER_SWEEP.scale;

    return (
        <path
            d={CENTER_SWEEP_PATH}
            transform={`translate(${tx} ${ty}) scale(${CENTER_SWEEP.scale})`}
            className="NMRChemicalShift_CenterSweepPath"
            vectorEffect="non-scaling-stroke"
            pathLength="100"
        />
    );
}

function MagneticFieldLines() {
    return (
        <g className="NMRChemicalShift_MagneticFieldLines">
            <MagneticFieldLinePair
                d={FIELD_PATH_2}
                width={228}
                height={488}
                scale={MAG_FIELD.outerScale}
                gap={MAG_FIELD.outerGap}
                className="NMRChemicalShift_FieldPair--outer"
            />

            <MagneticFieldLinePair
                d={FIELD_PATH_1}
                width={211.5}
                height={326.757}
                scale={MAG_FIELD.innerScale}
                gap={MAG_FIELD.innerGap}
                className="NMRChemicalShift_FieldPair--inner"
            />

            <CenterSweepPath />
        </g>
    );
}

function CenterCircle({ gradientId }) {
    return (
        <g className="NMRChemicalShift_CenterCircleGroup">
            <MagneticFieldLines />
            <circle
                cx={CENTER_CIRCLE.cx}
                cy={CENTER_CIRCLE.cy}
                r={CENTER_CIRCLE.r}
                fill={`url(#${gradientId})`}
                className="NMRChemicalShift_CenterCircle"
            />

        </g>
    );
}

function VerticalArrow({
    x,
    yTop,
    yBottom,
    direction = "up",
    shaftWidth = 4,
    headWidth = 18,
    headLength = 14,
    className = "",
}) {
    const tipY = direction === "up" ? yTop : yBottom;
    const headBaseY = direction === "up" ? yTop + headLength : yBottom - headLength;

    const shaftY1 = direction === "up" ? headBaseY : yTop;
    const shaftY2 = direction === "up" ? yBottom : headBaseY;

    return (
        <g className={`NMRChemicalShift_Arrow ${className}`}>
            <line
                x1={x}
                y1={shaftY1}
                x2={x}
                y2={shaftY2}
                className="NMRChemicalShift_ArrowShaft"
                style={{ strokeWidth: shaftWidth }}
            />

            <path
                d={`M ${x - headWidth / 2} ${headBaseY}
                    L ${x} ${tipY}
                    L ${x + headWidth / 2} ${headBaseY} Z`}
                className="NMRChemicalShift_ArrowHead"
                style={{ strokeWidth: Math.max(shaftWidth * 0.9, 2.5) }}
            />
        </g>
    );
}

function FieldArrowLabel({ x, y, lines = [], className = "" }) {
    return (
        <text
            x={x}
            y={y}
            textAnchor="middle"
            className={`NMRChemicalShift_FieldArrowLabel ${className}`}
        >
            {lines.map((line, index) => (
                <tspan
                    key={index}
                    x={x}
                    dy={index === 0 ? 0 : 22}
                >
                    {line}
                </tspan>
            ))}
        </text>
    );
}

function MagneticFieldArrowLabels() {
    return (
        <g className="NMRChemicalShift_MagneticFieldArrowLabels">
            <FieldArrowLabel
                x={ARROWS.leftUp.x}
                y={FIELD_LABEL_Y}
                className="NMRChemicalShift_FieldArrowLabel--left"
                lines={[
                    <>
                        B<tspan baselineShift="sub" fontSize="0.72em">0</tspan>, applied
                    </>,
                ]}
            />

            <FieldArrowLabel
                x={ARROWS.centerDown.x}
                y={FIELD_LABEL_Y}
                className="NMRChemicalShift_FieldArrowLabel--center"
                lines={[
                    <>
                        B<tspan baselineShift="sub" fontSize="0.72em">Local</tspan>
                        {" "} (induced by electrons)
                    </>,
                ]}
            />

            <FieldArrowLabel
                x={ARROWS.rightUp.x}
                y={FIELD_LABEL_Y}
                className="NMRChemicalShift_FieldArrowLabel--right"
                lines={[
                    <>
                        B<tspan baselineShift="sub" fontSize="0.72em">eff</tspan>, effective
                    </>,
                    <>
                        (with B<tspan baselineShift="sub" fontSize="0.72em">eff</tspan>
                        {" < "}B<tspan baselineShift="sub" fontSize="0.72em">0</tspan>)
                    </>,
                ]}
            />
        </g>
    );
}


function MagneticFieldArrows() {
    return (
        <g className="NMRChemicalShift_MagneticFieldArrows">
            <VerticalArrow
                {...ARROWS.centerDown}
                className="NMRChemicalShift_Arrow--centerDown"
            />

            <VerticalArrow
                {...ARROWS.rightUp}
                className="NMRChemicalShift_Arrow--rightUp"
            />

            <VerticalArrow
                {...ARROWS.leftUp}
                className="NMRChemicalShift_Arrow--leftUp"
            />
            <MagneticFieldArrowLabels />
        </g>
    );
}

export default function NMRChemicalShift() {
    const rawId = useId().replace(/:/g, "-");
    const backgroundGradientId = `NMRChemicalShift-bg-${rawId}`;
    const centerCircleGradientId = `NMRChemicalShift-circle-${rawId}`;

    return (
        <figure className="NMRChemicalShift_Frame">
            <svg
                className="NMRChemicalShift"
                viewBox={VIEWBOX}
                role="img"
            >

                <VisualGradient
                    backgroundGradientId={backgroundGradientId}
                    centerCircleGradientId={centerCircleGradientId}
                />

                <BackgroundCanvas gradientId={backgroundGradientId} />
                <MagneticFieldArrows />
                <CenterCircle gradientId={centerCircleGradientId} />

            </svg>
            <figcaption className="NMRChemicalShift_Description">
                Surrounding electrons respond to the applied field, B<sub>0</sub>, by generating a small opposing local field. The nucleus therefore feels a reduced effective field, B<sub>eff</sub> &lt; B<sub>0</sub>. Different electronic environments change the amount of shielding, shifting where each nucleus appears in the NMR spectrum.
            </figcaption>
        </figure>
    );
}
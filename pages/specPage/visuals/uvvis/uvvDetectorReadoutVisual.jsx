import { useId } from "react";
import "./uvvDetectorReadoutVisual.css";

const VIEWBOX = {
    width: 720,
    height: 530,
};

const ARROW_SHAPES = {
    wavy: {
        path: `
            M0.481567 82.9444
            C0.481567 82.9444 23.0623 1.40592 54.6752 1.40592
            C86.2881 1.40592 89.9465 42.2794 106.611 82.9444
            C122.409 121.497 130.095 159.5 157.643 159.5
            C185.191 159.5 192.787 121.881 207.772 82.9444
            C223.454 42.1961 228.094 1.40592 263.772 1.40592
            C299.45 1.40592 299.582 42.2376 314.353 82.9444
            C328.411 121.689 342.041 159.5 365.385 159.5
            C389.002 159.5 404.474 120.8 419.127 81.5855
            C434.174 41.3141 448.392 0.500002 472.417 0.500002
            C519.836 0.500002 532.482 81.5855 532.482 81.5855
        `,
        start: { x: 0.481567, y: 82.9444 },
        end: { x: 532.482, y: 81.5855 },
        width: 532.482 - 0.481567,
        height: 159.5 - 0.5,
    },

    straight: {
        path: `M 0 0 H 100`,
        start: { x: 0, y: 0 },
        end: { x: 100, y: 0 },
    },
};

const ARROW_HEAD = {
    path: "M 0 0 L 16 8 L 0 16 Z",
    width: 16,
    height: 16,
    anchors: {
        tip: { x: 16, y: 16 },
        center: { x: 8, y: 8 },
        topBack: { x: 0, y: 0 },
        bottomBack: { x: 0, y: 16 },
    },
};

function makeId(prefix, name) {
    return `${prefix}-${name}`;
}

function PMTBase({ bgGradId }) {
    return (
        <g className="UVVDetReadVisual_ChamberFrame">
            <rect
                x="-17"
                y="-12"
                width="756"
                height="500"
                rx="28"
                fill={`url(#${bgGradId})`}
                className="UVVDetReadVisual_Backplate"
            />
            <path
                d="M 60 124
                    V 40
                    H 650
                    V 288
                    H 60
                    V 203"
                className="UVVDetReadVisual_ChamberLine"
            />
            <path 
                d="M 182.9 100 H 330.4 
                    M 379.6 100 H 527
                    M 281.2 237 H 428.75"
                className="UVVDetReadVisual_Dynodes"
            />
            <path 
                d="M 84.6 237 H 231.2"
                className="UVVDetReadVisual_Cathode"
            />
            <path 
                d="M 477.9, 237 H 625.4"
                className="UVVDetReadVisual_Anode"
            />
            <path 
                d="
                    M 256.65 100 V 200 
                    M 453.6 100 V 200

                    M 157.9 237 V 160

                    M 584.44 237 V 400
                    M 354.98 237 V 350 
                    M 141.25 237 V 380

                "
                className="UVVDetReadVisual_Guide"
            />
        </g>
    );
}

function getShapeLength(shape) {
    return Math.hypot(
        shape.end.x - shape.start.x,
        shape.end.y - shape.start.y
    );
}

function ArrowHead({
    x,
    y,
    angle,
    size = 16,
    anchor = "center",
    angleOffset = 0,
    fill = "var(--c-glow-4)",
    className = "UVVDetReadVisual_ArrowHead",
}) {
    const anchorPoint = ARROW_HEAD.anchors[anchor] ?? ARROW_HEAD.anchors.center;
    const scale = size / ARROW_HEAD.width;

    return (
        <g
            transform={`
                translate(${x} ${y})
                rotate(${angle + angleOffset})
                scale(${scale})
                translate(${-anchorPoint.x} ${-anchorPoint.y})
            `}
        >
            <path
                d={ARROW_HEAD.path}
                className={className}
                fill={fill}
            />
        </g>
    );
}

function SignalArrows({ arrows, traceGradId }) {
    return (
        <g className="UVVDetReadVisual_Arrows">
            {arrows.map((arrow) => {
                const {
                    id,
                    startX,
                    startY,
                    endX,
                    endY,
                    shape = "straight",
                    stroke = `url(#${traceGradId})`,
                    className = "UVVDetReadVisual_Arrow",
                    head = {},
                } = arrow;

                const shapeData = ARROW_SHAPES[shape];
                if (!shapeData) return null;

                const dx = endX - startX;
                const dy = endY - startY;
                const targetLength = Math.hypot(dx, dy);
                const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
                const scale = targetLength / getShapeLength(shapeData);

                return (
                    <g key={id} className="UVVDetReadVisual_ArrowGroup">
                        <g
                            transform={`
                                translate(${startX} ${startY})
                                rotate(${angle})
                                scale(${scale})
                                translate(${-shapeData.start.x} ${-shapeData.start.y})
                            `}
                        >
                            <path
                                d={shapeData.path}
                                className={className}
                                stroke={stroke}
                                fill="none"
                                vectorEffect="non-scaling-stroke"
                            />
                        </g>
                        <ArrowHead
                            x={endX}
                            y={endY}
                            angle={angle}
                            size={head.size ?? 16}
                            anchor={head.anchor ?? "center"}
                            angleOffset={head.angleOffset ?? 0}
                            fill={head.fill ?? "var(--c-glow-4)"}
                            className={head.className ?? "UVVDetReadVisual_ArrowHead"}
                        />
                    </g>
                );
            })}
        </g>
    );
}

function ArrowLabels({ labels }) {
    return (
        <g className="UVVDetReadVisual_ArrowLabels">
            {labels.map((label) => {
                const {
                    id,
                    x,
                    y,
                    lines,
                    textAnchor = "middle",
                    className = "UVVDetReadVisual_ArrowLabel",
                    rotate = 0,
                    lineHeight = 18,
                } = label;

                return (
                    <text
                        key={id}
                        x={x}
                        y={y}
                        textAnchor={textAnchor}
                        className={className}
                        transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
                    >
                        {lines.map((line, index) => (
                            <tspan
                                key={`${id}-${line}`}
                                x={x}
                                dy={index === 0 ? 0 : lineHeight}
                            >
                                {line}
                            </tspan>
                        ))}
                    </text>
                );
            })}
        </g>
    );
}

function CascadeDashes({ dashes }) {
    const startPoints = Array.from(
        new Map(
            dashes.map(({ x1, y1 }) => [`${x1}-${y1}`, { x: x1, y: y1 }])
        ).values()
    );
    const endPoints = Array.from(
        new Map(
            dashes
                .filter(({ endPulse }) => endPulse)
                .map(({ x2, y2 }) => [`${x2}-${y2}`, { x: x2, y: y2 }])
        ).values()
    );

    return (
        <g className="UVVDetReadVisual_Cascade">
            {dashes.map(({ id, x1, y1, x2, y2, delay = 0 }) => (
                <g
                    key={id}
                    className="UVVDetReadVisual_CascadeSegment"
                    style={{
                        "--static-delay": `${delay}s`,
                        "--reveal-delay": `${delay + 0.5}s`,
                    }}
                >
                    <path
                        d={`M ${x1} ${y1} L ${x2} ${y2}`}
                        className="UVVDetReadVisual_CascadeDashStatic"
                        pathLength="100"
                    />

                    <path
                        d={`M ${x1} ${y1} L ${x2} ${y2}`}
                        className="UVVDetReadVisual_CascadeDashReveal"
                        pathLength="100"
                    />
                </g>
            ))}

            {/* pulsing circles at all unique start points */}
            {startPoints.map(({ x, y }) => (
                <circle
                    key={`start-${x}-${y}`}
                    cx={x}
                    cy={y}
                    r="3"
                    className="UVVDetReadVisual_CascadePulse UVVDetReadVisual_CascadePulse--start"
                />
            ))}

            {/* pulsing circles at the end of the 8 final beams */}
            {endPoints.map(({ x, y }) => (
                <circle
                    key={`end-${x}-${y}`}
                    cx={x}
                    cy={y}
                    r="3"
                    className="UVVDetReadVisual_CascadePulse UVVDetReadVisual_CascadePulse--end"
                />
            ))}
        </g>
    );
}

function StaticCircuitSystem() {
    return (
        <g className="UVVDetReadVisual_CircuitSystem" aria-hidden="true">
            {/* Main circuit rails / wires */}
            <g className="UVVDetReadVisual_CircuitTraces">
                <path 
                    d="
                        M 141.25 237 V 380 
                        M 256.65 100 V 350
                        M 453.6 101 V 420
                        M 354.98 237 V 400 H 395
                        M 395 380 V 420
                        M 415 380 V 420
                        M 415 400 H 510
                        M 530 400 H 630
                        M 510 380 V 420
                        M 530 380 V 420
                        M 584.44 237 V 425
                        M 560 425 H 615
                        M 570 435 H 605
                        M 580 445 H 595
                        M 700 400 H 740
                    "
                    className="UVVDetReadVisual_CircuitComponent"
                />
                <path 
                    d="
                        M 141.25 350 H 170 
                        M 240 350 H 280
                        M 340 350 H 370
                        M 440 350 H 470
                        M 560 350 H 584.44
                    " 
                    className="UVVDetReadVisual_CircuitComponent"
                />
                <path 
                    d="
                        M 170 350
                        L 176 350
                        L 182 340
                        L 188 360
                        L 194 340
                        L 200 360
                        L 206 340
                        L 212 360
                        L 218 340
                        L 224 360
                        L 230 340
                        L 236 350
                        L 240 350

                        M 280 350
                        L 284 350
                        L 289 340
                        L 294 360
                        L 299 340
                        L 304 360
                        L 309 340
                        L 314 360
                        L 319 340
                        L 324 360
                        L 329 340
                        L 334 350
                        L 340 350

                        M 370 350
                        L 376 350
                        L 382 340
                        L 388 360
                        L 394 340
                        L 400 360
                        L 406 340
                        L 412 360
                        L 418 340
                        L 424 360
                        L 430 340
                        L 436 350
                        L 440 350

                        M 470 350
                        L 476 350
                        L 483 340
                        L 490 360
                        L 497 340
                        L 504 360
                        L 511 340
                        L 518 360
                        L 525 340
                        L 532 360
                        L 539 340
                        L 546 360
                        L 553 350
                        L 560 350
                    "
                    className="UVVDetReadVisual_CircuitComponent"
                />

                <circle 
                    cx="141.25"
                    cy="390"
                    r="10"
                />

                <path 
                    d="M 630 350 V 450 L 700 400 Z"
                    className="UVVDetReadVisual_CircuitComponent_Amp"
                />
            </g>
            <g className="UVVDetReadVisual_CircuitLabels">
                <text
                    x="660"
                    y="405"
                    textAnchor="middle"
                    className="UVVDetReadVisual_CircuitLabel"
                >
                    op-amp
                </text>
                <text
                    x="150"
                    y="450"
                    textAnchor="middle"
                    className="UVVDecReadoutVisual_TitleText"
                >
                    LIGHT BECOMES DATA!
                </text>
            </g>
        </g>
    );
}

export default function UVVDetReadVisualReturn() {
    const reactId = useId().replace(/:/g, "");
    const bgGradId = makeId(reactId, "bgGrad");
    const detectorGradId = makeId(reactId, "detectorGrad");
    const traceGradId = makeId(reactId, "traceGrad");
    const softGlowId = makeId(reactId, "softGlow");
    const arrows = [
        {
            id: "input-wavy-arrow",
            shape: "wavy",
            startX: 20,
            startY: 163.5,
            endX: 150.9,
            endY: 225,
            head: {
                size: 16,
                anchor: "center",
                angleOffset: 60,
                fill: "var(--c-glow-4)",
            },
        },
        {
            id: "arrow-2",
            shape: "straight",
            startX: 335,
            startY: 30,
            endX: 260,
            endY: 85,
            className: "UVVDetReadVisual_Arrow UVVDetReadVisual_Arrow--straight UVVDetReadVisual_ArrowDynodes",
            head: {
                className: "UVVDetReadVisual_ArrowHead UVVDetReadVisual_ArrowHead--straight UVVDetReadVisual_ArrowDynodes",
            },
        },
        {
            id: "arrow-3",
            shape: "straight",
            startX: 355,
            startY: 30,
            endX: 440,
            endY: 85,
            className: "UVVDetReadVisual_Arrow UVVDetReadVisual_Arrow--straight UVVDetReadVisual_ArrowDynodes",
            head: {
                className: "UVVDetReadVisual_ArrowHead UVVDetReadVisual_ArrowHead--straight UVVDetReadVisual_ArrowDynodes",
            },
        },
        {
            id: "arrow-4",
            shape: "straight",
            startX: 145,
            startY: 100,
            endX: 195,
            endY: 150,
            className: "UVVDetReadVisual_Arrow UVVDetReadVisual_Arrow--straight UVVDetReadVisual_ArrowPhoton",
            head: {
                className: "UVVDetReadVisual_ArrowHead UVVDetReadVisual_ArrowHead--straight UVVDetReadVisual_ArrowPhoton",
            },
        },
        {
            id: "arrow-5",
            shape: "straight",
            startX: 60,
            startY: 300,
            endX: 100,
            endY: 245,
            className: "UVVDetReadVisual_Arrow UVVDetReadVisual_Arrow--straight UVVDetReadVisual_ArrowCathode",
            head: {
                className: "UVVDetReadVisual_ArrowHead UVVDetReadVisual_ArrowHead--straight UVVDetReadVisual_ArrowCathode",
            },
        },
        {
            id: "arrow-6",
            shape: "straight",
            startX: 640,
            startY: 300,
            endX: 600,
            endY: 245,
            className: "UVVDetReadVisual_Arrow UVVDetReadVisual_Arrow--straight UVVDetReadVisual_ArrowAnode",
            head: {
                className: "UVVDetReadVisual_ArrowHead UVVDetReadVisual_ArrowHead--straight UVVDetReadVisual_ArrowAnode",
            },
        },
        {
            id: "arrow-7",
            shape: "straight",
            startX: 600,
            startY: 90,
            endX: 550,
            endY: 140,
            className: "UVVDetReadVisual_Arrow UVVDetReadVisual_Arrow--straight UVVDetReadVisual_ArrowPhoton",
            head: {
                className: "UVVDetReadVisual_ArrowHead UVVDetReadVisual_ArrowHead--straight UVVDetReadVisual_ArrowPhoton",
            },
        },
    ];

    const arrowLabels = [
        {
            id: "input-arrow-label1",
            x: 82,
            y: 140,
            lines: ["Radiation", "hν"],
            textAnchor: "middle",
            className: "UVVDetReadVisual_ArrowLabel",
        },
        {
            id: "input-arrow-label2",
            x: 122,
            y: 75,
            lines: ["photoelectron", "cascade"],
            textAnchor: "middle",
            className: "UVVDetReadVisual_ArrowLabel",
        },
        {
            id: "input-arrow-label3",
            x: 345,
            y: 20,
            lines: ["dynodes"],
            textAnchor: "middle",
            className: "UVVDetReadVisual_ArrowLabel",
        },
        {
            id: "input-arrow-label3",
            x: 55,
            y: 315,
            lines: ["photoemissive", "cathode"],
            textAnchor: "middle",
            className: "UVVDetReadVisual_ArrowLabel",
        },
        {
            id: "input-arrow-label4",
            x: 670,
            y: 315,
            lines: ["anode"],
            textAnchor: "middle",
            className: "UVVDetReadVisual_ArrowLabel",
        },
        {
            id: "input-arrow-label5",
            x: 650,
            y: 64,
            lines: ["secondary", "electrons"],
            textAnchor: "middle",
            className: "UVVDetReadVisual_ArrowLabel",
        },
    ];

    const cascadeDashes = [
        { id: "dash-1", x1: 157.9, y1: 237, x2: 256.65, y2: 100, delay: 0.0 },

        { id: "dash-2", x1: 256.65, y1: 100, x2: 330.4, y2: 237, delay: 1.6 },
        { id: "dash-3", x1: 256.65, y1: 100, x2: 379.56, y2: 237, delay: 1.6 },

        { id: "dash-4", x1: 330.4, y1: 237, x2: 409.1, y2: 100, delay: 3.2 },
        { id: "dash-5", x1: 330.4, y1: 237, x2: 468.04, y2: 100, delay: 3.2 },
        { id: "dash-6", x1: 379.56, y1: 237, x2: 438.6, y2: 100, delay: 3.2 },
        { id: "dash-7", x1: 379.56, y1: 237, x2: 497.5, y2: 100, delay: 3.2 },

        { id: "dash-8", x1: 409.1, y1: 100, x2: 494.3, y2: 237, delay: 4.8, endPulse: true },
        { id: "dash-9", x1: 409.1, y1: 100, x2: 592.6, y2: 237, delay: 4.8, endPulse: true },
        { id: "dash-10", x1: 468.04, y1: 100, x2: 527.1, y2: 237, delay: 4.8, endPulse: true },
        { id: "dash-11", x1: 468.04, y1: 100, x2: 559.8, y2: 237, delay: 4.8, endPulse: true },
        { id: "dash-12", x1: 438.6, y1: 100, x2: 543.5, y2: 237, delay: 4.8, endPulse: true },
        { id: "dash-13", x1: 438.6, y1: 100, x2: 576.2, y2: 237, delay: 4.8, endPulse: true },
        { id: "dash-14", x1: 497.5, y1: 100, x2: 510.7, y2: 237, delay: 4.8, endPulse: true },
        { id: "dash-15", x1: 497.5, y1: 100, x2: 609, y2: 237, delay: 4.8, endPulse: true },
    ];

    return (
        <figure className="UVVDetReadVisual_Shell">
            <svg
                className="UVVDetReadVisual_SVG"
                viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                role="img"
            >

                <defs>
                    <linearGradient id={bgGradId} x1="32" y1="42" x2="688" y2="262" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="color-mix(in oklab, var(--surface) 88%, var(--c-ink))" />
                        <stop offset="100%" stopColor="color-mix(in oklab, var(--surface-2) 78%, var(--c-shadow))" />
                    </linearGradient>

                    <linearGradient id={detectorGradId} x1="312" y1="106" x2="364" y2="182" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stopColor="var(--c-glow-1)" />
                        <stop offset="55%" stopColor="var(--c-glow-2)" />
                        <stop offset="100%" stopColor="var(--c-glow-3)" />
                    </linearGradient>

                    <linearGradient id={traceGradId} x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits="objectBoundingBox">
                        <stop offset="0%" stopColor="var(--c-glow-1)" />
                        <stop offset="55%" stopColor="var(--c-glow-3)" />
                        <stop offset="100%" stopColor="var(--c-glow-4)" />
                    </linearGradient>

                    <filter id={softGlowId} x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="3" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <g className="UVVDetReadoutVisual_Stage" >
                    <g filter={`url(#${softGlowId})`}>
                        <PMTBase bgGradId={bgGradId} />

                        <SignalArrows
                            arrows={arrows}
                            traceGradId={traceGradId}
                        />
                        <CascadeDashes dashes={cascadeDashes} />
                    </g>
                    <StaticCircuitSystem />
                    <ArrowLabels labels={arrowLabels} />
                </g>
            </svg>


            <figcaption className="UVVDetReadVisual_Caption">
                Transmitted light reaches the photomultiplier tube, where weak optical signals are amplified through a photoelectron cascade and sent to the readout circuit. 
                In the UV-Vis model, this is where sample/reference transmission becomes the digitized absorbance trace, A(λ).
            </figcaption>
        </figure>
    );
}
import { useId } from 'react';
import './fieldMatterInteractionVisual.css'

/** Preset Constants */
const VIEWBOX = { width: 720, height: 450 };
const CHAMBER = {
    x: 175, 
    y: 102, 
    width: 392, 
    height: 298, 
    radius: 56
};

const CENTER = {
  x: CHAMBER.x + CHAMBER.width / 2,
  y: CHAMBER.y + CHAMBER.height / 2 - 3,
};

// defining energy-level scaffold
const LEVEL_Y = [
    (CHAMBER.y + CHAMBER.height / 2) - 95,
    (CHAMBER.y + CHAMBER.height / 2) - 35,
    (CHAMBER.y + CHAMBER.height / 2) + 35,
    (CHAMBER.y + CHAMBER.height / 2) + 95,,
];

const NODE_X = [
    (CHAMBER.x + CHAMBER.width / 2) - 112,
    CHAMBER.x + CHAMBER.width / 2,
    (CHAMBER.x + CHAMBER.width / 2) + 112,
];

const FIELD_START_X = 56;
const FIELD_END_X = CHAMBER.x + 40;
const FIELD_Y = CENTER.y;

const SOURCE = { x: 58, y: FIELD_Y };
const COUPLING = { x: CHAMBER.x + 50, y: FIELD_Y };

const GUIDE_LINES = [
    { x1: CHAMBER.x - 88, y1: CHAMBER.y + 42, x2: CHAMBER.x, y2: CHAMBER.y + 42 },
    { x1: CHAMBER.x - 88, y1: CHAMBER.y + CHAMBER.height - 42, x2: CHAMBER.x, y2: CHAMBER.y + CHAMBER.height - 42 },
    { x1: CHAMBER.x + CHAMBER.width, y1: CHAMBER.y + 42, x2: CHAMBER.x + CHAMBER.width + 88, y2: CHAMBER.y + 42 },
    { x1: CHAMBER.x + CHAMBER.width, y1: CHAMBER.y + CHAMBER.height - 42, x2: CHAMBER.x + CHAMBER.width + 88, y2: CHAMBER.y + CHAMBER.height - 42 },
];

const FIELD_PACKET_X = [96, 128, 160, 192, 224];

const CHAMBER_MOUNTS = [
    { x: CHAMBER.x + 16, y: CHAMBER.y + 16 },
    { x: CHAMBER.x + CHAMBER.width - 16, y: CHAMBER.y + 16 },
    { x: CHAMBER.x + 16, y: CHAMBER.y + CHAMBER.height - 16 },
    { x: CHAMBER.x + CHAMBER.width - 16, y: CHAMBER.y + CHAMBER.height - 16 },
];

const LABELS = {
    source: {
        text: 'time-dependent field',
        x: CHAMBER.x - 150,
        y: CHAMBER.y + 58,
        tick: {
            x1: CHAMBER.x - 76,
            y1: CHAMBER.y + 66,
            x2: CHAMBER.x - 28,
            y2: FIELD_Y - 18,
        },
    },
    system: {
        text: 'internal molecular states / Hamiltonian scaffold',
        x: CENTER.x - 180,
        y: CHAMBER.y - 20,
        tick: {
            x1: CENTER.x,
            y1: CHAMBER.y -10,
            x2: CENTER.x,
            y2: CENTER.y - 64,
        },
    },
    response: {
        text: 'driven response',
        x: CHAMBER.x + CHAMBER.width + 8,
        y: CHAMBER.y + 72,
        tick: {
            x1: CHAMBER.x + CHAMBER.width + 16,
            y1: CHAMBER.y + 78,
            x2: CHAMBER.x + CHAMBER.width - 36,
            y2: FIELD_Y - 33,
        },
    },
};

/** Helper Functions Setup */
// create straight energy-level rails inside chamber
function makeRailPath(y) {
    return `M ${CHAMBER.x + 34} ${y} L ${CHAMBER.x + CHAMBER.width - 34} ${y}`;
}

// make each energy level have evenly spaced control nodes
function makeNodeSet(y) {
    return NODE_X.map((x) => ({ x, y }));
}

// build incoming coherent field ribbon
function makeWavePath({
    startX = FIELD_START_X,
    endX = FIELD_END_X,
    y = FIELD_Y,
    amplitude = 11,
    wavelength = 34,
    steps = 18,
}) {
    const width = endX - startX;
    const dx = width / steps;

    let d = `M ${startX} ${y}`;
    for (let i = 1; i <= steps; i += 1) {
        const x = startX + i * dx;
        const phase = (i / steps) * ((width / wavelength) * Math.PI * 2);
        const py = y + Math.sin(phase) * amplitude;
        d += ` L ${x} ${py}`;
    }
    return d;
}

// soft inner guide brackets
function makeBracketPath(side = 'left') {
    if (side === 'left') {
        return `
        M ${CHAMBER.x - 18} ${CHAMBER.y + 24}
        L ${CHAMBER.x - 4} ${CHAMBER.y + 24}
        L ${CHAMBER.x - 4} ${CHAMBER.y + CHAMBER.height - 24}
        L ${CHAMBER.x - 18} ${CHAMBER.y + CHAMBER.height - 24}
        `;
    }

    return `
        M ${CHAMBER.x + CHAMBER.width + 18} ${CHAMBER.y + 24}
        L ${CHAMBER.x + CHAMBER.width + 4} ${CHAMBER.y + 24}
        L ${CHAMBER.x + CHAMBER.width + 4} ${CHAMBER.y + CHAMBER.height - 24}
        L ${CHAMBER.x + CHAMBER.width + 18} ${CHAMBER.y + CHAMBER.height - 24}
    `;
}

// center scaffold core
function makeHexagonPath(cx, cy, r) {
    const pts = Array.from({ length: 6 }, (_, i) => {
        const a = ((Math.PI * 2) / 6) * i - Math.PI / 2;
        return `${cx + Math.cos(a) * r},${cy + Math.sin(a) * r}`;
    }).join(' ');
    return `M ${pts.split(' ')[0]} L ${pts.split(' ').slice(1).join(' L ')} Z`;
}

export default function FieldMatterInteractionVisualResponse() {
    const fieldPath = makeWavePath({ amplitude: 16, wavelength: 36 });
    const levelNodes = LEVEL_Y.map((y) => makeNodeSet(y));
    const railGradientId = useId().replace(/:/g, '-');
    const couplingGradientId = useId().replace(/:/g, '-');
    const blurSoftId = useId().replace(/:/g, '-');
    const responseRails = LEVEL_Y.map((y) => ({
        key: `response-${y}`,
        d: makeRailPath(y),
    }));

    return (
        // make panel behave like scientific figure
        <figure className="FMIWrap">
            <div className="FMIFigureBackground">
                <svg
                    className="FMISVG"
                    viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                    role="img"
                    preserveAspectRatio="xMidYMid meet"
                >
                    <defs>
                        {/* gradients */}
                        <linearGradient 
                            id={railGradientId}
                            gradientUnits="userSpaceOnUse"
                            x1={CHAMBER.x + 34}
                            y1="0"
                            x2={CHAMBER.x + CHAMBER.width - 34}
                            y2="0"
                        >
                            <stop offset="0%" stopColor="var(--c-glow-3)" stopOpacity="1" />
                            <stop offset="10%" stopColor="var(--c-glow-2)" stopOpacity="1" />
                            <stop offset="35%" stopColor="var(--text)" stopOpacity="0.95" />
                            <stop offset="75%" stopColor="var(--c-glow-1)" stopOpacity="0.55" />
                            <stop offset="100%" stopColor="var(--c-glow-1)" stopOpacity="0.2" />
                        </linearGradient>

                        <linearGradient id="FMIFieldRibbonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--c-glow-2)" stopOpacity="0.2" />
                            <stop offset="45%" stopColor="var(--c-glow-3)" stopOpacity="0.85" />
                            <stop offset="100%" stopColor="var(--c-glow-1)" stopOpacity="0.9" />
                        </linearGradient>

                        <linearGradient id="FMIFieldCoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="var(--text)" stopOpacity="0.18" />
                            <stop offset="50%" stopColor="var(--c-glow-1)" stopOpacity="0.95" />
                            <stop offset="100%" stopColor="var(--text)" stopOpacity="0.2" />
                        </linearGradient>

                        {/* glow */}
                        <radialGradient
                            id={couplingGradientId}
                            cx="50%"
                            cy="50%"
                            r="50%"
                        >
                            <stop offset="0%" stopColor="var(--text)" stopOpacity="0.65" />
                            <stop offset="28%" stopColor="var(--c-glow-1)" stopOpacity="0.45" />
                            <stop offset="60%" stopColor="var(--c-glow-2)" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="var(--c-glow-3)" stopOpacity="0" />
                        </radialGradient>

                        {/* filters  */}
                        <filter
                            id={blurSoftId}
                            x="-20%"
                            y="-20%"
                            width="140%"
                            height="140%"
                        >
                            <feGaussianBlur stdDeviation="4" />
                        </filter>

                        {/* masks (clipping paths to make oscillation stay inside the chamber) */}
                        <clipPath id="FMIChamberClip">
                            <rect
                                x={CHAMBER.x + 8}
                                y={CHAMBER.y + 8}
                                width={CHAMBER.width - 16}
                                height={CHAMBER.height - 16}
                                rx={CHAMBER.radius - 6}
                            />
                        </clipPath>

                    </defs>
                    
                    <g className="FMIMoveCanvas" transform="translate(0, -15)">
                    {/* add thin technical guide traces around chamber */}
                        <g className="FMIGuideLayer" aria-hidden="true">
                            {/* subtle instrument traces */}
                            {GUIDE_LINES.map((line, idx) => (
                                <line
                                    key={`guide-${idx}`}
                                    x1={line.x1}
                                    y1={line.y1}
                                    x2={line.x2}
                                    y2={line.y2}
                                    className="FMIGuideLine"
                                />
                            ))}

                            <path className="FMIBracket" d={makeBracketPath('left')} />
                            <path className="FMIBracket" d={makeBracketPath('right')} />

                            {GUIDE_LINES.flatMap((line, idx) => [
                                <circle
                                    key={`guide-start-${idx}`}
                                    cx={line.x1}
                                    cy={line.y1}
                                    r="2.2"
                                    className="FMIGuideNode"
                                />,
                                <circle
                                    key={`guide-end-${idx}`}
                                    cx={line.x2}
                                    cy={line.y2}
                                    r="2.2"
                                    className="FMIGuideNode"
                                />,
                            ])}
                        </g>

                        <g className="FMIChamberFrame" aria-hidden="true">
                            {/* outer frame and glass housing */}
                            <rect
                                x={CHAMBER.x}
                                y={CHAMBER.y}
                                width={CHAMBER.width}
                                height={CHAMBER.height}
                                rx={CHAMBER.radius}
                                className="FMIChamberOuter"
                            />

                            <rect
                                x={CHAMBER.x + 9}
                                y={CHAMBER.y + 9}
                                width={CHAMBER.width - 18}
                                height={CHAMBER.height - 18}
                                rx={CHAMBER.radius - 8}
                                className="FMIChamberGlass"
                            />

                            <path
                                className="FMIChamberReflect"
                                d={`
                                    M ${CHAMBER.x + 34} ${CHAMBER.y + 24}
                                    L ${CHAMBER.x + 118} ${CHAMBER.y + 24}
                                    L ${CHAMBER.x + 84} ${CHAMBER.y + 118}
                                    L ${CHAMBER.x + 24} ${CHAMBER.y + 118}
                                    Z
                                `}
                            />

                            {CHAMBER_MOUNTS.map((mount, idx) => (
                                <g key={`mount-${idx}`} className="FMIChamberMount">
                                    <circle cx={mount.x} cy={mount.y} r="6" className="FMIChamberMountOuter" />
                                    <circle cx={mount.x} cy={mount.y} r="2.2" className="FMIChamberMountInner" />
                                </g>
                            ))}
                        </g>

                        <g className="FMISystem" aria-hidden="true">
                            {/* static energy rails */}
                            {LEVEL_Y.map((y) => (
                                <path 
                                    key={y} 
                                    d={makeRailPath(y)} 
                                    className="FMIRail"
                                    stroke={`url(#${railGradientId})`}
                                    // stroke="var(--c-glow-3)"
                                />
                            ))}

                            {/* node markers */}
                            {levelNodes.map((nodes, i) => (
                                <g key={`node-row-${LEVEL_Y[i]}`} className="FMINodeRow">
                                    {nodes.map((node, idx) => (
                                        <g key={`${LEVEL_Y[i]}-${idx}`} className="FMINodeGroup">
                                            <circle
                                                cx={node.x}
                                                cy={node.y}
                                                r="6"
                                                className="FMINode"
                                                fill={`url(#${couplingGradientId})`}
                                                filter={`url(#${blurSoftId})`}
                                            />
                                            <circle 
                                                cx={node.x}
                                                cy={node.y}
                                                r="3.6"
                                                className="FMINode"
                                            />
                                        </g>
                                    ))}
                                </g>
                            ))}

                            {/* central Hamiltonian core */}
                            <g className="FMIHamiltonianCore">
                                <circle
                                    cx={CENTER.x}
                                    cy={CENTER.y}
                                    r="52"
                                    className="FMICoreHalo"
                                    fill={`url(#${couplingGradientId})`}
                                    filter={`url(#${blurSoftId})`}
                                />
                                <path
                                    d={makeHexagonPath(CENTER.x, CENTER.y, 42)}
                                    className="FMICoreHex"
                                />
                                <circle
                                    cx={CENTER.x}
                                    cy={CENTER.y}
                                    r="16"
                                    className="FMICoreInner"
                                />
                                <path
                                    d={`
                                        M ${CENTER.x - 78} ${CENTER.y}
                                        L ${CENTER.x + 78} ${CENTER.y}
                                        M ${CENTER.x} ${CENTER.y - 78}
                                        L ${CENTER.x} ${CENTER.y + 78}
                                    `}
                                    className="FMICoreAxis"
                                />
                            </g>
                        </g>

                        <g className="FMIField" aria-hidden="true">
                            <circle
                                cx={SOURCE.x}
                                cy={SOURCE.y}
                                r="24"
                                className="FMISourceGlow"
                                fill={`url(#${couplingGradientId})`}
                                filter={`url(#${blurSoftId})`}
                            />

                            <circle
                                cx={SOURCE.x}
                                cy={SOURCE.y}
                                r="8"
                                className="FMISourceCore"
                            />
                            {/* incoming pulse ribbon */}
                            <path
                                d={fieldPath}
                                className="FMIFieldRibbon"
                                stroke="url(#FMIFieldRibbonGradient)"
                            />
                            {/* carrier line */}
                            <path
                                d={fieldPath}
                                className="FMIFieldCore"
                                stroke="url(#FMIFieldCoreGradient)"
                            />
                            {/* pulse packets */}
                            {FIELD_PACKET_X.map((x, idx) => (
                                <ellipse
                                    key={`packet-${idx}`}
                                    cx={x}
                                    cy={FIELD_Y}
                                    rx="8"
                                    ry="4"
                                    className={`FMIFieldPacket FMIFieldPacket--${idx + 1}`}
                                />
                            ))}
                        </g>

                        <g className="FMIInteractionZone" aria-hidden="true">
                            {/* soft glow where the incoming wave first touches the chamber edge */}
                            <circle
                                cx={COUPLING.x}
                                cy={COUPLING.y}
                                r="40"
                                className="FMIHitGlow"
                                fill={`url(#${couplingGradientId})`}
                                filter={`url(#${blurSoftId})`}
                            />
                            {/* small circular marker that shows the entry point into the system */}
                            <circle
                                cx={COUPLING.x}
                                cy={COUPLING.y}
                                r="16"
                                className="FMICouplingRing"
                            />
                        </g>

                        <g className="FMIResponse" aria-hidden="true">
                            {/* faint animated copies of the horizontal rails to show the scaffold waking up */}
                            {responseRails.map((rail) => (
                                <path
                                    key={rail.key}
                                    d={rail.d}
                                    className="FMIResponseRail"
                                    stroke={`url(#${railGradientId})`}
                                    
                                />
                            ))}
                            {/* node pulse */}
                            {levelNodes.map((nodes, i) => (
                                <g key={`pulse-${LEVEL_Y[i]}`} className="FMIResponseNodes">
                                    {nodes.map((node, idx) => (
                                        <circle
                                            key={`pulse-${LEVEL_Y[i]}-${idx}`}
                                            cx={node.x}
                                            cy={node.y}
                                            r="6"
                                            className="FMINodePulse"
                                            fill={`url(#${couplingGradientId})`}
                                        />
                                    ))}
                                </g>
                            ))}
                            {/* residual afterglow / settling */}
                            <ellipse
                                cx={CENTER.x}
                                cy={CENTER.y}
                                rx="120"
                                ry="76"
                                className="FMIResidualGlow"
                                fill={`url(#${couplingGradientId})`}
                                filter={`url(#${blurSoftId})`}
                            />
                        </g>

                        <g className="FMILabelLayer" aria-hidden="true">
                            <g className="FMILabelGroup FMILabelGroup--source">
                                <line
                                    x1={LABELS.source.tick.x1}
                                    y1={LABELS.source.tick.y1}
                                    x2={LABELS.source.tick.x2}
                                    y2={LABELS.source.tick.y2}
                                    className="FMILabelTick"
                                />
                                <text
                                    x={LABELS.source.x}
                                    y={LABELS.source.y}
                                    className="FMILabelText"
                                >
                                    {LABELS.source.text}
                                </text>
                            </g>

                            <g className="FMILabelGroup FMILabelGroup--system">
                                <line
                                    x1={LABELS.system.tick.x1}
                                    y1={LABELS.system.tick.y1}
                                    x2={LABELS.system.tick.x2}
                                    y2={LABELS.system.tick.y2}
                                    className="FMILabelTick"
                                />
                                <text
                                    x={LABELS.system.x}
                                    y={LABELS.system.y}
                                    className="FMILabelText"
                                >
                                    {LABELS.system.text}
                                </text>
                            </g>

                            <g className="FMILabelGroup FMILabelGroup--response">
                                <line
                                    x1={LABELS.response.tick.x1}
                                    y1={LABELS.response.tick.y1}
                                    x2={LABELS.response.tick.x2}
                                    y2={LABELS.response.tick.y2}
                                    className="FMILabelTick"
                                />
                                <text
                                    x={LABELS.response.x}
                                    y={LABELS.response.y}
                                    className="FMILabelText"
                                >
                                    {LABELS.response.text}
                                </text>
                            </g>
                        </g>
                    </g>
                </svg>
            </div>

            <p className="FMIDescription">
                An external time-dependent field enters from the left and couples to a molecular system, represented as a chamber containing a simplified internal state scaffold. 
                At the center, the hexagonal core depicts the molecule’s Hamiltonian or state structure, where the interaction is localized. 
                From this coupling, energy is distributed across the internal states, visualized as glowing rails and pulses that trace the system’s driven response.
            </p>
        </figure>
    );
}
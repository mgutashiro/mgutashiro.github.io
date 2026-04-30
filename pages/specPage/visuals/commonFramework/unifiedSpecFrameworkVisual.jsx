import './unifiedSpecFrameworkVisual.css'
import { useId, useEffect, useState, useMemo } from 'react';

// const spinningArrow = "../../../../public/spinningArrow.svg"

// const spinningArrow = "/spinningArrow.svg";

/** CONSTANTS */
const VIEWBOX = { width: 720, height: 620 };

const CENTER = { x: 360, y: 288 };

const ORBIT = {
    rx: 248,
    ry: 214,
};

const INNER_ORBIT = {
    rx: 164,
    ry: 142,
};

const MODULE_BOX = {
    width: 116,
    height: 68,
};

const CORE_SHELL = {
    rx: 146,
    ry: 122,
};

const SELECTOR_SPAN = 58;
const ORBIT_CYCLE_MS = 12000;

const CORE_SCAFFOLD = {
    width: 232,
    rowHeight: 48,
    gap: 13,
};

const CORE_SCAFFOLD_TOTAL_HEIGHT =
    CORE_SCAFFOLD.rowHeight * 3 + CORE_SCAFFOLD.gap * 2;

const CORE_SCAFFOLD_ORIGIN = {
    x: CENTER.x - CORE_SCAFFOLD.width / 2,
    y: CENTER.y - CORE_SCAFFOLD_TOTAL_HEIGHT / 2,
};

const CORE_LAYERS = [
    {
        key: "electronic",
        title: "electronic",
        subtitle: "STATE MANIFOLD",
        type: "electronic",
    },
    {
        key: "electron-spin",
        title: "electron spin",
        subtitle: "mₛ SUBLEVELS",
        type: "electronSpin",
    },
    {
        key: "nuclear-spin",
        title: "nuclear spin",
        subtitle: "m SPIN STATES",
        type: "nuclearSpin",
    },
];

const ELECTRONIC_BANDS = [
    { y: 10, width: 72, label: "E₂" },
    { y: 22, width: 72, label: "E₁" },
    { y: 38, width: 72, label: "E₀" },
];

const SPIN_SUBLEVELS = {
    electron: [
        { y: 12, width: 62, label: "+1/2" },
        { y: 36, width: 62, label: "-1/2" },
    ],
    nucleus: [
        { y: 17, width: 58, label: "+1/2" },
        { y: 31, width: 58, label: "-1/2" },
    ],
};

/** METHOD DEFINITIONS */
const METHODS = [
    {
        id: 'uvvis',
        label: 'UV-Vis',
        angle: -90,
        subtitle: 'electronic absorption',
        delay: 0,
    },
    {
        id: 'fluorescence',
        label: 'Fluorescence',
        angle: -18,
        subtitle: 'excitation / emission',
        delay: 2.4,
        },
    {
        id: 'nmr',
        label: 'NMR',
        angle: 54,
        subtitle: 'nuclear spin',
        delay: 4.8,
    },
    {
        id: 'epr',
        label: 'EPR / TREPR',
        angle: 126,
        subtitle: 'electron spin',
        delay: 7.2,
    },
    {
        id: 'ta',
        label: 'Ultrafast',
        angle: 198,
        subtitle: 'pump / probe',
        delay: 9.6,
    },
];

const BASE_SELECTOR_ANGLE = METHODS[0].angle;

/** HELPER FUNCTIONS */
function normalizeAngle(angle) {
    return ((angle % 360) + 360) % 360;
}

function circularDistance(a, b) {
    const diff = Math.abs(normalizeAngle(a) - normalizeAngle(b));
    return Math.min(diff, 360 - diff);
}

function getNearestMethodIndex(angle) {
    let bestIndex = 0;
    let bestDistance = Infinity;

    METHODS.forEach((method, index) => {
        const dist = circularDistance(angle, method.angle);
        if (dist < bestDistance) {
            bestDistance = dist;
            bestIndex = index;
        }
    });

  return bestIndex;
}

function toRadians(angleDeg) {
    return (angleDeg * Math.PI) / 180;
}

function ellipsePoint(cx, cy, rx, ry, angleDeg) {
    const angle = toRadians(angleDeg);
    return {
        x: cx + rx * Math.cos(angle),
        y: cy + ry * Math.sin(angle),
    };
}

function describeEllipseArc(cx, cy, rx, ry, startAngle, endAngle) {
    const start = ellipsePoint(cx, cy, rx, ry, startAngle);
    const end = ellipsePoint(cx, cy, rx, ry, endAngle);
    const delta = Math.abs(endAngle - startAngle);
    const largeArcFlag = delta > 180 ? 1 : 0;

    return [
        `M ${start.x} ${start.y}`,
        `A ${rx} ${ry} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    ].join(' ');
}

/** SVG SUBCOMPONENTS */
// scling core
const LAYER_SCALE = {
    electronic: 1.1,
    electronSpin: 1.1,
    nuclearSpin: 1.1,
};

const LAYER_SCALE_ANCHOR = {
    x: CORE_SCAFFOLD.width / 2,
    y: CORE_SCAFFOLD.rowHeight / 2,
};

// core functions
function getLayerY(index) {
    return (
        CORE_SCAFFOLD_ORIGIN.y +
        index * (CORE_SCAFFOLD.rowHeight + CORE_SCAFFOLD.gap)
    );
}

function getScaffoldLayerTransform(index = 0, type = "electronic") {
    const baseX = CORE_SCAFFOLD_ORIGIN.x;
    const baseY = getLayerY(index);

    const anchorX = LAYER_SCALE_ANCHOR.x;
    const anchorY = LAYER_SCALE_ANCHOR.y;

    const scale = LAYER_SCALE[type] ?? 1;

    return [
        `translate(${baseX}, ${baseY})`,
        `translate(${anchorX}, ${anchorY})`,
        `scale(${scale})`,
        `translate(${-anchorX}, ${-anchorY})`,
    ].join(" ");
}

function useUSFCoreIds() {
    const uid = useId().replace(/:/g, "");
    return {
        shellStroke: `USFShellStroke-${uid}`,
        coreGlow: `USFCoreGlow-${uid}`,
        layerFill: `USFLayerFill-${uid}`,
        layerStroke: `USFLayerStroke-${uid}`,
        softBlur: `USFSoftBlur-${uid}`,
    };
}

function USFCoreDefs({ ids }) {
    return (
        <defs>
            <linearGradient
                id={ids.shellStroke}
                x1="18%"
                y1="8%"
                x2="82%"
                y2="92%"
            >
                <stop offset="0%" stopColor="var(--c-glow-2)" />
                <stop offset="45%" stopColor="var(--c-glow-3)" />
                <stop offset="100%" stopColor="var(--c-glow-1)" />
            </linearGradient>

            <linearGradient
                id={ids.layerFill}
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
            >
                <stop
                    offset="0%"
                    stopColor="color-mix(in oklab, var(--c-primary-2) 54%, var(--c-ink))"
                />
                <stop
                    offset="52%"
                    stopColor="color-mix(in oklab, var(--c-shadow) 72%, var(--c-primary-1))"
                />
                <stop
                    offset="100%"
                    stopColor="color-mix(in oklab, var(--c-ink) 82%, var(--c-glow-2))"
                />
            </linearGradient>

            <linearGradient
                id={ids.layerStroke}
                x1="0%"
                y1="50%"
                x2="100%"
                y2="50%"
            >
                <stop offset="0%" stopColor="var(--c-glow-2)" />
                <stop offset="55%" stopColor="var(--c-glow-3)" />
                <stop offset="100%" stopColor="var(--c-glow-1)" />
            </linearGradient>

            <radialGradient
                id={ids.coreGlow}
                cx={CENTER.x}
                cy={CENTER.y}
                r={CORE_SHELL.rx + 54}
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0%"
                    stopColor="color-mix(in oklab, var(--c-glow-2) 42%, white)"
                />
                <stop
                    offset="48%"
                    stopColor="color-mix(in oklab, var(--c-glow-3) 18%, transparent)"
                />
                <stop
                    offset="100%"
                    stopColor="transparent"
                />
            </radialGradient>

            <filter
                id={ids.softBlur}
                x={CENTER.x - CORE_SHELL.rx - 80}
                y={CENTER.y - CORE_SHELL.ry - 80}
                width={CORE_SHELL.rx * 2 + 160}
                height={CORE_SHELL.ry * 2 + 160}
                filterUnits="userSpaceOnUse"
            >
                <feGaussianBlur stdDeviation="9" />
            </filter>
        </defs>
    );
}

function ElectronicLayerGlyph() {
    return (
        <g 
            className="USFLayerGlyph USFLayerGlyph--electronic" >
            {ELECTRONIC_BANDS.map((band) => (
                <g key={band.label}>
                    <line
                        x1={156 - band.width / 2}
                        y1={band.y}
                        x2={156 + band.width / 2}
                        y2={band.y}
                        className="USFManifoldLine"
                    />
                    <text
                        x="210"
                        y={band.y + 3.5}
                        className="USFManifoldMiniLabel"
                        textAnchor="end"
                    >
                        {band.label}
                    </text>
                </g>
            ))}
        </g>
    );
}

function ElectronSpinLayerGlyph() {
    return (
        <g className="USFLayerGlyph USFLayerGlyph--electronSpin" >
            <circle cx="113" cy="24" r="5" className="USFElectronNode" />
            <text x="111" y="26.5" className="USFSpinSymbol">
                -
            </text>

            {SPIN_SUBLEVELS.electron.map((level) => (
                <g key={level.label}>
                    <line
                        x1={154 - level.width / 2}
                        y1={level.y }
                        x2={154 + level.width / 2}
                        y2={level.y}
                        className="USFSpinLine"
                    />
                    <text
                        x="215"
                        y={level.y + 2}
                        className="USFManifoldMiniLabel"
                        textAnchor="end"
                    >
                        {level.label}
                    </text>
                </g>
            ))}

            <line x1="196" y1="8" x2="196" y2="40" className="USFFieldTick" />
            {/* <text x="202" y="26" className="USFFieldLabel">
                B₀
            </text> */}
        </g>
    );
}

function NuclearSpinLayerGlyph() {
    return (
        <g className="USFLayerGlyph USFLayerGlyph--nuclearSpin" >
            <circle cx="113" cy="24" r="8" className="USFNucleusDot" />
            <text x="113" y="26.5" className="USFNucleusLabel" textAnchor="middle">
                +
            </text>

            {SPIN_SUBLEVELS.nucleus.map((level) => (
                <g key={level.label}>
                    <line
                        x1={158 - level.width / 2}
                        y1={level.y}
                        x2={158 + level.width / 2}
                        y2={level.y}
                        className="USFNuclearSpinLine"
                    />
                    <text
                        x="214"
                        y={level.y + 3.5}
                        className="USFManifoldMiniLabel"
                        textAnchor="end"
                    >
                        {level.label}
                    </text>
                </g>
            ))}

            <line x1="196" y1="11" x2="196" y2="37" className="USFFieldTick" />
            {/* <text x="202" y="26" className="USFFieldLabel">
                B₀
            </text> */}
        </g>
    );
}

function LayerGlyph({ type }) {
    if (type === "electronic") return <ElectronicLayerGlyph />;
    if (type === "electronSpin") return <ElectronSpinLayerGlyph />;
    if (type === "nuclearSpin") return <NuclearSpinLayerGlyph />;
    return null;
}

function QuantumScaffoldLayer({ layer, index, ids }) {

    return (
        <g
            className={`USFScaffoldLayerGroup USFScaffoldLayerGroup--${layer.type}`}
            transform={getScaffoldLayerTransform(index, layer.type)}
        >
            <rect
                x="0"
                y="0"
                width={CORE_SCAFFOLD.width}
                height={CORE_SCAFFOLD.rowHeight}
                rx="15"
                className="USFScaffoldLayer"
                fill={`url(#${ids.layerFill})`}
                stroke={`url(#${ids.layerStroke})`}
            />
            <line x1="17" y1="11" x2="17" y2="37" className="USFLayerRail" />

            <text x="29" y="20" className="USFLayerTitle">
                {layer.title}
            </text>

            <text x="29" y="35" className="USFLayerSubtitle">
                {layer.subtitle}
            </text>

            <LayerGlyph type={layer.type} />
        </g>
    );
}

function QuantumScaffold({ ids }) {
    return (
        <g className="USFQuantumScaffold">
            {CORE_LAYERS.map((layer, index) => (
                <QuantumScaffoldLayer
                    key={layer.key}
                    layer={layer}
                    index={index}
                    ids={ids}
                />
            ))}
        </g>
    );
}

function CorePorts() {
    return (
        <g className="USFCorePorts">
            <circle cx={CENTER.x - 146} cy={CENTER.y} r="6" className="USFPort" />
            <circle cx={CENTER.x + 146} cy={CENTER.y} r="6" className="USFPort" />

        </g>
    );
}

function StableQuantumCore({ ids }) {
    return (
        <g className="USFQuantumCore" aria-hidden="true">
            <ellipse
                cx={CENTER.x}
                cy={CENTER.y}
                rx={CORE_SHELL.rx + 30}
                ry={CORE_SHELL.ry + 28}
                className="USFCoreGlow"
                fill={`url(#${ids.coreGlow})`}
                filter={`url(#${ids.softBlur})`}
            />

            <ellipse
                cx={CENTER.x}
                cy={CENTER.y}
                rx={INNER_ORBIT.rx}
                ry={INNER_ORBIT.ry}
                className="USFInnerOrbit"
            />

            <ellipse
                cx={CENTER.x}
                cy={CENTER.y}
                rx="122"
                ry="100"
                className="USFCoreInnerShell"
            />

            <line
                x1={CENTER.x}
                y1={CENTER.y - 106}
                x2={CENTER.x}
                y2={CENTER.y + 106}
                className="USFCoreAxis"
            />

            <line
                x1={CENTER.x - 124}
                y1={CENTER.y}
                x2={CENTER.x + 124}
                y2={CENTER.y}
                className="USFCoreAxis USFCoreAxis--horizontal"
            />

            <CorePorts />

            <QuantumScaffold ids={ids} />

        </g>
    );
}

// outer spec technique functions

function SpinArrowIcon({ x = 0, y = 0, direction = 'left', width = 26, height = 11 }) {
    const isLeft = direction === 'left';

    return (
        <svg
            x={x}
            y={y}
            width={width}
            height={height}
            viewBox={isLeft ? '0 0 34 14' : '0 0 33 14'}
            className="USFMethodArrow"
            aria-hidden="true"
        >
            <path
                d={
                    isLeft
                        ? 'M4.83316 2.40048L5.39342 4.99594L6.70069 7.35108L8.45617 9.22558L10.6225 10.8117L12.9756 11.6768L15.4407 12.3497L17.9059 12.5901L21.2301 12.3497L24.4049 11.6288L27.0194 10.5714L29.2231 9.08139L30.9786 7.20689L32.0618 5.38045L32.622 4.08272L32.8088 2.30435M4.83316 2.40048H7.59117L4.83316 0.590065L1.80877 2.40048H4.83316Z'
                        : 'M0.48938 2.23985L1.04167 4.87717L2.33034 7.2703L4.06085 9.17503L6.19637 10.7867L8.51598 11.6658L10.9461 12.3496L13.3761 12.5938L16.653 12.3496L19.7827 11.617L22.36 10.5425L24.5324 9.02851L26.2629 7.12378L27.3306 5.26788L27.8829 3.94922L28.067 2.14217M28.067 2.14217H30.4894L28.2534 0.593781L25.6447 2.14217H28.067Z'
                }
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function MethodGlyph({ id }) {
    switch (id) {
        case 'uvvis':
            return (
                <g className="USFMethodGlyph USFMethodGlyph--uvvis" aria-hidden="true">
                    <line x1="-30" y1="20" x2="38" y2="20" className="USFManifoldLine" />
                    <circle cx="0" cy="20" r="4.2" className="USFElectronNode" />
                    <line x1="-30" y1="-15" x2="38" y2="-15" className="USFManifoldLine" />
                    <circle cx="0" cy="-15" r="4.2" className="USFElectronNode2" />
                    <line
                        x1="0"
                        y1="10"
                        x2="0"
                        y2="-2"
                        className="USFMethodArrow"
                    />
                    <path
                        d="M 0 -6 L -4 0 L 4 0 Z"
                        className="USFMethodArrowHead"
                    />
                </g>
            );
        case 'fluorescence':
            return (
                <g className="USFMethodGlyph USFMethodGlyph--fluorescence" aria-hidden="true">
                    {/* incoming excitation */}
                    <line x1="-30" y1="-10" x2="30" y2="-10" className="USFManifoldLine" />
                    <line x1="-30" y1="20" x2="30" y2="20" className="USFManifoldLine" />

                    {/* excited emitter */}
                    <circle cx="0" cy="-10" r="4.2" className="USFElectronNode2" />
                    <circle cx="0" cy="20" r="4.2" className="USFElectronNode" />

                    {/* small downward relaxation */}
                    <line
                        x1="0"
                        y1="-1"
                        x2="0"
                        y2="10"
                        className="USFMethodArrow"
                    />
                    <path
                        d="M 0 14 L -4 8 L 4 8 Z"
                        className="USFMethodArrowHead"
                    />

                </g>
            );

        case 'nmr':
            return (
                <g className="USFMethodGlyph USFMethodGlyph--nmr" aria-hidden="true">
                    {/* vertical arrows behind circles */}
                    <line x1="-18" y1="18" x2="-18" y2="-18" className="USFMethodArrow2" />
                    <path d="M -18 -22 L -22 -14 L -14 -14 Z" className="USFMethodArrowHead2" />

                    <line x1="18" y1="-18" x2="18" y2="18" className="USFMethodArrow2" />
                    <path d="M 18 22 L 14 14 L 22 14 Z" className="USFMethodArrowHead2" />

                    {/* circles */}
                    <circle cx="-18" cy="0" r="10.4" className="USFNucleusMask" />
                    <circle cx="18" cy="0" r="10.4" className="USFNucleusMask" />

                    <circle cx="-18" cy="0" r="10" className="USFNucleusDot" />
                    <circle cx="18" cy="0" r="10" className="USFNucleusDot" />

                    {/* spin arrow on left circle: SpinArrowBase + RSpinArrowHead */}
                    <SpinArrowIcon
                        x={-32}
                        y={8}
                        width={31}
                        height={10}
                        direction="right"
                    />

                    {/* spin arrow centered on right circle */}
                    <SpinArrowIcon
                        x={1}
                        y={-18}
                        width={31}
                        height={10}
                        direction="left"
                    />
                    
                </g>

            );
        case 'epr':
            return (
                <g className="USFMethodGlyph USFMethodGlyph--epr" aria-hidden="true">
                    {/* vertical arrows behind circles */}
                    <line x1="-28" y1="14" x2="-28" y2="-14" className="USFMethodArrow3" />
                    <path d="M -28 -18 L -32 -10 L -24 -10 Z" className="USFMethodArrowHead3" />

                    <line x1="28" y1="-14" x2="28" y2="14" className="USFMethodArrow3" />
                    <path d="M 28 18 L 24 10 L 32 10 Z" className="USFMethodArrowHead3" />

                    {/* masking circles to push the arrows visually behind */}
                    <circle cx="-28" cy="0" r="5.3" className="USFArrowMaskCircle" />
                    <circle cx="28" cy="0" r="5.3" className="USFArrowMaskCircle" />

                    {/* circles */}
                    <circle cx="-28" cy="0" r="5" className="USFElectronNode" />
                    <circle cx="28" cy="0" r="5" className="USFElectronNode" />

                    {/* spin arrow on left circle */}

                    <SpinArrowIcon
                        x={-38}
                        y={-3}
                        width={22}
                        height={10}
                        direction="right"
                    />

                    {/* spin arrow centered on right circle */}
                    <SpinArrowIcon
                        x={12}
                        y={-3}
                        width={31}
                        height={10}
                        direction="left"
                    />

                </g>
            );
        case 'ta':
            return (
                <g className="USFMethodGlyph USFMethodGlyph--ta" aria-hidden="true">
                    <line x1="-30" y1="-22" x2="30" y2="-22" className="USFManifoldLine" />
                    <line x1="-30" y1="-5" x2="30" y2="-5" className="USFManifoldLine" />
                    <line x1="-30" y1="25" x2="30" y2="25" className="USFManifoldLine" />
                    <circle cx="12" cy="-22" r="4.2" className="USFElectronNode3" />
                    <circle cx="12" cy="-5" r="4.2" className="USFElectronNode2" />
                    <circle cx="-12" cy="-5" r="4.2" className="USFElectronNode2" />
                    <circle cx="-12" cy="25" r="4.2" className="USFElectronNode" />

                     <line
                        x1="-12"
                        y1="16"
                        x2="-12"
                        y2="5"
                        className="USFMethodArrow"
                    />
                    <path
                        d="M -12 1 L -16 7 L -8 7 Z"
                        className="USFMethodArrowHead"
                    />

                    {/* right arrow: below middle line, left middle circle -> right middle side */}
                    <line
                        x1="-4"
                        y1="-5"
                        x2="4"
                        y2="-5"
                        className="USFMethodArrow"
                    />
                    <path
                        d="M 7 -5 L 2 -8 L 2 -2 Z"
                        className="USFMethodArrowHead"
                    />

                    {/* up arrow: middle-right circle -> top circle */}
                    <line
                        x1="12"
                        y1="-10"
                        x2="12"
                        y2="-14"
                        className="USFMethodArrow"
                    />
                    <path
                        d="M 12 -17 L 9 -12.5 L 15 -12.5 Z"
                        className="USFMethodArrowHead"
                    />
                </g>
            );
        default:
            return null;
    }
}
function MethodModule({ method, isActive }) {
    const outer = ellipsePoint(CENTER.x, CENTER.y, ORBIT.rx, ORBIT.ry, method.angle);
    const inner = ellipsePoint(CENTER.x, CENTER.y, INNER_ORBIT.rx, INNER_ORBIT.ry, method.angle);

    return (
        <g
        className={`USFMethod USFMethod--${method.id} ${isActive ? 'is-active' : ''}`}
        aria-hidden="true"
        >
            <line
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                className="USFMethodConnector"
            />

            <g transform={`translate(${outer.x} ${outer.y})`}>
                <rect
                x={-MODULE_BOX.width / 2}
                y={-MODULE_BOX.height / 2}
                width={MODULE_BOX.width}
                height={MODULE_BOX.height}
                rx="18"
                className="USFMethodBox"
                />


                <g transform="translate(0 -4)">
                    <MethodGlyph id={method.id} />
                </g>

                <text x="0" y="50" textAnchor="middle" className="USFMethodLabel">
                    {method.label}
                </text>

                <text x="0" y="64" textAnchor="middle" className="USFMethodSubtitle">
                    {method.subtitle}
                </text>
            </g>
        </g>
    );
}

export default function UnifiedSpectroscopicFrameworkVisualReturn() {
    const orbitStrokeGradId = useId().replace(/:/g, '-');
    const coreGlowGradId = useId().replace(/:/g, '-');
    const blurSoftId = useId().replace(/:/g, '-');
    const ids = useUSFCoreIds();
    const [orbitAngle, setOrbitAngle] = useState(BASE_SELECTOR_ANGLE);
    const selectorArcStart = orbitAngle - SELECTOR_SPAN / 2;
    const selectorArcEnd = orbitAngle + SELECTOR_SPAN / 2;

    useEffect(() => {
        let frameId;

        const animate = (now) => {
            const progress = (now % ORBIT_CYCLE_MS) / ORBIT_CYCLE_MS;
            const angle = BASE_SELECTOR_ANGLE + progress * 360;
            setOrbitAngle(angle);
            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(frameId);
    }, []);

    const selectorArc = useMemo(
        () =>
            describeEllipseArc(
                CENTER.x,
                CENTER.y,
                ORBIT.rx,
                ORBIT.ry,
                selectorArcStart,
                selectorArcEnd
            ),
        [selectorArcStart, selectorArcEnd]
    );

    const selectorDot = useMemo(
        () =>
            ellipsePoint(
                CENTER.x,
                CENTER.y,
                ORBIT.rx,
                ORBIT.ry,
                selectorArcEnd
            ),
        [selectorArcEnd]
    );

    const activeIndex = getNearestMethodIndex(orbitAngle);

    return (
        <div className="USFVisualBase">
            <div className="USFVisualFrame">
                <svg
                    className="USFVisualSVG"
                    viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                    role="img"
                    aria-labelledby="usfTitle usfDesc"
                >
                    <USFCoreDefs ids={ids} />

                    <defs>
                        {/* primary neon line gradient used across orbit / strokes */}
                        <linearGradient id={orbitStrokeGradId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="var(--c-glow-2)" />
                            <stop offset="55%" stopColor="var(--c-glow-3)" />
                            <stop offset="100%" stopColor="var(--c-glow-1)" />
                        </linearGradient>

                        {/* soft central glow for the stable system */}
                        <radialGradient
                            id={coreGlowGradId}
                            cx={CENTER.x}
                            cy={CENTER.y}
                            r={ORBIT.rx + 48}
                            gradientUnits="userSpaceOnUse"
                        >
                            <stop
                                offset="0%"
                                stopColor="color-mix(in oklab, var(--c-glow-2) 28%, white)"
                            />
                            <stop
                                offset="55%"
                                stopColor="color-mix(in oklab, var(--c-glow-1) 12%, transparent)"
                            />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>

                        {/* single subtle blur so the glow stays controlled */}
                        <filter
                            id={blurSoftId}
                            x={CENTER.x - ORBIT.rx - 48}
                            y={CENTER.y - ORBIT.ry - 48}
                            width={ORBIT.rx * 2 + 96}
                            height={ORBIT.ry * 2 + 96}
                            filterUnits="userSpaceOnUse"
                        >
                            <feGaussianBlur stdDeviation="8" />
                        </filter>
                    </defs>

                    {/* BACKDROP + FRAME */}
                    <rect x="0" y="0" width="720" height="620" rx="28" className="USFBackdrop" />

                    <ellipse
                        cx={CENTER.x}
                        cy={CENTER.y}
                        rx={CORE_SHELL.rx + 18}
                        ry={CORE_SHELL.ry + 16}
                        className="USFCoreGlow"
                        fill={`url(#${coreGlowGradId})`}
                        filter={`url(#${blurSoftId})`}
                    />

                    

                    {/* OUTER ORBIT + METHOD SELECTOR */}
                    <ellipse
                        cx={CENTER.x}
                        cy={CENTER.y}
                        rx={ORBIT.rx}
                        ry={ORBIT.ry}
                        className="USFOrbitRail"
                    />

                    <g className="USFSelectorGroup" aria-hidden="true">
                        <path
                            d={selectorArc}
                            className="USFOrbitSelectorArc"
                            stroke={`url(#${orbitStrokeGradId})`}
                        />

                        <circle
                            cx={selectorDot.x}
                            cy={selectorDot.y}
                            r="2"
                            className="USFOrbitSelectorDot"
                            fill="var(--c-glow-4)"
                        />
                    </g>

                    <StableQuantumCore ids={ids} />

                    {/* OUTER METHOD MODELS */}
                    {METHODS.map((method, index) => (
                        <MethodModule
                            key={method.id}
                            method={method}
                            isActive={index === activeIndex}
                        />
                    ))}

                    {/* FOOTER NOTE */}
                    <text x={CENTER.x} y="584" textAnchor="middle" className="USFFooter">
                        same core • different interface • measurable output
                    </text>
                </svg>
            </div>
        </div>
    );
}
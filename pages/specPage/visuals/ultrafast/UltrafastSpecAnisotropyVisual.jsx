import React, { useId } from "react";
import "./UltrafastSpecAnisotropyVisual.css";

const VB = {
    width: 640,
    height: 440,
};

const BG_PAD = 10;

const BG_FRAME = {
    x: BG_PAD,
    y: BG_PAD,
    width: VB.width - BG_PAD * 2,
    height: VB.height - BG_PAD * 2,
    rx: 26,
};

const BEAM = {
    pumpY: 174,
    probeY: 254,
};

const SAMPLE = {
    cx: 400,
    cy: 218,
    width: 112,
    height: 158,
    rx: 12,
};

const SOURCE_BOX = {
    x: 32,
    width: 86,
    height: 60,
    rx: 10,
};

const DEVICE = {
    width: 90,
    height: 60,
    rx: 10,
    x: VB.width - BG_PAD - 18 - 85,
};

const BEAM_GEOM = {
    meetX: SAMPLE.cx,
    meetY: SAMPLE.cy,
    includedAngle: 54.7,
    startX: SOURCE_BOX.x,
    endX: DEVICE.x,
};

const DEG_TO_RAD = Math.PI / 180;
const HALF_ANGLE = (BEAM_GEOM.includedAngle / 2) * DEG_TO_RAD;



function makeSafeId(id) {
    return String(id).replace(/:/g, "-");
}

function UltrafastSpecAnisotropyDefs({ ids }) {
    return (
        <defs>
            <linearGradient 
                id={ids.bg} 
                x1="0"
                y1="0"
                x2={VB.width}
                y2={VB.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--bg) 92%, var(--accent-2) 8%)" />
                <stop offset="55%" stopColor="color-mix(in oklab, var(--bg) 88%, var(--accent) 12%)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--bg) 94%, var(--accent-3) 6%)" />
            </linearGradient>
            <linearGradient 
                id={ids.panel} 
                x1={BG_FRAME.x} 
                y1={BG_FRAME.y} 
                x2={BG_FRAME.x + BG_FRAME.width} 
                y2={BG_FRAME.y + BG_FRAME.height} 
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--c-shadow) 86%, var(--accent-2) 14%)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--c-shadow) 88%, var(--accent) 12%)" />
            </linearGradient>
            <radialGradient id={ids.sampleGlow} cx={SAMPLE.cx} cy={SAMPLE.cy} r="120" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent-2) 34%, transparent)" />
                <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <linearGradient id={ids.pump} x1="70" y1={BEAM.pumpY} x2="350" y2={BEAM.pumpY} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="45%" stopColor="var(--accent-3)" />
                <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>

            <linearGradient id={ids.probe} x1="70" y1={BEAM.probeY} x2="540" y2={BEAM.probeY} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="42%" stopColor="var(--accent-4)" />
                <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>
        </defs>
    );
}

function BackgroundPanel({ ids }) {
    return (
        <g className="UltrafastSpecAnisotropy_BackgroundPanel">
            <rect
                x="0"
                y="0"
                width={VB.width}
                height={VB.height}
                rx="30"
                fill={`url(#${ids.bg})`}
            />
            <rect
                x={BG_FRAME.x}
                y={BG_FRAME.y}
                width={BG_FRAME.width}
                height={BG_FRAME.height}
                rx={BG_FRAME.rx}
                fill="none"
                className="UltrafastSpecAnisotropy_PanelBorder"
            />
        </g>
    );
}

function getBeamGeometry() {
    const { startX, endX, meetX, meetY } = BEAM_GEOM;
    const slope = Math.tan(HALF_ANGLE);

    const leftDy = (meetX - startX) * slope;
    const rightDy = (endX - meetX) * slope;
    return {
        topStart: {
            x: startX,
            y: meetY - leftDy,
        },
        bottomStart: {
            x: startX,
            y: meetY + leftDy,
        },
        meet: {
            x: meetX,
            y: meetY,
        },
        topEnd: {
            x: endX,
            y: meetY - rightDy,
        },
        bottomEnd: {
            x: endX,
            y: meetY + rightDy,
        },
    };
}

function SampleCell({ ids }) {
    const molecules = [
        { x: -10, y: -26 },
        { x: 18, y: -34 },
        { x: -28, y: 4 },
        { x: 26, y: 28 },
        { x: -10, y: 35},
        { x: 10, y: 48},
        { x: 8, y: 18},
        { x: 2, y: -8},
        { x: 22, y: -2},
        { x: -12, y: 12},
    ];

    return (
        <g className="UltrafastSpecAnisotropy_SampleCell">
            <circle
                cx={SAMPLE.cx}
                cy={SAMPLE.cy}
                r="126"
                fill={`url(#${ids.sampleGlow})`}
            />

            <rect
                x={SAMPLE.cx - SAMPLE.width / 2}
                y={SAMPLE.cy - SAMPLE.height / 2}
                width={SAMPLE.width}
                height={SAMPLE.height}
                rx={SAMPLE.rx}
                className="UltrafastSpecAnisotropy_CellGlass"
            />

            <rect
                x={SAMPLE.cx - SAMPLE.width / 2 + 10}
                y={SAMPLE.cy - SAMPLE.height / 2 + 10}
                width={SAMPLE.width - 20}
                height={SAMPLE.height - 20}
                rx="8"
                className="UltrafastSpecAnisotropy_CellLiquid"
            />

            {molecules.map((mol, index) => (
                <g
                    key={index}
                    transform={`translate(${SAMPLE.cx + mol.x} ${SAMPLE.cy + mol.y})`}
                    className="UltrafastSpecAnisotropy_Molecule"
                >
                    <circle cx="0" cy="0" r="2" />
                </g>
            ))}

            <text x={SAMPLE.cx} y={SAMPLE.cy - 85} className="UltrafastSpecAnisotropy_CenterLabel">
                Sample Cell
            </text>
        </g>
    );
}

function Detector({ x, cy }) {
    return (
        <g className="UltrafastSpecAnisotropy_Detector">
            <rect
                x={x}
                y={cy - DEVICE.height / 2}
                width={DEVICE.width}
                height={DEVICE.height}
                rx={DEVICE.rx}
                className="UltrafastSpecAnisotropy_DetectorBody"
            />
            <text
                x={x + DEVICE.width / 2}
                y={cy + 5}
                className="UltrafastSpecAnisotropy_CenterLabel"
            >
                Detector
            </text>
        </g>
    );
}

function BeamDump({ x, cy }){
    return (
        <g className="UltrafastSpecAnisotropy_BeamDump">
            <rect
                x={x}
                y={cy - DEVICE.height / 2}
                width={DEVICE.width}
                height={DEVICE.height}
                rx={DEVICE.rx}
                className="UltrafastSpecAnisotropy_BeamDumpBody"
            />
            <text
                x={x + DEVICE.width / 2}
                y={cy + 5}
                className="UltrafastSpecAnisotropy_CenterLabel"
            >
                <tspan x={x + DEVICE.width / 2} dy="-0.5em">
                    Beam
                </tspan>
                <tspan x={x + DEVICE.width / 2} dy="1.15em">
                    Dump
                </tspan>
            </text>
        </g>
    )
}

function BeamSourceBox({ labelTop, labelBottom, cy, variant = "pump" }) {
    return (
        <g className={`UltrafastSpecAnisotropy_SourceBox UltrafastSpecAnisotropy_SourceBox--${variant}`}>
            <rect
                x={SOURCE_BOX.x}
                y={cy - SOURCE_BOX.height / 2}
                width={SOURCE_BOX.width}
                height={SOURCE_BOX.height}
                rx={SOURCE_BOX.rx}
                className="UltrafastSpecAnisotropy_SourceBoxBody"
            />

            <text
                x={SOURCE_BOX.x + SOURCE_BOX.width / 2}
                y={cy - 4}
                className="UltrafastSpecAnisotropy_CenterLabel"
            >
                <tspan x={SOURCE_BOX.x + SOURCE_BOX.width / 2} dy="0">
                    {labelTop}
                </tspan>
                <tspan x={SOURCE_BOX.x + SOURCE_BOX.width / 2} dy="1.15em">
                    {labelBottom}
                </tspan>
            </text>
        </g>
    );
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function pointBetween(a, b, t) {
    return {
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
    };
}

function ThinArrow({ x, y, angle = 0, size = 18, variant = "straight" }) {
    return (
        <g
            className={`UltrafastSpecAnisotropy_ThinArrow--${variant}`}
            transform={`translate(${x} ${y}) rotate(${angle})`}
        >
            <line
                x1="0"
                y1={size}
                x2="0"
                y2={-size}
                className="UltrafastSpecAnisotropy_ThinArrowLine"
            />
            <path
                d={`M-4 ${-size + 6} L0 ${-size} L4 ${-size + 6}`}
                className="UltrafastSpecAnisotropy_ThinArrowHead"
            />
        </g>
    );
}

function ArrowPair({ x, y }) {
    return (
        <g className="UltrafastSpecAnisotropy_ArrowPair">
            <ThinArrow x={x} y={y} angle={0}  variant="straight" />
            <ThinArrow x={x} y={y} angle={-135} variant="rotated" />
        </g>
    );
}

function BeamArrowMarkers() {
    const {topStart, bottomStart, meet, topEnd, bottomEnd } = getBeamGeometry();
    const pumpNearSource = pointBetween(topStart, meet, 0.45);
    const probeNearSource = pointBetween(bottomStart, meet, 0.45);

    const pumpNearSample = pointBetween(topStart, meet, 0.74);
    const probeNearSample = pointBetween(bottomStart, meet, 0.74);
    
    const pumpAfterSample = pointBetween(meet, bottomEnd, 0.75);
    const probeAfterSample = pointBetween(meet, topEnd, 0.75);

    return (
        <g className="UltrafastSpecAnisotropy_BeamArrowMarkers">
            <ArrowPair x={pumpNearSource.x} y={pumpNearSource.y} />
            <ArrowPair x={probeNearSource.x} y={probeNearSource.y} />

            <ThinArrow x={pumpNearSample.x} y={pumpNearSample.y} angle={0} variant="straight" />
            <ThinArrow x={probeNearSample.x} y={probeNearSample.y} angle={0} variant="straight" />

            <ArrowPair x={pumpAfterSample.x} y={pumpAfterSample.y} />
            <ArrowPair x={probeAfterSample.x} y={probeAfterSample.y} />
        </g>
    );
}


function BeamPath({ ids }) {
    const { topStart, bottomStart, meet, topEnd, bottomEnd } = getBeamGeometry();

    return (
        <g className="UltrafastSpecAnisotropy_BeamPath">
            <path
                d={`M${topStart.x} ${topStart.y} L${meet.x} ${meet.y} L${bottomEnd.x} ${bottomEnd.y}`}
                stroke={`url(#${ids.pump})`}
                pathLength="1"
                className="UltrafastSpecAnisotropy_PumpBeam"
            />

            <path
                d={`M${bottomStart.x} ${bottomStart.y} L${meet.x} ${meet.y} L${topEnd.x} ${topEnd.y}`}
                stroke={`url(#${ids.probe})`}
                pathLength="1"
                className="UltrafastSpecAnisotropy_ProbeBeam"
            />
            <BeamSourceBox
                labelTop="Pump"
                labelBottom="Pulse"
                cy={topStart.y + 40}
                variant="pump"
            />

            <BeamSourceBox
                labelTop="Probe"
                labelBottom="Pulse"
                cy={bottomStart.y - 40}
                variant="probe"
            />

            <BeamArrowMarkers />
        </g>
    );
}


export default function UltrafastSpecAnisotropyVisual() {
    const reactId = useId();
    const safeId = makeSafeId(reactId);

    const ids = {
        bg: `${safeId}-ufa-bg`,
        panel: `${safeId}-ufa-panel`,
        pump: `${safeId}-ufa-pump`,
        probe: `${safeId}-ufa-probe`,
        sampleGlow: `${safeId}-ufa-sample-glow`,
    };

    const { topEnd, bottomEnd } = getBeamGeometry();

    return (
        <figure className="UltrafastSpecAnisotropy">
            <svg
                className="UltrafastSpecAnisotropy_SVG"
                viewBox={`0 0 ${VB.width} ${VB.height}`}
                role="img"
            >
                <UltrafastSpecAnisotropyDefs ids={ids} />
                <BackgroundPanel ids={ids} />
                <BeamPath ids={ids} />
                <SampleCell ids={ids} />
                <Detector x={DEVICE.x} cy={topEnd.y} />
                <BeamDump x={DEVICE.x} cy={bottomEnd.y} />
            </svg>
            <figcaption className="UltrafastSpecAnisotropy_Caption">
                Polarized pump and probe beams cross at the sample cell to test how excited transition dipoles are oriented. The straight arrows mark the parallel polarization channel, while the diagonal arrows mark the perpendicular comparison. Before and after the sample, these polarization checks separate the useful probe signal sent to the detector from the pump beam sent to the beam dump, allowing ΔA∥ and ΔA⊥ to report anisotropy decay during exciton migration.
            </figcaption>
        </figure>
    );
}
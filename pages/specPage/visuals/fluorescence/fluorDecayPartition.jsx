import './fluorDecayPartition.css'
import React, { useId } from "react";

const SVG = {
    viewX: 0,
    viewY: 0,
    width: 720,
    height: 680,
};

const PANEL = {
    x: 16,
    y: 10,
    width: 688,
    height: 670,
    radius: 28,
};


const ROWS = [
    {
        process: <>M + hν → M*</>,
        meaning: "excitation",
        rate: (
            <>
                k<tspan baselineShift="sub" fontSize="95%">abs</tspan>
                <tspan baselineShift="baseline" dx="8">[M][hν]</tspan>
            </>
        ),
        tone: "cyan",
    },
    {
        process: <>M* → M + hν′</>,
        meaning: "fluorescence",
        rate: (
            <>
                k<tspan baselineShift="sub" fontSize="95%">rad</tspan>
                <tspan baselineShift="baseline" dx="8">[M*]</tspan>
            </>
        ),
        tone: "pink",
    },
    {
        process: "M* → M",
        meaning: "IC / ISC / other loss",
        rate: (
            <>
                Σk<tspan baselineShift="sub" fontSize="95%">i</tspan>
                <tspan baselineShift="baseline" dx="8">[M*]</tspan>
            </>
        ),
        tone: "dim",
    },
];

const BRANCHES = [
    {
        id: "rad",
        d: "M360 132 C430 114 500 102 574 88",
        endX: 574,
        endY: 88,
        labelX: 570,
        labelY: 115,
        label: "fluorescence",
        className: "fluorDecayPartition_Branch fluorDecayPartition_BranchRad",
    },
    {
        id: "ic",
        d: "M360 132 C360 170 360 230 360 270",
        endX: 360,
        endY: 250,
        labelX: 355,
        labelY: 295,
        label: "IC",
        className: "fluorDecayPartition_Branch fluorDecayPartition_BranchLoss",
    },
    {
        id: "iso",
        d: "M360 132 C420 150 482 190 548 214",
        endX: 548,
        endY: 214,
        labelX: 550,
        labelY: 240,
        label: "Isomerization",
        className: "fluorDecayPartition_Branch fluorDecayPartition_BranchLoss",
    },
    {
        id: "bim",
        d: "M360 132 C300 150 238 190 172 214",
        endX: 172,
        endY: 214,
        labelX: 70,
        labelY: 240,
        label: ["Bimolecular", "Processes"],
        className: "fluorDecayPartition_Branch fluorDecayPartition_BranchLoss",
    },
    {
        id: "isc",
        d: "M360 132 C290 114 220 102 146 88",
        endX: 146,
        endY: 88,
        labelX: 126,
        labelY: 115,
        label: "ISC",
        className: "fluorDecayPartition_Branch fluorDecayPartition_BranchTriplet",
    },
];

function VisualDefs({ fieldGradId, neonGradId, glowId }) {
    return (
        <defs>
            <radialGradient id={fieldGradId} cx="50%" cy="28%" r="72%">
                <stop offset="0%" stopColor="var(--surface)" stopOpacity="0.9" />
                <stop offset="55%" stopColor="var(--bg-2)" stopOpacity="0.72" />
                <stop offset="100%" stopColor="var(--bg)" stopOpacity="1" />
            </radialGradient>

            <linearGradient id={neonGradId} x1="90" y1="0" x2="640" y2="0">
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="48%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-3)" />
            </linearGradient>

            <filter id={glowId} x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    );
}

function BackgroundPanel({
    fieldGradId,
    glowId,
    x = PANEL.x,
    y = PANEL.y,
    width = PANEL.width,
    height = PANEL.height,
    radius = PANEL.radius,
}) {
    return (
        <g className="fluorDecayPartition_Background">
            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={radius}
                className="fluorDecayPartition_BackgroundGlow"
                filter={`url(#${glowId})`}
            />

            <rect
                x={x}
                y={y}
                width={width}
                height={height}
                rx={radius}
                fill={`url(#${fieldGradId})`}
                className="fluorDecayPartition_BackgroundPanel"
            />

            <ellipse
                cx={x + width / 2}
                cy={y + height * 0.22}
                rx={width * 0.34}
                ry={height * 0.18}
                className="fluorDecayPartition_BackgroundAura"
            />
        </g>
    );
}


function SvgText({ x, y, className, children, anchor = "start" }) {
    return (
        <text x={x} y={y} textAnchor={anchor} className={className}>
            {children}
        </text>
    );
}
function BranchItem({ branch }) {
    const labelLines = Array.isArray(branch.label) ? branch.label : [branch.label];

    return (
        <g>
            <path d={branch.d} className={branch.className} />

            <circle
                cx={branch.endX}
                cy={branch.endY}
                r="4"
                className="fluorDecayPartition_BranchDot"
            />

            <SvgText
                x={branch.labelX}
                y={branch.labelY}
                className="fluorDecayPartition_BranchLabel"
                dominantBaseline="middle"
            >
                {labelLines.map((line, index) => (
                <tspan
                    key={line}
                    x={branch.labelX}
                    dy={index === 0 ? 0 : 20}
                >
                    {line}
                </tspan>
                ))}
            </SvgText>
        </g>
    );
}

function BranchDiagram({ glowId }) {
    return (
        <g className="fluorDecayPartition_BranchDiagram">
            <text x="360" y="48" textAnchor="middle" className="fluorDecayPartition_Kicker">
                excited-state population partitions into competing exits
            </text>

            <circle cx="360" cy="132" r="34" className="fluorDecayPartition_Node" />
            <circle cx="360" cy="132" r="46" className="fluorDecayPartition_NodeHalo" filter={`url(#${glowId})`} />

            <SvgText x="360" y="139" textanchor="middle" className="fluorDecayPartition_NodeLabel">
                M*
            </SvgText>

            {BRANCHES.map((branch) => (
                <BranchItem key={branch.id} branch={branch} />
            ))}
        </g>
    );
}



function RateRow({ row, index, layout }) {
    const y = layout.firstRowY + index * layout.rowGap - 10;

    return (
        <g className={`fluorDecayPartition_Row fluorDecayPartition_Row--${row.tone}`}>
            <SvgText 
                x={layout.processTextX} 
                y={y} 
                className="fluorDecayPartition_CellText"
                dominantBaseline="middle"
            >
                {row.process}
            </SvgText>

            <SvgText 
                x={layout.meaningTextX} 
                y={y} 
                className="fluorDecayPartition_CellText"
                dominantBaseline="middle"
            >
                {row.meaning}
            </SvgText>

            <SvgText 
                x={layout.rateTextX} 
                y={y} 
                className="fluorDecayPartition_CellText"
                dominantBaseline="middle"
            >
                {row.rate}
            </SvgText>
        </g>
    );
}


function SchemeTable({
    x = PANEL.x,
    width = PANEL.width,
    tableY = 300,
    tableWidth = 640,
    tableHeight = 230,
    radius = 22,
    
}) {
    const blockX = x + (width - tableWidth) / 2;
    const layout = {
        headerY: tableY + 45,
        headerLineY: tableY + 60,
        firstRowY: tableY + 102,
        rowGap: 58,

        col1LineX: blockX + 218,
        col2LineX: blockX + 452,

        processHeaderX: blockX + 60,
        meaningHeaderX: blockX + 275,
        rateHeaderX: blockX + 495,

        processTextX: blockX + 46,
        meaningTextX: blockX + 258,
        rateTextX: blockX + 488,
    };

    return (
        <g className="fluorDecayPartition_Table">
            <rect 
                x={blockX}
                y={tableY}
                width={tableWidth}
                height={tableHeight}
                rx={radius}
            />

            <SvgText 
                x={layout.processHeaderX}
                y={layout.headerY}
                className="fluorDecayPartition_HeaderText"
                textAnchor="middle"
            >
                Process
            </SvgText>

            <SvgText 
                x={layout.meaningHeaderX}
                y={layout.headerY}
                className="fluorDecayPartition_HeaderText"
                textAnchor="middle"
            >
                Meaning
            </SvgText>

            <SvgText 
                x={layout.rateHeaderX}
                y={layout.headerY}
                className="fluorDecayPartition_HeaderText"
                textAnchor="middle"
            >
                Rate
            </SvgText>

            <path 
                d={`M${blockX + 25} ${layout.headerLineY} H${blockX + tableWidth - 25}`}
                className="fluorDecayPartition_RowLine" 
            />
            <path 
                d={`
                    M${layout.col1LineX} ${tableY + 10} V${tableY + tableHeight - 10}
                    M${layout.col2LineX} ${tableY + 10} V${tableY + tableHeight - 10}
                `} 
                className="fluorDecayPartition_ColumnLine" 
            />

            {ROWS.map((row, index) => (
                <RateRow key={row.meaning} row={row} index={index} layout={layout} />
            ))}
        </g>
    );
}

function EquationBlock({
    x = PANEL.x,
    width = PANEL.width,
    y = 534,
    blockWidth = 650,
    blockHeight = 112,
    radius = 22,
}) {
    const blockX = x + (width - blockWidth) / 2;

    return (
        <g className="fluorDecayPartition_EquationBlock">
            <rect 
                x={blockX}
                y={y}
                width={blockWidth}
                height={blockHeight}
                rx={radius}
            />

            <text x="360" y="582" textAnchor="middle" className="fluorDecayPartition_Equation">
                <tspan>Φ</tspan>
                <tspan baselineShift="sub" fontSize="18">f</tspan>
                <tspan> = </tspan>
                <tspan>k</tspan>
                <tspan baselineShift="sub" fontSize="18">rad</tspan>
                <tspan> / (k</tspan>
                <tspan baselineShift="sub" fontSize="18">rad</tspan>
                <tspan> + Σk</tspan>
                <tspan baselineShift="sub" fontSize="18">nr</tspan>
                <tspan>) = τ</tspan>
                <tspan baselineShift="sub" fontSize="18">f</tspan>
                <tspan> / τ</tspan>
                <tspan baselineShift="sub" fontSize="18">rad</tspan>
            </text>

            <text x="360" y="625" textAnchor="middle" className="fluorDecayPartition_EquationNote">
                radiative return competes with nonradiative deactivation
            </text>
        </g>
    );
}

export default function FluorDecayPartitionVisual() {
    const uid = useId();
    const fieldGradId = `${uid}-fieldGrad`;
    const neonGradId = `${uid}-neonGrad`;
    const glowId = `${uid}-glow`;

    return (
        <figure className="fluorDecayPartition">
            <svg
                className="fluorDecayPartition_SVG"
                viewBox={`0 ${SVG.viewY} ${SVG.width} ${SVG.height}`}
                role="img"
            >
                <VisualDefs
                    fieldGradId={fieldGradId}
                    neonGradId={neonGradId}
                    glowId={glowId}
                />
                <BackgroundPanel fieldGradId={fieldGradId} glowId={glowId} />
                

                <BranchDiagram glowId={glowId} />
                <SchemeTable />
                <EquationBlock />
            </svg>

            <figcaption className="fluorDecayPartition_Caption">
                Fluorescence quantum yield expresses how the excited-state population is partitioned
                between radiative emission and competing deactivation pathways.
            </figcaption>
        </figure>
    );
}
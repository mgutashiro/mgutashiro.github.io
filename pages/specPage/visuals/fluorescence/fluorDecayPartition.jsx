import React, { useId } from "react";

const ROWS = [
    {
        process: "M + hν → M*",
        meaning: "excitation",
        rate: "kabs[M][hν]",
        tone: "cyan",
    },
    {
        process: "M* → M + hν′",
        meaning: "fluorescence",
        rate: "krad[M*]",
        tone: "pink",
    },
    {
        process: "M* → M",
        meaning: "IC / ISC / other loss",
        rate: "Σknr[M*]",
        tone: "dim",
    },
];

const BRANCHES = [
    {
        id: "rad",
        d: "M360 132 C430 110 500 102 574 86",
        label: "fluorescence",
        className: "fluorDecayPartition_Branch fluorDecayPartition_BranchRad",
        x: 585,
        y: 86,
    },
    {
        id: "ic",
        d: "M360 132 C428 142 492 158 560 174",
        label: "IC",
        className: "fluorDecayPartition_Branch fluorDecayPartition_BranchLoss",
        x: 574,
        y: 178,
    },
    {
        id: "isc",
        d: "M360 132 C414 182 474 218 548 240",
        label: "ISC",
        className: "fluorDecayPartition_Branch fluorDecayPartition_BranchTriplet",
        x: 562,
        y: 244,
    },
];

function SvgText({ x, y, className, children, anchor = "start" }) {
    return (
        <text x={x} y={y} textAnchor={anchor} className={className}>
            {children}
        </text>
    );
}

function RateRow({ row, index }) {
    const y = 342 + index * 58;

    return (
        <g className={`fluorDecayPartition_Row fluorDecayPartition_Row_${row.tone}`}>
            <rect x="78" y={y - 34} width="564" height="48" rx="12" />

            <SvgText x="108" y={y} className="fluorDecayPartition_CellText">
                {row.process}
            </SvgText>

            <SvgText x="326" y={y} className="fluorDecayPartition_CellText">
                {row.meaning}
            </SvgText>

            <SvgText x="526" y={y} className="fluorDecayPartition_RateText">
                {row.rate}
            </SvgText>
        </g>
    );
}

function BranchDiagram({ glowId }) {
    return (
        <g className="fluorDecayPartition_BranchDiagram">
            <text x="360" y="68" textAnchor="middle" className="fluorDecayPartition_Kicker">
                excited-state population partitions into competing exits
            </text>

            <circle cx="360" cy="132" r="34" className="fluorDecayPartition_Node" />
            <circle cx="360" cy="132" r="46" className="fluorDecayPartition_NodeHalo" filter={`url(#${glowId})`} />

            <SvgText x="360" y="139" anchor="middle" className="fluorDecayPartition_NodeLabel">
                M*
            </SvgText>

            {BRANCHES.map((branch) => (
                <g key={branch.id}>
                    <path d={branch.d} className={branch.className} />
                    <circle
                        cx={branch.x - 8}
                        cy={branch.y - 4}
                        r="4"
                        className={`${branch.className}Dot`}
                    />
                    <SvgText
                        x={branch.x}
                        y={branch.y}
                        className="fluorDecayPartition_BranchLabel"
                    >
                        {branch.label}
                    </SvgText>
                </g>
            ))}
        </g>
    );
}

function SchemeTable() {
    return (
        <g className="fluorDecayPartition_Table">
            <rect x="62" y="264" width="596" height="220" rx="20" />

            <SvgText x="108" y="302" className="fluorDecayPartition_HeaderText">
                Process
            </SvgText>

            <SvgText x="326" y="302" className="fluorDecayPartition_HeaderText">
                Meaning
            </SvgText>

            <SvgText x="526" y="302" className="fluorDecayPartition_HeaderText">
                Rate
            </SvgText>

            <path d="M286 282 V464 M492 282 V464" className="fluorDecayPartition_ColumnLine" />

            {ROWS.map((row, index) => (
                <RateRow key={row.meaning} row={row} index={index} />
            ))}
        </g>
    );
}

function EquationBlock() {
    return (
        <g className="fluorDecayPartition_EquationBlock">
            <rect x="88" y="514" width="544" height="112" rx="22" />

            <text x="360" y="562" textAnchor="middle" className="fluorDecayPartition_Equation">
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

            <text x="360" y="598" textAnchor="middle" className="fluorDecayPartition_EquationNote">
                radiative return competes with nonradiative deactivation
            </text>
        </g>
    );
}

export default function FluorDecayPartitionVisual() {
    const uid = useId().replace(/:/g, "");
    const fieldGradId = `fluorDecayPartition_field_${uid}`;
    const neonGradId = `fluorDecayPartition_neon_${uid}`;
    const glowId = `fluorDecayPartition_glow_${uid}`;

    return (
        <figure className="fluorDecayPartition">
            <div className="fluorDecayPartition_Frame">
                <svg
                    className="fluorDecayPartition_SVG"
                    viewBox="0 0 720 680"
                    role="img"
                >

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

                    <rect width="720" height="680" rx="28" fill={`url(#${fieldGradId})`} />
                    <path
                        d="M62 78 H658 M62 634 H658"
                        className="fluorDecayPartition_FrameLine"
                    />
                    <path
                        d="M96 92 C212 40 508 42 624 96"
                        stroke={`url(#${neonGradId})`}
                        className="fluorDecayPartition_TopGlow"
                        filter={`url(#${glowId})`}
                    />

                    <SvgText x="72" y="58" className="fluorDecayPartition_Title">
                        Quantum yield as pathway partitioning
                    </SvgText>

                    <BranchDiagram glowId={glowId} />
                    <SchemeTable />
                    <EquationBlock />
                </svg>
            </div>

            <figcaption className="fluorDecayPartition_Caption">
                Fluorescence quantum yield expresses how the excited-state population is partitioned
                between radiative emission and competing deactivation pathways.
            </figcaption>
        </figure>
    );
}
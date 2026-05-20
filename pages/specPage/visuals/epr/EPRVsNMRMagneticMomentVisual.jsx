import './EPRVsNMRMMVisual.css';
import React, { useId } from "react";

const VB = {
    width: 500,
    height: 350,
    midX: 250,
    midY: 210,
};

const PANEL = {
    x: 10,
    y: 5,
    width: 480,
    height: 350,
    rx: 32,
};

const TABLE = {
    x: PANEL.x + 18,
    y: PANEL.y + 52,
    width: PANEL.width - 36,
    height: PANEL.height - 52,
    colWidths: [74, 144, 144, 80],
    rowHeights: [54, 78, 78, 108],
    rx: 18,
};

function cleanId(id) {
    return id.replace(/:/g, "-");
};

function BackgroundDefs({ panelWashId, panelEdgeId }) {
    return (
        <defs>
            <linearGradient 
                id={panelWashId}
                x1={PANEL.x}
                y1={PANEL.y}
                x2={PANEL.x}
                y2={PANEL.y + PANEL.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--surface) 82%, var(--accent) 18%)" />
                <stop offset="55%" stopColor="color-mix(in oklab, var(--bg) 86%, var(--primary-deep) 14%)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--surface-2) 78%, var(--accent-2) 22%)" />
            </linearGradient>

            <linearGradient
                id={panelEdgeId}
                x1={PANEL.x}
                y1={PANEL.y}
                x2={PANEL.x + PANEL.width}
                y2={PANEL.y + PANEL.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="48%" stopColor="var(--accent)" />
                <stop offset="100%" stopColor="var(--accent-3)" />
            </linearGradient>
        </defs>
    );
}

function BackgroundPanel ({ panelWashId, panelEdgeId }) {
    return (
        <g className="EPRvsNMRMM_background">
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill={`url(#${panelWashId})`}
                className="EPRvsNMRMM_panelFill"
            />
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill="none"
                stroke={`url(#${panelEdgeId})`}
                className="EPRvsNMRMM_panelStroke"
            />
        </g>
    )
}

function getTableX(colIndex) {
    return TABLE.x + TABLE.colWidths.slice(0, colIndex).reduce((sum, w) => sum + w, 0);
}

function getTableY(rowIndex) {
    return TABLE.y + TABLE.rowHeights.slice(0, rowIndex).reduce((sum, h) => sum + h, 0);
}

function TableCell({ row, col, children, title = false, className="" }) {
    const x = getTableX(col);
    const y = getTableY(row);
    const width = TABLE.colWidths[col];
    const height = TABLE.rowHeights[row];

    return (
        <foreignObject
            x={x}
            y={y}
            width={width}
            height={height}
            className={`EPRvsNMRMM__tableCellF0 ${className}`}
        >
            <div
                className={
                    title
                        ? "EPRvsNMRMM__tableCell EPRvsNMRMM__tableCell--title"
                        : " EPRvsNMRMM__tableCell"
                }
            >
                {children}
            </div>
        </foreignObject>
    );
}

function Vec({ children }) {
    return <span className="EPRvsNMRMM__vec">{children}</span>;
}

function InlineEquation({ children }) {
    return <span className="EPRvsNMRMM__inlineEquation">{children}</span>
}

function MMComparisonTable() {
    const tableRight = TABLE.x + TABLE.width;
    const tableBottom = TABLE.y + TABLE.height;

    const headerBottomY = getTableY(1);
    const firstColumnRightX = getTableX(1);

    const verticalLines = TABLE.colWidths
        .slice(0, -1)
        .map((_, index) => getTableX(index + 1));

    const horizontalLines = TABLE.rowHeights
        .slice(0, -1)
        .map((_, index) => getTableY(index + 1));

    return (
        <g className="EPRvsNMRMM__table" transform="translate(0, -40)">
            {verticalLines.map((x) => (
                <line
                    key={`v-${x}`}
                    x1={x}
                    y1={TABLE.y}
                    x2={x}
                    y2={tableBottom}
                    className="EPRvsNMRMM__tableLine"
                />
            ))}
            {horizontalLines.map((y) => (
                <line
                    key={`h-${y}`}
                    x1={TABLE.x}
                    y1={y}
                    x2={tableRight}
                    y2={y}
                    className="EPRvsNMRMM__tableLine"
                />
            ))}

            <line
                x1={TABLE.x}
                y1={headerBottomY}
                x2={tableRight}
                y2={headerBottomY}
                className="EPRvsNMRMM__tableLine EPRvsNMRMM__tableLine--major"
            />

            <line
                x1={firstColumnRightX}
                y1={TABLE.y}
                x2={firstColumnRightX}
                y2={tableBottom}
                className="EPRvsNMRMM__tableLine EPRvsNMRMM__tableLine--major"
            />

            {/* Header Row */}
            <TableCell row={0} col={1} title>Electron</TableCell>
            <TableCell row={0} col={2} title>Proton</TableCell>
            <TableCell row={0} col={3} title>units</TableCell>

            {/* First Column Labels */}
            <TableCell row={1} col={0} title>Mass</TableCell>
            <TableCell row={2} col={0} title>Charge</TableCell>
            <g className="EPRVsNMRMM__TitleTransform" transform="translate(-5, 0)">
                <TableCell row={3} col={0} title>Magnetic Moment</TableCell>
            </g>

            {/* Mass Row (row 2) */}
            <TableCell row={1} col={1}>
                <InlineEquation>
                    m<sub>e</sub> = 9.11 E-31
                </InlineEquation>
            </TableCell>
            <TableCell row={1} col={2}>
                <InlineEquation>
                    m<sub>p</sub> = 1.67 E-27
                </InlineEquation>
            </TableCell>
            <TableCell row={1} col={3}>
                [kg]
            </TableCell>

            {/* Charge Row (row 3) */}
            <TableCell row={2} col={1}>
                <InlineEquation>
                    q<sub>e</sub> = - 1.16 E-19
                </InlineEquation>
            </TableCell>
            <TableCell row={2} col={2}>
                <InlineEquation>
                    q<sub>p</sub> = + 1.16 E-19
                </InlineEquation>
            </TableCell>
            <TableCell row={2} col={3}>
                [C]
            </TableCell>

            {/* Magnetic Moment Row (row 4) */}
            <TableCell row={3} col={1}>
                <span className="EPRvsNMRMM__equation">
                    <Vec>μ</Vec> = -γ<sub>e</sub> · <Vec>S</Vec>
                </span>
            </TableCell>
            <TableCell row={3} col={2}>
                <span className="EPRvsNMRMM__equation">
                    <Vec>μ</Vec> = γ<sub>p</sub> · <Vec>I</Vec>
                </span>
            </TableCell>
            <TableCell row={3} col={3}>
                [J/T]
            </TableCell>
        </g>
    );
}

export default function EPRVsNMRMMVisualReturn() {
    const uid=cleanId(useId());
    const panelEdgeId = `EPRvsNMRMM-panelWash-${uid}`;
    const panelWashId =`EPRvsNMRMM-panelEdge-${uid}`;

    return (
        <figure className="EPRvsNMRMM">
            <svg
                className="EPRvsNMRMM_svg"
                viewBox={`0 0 ${VB.width} ${VB.height}`}
                role="img"
            >
                <BackgroundDefs panelWashId={panelWashId} panelEdgeId={panelEdgeId} />
                <BackgroundPanel panelWashId={panelWashId} panelEdgeId={panelEdgeId} />
                <MMComparisonTable />
            </svg>
            <figcaption className="EPRvsNMRMM_caption">
                Comparison of Electron and Proton Properties.
            </figcaption>
        </figure>
    )
}
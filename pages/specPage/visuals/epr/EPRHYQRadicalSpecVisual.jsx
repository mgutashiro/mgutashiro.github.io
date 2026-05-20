import './EPRHYQRadicalSpecVisual.css';
import { useId, useMemo } from 'react';

import garlicCSV from '/src/HYQData/HYQRadicalEPRGarlic.csv?raw';
import pepperCSV from '/src/HYQData/HYQRadicalPepperEPRData.csv?raw';

const VB = {
    width: 570,
    height: 625,
};

const BG_PAD = 1;
const BG_FRAME = {
    x: BG_PAD,
    y: -10,
    width: VB.width - BG_PAD * 2,
    height: VB.height + 10 - BG_PAD,
    rx: 24,
};

const PEPPER_PANEL = {
    x: 28,
    y: 38,
    w: 514,
    h: 265,
};

const GARLIC_PANEL = {
    x: 28,
    y: 330,
    w: 514,
    h: 265,
};

const AXIS_PAD_X = 42;
const AXIS_PAD_Y = 18;

const PEPPER_RANGE = { min: 330, max: 350 };
const GARLIC_RANGE = {min: 335, max: 345 };
const INTENSITY_RANGE = {min: -1, max: 1 };

const PEPPER_TICKS = [ 330, 334, 338, 342, 346, 350 ];
const GARLIC_TICKS = [ 335, 337, 339, 341, 343, 345 ];
const INTENSITY_TICKS = [-1, -0.5, 0, 0.5, 1];


function EPRHYQRadicalSpecDefs({
    frameGradId,
    pepperTraceGradId,
    garlicTraceGradId,
    cyanGlowId,
    violetGlowId,
}) {
    return (
        <defs>
            <linearGradient
                id={frameGradId}
                x1="0"
                y1="0"
                x2="0"
                y2={VB.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--surface)" />
                <stop offset="100%" stopColor="var(--bg)" />
            </linearGradient>

            <linearGradient
                id={pepperTraceGradId}
                x1={PEPPER_PANEL.x}
                y1="0"
                x2={PEPPER_PANEL.x + PEPPER_PANEL.w}
                y2="0"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="100%" stopColor="var(--accent)" />
            </linearGradient>

            <linearGradient
                id={garlicTraceGradId}
                x1={GARLIC_PANEL.x}
                y1="0"
                x2={GARLIC_PANEL.x + GARLIC_PANEL.w}
                y2="0"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-3)" />
                <stop offset="100%" stopColor="var(--accent-2)" />
            </linearGradient>

            <filter
                id={cyanGlowId}
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
            >
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>

            <filter
                id={violetGlowId}
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
            >
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>
    );
}

function EPRHYQRadicalSpecBackground({ frameGradId }) {
    return (
        <g>
            {/* outer frame */}
            <rect
                x={BG_FRAME.x}
                y={BG_FRAME.y}
                width={BG_FRAME.width}
                height={BG_FRAME.height}
                rx={BG_FRAME.rx}
                fill={`url(#${frameGradId})`}
                stroke="var(--border-strong)"
                strokeWidth="1.4"
            />

            {/* panel cards */}
            < g className="moveIndividualPanels" transform="translate(-10, -20)">
                <rect 
                    x={PEPPER_PANEL.x}
                    y={PEPPER_PANEL.y}
                    width={PEPPER_PANEL.w + 20}
                    height={PEPPER_PANEL.h + 15}
                    rx="16"
                    fill="color-mix(in oklab, var(--surface-2) 58%, transparent)"
                    stroke="var(--border)"
                    strokeWidth="1"
                />
                <rect
                    x={GARLIC_PANEL.x}
                    y={GARLIC_PANEL.y}
                    width={GARLIC_PANEL.w + 20}
                    height={GARLIC_PANEL.h + 15}
                    rx="16"
                    fill="color-mix(in oklab, var(--surface-2) 58%, transparent)"
                    stroke="var(--border)"
                    strokeWidth="1"
                />
            </g>
        </g>
    );
}


function parseSpectrumCSV(raw) {
    return raw
        .trim()
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
            const [field, intensity] = line.split(/,|\s+/).map(Number);
            return {
                field,
                intensity,
            };
        })
        .filter(
            (row) =>
                Number.isFinite(row.field) &&
                Number.isFinite(row.intensity)
        );
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
};

function mapRange(value, inMin, inMax, outMin, outMax) {
    if (inMax === inMin) return outMin;
    const t = (value - inMin) / (inMax - inMin);
    return outMin + t * (outMax - outMin);
}

function buildSpectrumPoints(data, panel, xRange, yRange) {
    const plotX = panel.x + AXIS_PAD_X;
    const plotY = panel.y + AXIS_PAD_Y;
    const plotW = panel.w - AXIS_PAD_X - 12;
    const plotH = panel.h - AXIS_PAD_Y - 34;

    const points = data.map(({ field, intensity}) => {
        const x = mapRange(field, xRange.min, xRange.max, plotX, plotX + plotW);
        const y = mapRange(
            clamp(intensity, yRange.min, yRange.max),
            yRange.min,
            yRange.max,
            plotY + plotH,
            plotY
        );
        return `${x},${y}`;
    });
    return {
        points: points.join(' '),
        plotX,
        plotY,
        plotW, 
        plotH,
        x0: plotX,
        x1: plotX + plotW,
        y0: plotY,
        y1: plotY + plotH,
    };
}

function axisLabel(value) {
    if (Number.isInteger(value)) return `${value}`;
    return `${value.toFixed(1)}`;
}

function ChartTicks ({ ticks, chart, range, axis = 'x', keyPrefix = 'chart' }) {
    if (axis === 'x') {
        return (
            <g>
                {ticks.map((tick, index) => {
                    const x = mapRange(tick, range.min, range.max, chart.x0, chart.x1);
                    const key = `${keyPrefix}-xTick-${index}-${tick}`;
                    return (
                        <g key={key}>
                            <line
                                x1={x}
                                y1={chart.y1}
                                x2={x}
                                y2={chart.y1 + 6}
                                stroke="var(--border-strong)"
                                strokeWidth="1"
                            />
                            <text
                                x={x}
                                y={chart.y1 + 20}
                                textAnchor="middle"
                                fontSize="11"
                                fill="var(--text-muted)"
                            >
                                {axisLabel(tick)}
                            </text>
                        </g>
                    );
                })}
            </g>
        );
    }

    return (
        <g>
            {ticks.map((tick, index) => {
                const y = mapRange(tick, range.min, range.max, chart.y1, chart.y0);
                const key = `${keyPrefix}-yTick-${index}-${tick}`;
                return (
                    <g key={key}>
                        <line
                            x1={chart.x0 - 6}
                            y1={y}
                            x2={chart.x0}
                            y2={y}
                            stroke="var(--border-strong)"
                            strokeWidth="1"
                        />

                        <text
                            x={chart.x0 - 10}
                            y={y + 4}
                            textAnchor="end"
                            fontFamily="var(--font-tech)"
                            fontSize="11"
                            fill="var(--text-muted)"
                        >
                            {axisLabel(tick)}
                        </text>
                    </g>
                );
            })}
        </g>
    );
}

function GridLines({ ticks, chart, range, axis = 'x', keyPrefix = 'chart' }) {
    if (axis === 'x') {
        return (
            <g opacity="0.24">
                {ticks.map((tick, index) => {
                    const x = mapRange(tick, range.min, range.max, chart.x0, chart.x1);
                    const key = `${keyPrefix}-xGrid-${index}-${tick}`;
                    return (
                        <line
                            key={key}
                            x1={x}
                            y1={chart.y0}
                            x2={x}
                            y2={chart.y1}
                            stroke="var(--border)"
                            strokeWidth="1"
                        />
                    );
                })}
            </g>
        );
    }

    return (
        <g opacity="0.18">
            {ticks.map((tick, index) => {
                const y = mapRange(tick, range.min, range.max, chart.y1, chart.y0);
                const key = `${keyPrefix}-yGrid-${index}-${tick}`;
                return (
                    <line
                        key={key}
                        x1={chart.x0}
                        y1={y}
                        x2={chart.x1}
                        y2={y}
                        stroke="var(--border)"
                        strokeWidth="1"
                    />
                );
            })}
        </g>
    );
}

function ChartAxes({ chart }) {
    return (
        <g>
            <line
                x1={chart.x0}
                y1={chart.y1}
                x2={chart.x1}
                y2={chart.y1}
                stroke="var(--border-strong)"
                strokeWidth="1.2"
            />
            <line
                x1={chart.x0}
                y1={chart.y0}
                x2={chart.x0}
                y2={chart.y1}
                stroke="var(--border-strong)"
                strokeWidth="1.2"
            />
        </g>
    );
}

function SpectrumTrace({
    traceId,
    glowId,
    points,
    stroke = 'var(--accent-2)',
}) {
    return (
        <g>
            <polyline
                points={points}
                fill="none"
                stroke={`url(#${traceId})`}
                strokeWidth="2.15"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter={`url(#${glowId})`}
            />
            <polyline
                points={points}
                fill="none"
                stroke={stroke}
                strokeWidth="0.95"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.92"
            />
        </g>
    );
}

function AxisText({ chart }) {
    const cx = (chart.x0 + chart.x1) / 2;
    const cy = (chart.y0 + chart.y1) / 2;

    return (
        <g>
        <text
            x={cx}
            y={chart.y1 + 36}
            textAnchor="middle"
            fontFamily="var(--font-tech)"
            fontSize="12"
            fill="var(--text-dim)"
            letterSpacing="0.01em"
        >
            Magnetic Field Density (mT)
        </text>

            <text
                x={chart.x0 - 34}
                y={cy}
                textAnchor="middle"
                transform={`rotate(-90 ${chart.x0 - 34} ${cy})`}
                fontFamily="var(--font-tech)"
                fontSize="12"
                fill="var(--text-dim)"
                letterSpacing="0.01em"
            >
                Intensity
            </text>
        </g>
    );
}

export default function EPRHYQRadicalSpec() {
    const uid = useId().replace(/:/g, '-');

    const ids = {
        frameGrad: `${uid}-frameGrad`,
        pepperTraceGrad: `${uid}-pepperTraceGrad`,
        garlicTraceGrad: `${uid}-garlicTraceGrad`,
        cyanGlow: `${uid}-cyanGlow`,
        violetGlow: `${uid}-violetGlow`,
    };

    const pepperData = useMemo(() => parseSpectrumCSV(pepperCSV), []);
    const garlicData = useMemo(() => parseSpectrumCSV(garlicCSV), []);

    const pepperChart = useMemo(
        () => buildSpectrumPoints(pepperData, PEPPER_PANEL, PEPPER_RANGE, INTENSITY_RANGE),
        [pepperData]
    );

    const garlicChart = useMemo(
        () => buildSpectrumPoints(garlicData, GARLIC_PANEL, GARLIC_RANGE, INTENSITY_RANGE),
        [garlicData]
    );

    return (
        <figure className="EPRHYQRadicalSpecFigure">
            <svg
                className="EPRHYQRadicalSpec"
                viewBox={`0 -20 ${VB.width} ${VB.height + 20}`}
                width="100%"
                height="100%"
                role="img"
            >

                <EPRHYQRadicalSpecDefs
                    frameGradId={ids.frameGrad}
                    pepperTraceGradId={ids.pepperTraceGrad}
                    garlicTraceGradId={ids.garlicTraceGrad}
                    cyanGlowId={ids.cyanGlow}
                    violetGlowId={ids.violetGlow}
                />

                <EPRHYQRadicalSpecBackground
                    frameGradId={ids.frameGrad}
                />


                {/* pepper chart */}
                <g className="moveChartElements" transform="translate(0, -20)">
                    <GridLines
                        keyPrefix="pepper"
                        ticks={PEPPER_TICKS}
                        chart={pepperChart}
                        range={PEPPER_RANGE}
                        axis="x"
                    />
                    <GridLines
                        keyPrefix="pepper"
                        ticks={INTENSITY_TICKS}
                        chart={pepperChart}
                        range={INTENSITY_RANGE}
                        axis="y"
                    />
                    <ChartAxes chart={pepperChart} />
                    <ChartTicks
                        keyPrefix="pepper"
                        ticks={PEPPER_TICKS}
                        chart={pepperChart}
                        range={PEPPER_RANGE}
                        axis="x"
                    />
                    <ChartTicks
                        keyPrefix="pepper"
                        ticks={INTENSITY_TICKS}
                        chart={pepperChart}
                        range={INTENSITY_RANGE}
                        axis="y"
                    />
                    <AxisText chart={pepperChart} />
                    <SpectrumTrace
                        chart={pepperChart}
                        traceId={ids.pepperTraceGrad}
                        glowId={ids.cyanGlow}
                        points={pepperChart.points}
                        stroke="var(--accent-2)"
                    />

                    {/* garlic chart */}
                    <GridLines
                        keyPrefix="garlic"
                        ticks={GARLIC_TICKS}
                        chart={garlicChart}
                        range={GARLIC_RANGE}
                        axis="x"
                    />
                    <GridLines
                        keyPrefix="garlic"
                        ticks={INTENSITY_TICKS}
                        chart={garlicChart}
                        range={INTENSITY_RANGE}
                        axis="y"
                    />
                    <ChartAxes chart={garlicChart} />
                    <ChartTicks
                        keyPrefix="garlic"
                        ticks={GARLIC_TICKS}
                        chart={garlicChart}
                        range={GARLIC_RANGE}
                        axis="x"
                    />
                    <ChartTicks
                        keyPrefix="garlic"
                        ticks={INTENSITY_TICKS}
                        chart={garlicChart}
                        range={INTENSITY_RANGE}
                        axis="y"
                    />
                    <AxisText chart={garlicChart} />
                    <SpectrumTrace
                        chart={garlicChart}
                        traceId={ids.garlicTraceGrad}
                        glowId={ids.violetGlow}
                        points={garlicChart.points}
                        stroke="var(--accent-3)"
                    />
                </g>
            </svg>
            <figcaption className="EPRHYQRadicalSpecCaption">
                Simulated cw-EPR spectra of the HYQ radical, treated as a charge-neutral doublet species.
                ORCA 6-derived g-tensor and hyperfine parameters were calculated using UKS-B3LYP/def2-SVP
                with TightSCF and CPCM(DMSO). The CSV traces were exported from MATLAB R2022b using
                EasySpin 6.0.12, with the frozen/anisotropic pepper simulation shown above and the
                solution-style garlic simulation shown below.
            </figcaption>
        </figure>
    );
}

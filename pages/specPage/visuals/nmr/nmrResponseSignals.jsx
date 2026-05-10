import './nmrResponseSignals.css';
import { useId } from "react";

const VIEWBOX_WIDTH = 400;
const VIEWBOX_HEIGHT = 320;
const VIEWBOX = `0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`;

const PANEL = {
    x: 10,
    y: 5,
    width: 380,
    height: 314,
    rx: 22,
};

const PANEL_HALF_X = PANEL.x + PANEL.width / 2;
const PANEL_HALF_Y = PANEL.y + PANEL.height / 2;

const PANEL_RIGHT = PANEL.x + PANEL.width;
const PANEL_BOTTOM = PANEL.y + PANEL.height;

const MAGNETICFIELD_MAGNET =
    "M63.7917 140.5L60.0486 137.085L55.9653 132.988L50.5208 124.793L46.0972 115.232L43.0347 104.988L40.993 95.0854L39.2917 82.7927V72.8902V61.9634L40.993 49.3293L42.3542 40.1098L43.7153 34.6463L45.4167 28.8415L47.118 22.6951L50.5208 15.8659L55.2847 9.37805L60.3889 3.57317L64.8125 0.5M63.7917 140.5H73.6597L79.1042 136.744L82.8472 133.329L86.5903 128.549L88.9722 124.11L90.6736 119.671L92.7153 114.207L94.0764 109.768L95.4375 104.646L96.7986 99.1829L97.8194 94.061L98.5 89.622V84.1585V75.622V66.7439V60.5976V54.4512L97.8194 47.9634L96.7986 40.7927L94.7569 32.939L92.7153 26.1098L89.3125 18.2561L86.5903 12.4512L82.1667 7.32927L79.1042 4.2561L74 0.5H64.8125M63.7917 140.5H54.6042H48.8194H43.0347H37.25H32.1458H26.7014L23.2986 139.476L20.2361 137.427L17.5139 134.695L15.4722 131.963L13.4306 128.89L11.0486 125.134L9.34722 121.378L7.64583 117.963L5.94444 113.524L4.58333 108.061L3.22222 102.939L1.86111 97.8171L1.18056 92.3537C1.18056 92.3537 1.0622 89.9634 0.840277 86.5488C0.7365 84.952 0.500002 82.1098 0.500002 82.1098L0.5 79.0366V73.5732V68.7927V64.0122V57.8659L0.840278 53.4268L1.52083 48.3049L2.54167 42.5L3.5625 38.061L4.92361 32.939L6.28472 27.8171L7.98611 22.6951L9.6875 18.939L11.7292 15.1829L15.1319 10.061L18.5347 6.30488L22.618 2.89024L26.0208 1.18293L31.125 0.5H42.0951H55.625H64.8125";

const MAGNETICFIELD_MAGNET_CENTER_X = 49.5;
const MAGNETICFIELD_MAGNET_CENTER_Y = 70.5;
const MAGNETICFIELD_MAGNET_SCALE_X= 0.6;
const MAGNETICFIELD_MAGNET_SCALE_Y= 0.8;

const MAGNETICFIELD_MAGNET_LABEL_X = MAGNETICFIELD_MAGNET_CENTER_X;
const MAGNETICFIELD_MAGNET_LABEL_Y = MAGNETICFIELD_MAGNET_CENTER_Y;

const TOP_RIGHT_ARROW_D =
    "M298.751 8.41128L316.257 11.8837L334.763 16.3483L347.268 20.3168C347.268 20.3168 358.196 23.3062 359.772 27.2617C360.705 29.6038 360.779 32.2645 359.772 35.1987C358.611 38.5802 353.77 42.1436 353.77 42.1436L344.767 46.6081L330.762 50.5766L316.257 54.5451L298.751 58.0176L284.746 60.4979C284.746 60.4979 273.195 62.302 265.74 62.9782C257.755 63.7024 245.232 63.9703 245.232 63.9703H221.224H202.218H175.708H153.201H137.195H113.687L95.6807 62.9782L76.1739 60.4979L56.6671 57.5215L40.6616 54.0491L26.1566 49.5845L12.6519 43.6318L4.64914 39.1672C4.64914 39.1672 1.06206 36.2027 0.647766 33.7105C0.292512 31.5734 0.559573 30.1315 1.6481 28.2538C2.97235 25.9695 6.64984 23.7892 6.64984 23.7892L12.6519 21.3089L18.654 18.8286L25.1562 16.3483L32.5 13.9703L38.0005 12.376L43.8398 10.9705L49.0043 9.89566L53.5059 8.90353L58.5076 7.9114M36.5 0.470459L42.0019 2.45471L47.8398 4.47046L52.3398 5.97046L58.5076 7.9114L54.5063 12.376L51.005 16.8405L48.5042 20.313L45.5031 24.7775";

const TOP_RIGHT_ARROW_CENTER_X = 180.5;
const TOP_RIGHT_ARROW_CENTER_Y = 10;
const TOP_RIGHT_ARROW_SCALE = 0.18;

const BOTTOM_AXIS_TICK_COUNT = 9;
const BOTTOM_AXIS_MARGIN_X = 44;
const BOTTOM_AXIS_Y_RATIO = 0.8;

const BOTTOM_SIGNAL_LEFT_RATIO = 0.22;
const BOTTOM_SIGNAL_RIGHT_RATIO = 0.78;

const SHIELD_D =
    "M77 90.5403L0.5 99.5403V208.04L13 314.54L46.5 409.04L100.5 507.04L149.5 567.54L215 625.04L277 669.04L347 701.54L418 669.04L480 625.04L542 567.54L597.5 507.04L653.5 409.04L686 306.04L700.5 208.04V99.5403L622 90.5403L528.5 70.5403L454 45.5403L393.5 18.5403L347 0.540344L305.5 18.5403L241.5 45.5403L160.5 70.5403L77 90.5403Z";

const SHIELD_CENTER_X = 350.5;
const SHIELD_CENTER_Y = 351.04;
const SHIELD_SCALE = 0.028;
const SHIELD_STACK_GAP = 18;

function cleanId(id) {
    return id.replace(/:/g, "-");
}

function BackgroundDefs({ panelWashId }) {
    return (
        <defs>
            <linearGradient
                id={panelWashId}
                x1={PANEL.x}
                y1={PANEL.y}
                x2={PANEL.x}
                y2={PANEL_BOTTOM}
                gradientUnits="userSpaceOnUse"
            >
                <stop
                offset="0%"
                stopColor="color-mix(in oklab, var(--surface) 88%, var(--accent) 12%)"
                />
                <stop
                offset="55%"
                stopColor="color-mix(in oklab, var(--surface-2) 92%, var(--bg) 8%)"
                />
                <stop
                offset="100%"
                stopColor="color-mix(in oklab, var(--bg) 86%, var(--primary-deep) 14%)"
                />
            </linearGradient>
        </defs>
    );
}

function BackgroundPanel({ panelWashId }) {
    return (
        <g className="nmrResponseSignalsBackgroundPanelSetup">
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill={`url(#${panelWashId})`}
                className="nmrResponseSingnals___Panel"
            />

            <g className="nmrResponseSingnals___SplitLines">
                {/* horizontal split: separates top half from bottom half */}
                <line
                    x1={PANEL.x}
                    y1={PANEL_HALF_Y}
                    x2={PANEL_RIGHT}
                    y2={PANEL_HALF_Y}
                />

                {/* vertical split: divides only the top half into two panels */}
                <line
                    x1={PANEL_HALF_X - 30}
                    y1={PANEL.y}
                    x2={PANEL_HALF_X - 30}
                    y2={PANEL_HALF_Y}
                />
            </g>
        </g>
    );
}

function NucleusShell({
  cx,
  cy,
  r = 24,
  className = "nmrResponseSingnals___NucleusShell",
}) {
  return <circle cx={cx} cy={cy} r={r} className={className} />;
}

function Nucleon({ cx, cy, r = 22, isProton = true }) {
    return (
        <circle
            cx={cx}
            cy={cy}
            r={r}
            fill={
                isProton
                ? "color-mix(in oklab, var(--c-glow-3) 68%, white 32%)"
                : "color-mix(in oklab, var(--c-glow-1) 64%, white 36%)"
            }
            stroke={
                isProton
                ? "color-mix(in oklab, var(--c-glow-3) 38%, var(--primary-deep) 62%)"
                : "color-mix(in oklab, var(--c-glow-1) 38%, var(--primary-deep) 62%)"
            }
            strokeWidth="1.2"
        />
    );
}


function TopLeftActiveNucleus() {
    const sectionX = PANEL.x;
    const sectionY = PANEL.y;
    const sectionWidth = PANEL.width / 2;
    const sectionHeight = PANEL.height / 2;

    const nucleusCx = sectionX + sectionWidth * 0.5;
    const nucleusCy = sectionY + sectionHeight * 0.42;
    const nucleusR = 42;

    const labelY = sectionY + sectionHeight - 10;

    return (
        <g className="nmrResponseSingnals___TopLeftActiveNucleus" transform="translate(-15 0)">
            {/* nucleus shell */}
            <NucleusShell
                cx={nucleusCx}
                cy={nucleusCy}
                r={nucleusR}
                className="nmrResponseSingnals___NucleusShell"
            />

            {/* nucleons inside nucleus */}
            <Nucleon cx={nucleusCx + 11} cy={nucleusCy - 8} isProton={false} />
            <Nucleon cx={nucleusCx - 15} cy={nucleusCy} isProton />
            <Nucleon cx={nucleusCx + 8} cy={nucleusCy + 13} isProton={false} />

            <text
                x={sectionX + sectionWidth / 2 + 10}
                y={labelY}
                textAnchor="middle"
                className="nmrResponseSingnals___SectionLabel"
            >
                <tspan>NMR Active </tspan>
                <tspan className="nmrResponseSingnals___SectionLabelCheck">✓</tspan>
            </text>
        </g>
    );
}

function MagneticFieldMagnet({
    cx,
    cy,
    scaleX = MAGNETICFIELD_MAGNET_SCALE_X,
    scaleY = MAGNETICFIELD_MAGNET_SCALE_Y,
    poleLabel = "",
    className = "nmrResponseSingnals___MagneticFieldMagnet",
}) {

    return (
        <g
            transform={`
                translate(${cx} ${cy})
                scale(${scaleX} ${scaleY})
                translate(${-MAGNETICFIELD_MAGNET_CENTER_X} ${-MAGNETICFIELD_MAGNET_CENTER_Y})
            `}
        >
            <path
                d={MAGNETICFIELD_MAGNET}
                className={className}
            />

            {poleLabel && (
                <text
                    x={MAGNETICFIELD_MAGNET_LABEL_X - 30}
                    y={MAGNETICFIELD_MAGNET_LABEL_Y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="nmrResponseSingnals___MagneticFieldPoleLabel"
                >
                    {poleLabel}
                </text>
            )}
        </g>
    );
}

function TopRightShellArrow({
    cx,
    cy,
    scale = TOP_RIGHT_ARROW_SCALE,
    flipX = false,
    className = "nmrResponseSingnals___TopRightArrow",
}) {
    const scaleX = flipX ? -scale : scale;
    const scaleY = scale;
    return (
        <path
            d={TOP_RIGHT_ARROW_D}
            className={className}
            transform={`
                translate(${cx} ${cy})
                scale(${scaleX} ${scaleY})
                translate(${-TOP_RIGHT_ARROW_CENTER_X} ${-TOP_RIGHT_ARROW_CENTER_Y})
            `}
        />
    );
}

function TopRightShellPair() {
    const sectionX = PANEL_HALF_X;
    const sectionY = PANEL.y;
    const sectionWidth = PANEL.width / 2;
    const sectionHeight = PANEL.height / 2;

    const shellCx = sectionX + sectionWidth * 0.5;
    const topShellCy = sectionY + sectionHeight * 0.22;
    const bottomShellCy = sectionY + sectionHeight * 0.62;

    const shellR = 22;

    const shellPairCenterY = (topShellCy + bottomShellCy) / 2;

    const leftMagnetCx = shellCx - 72;
    const rightMagnetCx = shellCx + 72;
    const magnetCy = shellPairCenterY;
    const labelY = sectionY + sectionHeight - 10;

    return (
        <g className="nmrResponseSingnals___TopRightShellPair" transform="translate(-15 0)">

            <MagneticFieldMagnet cx={leftMagnetCx} cy={magnetCy} poleLabel="N"/>
            <MagneticFieldMagnet cx={rightMagnetCx} cy={magnetCy} poleLabel="S"/>
            <NucleusShell
                cx={shellCx}
                cy={topShellCy}
                r={shellR}
                className="nmrResponseSingnals___NucleusShellBright"
            />
            <TopRightShellArrow cx={shellCx} cy={topShellCy} />

            <NucleusShell
                cx={shellCx}
                cy={bottomShellCy}
                r={shellR}
                className="nmrResponseSingnals___NucleusShellBright"
            />
            <TopRightShellArrow cx={shellCx} cy={bottomShellCy} flipX/>

            <text
                x={sectionX + sectionWidth / 2}
                y={labelY}
                textAnchor="middle"
                className="nmrResponseSingnals___SectionLabel"
            >
                <tspan>Nucleus Responds to Magnet</tspan>
            </text>
        </g>
    );
}

function ShieldIcon({
    cx,
    cy,
    scale = SHIELD_SCALE,
    className = "nmrResponseSingnals___ShieldIcon",
}) {
    return (
        <path
            d={SHIELD_D}
            className={className}
            transform={`
                translate(${cx} ${cy})
                scale(${scale})
                translate(${-SHIELD_CENTER_X} ${-SHIELD_CENTER_Y})
        `}
        />
    );
}

function BottomResponseReadout() {
    const sectionX = PANEL.x;
    const sectionY = PANEL_HALF_Y;
    const sectionWidth = PANEL.width;
    const sectionHeight = PANEL.height / 2;

    const axisX1 = sectionX + BOTTOM_AXIS_MARGIN_X;
    const axisX2 = sectionX + sectionWidth - BOTTOM_AXIS_MARGIN_X;
    const axisWidth = axisX2 - axisX1;

    const axisY = sectionY + sectionHeight * BOTTOM_AXIS_Y_RATIO - 20;

    const leftSignalX = axisX1 + axisWidth * BOTTOM_SIGNAL_LEFT_RATIO;
    const rightSignalX = axisX1 + axisWidth * BOTTOM_SIGNAL_RIGHT_RATIO;

    const leftSignalHeight = 58;
    const rightSignalHeight = 78;

    const axisArrowSize = 7;
    const fieldLabelY = axisY + 20;
    const leftPeakLabelY = axisY - leftSignalHeight - 5;
    const rightPeakLabelY = axisY - rightSignalHeight - 5;

    const leftShieldCx = leftSignalX + 42;
    const leftShieldCy = leftPeakLabelY - 5;

    const rightShieldCx = rightSignalX + 48;
    const rightShieldTopCy = rightPeakLabelY - 5;
    const labelY = sectionY + sectionHeight - 15;

    const ticks = Array.from({ length: BOTTOM_AXIS_TICK_COUNT }, (_, index) => {
        const isEndTick = index === 0 || index === BOTTOM_AXIS_TICK_COUNT - 1;
        if (isEndTick) return null;

        const x = axisX1 + (axisWidth * index) / (BOTTOM_AXIS_TICK_COUNT - 1);
        return (
            <line
                key={`bottom-axis-tick-${index}`}
                x1={x}
                y1={axisY - 5}
                x2={x}
                y2={axisY + 5}
                className="nmrResponseSingnals___BottomAxisTick"
            />
        );
    });

    return (
        <g className="nmrResponseSingnals___BottomResponseReadout">
            {/* bottom NMR spectrum baseline */}
            <line
                x1={axisX1}
                y1={axisY}
                x2={axisX2}
                y2={axisY}
                className="nmrResponseSingnals___BottomAxisLine"
            />

            {/* evenly spaced readout ticks */}
            {ticks}

            <path
                d={`M ${axisX1 + axisArrowSize} ${axisY - axisArrowSize}
                    L ${axisX1} ${axisY}
                    L ${axisX1 + axisArrowSize} ${axisY + axisArrowSize}`}
                className="nmrResponseSingnals___BottomFieldArrowHead"
            />

            <path
                d={`M ${axisX2 - axisArrowSize} ${axisY - axisArrowSize}
                    L ${axisX2} ${axisY}
                    L ${axisX2 - axisArrowSize} ${axisY + axisArrowSize}`}
                className="nmrResponseSingnals___BottomFieldArrowHead"
            />

            {/* left response signal */}
            <line
                x1={leftSignalX}
                y1={axisY}
                x2={leftSignalX}
                y2={axisY - leftSignalHeight}
                className="nmrResponseSingnals___BottomSignalLine"
            />
            <text
                x={leftSignalX}
                y={leftPeakLabelY}
                textAnchor="middle"
                className="nmrResponseSingnals___BottomPeakLabel"
            >
                deshielded
            </text>

            {/* right response signal */}
            <line
                x1={rightSignalX}
                y1={axisY}
                x2={rightSignalX}
                y2={axisY - rightSignalHeight}
                className="nmrResponseSingnals___BottomSignalLine"
            />
            <text
                x={rightSignalX}
                y={rightPeakLabelY}
                textAnchor="middle"
                className="nmrResponseSingnals___BottomPeakLabel"
            >
                shielded
            </text>

            <ShieldIcon cx={leftShieldCx} cy={leftShieldCy} />

            <ShieldIcon cx={rightShieldCx + 12} cy={rightShieldTopCy} />
            <ShieldIcon cx={rightShieldCx} cy={rightShieldTopCy} />
            <ShieldIcon cx={rightShieldCx - 12} cy={rightShieldTopCy} />

            <text
                x={axisX1}
                y={fieldLabelY}
                textAnchor="middle"
                className="nmrResponseSingnals___BottomFieldLabel"
            >
                downfield
            </text>

            <text
                x={axisX2}
                y={fieldLabelY}
                textAnchor="middle"
                className="nmrResponseSingnals___BottomFieldLabel"
            >
                upfield
            </text>

            <text
                x={sectionX + sectionWidth / 2}
                y={labelY}
                textAnchor="middle"
                className="nmrResponseSingnals___SectionLabel"
            >
                <tspan>Peak Appears!</tspan>
            </text>
        </g>
    );
}

export default function nmrResponseSignals() {
    const rawId = useId();
    const id = cleanId(rawId);

    const panelWashId = `nmr-response-signals-panel-wash-${id}`;

    return (
        <figure className="nmrResponseSingnals___Figure">
            <svg
                className="nmrResponseSingnals___SVG"
                viewBox={VIEWBOX}
                role="img"
                aria-labelledby={`nmr-response-signals-title-${id}`}
            >
                <title id={`nmr-response-signals-title-${id}`}>
                    NMR response signals visual layout
                </title>

                <BackgroundDefs panelWashId={panelWashId} />

                <BackgroundPanel panelWashId={panelWashId} />
                <TopLeftActiveNucleus />
                <TopRightShellPair />
                <BottomResponseReadout />
            </svg>
        </figure>
    );
}
import './eprBeerRadicalQualityVisual.css';
import { useId } from "react";

const VIEWBOX = {
    width: 520,
    height: 360,
};

const PANEL = {
    x: 18,
    y: 18,
    width: 484,
    height: 324,
    rx: 28,
};

const PANEL_MID = {
    x: PANEL.x + PANEL.width / 2,
    y: PANEL.y + PANEL.height / 2,
};

const BEER_OUTLINE_PATH =
    "M287.5 5L310.5 0.5H832.5L855.5 5L877.5 19.5L893.5 41.5L901.5 68V92.5L893.5 113L884 129L869.5 141L877.5 209.5L915 517L931 668L943.5 817.5V870L947.5 917.5V954L954 979L963.5 1003.5L980 1042.5L1004 1082L1038 1143.5L1055 1174.5L1070.5 1207L1087.5 1247.5L1102.5 1288L1115 1333.5L1128.5 1397L1137.5 1443L1142.5 1493V2901L1137.5 2946.5L1123.5 2985.5L1109.5 3017L1091 3047L1060.5 3083L1022 3115.5L978.5 3139.5L938.5 3155.5L908.5 3162H887.5H255.5H234.5L204.5 3155.5L164.5 3139.5L121 3115.5L82.5 3083L52 3047L33.5 3017L19.5 2985.5L5.5 2946.5L0.5 2901V1493L5.5 1443L14.5 1397L28 1333.5L40.5 1288L55.5 1247.5L72.5 1207L88 1174.5L105 1143.5L139 1082L163 1042.5L179.5 1003.5L189 979L195.5 954V917.5L199.5 870V817.5L212 668L228 517L265.5 209.5L273.5 141L259 129L249.5 113L241.5 92.5V68L249.5 41.5L265.5 19.5L287.5 5Z";

const BEER_LIQUID_PATH =
    "M196.813 200.709L211.665 49.6853L288.5 14.6035L350.5 49.6853L407 77.1035L481.5 49.6853L541.5 14.6035L619.5 49.6853L681.5 77.1035L743.5 49.6853L784.5 0.603516L818 14.6035L849.335 49.6853L864.187 200.709L875.789 350.233V402.741L879.502 450.249V486.754L885.535 511.758L894.353 536.262L909.668 575.268L931.945 614.775L963.503 676.284L979.283 707.289L993.67 739.794L1009.45 780.301L1023.37 820.807L1034.97 866.314L1047.51 929.825L1055.86 975.832L1060.5 1025.84V2434.06L1055.86 2479.57L1042.86 2518.58L1029.87 2550.08L1012.7 2580.09L984.388 2616.09L948.652 2648.6L908.276 2672.6L871.148 2688.6L843.302 2695.1H823.81H237.19H217.698L189.852 2688.6L152.724 2672.6L112.348 2648.6L76.6121 2616.09L48.3021 2580.09L31.1305 2550.08L18.1357 2518.58L5.14098 2479.57L0.5 2434.06V1025.84L5.14098 975.832L13.4947 929.825L26.0254 866.314L37.6278 820.807L51.5508 780.301L67.3301 739.794L81.7172 707.289L97.4965 676.284L129.055 614.775L151.332 575.268L166.647 536.262L175.465 511.758L181.498 486.754V450.249L185.211 402.741V350.233L196.813 200.709Z";

const BEER_GLASS = {
    width: 1143,
    height: 3162,
};

function cleanId(id) {
    return id.replace(/:/g, "-");
}


function EPRBeerRadicalQualityVisualDefs({
    panelWashId,
    clearWhiteId,
    greenWashId,
    amberWashId,
    beerWashId,
    beerHighlightId,
    glassHighlightId
 }) {
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
                <stop offset="0%" stopColor="var(--surface)" />
                <stop offset="58%" stopColor="var(--bg)" />
                <stop offset="100%" stopColor="var(--primary-deep)" />
            </linearGradient>

            <linearGradient
                id={clearWhiteId}
                x1={PANEL.x}
                y1={PANEL.y}
                x2={PANEL.x + PANEL.width}
                y2={PANEL.y + PANEL.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="white" stopOpacity="0.16" />
                <stop offset="100%" stopColor="white" stopOpacity="0.02" />
            </linearGradient>

            <linearGradient
                id={greenWashId}
                x1={PANEL.x}
                y1={PANEL.y + PANEL.height}
                x2={PANEL.x + PANEL.width}
                y2={PANEL.y}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="var(--accent-4)" stopOpacity="0.24" />
                <stop offset="65%" stopColor="var(--accent-4)" stopOpacity="0.08" />
                <stop offset="100%" stopColor="var(--accent-4)" stopOpacity="0.02" />
            </linearGradient>

            <linearGradient
                id={amberWashId}
                x1={PANEL.x}
                y1={PANEL.y}
                x2={PANEL.x + PANEL.width}
                y2={PANEL.y + PANEL.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="#FFD36A" stopOpacity="0.36" />
                <stop offset="55%" stopColor="#F59E0B" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#7A3E00" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient
                id={beerWashId}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
            >
                <stop offset="0%" stopColor="#F7E6AE" stopOpacity="0.88" />
                <stop offset="26%" stopColor="#D9B765" stopOpacity="0.78" />
                <stop offset="62%" stopColor="#A97735" stopOpacity="0.64" />
                <stop offset="100%" stopColor="#6C4720" stopOpacity="0.52" />
            </linearGradient>

            <linearGradient
                id={beerHighlightId}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
            >
                <stop offset="0%" stopColor="white" stopOpacity="0.18" />
                <stop offset="18%" stopColor="white" stopOpacity="0.06" />
                <stop offset="55%" stopColor="white" stopOpacity="0.02" />
                <stop offset="100%" stopColor="white" stopOpacity="0.08" />
            </linearGradient>

            <linearGradient id={glassHighlightId} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="white" stopOpacity="0.18" />
                <stop offset="18%" stopColor="white" stopOpacity="0.06" />
                <stop offset="55%" stopColor="white" stopOpacity="0.02" />
                <stop offset="100%" stopColor="white" stopOpacity="0.08" />
            </linearGradient>

        </defs>
    );
};

function BackgroundPanel({ panelWashId }) {
    return (
        <g className="EPRBeerQualityRadical_BackgroundPanel">
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill={`url(#${panelWashId})`}
                stroke="var(--border)"
                strokeOpacity="0.6"
            />
        </g>
    );
}

function BeerQualityGlass({
    x,
    y,
    scale = 0.06,
    shellFillId,
    beerWashId,
    beerHighlightId,
    glassHighlightId,
    liquidOpacity = 0.8,
    shellOpacity = 0.18,
}) {
    return (
        <g transform={`translate(${x} ${y}) scale(${scale})`}>
            <g className="BeerLiquidTransform" transform="translate(50 450)">
                <path
                    d={BEER_LIQUID_PATH}
                    fill={`url(#${beerHighlightId})`}
                    opacity={liquidOpacity}
                />
                <path
                    d={BEER_LIQUID_PATH}
                    fill={`url(#${beerWashId})`}
                    opacity={liquidOpacity}
                />
            </g>
            <path
                d={BEER_OUTLINE_PATH}
                fill={`url(#${shellFillId})`}
                opacity={shellOpacity}
            />

            <path
                d={BEER_OUTLINE_PATH}
                fill={`url(#${glassHighlightId})`}
                opacity="0.35"
            />

            <path
                d={BEER_OUTLINE_PATH}
                fill="none"
                stroke="var(--border)"
                strokeOpacity="0.75"
                strokeWidth="20"
                strokeLinejoin="round"
            />
        </g>
    );
}

function BeerQualityGlassRow({
    clearWhiteId,
    greenWashId,
    amberWashId,
    beerWashId,
    glassHighlightId,
}) {
    const scale = 0.084;
    const glassWidth = BEER_GLASS.width * scale;
    const glassHeight = BEER_GLASS.height * scale;
    const gap = 26;

    const totalWidth = glassWidth * 3 + gap * 2;
    const startX = PANEL_MID.x - totalWidth / 2;
    const baseY = PANEL.y + PANEL.height - glassHeight - 18;

    return (
        <g className="EPRBeerRadicalQuality_GlassRow">
            <BeerQualityGlass
                x={startX}
                y={baseY}
                scale={scale}
                shellFillId={clearWhiteId}
                beerWashId={beerWashId}
                liquidOpacity={0.82}
                shellOpacity={0.10}
            />

            <BeerQualityGlass
                x={startX + glassWidth + gap}
                y={baseY}
                scale={scale}
                shellFillId={greenWashId}
                beerWashId={beerWashId}
                liquidOpacity={0.60}
                shellOpacity={0.56}
            />

            <BeerQualityGlass
                x={startX + (glassWidth + gap) * 2}
                y={baseY}
                scale={scale}
                shellFillId={amberWashId}
                beerWashId={beerWashId}
                liquidOpacity={0.34}
                shellOpacity={1}
            />
        </g>
    );
}

export default function EPRBeerQualityRadical() {
    const rawId = useId();
    const id = cleanId(rawId);

    const panelWashId = `epr-beer-radical-quality-panel-wash-${id}`;
    const clearWhiteId = `epr-beer-radical-quality-clear-white-${id}`;
    const greenWashId = `epr-beer-radical-quality-green-wash-${id}`;
    const amberWashId = `epr-beer-radical-quality-amber-wash-${id}`;
    const beerWashId = `epr-beer-radical-quality-beer-wash-${id}`;
    const beerHighlightId = `epr-beer-radical-quality-beer-highlight-${id}`;
    const glassHighlightId = `epr-beer-radical-quality-glass-highlight-${id}`;

    return (
        <figure className="EPRBeerQualityRadical">
            <svg
                viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                role="img"
                aria-labelledby={`epr-beer-quality-radical-title-${id}`}
                className="EPRBeerQualityRadical_SVG"
            >
                <title id={`epr-beer-quality-radical-title-${id}`}>
                    EPR detects tiny radical signals related to beer quality.
                </title>

                <EPRBeerRadicalQualityVisualDefs
                    panelWashId={panelWashId}
                    clearWhiteId={clearWhiteId}
                    greenWashId={greenWashId}
                    amberWashId={amberWashId}
                    beerWashId={beerWashId}
                />

                <BackgroundPanel
                    panelWashId={panelWashId}
                />

                <BeerQualityGlassRow
                    clearWhiteId={clearWhiteId}
                    greenWashId={greenWashId}
                    amberWashId={amberWashId}
                    beerWashId={beerWashId}
                    beerHighlightId={beerHighlightId}
                    glassHighlightId={glassHighlightId}
                />


            </svg>
        </figure>
    );
}
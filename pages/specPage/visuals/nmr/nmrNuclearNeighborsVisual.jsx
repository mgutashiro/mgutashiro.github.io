import React, { useId } from "react";
import "./nmrNuclearNeighborsVisual.css";

/* ====== PRESET VISUAL CONSTANTS ====== */

const VIEWBOX = {
    width: 860,
    height: 520,
};

const PANEL = {
    x: 28,
    y: 4,
    width: 804,
    height: 482,
    rx: 30,
};

const CENTER = {
    x: VIEWBOX.width / 2,
    y: VIEWBOX.height / 2,
};

const DIVIDER = {
    x: CENTER.x,
    y1: PANEL.y + 34,
    y2: PANEL.y + PANEL.height - 34,
};

const NUCLEAR_NEIGHBORS = {
    coreRadius: 100,
    smallRadius: 38,

    leftCore: {
        cx: CENTER.x - 198,
        cy: CENTER.y - 58,
    },

    rightCore: {
        cx: CENTER.x + 190,
        cy: CENTER.y - 58,
    },

    leftSmall: [
        { cx: CENTER.x - 58, cy: CENTER.y + 58 },
        { cx: CENTER.x - 148, cy: CENTER.y +  108 },
        { cx: CENTER.x - 248, cy: CENTER.y + 108 },
        { cx: CENTER.x - 338, cy: CENTER.y + 58 },
    ],

    rightSmall: {
        cx: CENTER.x + 190,
        cy: CENTER.y + 108,
    },
};

const CROWN = {
  width: 473,
  height: 221,
  scale: 0.55,
  lift: 120, 
  path: `M88.7198 220.233L59.1819 155.875L57.2127 153.901H53.2744L48.9421 152.716L45.7914 150.742L43.8222 147.583L43.0346 144.03V140.476L44.2161 137.318L46.1853 134.554L43.0346 131L39.8838 125.867L36.3393 119.55L31.2194 111.259L26.0995 102.177L20.1919 91.1219L15.4659 80.0664L11.1336 71.38L7.19525 62.6936L3.25687 53.6124L0.5 47.295V43.7415L4.04455 45.3208L8.77061 47.295L14.6782 48.8744L22.555 50.8485L32.0071 53.6124L39.49 56.7711L44.2161 60.3246L50.1236 64.6678L54.4559 71.38L57.6066 77.3026L58.7881 72.5645L59.9696 67.8265L61.545 60.3246L64.6957 54.7969L69.0279 47.6899L74.5416 42.1622L80.843 39.0035L87.9321 36.6344H96.9904L106.836 39.0035L114.319 44.5312L119.833 52.0331L122.984 61.5091L123.771 71.38L122.984 80.8561L121.015 89.1477L119.045 99.0186L117.076 108.889V116.391V123.498L119.045 128.236L122.984 132.185L125.347 133.369H127.71H132.042L131.648 130.211V126.262V121.524L132.042 116.391L133.748 111.292L135.98 107.31L139.131 103.362L143.07 100.203L148.189 98.2289L152.128 97.0444H157.642L162.368 97.4392L166.7 99.0186L173.001 102.177L177.333 106.915L180.09 110.469L182.453 115.602L183.635 122.709L186.392 120.735L189.149 118.76L191.512 115.602L193.087 112.443V107.705L192.299 102.177L189.936 97.0444L186.786 92.3064L181.272 87.9632L176.152 83.62L170.638 80.0664L166.7 76.9077L162.368 73.3542L158.823 69.4059L154.885 65.0627L152.522 60.3246L150.552 54.7969V48.8744L151.34 43.3467L151.734 39.7931L153.309 35.0551L155.279 31.5016L158.035 27.948L161.58 24.7894L166.306 22.0255L171.426 20.0513L176.546 19.2616H182.847H189.542L193.087 20.0513L197.419 22.0255L201.358 24.3945L205.296 27.948L208.841 31.5016L211.597 35.0551L213.567 38.6086L214.748 39.0035V35.0551L215.142 31.5016L215.536 27.1584L217.505 22.8152L220.262 18.8668L223.413 15.3133L226.563 12.1546L229.32 9.39074L234.116 5.39448L240.028 0.628174L246.662 5.39448L250.988 10.883L254.526 16.8926L257.677 20.841L260.04 26.3687L262.009 31.1067V37.819L263.19 38.2138L264.372 35.0551L266.735 32.2912L270.279 27.948L274.218 24.3945L278.944 20.841L286.033 18.0771L295.879 17.6823L306.512 19.6565L315.965 25.579L322.266 31.8964L325.417 41.7673L326.992 50.8485L325.417 60.7195L319.903 69.4059L311.239 77.3026L300.605 82.8303L290.365 90.3322L284.458 98.6237L282.882 107.705L284.458 115.602L288.79 119.945L294.697 122.709V117.576L295.879 112.838L298.242 109.284L301.393 104.941L306.512 100.993L311.239 98.6237L317.54 97.4392H323.841L328.961 98.6237L335.263 101.388L340.383 106.126L345.502 112.838L346.684 121.919V127.842L345.502 133.764L351.41 132.58L354.955 129.026L357.711 121.919V112.838L356.924 103.362L354.955 96.2547L352.198 89.1477L351.41 82.4355V74.1439V66.2472L352.198 58.7453L354.955 51.6382L360.074 44.5312L366.376 39.7931L376.616 37.0293H388.431L398.671 40.9776L406.941 47.6899L412.849 59.1401L416 69.011L417.181 76.5129L419.938 71.38L425.058 64.6678L430.572 59.1401L438.448 54.4021L449.476 51.2434L460.503 49.2692L468.38 46.1105L473.5 44.5312V47.6899L468.38 60.3246L458.928 80.4613L446.719 104.546L428.209 134.554L430.965 136.923L432.935 143.24V148.768L428.209 153.506L418.756 155.875L389.219 220.628L349.047 212.337L306.512 201.676L248.104 196.074L189.542 201.676L132.436 209.968L88.7198 220.233Z`,
};

const SHIELD = {
    width: 701,
    height: 702,
    scale: 0.1,
    path: `M77 90.5403L0.5 99.5403V208.04L13 314.54L46.5 409.04L100.5 507.04L149.5 567.54L215 625.04L277 669.04L347 701.54L418 669.04L480 625.04L542 567.54L597.5 507.04L653.5 409.04L686 306.04L700.5 208.04V99.5403L622 90.5403L528.5 70.5403L454 45.5403L393.5 18.5403L347 0.540344L305.5 18.5403L241.5 45.5403L160.5 70.5403L77 90.5403Z`,
};

const MFPATH = {
    width: 261,
    height: 460,
    path: `M0.5 237.224V254.724L1.5 268.224L3 281.724L4.5 293.224L7 307.724L11 324.724L14.5 337.724L18.5 352.724L26 371.724L36 391.224L50.5 413.724L64.5 430.224C64.5 430.224 76.4985 443.543 86 449.724C95.8218 456.114 103.018 458.78 113.5 461.724C123.275 464.47 129.032 464.373 139 463.724C151.24 462.928 158.511 460.819 169.5 456.224C178.495 452.463 183.107 449.08 190.5 442.724C198.161 436.139 207.5 423.224 207.5 423.224C207.5 423.224 218.831 408.108 225 397.724C231.156 387.364 234.372 381.351 239 370.224C244.194 357.737 249.5 337.224 249.5 337.224C249.5 337.224 254.371 320.6 256.5 309.724C259.371 295.059 261 271.724 261 271.724C261 271.724 263.461 250.122 263.5 236.224C263.541 221.742 261 199.224 261 199.224C261 199.224 257.21 170.663 253 152.724C248.667 134.262 239 106.224 239 106.224C239 106.224 232.772 86.3783 226.5 74.7244C220.904 64.3281 217.34 58.5417 210 49.2244C204.099 41.7337 200.474 37.7515 193.5 31.2244C187.198 25.3263 182.845 21.2583 175.5 16.7244C169.184 12.8254 165.304 10.6905 158.5 7.72437C150.686 4.31779 146.925 3.02639 138.5 1.72439C131.939 0.710419 128.127 0.16426 121.5 0.724406C114.704 1.29886 110.945 2.74783 104.5 4.72439C97.733 6.79964 88 12.2244 88 12.2244L75 20.7244L62.5 31.2244L51.5 44.2244L40.5 58.2244L31.5 73.2244L24 91.2244L16.5 113.724L10.5 136.724L6 155.724C6 155.724 2.55907 169.941 1.5 179.224C0.591535 187.188 0.5 199.724 0.5 199.724V223.224`,
};


/* ====== SMALL HELPERS ====== */

function cleanId(id) {
    return id.replace(/:/g, "-");
}

function makeIds(baseId) {
    return {
        title: `${baseId}-title`,
        desc: `${baseId}-desc`,
        panelGradient: `${baseId}-panel-gradient`,
        auraGradient: `${baseId}-aura-gradient`,
        washGradient: `${baseId}-wash-gradient`,
        gridPattern: `${baseId}-grid-pattern`,
        auraBlur: `${baseId}-aura-blur`,
        washBlur: `${baseId}-wash-blur`,
    };
}

/* ====== BACKGROUND GRADIENT HELPER ====== */

function NMRNuclearNeighborsBackgroundDefs({ ids }) {
    return (
        <defs>
            <linearGradient
                id={ids.panelGradient}
                x1={PANEL.x}
                y1={PANEL.y}
                x2={PANEL.x + PANEL.width}
                y2={PANEL.y + PANEL.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--surface) 88%, var(--bg))" />
                <stop offset="45%" stopColor="color-mix(in oklab, var(--bg) 92%, var(--surface-2))" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--surface-2) 82%, var(--bg))" />
            </linearGradient>

            <radialGradient
                id={ids.auraGradient}
                cx={CENTER.x}
                cy={CENTER.y}
                r="360"
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent-2) 20%, transparent)" />
                <stop offset="38%" stopColor="color-mix(in oklab, var(--accent) 12%, transparent)" />
                <stop offset="72%" stopColor="color-mix(in oklab, var(--accent-2) 5%, transparent)" />
                <stop offset="100%" stopColor="transparent" />
            </radialGradient>

            <linearGradient
                id={ids.washGradient}
                x1={PANEL.x}
                y1={PANEL.y}
                x2={PANEL.x + PANEL.width}
                y2={PANEL.y + PANEL.height}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent) 7%, transparent)" />
                <stop offset="50%" stopColor="color-mix(in oklab, var(--accent-2) 5%, transparent)" />
                <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            <filter
                id={ids.auraBlur}
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
            >
                <feGaussianBlur stdDeviation="34" />
            </filter>

            <filter
                id={ids.washBlur}
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
            >
                <feGaussianBlur stdDeviation="22" />
            </filter>


            <pattern
                id={ids.gridPattern}
                width="44"
                height="44"
                patternUnits="userSpaceOnUse"
            >
                <path
                    d="M 44 0 L 0 0 0 44"
                    className="NMRVisualPanel_GridLine"
                />
            </pattern>
        </defs>
    );
}


function NMRNuclearNeighborsBackgroundPanel({ ids }) {
    return (
        <g className="NMRNuclearNeighborsVisualPanel_Background">
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill={`url(#${ids.panelGradient})`}
                className="NMRNuclearNeighborsVisualPanel_Panel"
            />

            <ellipse
                cx={CENTER.x}
                cy={CENTER.y}
                rx="300"
                ry="185"
                fill={`url(#${ids.auraGradient})`}
                filter={`url(#${ids.auraBlur})`}
                className="NMRNuclearNeighborsVisualPanel_Aura"
            />

            <ellipse
                cx={CENTER.x - 40}
                cy={CENTER.y - 18}
                rx="360"
                ry="190"
                fill={`url(#${ids.washGradient})`}
                filter={`url(#${ids.washBlur})`}
                className="NMRNuclearNeighborsVisualPanel_Wash"
            />
            <line
                x1={DIVIDER.x}
                y1={DIVIDER.y1}
                x2={DIVIDER.x}
                y2={DIVIDER.y2}
                className="NMRNuclearNeighborsVisualPanel_Divider"
            />
            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                className="NMRNuclearNeighborsVisualPanel_PanelStroke"
            />
        </g>
    );
}


function NMRNuclearNeighbors_Crown({ cx, cy }) {
    const scaledWidth = CROWN.width * CROWN.scale;
    const scaledHeight = CROWN.height * CROWN.scale;

    const crownX = cx - scaledWidth / 2;
    const crownY = cy - CROWN.lift - scaledHeight / 2;

    return (
        <g
        className="NMRNuclearNeighbors_Crown"
        transform={`translate(${crownX}, ${crownY}) scale(${CROWN.scale})`}
        >
            <path
                d={CROWN.path}
                className="NMRNuclearNeighbors_CrownPath"
            />
        </g>
    );
}

function NMRNuclearNeighbors_Shield({ cx, cy }) {
    const shieldWidth = SHIELD.width * SHIELD.scale;
    const shieldHeight = SHIELD.height * SHIELD.scale;
    const offsetX = 15;  
    const offsetY = 25;
    const shieldX = cx - shieldWidth / 2 + offsetX;
    const shieldY = cy - shieldHeight / 2 + offsetY;

    return (
        <g
            className="NMRNuclearNeighbors_Shield"
            transform={`translate(${shieldX}, ${shieldY}) scale(${SHIELD.scale})`}
        >
            <path
                d={SHIELD.path}
                className="NMRNuclearNeighbors_ShieldPath"
            />
        </g>
    );
}

function NMRNuclearNeighbors_FieldLobe({
    cx,
    cy,
    side = "left",
    scale = 0.72,
    xOffset = 0,
    yOffset = 0,
    className = "",
}) {
    const w = MFPATH.width * scale;
    const h = MFPATH.height * scale;

    /* how close the lobe sits to the core */
    const innerGap = 18;
    const y = cy - h * 0.52 + yOffset;

    if (side === "left") {
        /* mirror horizontally so the opening/gap faces the core */
        const x = cx - innerGap + xOffset;

        return (
            <path
                d={MFPATH.path}
                pathLength="1"
                transform={`translate(${x}, ${y}) scale(${-scale}, ${scale})`}
                className={`NMRNuclearNeighbors_FieldPath ${className}`}
            />
        );
    }

  /* right side keeps original orientation so the gap faces inward */
    const x = cx + innerGap + xOffset;

    return (
        <path
            d={MFPATH.path}
            pathLength="1"
            transform={`translate(${x}, ${y}) scale(${scale})`}
            className={`NMRNuclearNeighbors_FieldPath ${className}`}
        />
    );
}

function NMRNuclearNeighbors_LeftCluster() {
  return (
        <g className="NMRNuclearNeighbors NMRNuclearNeighbors--left">
            <g className="NMRNuclearNeighbors_FieldLobes">
                <NMRNuclearNeighbors_FieldLobe
                    cx={NUCLEAR_NEIGHBORS.leftCore.cx}
                    cy={NUCLEAR_NEIGHBORS.leftCore.cy}
                    side="left"
                    scale={0.55}
                    yOffset={-28}
                    className="NMRNuclearNeighbors_FieldPath--left1"
                />

                <NMRNuclearNeighbors_FieldLobe
                    cx={NUCLEAR_NEIGHBORS.leftCore.cx}
                    cy={NUCLEAR_NEIGHBORS.leftCore.cy}
                    side="right"
                    scale={0.55}
                    yOffset={-28}
                    className="NMRNuclearNeighbors_FieldPath--left2"
                />
            </g>

            {/* large background nucleus */}
            <circle
                cx={NUCLEAR_NEIGHBORS.leftCore.cx}
                cy={NUCLEAR_NEIGHBORS.leftCore.cy}
                r={NUCLEAR_NEIGHBORS.coreRadius}
                className="NMRNuclearNeighbors_Core"
            />

            <text
                x={NUCLEAR_NEIGHBORS.leftCore.cx}
                y={NUCLEAR_NEIGHBORS.leftCore.cy}
                className="NMRNuclearNeighbors_CoreLabel"
            >
                N
            </text>

            <NMRNuclearNeighbors_Crown
                cx={NUCLEAR_NEIGHBORS.leftCore.cx}
                cy={NUCLEAR_NEIGHBORS.leftCore.cy}
            />

            {/* four nearby small nuclei / neighbors */}
            {NUCLEAR_NEIGHBORS.leftSmall.map((node, index) => (
                <g
                    key={`left-small-${index}`}
                    className="NMRNuclearNeighbors_SmallGroup"
                >
                    <circle
                        key={`left-small-${index}`}
                        cx={node.cx}
                        cy={node.cy}
                        r={NUCLEAR_NEIGHBORS.smallRadius}
                        className="NMRNuclearNeighbors_Small"
                    />

                    <text
                        x={node.cx}
                        y={node.cy - 10}
                        className="NMRNuclearNeighbors_SmallLabel"
                    >
                        e
                    </text>
                    <NMRNuclearNeighbors_Shield cx={node.cx} cy={node.cy} />
                </g>
            ))}



            <text
                x={NUCLEAR_NEIGHBORS.leftCore.cx + 15}
                y={NUCLEAR_NEIGHBORS.leftCore.cy + 250}
                className="NMRNuclearNeighborsVisualPanel_FieldLabel"
            >
                SHIELDED
            </text>
        </g>
    );
}

function NMRNuclearNeighbors_RightCluster() {
    return (
        <g className="NMRNuclearNeighbors NMRNuclearNeighbors--right">

            <g className="NMRNuclearNeighbors_FieldLobes">
                {/* inner pair */}
                <NMRNuclearNeighbors_FieldLobe
                    cx={NUCLEAR_NEIGHBORS.rightCore.cx}
                    cy={NUCLEAR_NEIGHBORS.rightCore.cy}
                    side="left"
                    scale={0.4}
                    yOffset={-10}
                    className="NMRNuclearNeighbors_FieldPath--r1l"
                />
                <NMRNuclearNeighbors_FieldLobe
                    cx={NUCLEAR_NEIGHBORS.rightCore.cx}
                    cy={NUCLEAR_NEIGHBORS.rightCore.cy}
                    side="right"
                    scale={0.4}
                    yOffset={-10}
                    className="NMRNuclearNeighbors_FieldPath--r1r"
                />

                {/* middle pair */}
                <NMRNuclearNeighbors_FieldLobe
                    cx={NUCLEAR_NEIGHBORS.rightCore.cx}
                    cy={NUCLEAR_NEIGHBORS.rightCore.cy}
                    side="left"
                    scale={0.5}
                    yOffset={-10}
                    className="NMRNuclearNeighbors_FieldPath--r2l"
                />
                <NMRNuclearNeighbors_FieldLobe
                    cx={NUCLEAR_NEIGHBORS.rightCore.cx}
                    cy={NUCLEAR_NEIGHBORS.rightCore.cy}
                    side="right"
                    scale={0.5}
                    yOffset={-10}
                    className="NMRNuclearNeighbors_FieldPath--r2r"
                />

                {/* outer pair */}
                <NMRNuclearNeighbors_FieldLobe
                    cx={NUCLEAR_NEIGHBORS.rightCore.cx}
                    cy={NUCLEAR_NEIGHBORS.rightCore.cy}
                    side="left"
                    scale={0.6}
                    yOffset={-10}
                    className="NMRNuclearNeighbors_FieldPath--r3l"
                />
                <NMRNuclearNeighbors_FieldLobe
                    cx={NUCLEAR_NEIGHBORS.rightCore.cx}
                    cy={NUCLEAR_NEIGHBORS.rightCore.cy}
                    side="right"
                    scale={0.6}
                    yOffset={-10}
                    className="NMRNuclearNeighbors_FieldPath--r3r"
                />
            </g>

            {/* large background nucleus */}
            <circle
                cx={NUCLEAR_NEIGHBORS.rightCore.cx}
                cy={NUCLEAR_NEIGHBORS.rightCore.cy}
                r={NUCLEAR_NEIGHBORS.coreRadius}
                className="NMRNuclearNeighbors_Core"
            />

            <text
                x={NUCLEAR_NEIGHBORS.rightCore.cx}
                y={NUCLEAR_NEIGHBORS.rightCore.cy}
                className="NMRNuclearNeighbors_CoreLabel"
            >
                N
            </text>

            <NMRNuclearNeighbors_Crown
                cx={NUCLEAR_NEIGHBORS.rightCore.cx}
                cy={NUCLEAR_NEIGHBORS.rightCore.cy}
            />

            {/* one nearby small nucleus / neighbor */}
            <g className="NMRNuclearNeighbors_SmallGroup">
                <circle
                    cx={NUCLEAR_NEIGHBORS.rightSmall.cx}
                    cy={NUCLEAR_NEIGHBORS.rightSmall.cy}
                    r={NUCLEAR_NEIGHBORS.smallRadius}
                    className="NMRNuclearNeighbors_Small"
                />

                <text
                    x={NUCLEAR_NEIGHBORS.rightSmall.cx}
                    y={NUCLEAR_NEIGHBORS.rightSmall.cy - 10}
                    className="NMRNuclearNeighbors_SmallLabel"
                >
                    e
                </text>
                <NMRNuclearNeighbors_Shield
                    cx={NUCLEAR_NEIGHBORS.rightSmall.cx}
                    cy={NUCLEAR_NEIGHBORS.rightSmall.cy}
                />
            </g>

            <text
                x={NUCLEAR_NEIGHBORS.rightCore.cx + 25}
                y={NUCLEAR_NEIGHBORS.rightCore.cy + 250}
                className="NMRNuclearNeighborsVisualPanel_FieldLabel"
            >
                DESHIELDED
            </text>
        </g>
    );
}

/* ====== MAIN EXPORT ====== */

export default function NMRNuclearNeighborsVisualPanel({
}) {
    const baseId = cleanId(useId());
    const ids = makeIds(baseId);

    return (
        <figure className="NMRNuclearNeighborsVisualPanel">
            <svg
                className="NMRNuclearNeighborsVisualPanel_SVG"
                viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                role="img"
            >


            <NMRNuclearNeighborsBackgroundDefs ids={ids} />
            <NMRNuclearNeighborsBackgroundPanel ids={ids} />

            <g className="NMRVisualPanel_ContentLayer">
                <NMRNuclearNeighbors_LeftCluster />
                <NMRNuclearNeighbors_RightCluster />

            </g>

        </svg>

        {/* <figcaption className="NMRNuclearNeighborsVisualPanel_Caption">
            {caption}
        </figcaption> */}
        </figure>
    );
}
const VIEWBOX = "0 0 400 320";

const PANEL = {
    x: 10,
    y: 10,
    width: 380,
    height: 300,
    rx: 22,
};

const CELL = {
    width: PANEL.width / 2,
    height: PANEL.height / 2,
};

const SECTIONS = {
    topLeft: {
        x: PANEL.x,
        y: PANEL.y,
        width: CELL.width,
        height: CELL.height,
    },
    topRight: {
        x: PANEL.x + CELL.width,
        y: PANEL.y,
        width: CELL.width,
        height: CELL.height,
    },
    bottomLeft: {
        x: PANEL.x,
        y: PANEL.y + CELL.height,
        width: CELL.width,
        height: CELL.height,
    },
    bottomRight: {
        x: PANEL.x + CELL.width,
        y: PANEL.y + CELL.height,
        width: CELL.width,
        height: CELL.height,
    },
};

function BackgroundDefs({ 
    panelGlowId, 
    panelWashId, 
    panelSheenId,
    panelVignetteId,
}) {
    const y2 = PANEL.y + PANEL.height;
    return (
        <defs>
            <linearGradient
                id={panelWashId}
                x1={PANEL.x}
                y1={PANEL.y}
                x2={PANEL.x}
                y2={y2}
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0%"
                    stopColor="color-mix(in oklab, var(--bg-elevated) 84%, white)"
                    stopOpacity="0.98"
                />
                <stop
                    offset="42%"
                    stopColor="color-mix(in oklab, var(--bg) 88%, var(--accent-2))"
                    stopOpacity="0.96"
                />
                <stop
                    offset="100%"
                    stopColor="color-mix(in oklab, var(--bg) 94%, black)"
                    stopOpacity="0.985"
                />
            </linearGradient>

            <linearGradient
                id={panelSheenId}
                x1={PANEL.x}
                y1={PANEL.y}
                x2={PANEL.x}
                y2={PANEL.y + PANEL.height * 0.42}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="white" stopOpacity="0.085" />
                <stop offset="45%" stopColor="white" stopOpacity="0.03" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>

            <radialGradient
                id={panelVignetteId}
                cx={PANEL.x + PANEL.width / 2}
                cy={PANEL.y + PANEL.height * 0.42}
                r={PANEL.width * 0.66}
                gradientUnits="userSpaceOnUse"
            >
                <stop offset="0%" stopColor="transparent" />
                <stop
                    offset="72%"
                    stopColor="color-mix(in oklab, var(--bg) 70%, black)"
                    stopOpacity="0.05"
                />
                <stop
                    offset="100%"
                    stopColor="color-mix(in oklab, var(--bg) 75%, black)"
                    stopOpacity="0.18"
                />
            </radialGradient>

            <filter id={panelGlowId} x="-18%" y="-18%" width="136%" height="136%">
                <feGaussianBlur stdDeviation="14" />
            </filter>
        </defs>
    );
}

function BackgroundPanel({
    panelGlowId,
    panelWashId,
    panelSheenId,
    panelVignetteId,
}) {
    const xMid = PANEL.x + PANEL.width / 2;
    const yMid = PANEL.y + PANEL.height / 2;
    return (
        <g>
            {/* soft glow */}
            <rect
                x={PANEL.x + 8}
                y={PANEL.y + 10}
                width={PANEL.width - 16}
                height={PANEL.height - 12}
                rx={PANEL.rx + 2}
                fill="color-mix(in oklab, var(--accent-2) 18%, transparent)"
                opacity="0.24"
                filter={`url(#${panelGlowId})`}
            />
            <rect
                x={PANEL.x + 18}
                y={PANEL.y + 18}
                width={PANEL.width - 36}
                height={PANEL.height - 34}
                rx={PANEL.rx}
                fill="color-mix(in oklab, var(--accent) 14%, transparent)"
                opacity="0.14"
                filter={`url(#${panelGlowId})`}
            />

            <rect
                x={PANEL.x}
                y={PANEL.y}
                width={PANEL.width}
                height={PANEL.height}
                rx={PANEL.rx}
                fill={`url(#${panelWashId})`}
                stroke="color-mix(in oklab, var(--border) 70%, var(--accent))"
                strokeWidth="1.25"
            />

            <rect
                x={PANEL.x + 1}
                y={PANEL.y + 1}
                width={PANEL.width - 2}
                height={PANEL.height - 2}
                rx={PANEL.rx - 1}
                fill={`url(#${panelSheenId})`}
                opacity="0.9"
            />

            <rect
                x={PANEL.x + 1}
                y={PANEL.y + 1}
                width={PANEL.width - 2}
                height={PANEL.height - 2}
                rx={PANEL.rx - 1}
                fill={`url(#${panelVignetteId})`}
            />

            <rect
                x={PANEL.x + 1.25}
                y={PANEL.y + 1.25}
                width={PANEL.width - 2.5}
                height={PANEL.height - 2.5}
                rx={PANEL.rx - 1.5}
                fill="none"
                stroke="color-mix(in oklab, white 18%, var(--accent-2))"
                strokeOpacity="0.16"
                strokeWidth="0.9"
            />
            <line
                x1={xMid}
                y1={PANEL.y + 18}
                x2={xMid}
                y2={PANEL.y + PANEL.height - 18}
                stroke="color-mix(in oklab, var(--border) 66%, var(--accent-2))"
                strokeOpacity="0.26"
                strokeWidth="1"
            />
            <line
                x1={PANEL.x + 14}
                y1={yMid}
                x2={PANEL.x + PANEL.width - 14}
                y2={yMid}
                stroke="color-mix(in oklab, var(--border) 66%, var(--accent-2))"
                strokeOpacity="0.26"
                strokeWidth="1"
            />
        </g>
    );
}


function NucleonCircle({ cx, cy, r = 18, kind = "proton" }) {
    const isProton = kind === "proton";

    return (
        <g>
            <circle
                cx={cx}
                cy={cy}
                r={r}
                fill={
                    isProton
                        ? "color-mix(in oklab, var(--c-glow-3) 72%, white)"
                        : "color-mix(in oklab, var(--c-glow-1) 72%, white)"
                }
                stroke={
                    isProton
                        ? "color-mix(in oklab, var(--c-glow-3) 82%, white)"
                        : "color-mix(in oklab, var(--c-glow-1) 82%, white)"
                }
                strokeWidth="1.3"
                opacity="0.96"
            />
            <circle
                cx={cx - r * 0.3}
                cy={cy - r * 0.34}
                r={r * 0.28}
                fill="white"
                opacity="0.28"
            />
        </g>
    );
}

function SectionLabel({ x, y, children, size = 14, anchor = "middle" }) {
    return (
        <text
            x={x}
            y={y}
            textAnchor={anchor}
            fontFamily="var(--font-tech)"
            fontSize={size}
            fontWeight="600"
            letterSpacing="0.05em"
            fill="color-mix(in oklab, var(--text) 84%, var(--accent-2))"
        >
            {children}
        </text>
    );
}

function TopLeftNucleusSection({ section }) {
    const cx = section.x + section.width / 2;
    const cy = section.y + 60;
    const d = 28;
    const r = 22;

    return (
        <g>
            {/* 2 protons + 2 neutrons stacked together */}
            <NucleonCircle cx={cx - d / 2} cy={cy - d / 2} r={r} kind="proton" />
            <NucleonCircle cx={cx + d / 2} cy={cy - d / 2} r={r} kind="neutron" />
            <NucleonCircle cx={cx - d / 2} cy={cy + d / 2} r={r} kind="neutron" />
            <NucleonCircle cx={cx + d / 2} cy={cy + d / 2} r={r} kind="proton" />

            {/* label below cluster */}
            <SectionLabel x={cx} y={section.y + 135} size={15}>
                nucleus / nuclei
            </SectionLabel>
        </g>
    );
}

function TopRightLegendSection({ section }) {
    const left = section.x + 38;
    const textX = left + 70;
    const y1 = section.y + 35;
    const y2 = section.y + 78;
    const y3 = section.y + 128;
    const r = 13;

    return (
        <g>
            {/* proton row */}
            <NucleonCircle cx={left + 25} cy={y1} r={r} kind="proton" />
            <SectionLabel x={textX} y={y1 + 5} size={14} anchor="start">
                proton
            </SectionLabel>

            {/* neutron row */}
            <NucleonCircle cx={left + 25} cy={y2} r={r} kind="neutron" />
            <SectionLabel x={textX} y={y2 + 5} size={14} anchor="start">
                neutron
            </SectionLabel>

            {/* proton + neutron = mass number row */}
            <NucleonCircle cx={left - 5} cy={y3} r={r} kind="proton" />
            <SectionLabel x={left + 24} y={y3 + 5} size={18}>
                +
            </SectionLabel>

            <NucleonCircle cx={left + 52} cy={y3} r={r} kind="neutron" />
            <SectionLabel x={left + 78} y={y3 + 5} size={18}>
                =
            </SectionLabel>

            <SectionLabel x={left + 90} y={y3 + 3} size={13.5} anchor="start">
                mass #
            </SectionLabel>
        </g>
    );
}

function BottomNMRSection({ section, mode = "active" }) {
    const cx = section.x + section.width / 2;
    const cy = section.y + 60;
    const r = 23;

    return (
        <g>
            {mode === "active" ? (
                <>
                    {/* one proton only */}
                    <NucleonCircle cx={cx} cy={cy} r={r} kind="proton" />
                    <SectionLabel x={cx} y={section.y + 130} size={15}>
                        NMR active
                    </SectionLabel>
                </>
                ) : (
                <>
                    {/* one proton + one neutron stacked together */}
                    <NucleonCircle cx={cx - 10} cy={cy} r={r} kind="proton" />
                    <NucleonCircle cx={cx + 10} cy={cy} r={r} kind="neutron" />
                    <SectionLabel x={cx} y={section.y + 130} size={15}>
                        NMR inactive
                    </SectionLabel>
                </>
            )}
        </g>
    );
}



export default function nmrNuclearStructureMapReturn() {
    const panelWashId = "nmr-nucleus-grid-wash";
    const panelGlowId= "nmr-nucleus-grid-glow";

    return (
    <svg viewBox={VIEWBOX} className="nmrNuclearStructureMapPanel_SVG" role="img" aria-label="Clustered nucleus made of stacked spheres">
        <BackgroundDefs panelGlowId={panelGlowId} panelWashId={panelWashId} />
        <BackgroundPanel panelGlowId={panelGlowId} panelWashId={panelWashId} />
        
        {/* top-left section */}
        <TopLeftNucleusSection section={SECTIONS.topLeft} />

        {/* top-right section */}
        <TopRightLegendSection section={SECTIONS.topRight} />

        {/* bottom-left section */}
        <BottomNMRSection section={SECTIONS.bottomLeft} mode="active" />

        {/* bottom-right section */}
        <BottomNMRSection section={SECTIONS.bottomRight} mode="inactive" />

        </svg>
    );
}
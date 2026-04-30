import './whiteLightSplittingVisual.css';
import { useId, useMemo } from "react";

/** PRESET CONSTANTS */
const SVG = {
    width: 720,
    height: 320,
    viewBox: "0 0 720 320",
};

const LAYOUT = {
    sceneShiftY: -40,
    backgroundX: 8,
    backgroundY: 34,
    backgroundWidth: 704,
    backgroundHeight: 320,
    backgroundRadius: 22,
};

const SOURCE = {
    x: 78,
    y: 138,
    width: 82,
    height: 144,
    rx: 28,
    slitX: 154,
    slitY: 172,
    slitHeight: 76,
};

const BEAM = {
    centerY: 210,
    paleStartX: 160,
    paleEndX: 250,
    ribbonStartX: 238,
    ribbonEndX: 620,
    startHeight: 20,
    endHeight: 82,
};

const SAMPLE_HINT = {
    cx: 652,
    cy: 210,
    r: 38,
};

const ENERGY_PARTICLE_BANDS = [
    { tone: "white", xMin: 252, xMax: 300, columns: 6, rows: 3, yOffset: 0, r: 1.9 },
    { tone: "cyan", xMin: 286, xMax: 360, columns: 8, rows: 4, yOffset: -12, r: 2.0 },
    { tone: "lime",   xMin: 328, xMax: 430, columns: 13, rows: 6, yOffset: -10, r: 2.0 },
    { tone: "green",  xMin: 350, xMax: 450, columns: 10, rows: 5, yOffset: 6,   r: 1.9 },

    { tone: "violet", xMin: 390, xMax: 500, columns: 10, rows: 5, yOffset: -2,  r: 2.0 },

    { tone: "pink",   xMin: 430, xMax: 575, columns: 16, rows: 7, yOffset: 4,   r: 2.1 },
    { tone: "pink",   xMin: 455, xMax: 595, columns: 13, rows: 6, yOffset: 14,  r: 2.0 },

    { tone: "warm",   xMin: 500, xMax: 618, columns: 13, rows: 6, yOffset: 12,  r: 2.0 },
    { tone: "warm",   xMin: 530, xMax: 622, columns: 9,  rows: 4, yOffset: 20,  r: 1.9 },
];

/** HELPER FUNCTIONS */
// create widening spectral ribbon path
function makeRibbonPath({ ribbonStartX, ribbonEndX, centerY, startHeight, endHeight }) {
    const topStart = centerY - startHeight / 2;
    const bottomStart = centerY + startHeight / 2;
    const topEnd = centerY - endHeight / 2;
    const bottomEnd = centerY + endHeight / 2;

    return `
        M ${ribbonStartX} ${topStart}
        C ${ribbonStartX + 95} ${topStart - 8},
        ${ribbonEndX - 155} ${topEnd - 10},
        ${ribbonEndX} ${topEnd}
        L ${ribbonEndX} ${bottomEnd}
        C ${ribbonEndX - 155} ${bottomEnd + 10},
        ${ribbonStartX + 95} ${bottomStart + 8},
        ${ribbonStartX} ${bottomStart}
        Z
    `;
}

// create narrow pale beam pre white light split
function makePaleBeamPath({ paleStartX, paleEndX, centerY }) {
    return `
        M ${paleStartX} ${centerY}
        C ${paleStartX + 26} ${centerY - 1},
        ${paleEndX - 28} ${centerY + 1},
        ${paleEndX} ${centerY}
    `;
}

// estimate ribbon width at a given x-position so particles stay inside the beam
function getRibbonHalfHeightAtX(x) {
    const progress = Math.min(
        1,
        Math.max(0, (x - BEAM.ribbonStartX) / (BEAM.ribbonEndX - BEAM.ribbonStartX))
    );

    return BEAM.startHeight / 2 + progress * ((BEAM.endHeight - BEAM.startHeight) / 2);
}

// generate packed color particles inside each spectral band
function makeEnergyParticles(bands) {
    return bands.flatMap((band, bandIndex) => {
        const particles = [];

        for (let col = 0; col < band.columns; col += 1) {
            const colProgress = band.columns === 1 ? 0.5 : col / (band.columns - 1);
            const baseX = band.xMin + colProgress * (band.xMax - band.xMin);
            const halfHeight = getRibbonHalfHeightAtX(baseX) * 0.82;

            for (let row = 0; row < band.rows; row += 1) {
                const rowProgress = band.rows === 1 ? 0.5 : row / (band.rows - 1);

                const jitterX = (((row * 7 + col * 3 + bandIndex * 5) % 9) - 4) * 1.35;
                const jitterY = (((row * 5 + col * 11 + bandIndex * 2) % 7) - 3) * 1.1;
                const sizeJitter = ((row + col + bandIndex) % 3) * 0.28;

                const x = baseX + jitterX;
                const y =
                    BEAM.centerY +
                    (rowProgress - 0.5) * halfHeight * 1.68 +
                    band.yOffset +
                    jitterY;

                particles.push({
                    x: Number(x.toFixed(1)),
                    y: Number(y.toFixed(1)),
                    r: Number((band.r + sizeJitter).toFixed(1)),
                    tone: band.tone,
                    delay: Number((((col + row + bandIndex) % 9) * 0.11).toFixed(2)),
                });
            }
        }

        return particles;
    });
}

const ENERGY_MARKERS = makeEnergyParticles(ENERGY_PARTICLE_BANDS);

// keep SVG definition ID
function makeLocalId(prefix, uid) {
    return `${prefix}-${uid.replace(/:/g, "")}`;
}

export default function UVVisLightEntryVisual() {
    const uid = useId();
    const ids = useMemo(
        () => ({
            title: makeLocalId("uvv-light-entry-title", uid),
            desc: makeLocalId("uvv-light-entry-desc", uid),
            sourceGrad: makeLocalId("uvv-source-grad", uid),
            beamGrad: makeLocalId("uvv-beam-grad", uid),
            ribbonGrad: makeLocalId("uvv-ribbon-grad", uid),
            sampleGrad: makeLocalId("uvv-sample-hint-grad", uid),
            softBlur: makeLocalId("uvv-soft-blur", uid),
            ribbonClip: makeLocalId("uvv-ribbon-clip", uid),
        }),
        [uid]
    );

    // Pre-prepared path to edit beam and ribbon geometry
    const paleBeamPath = makePaleBeamPath(BEAM);
    const ribbonPath = makeRibbonPath(BEAM);

    return (
        <div className="UVVLightEntryVisual" aria-hidden="false">
            <svg
                className="UVVLightEntrySVG"
                viewBox={SVG.viewBox}
                role="img"
            >
                <defs>
                    <linearGradient id={ids.sourceGrad} x1="78" y1="138" x2="160" y2="282">
                        <stop offset="0%" stopColor="var(--surface)" />
                        <stop offset="58%" stopColor="var(--surface-2)" />
                        <stop offset="100%" stopColor="var(--c-ink)" />
                    </linearGradient>

                    <linearGradient id={ids.beamGrad} x1="160" y1="210" x2="250" y2="210">
                        <stop offset="0%" stopColor="var(--text-dim)" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="var(--text)" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="var(--c-glow-1)" stopOpacity="0.65" />
                    </linearGradient>

                    <linearGradient id={ids.ribbonGrad} x1="238" y1="210" x2="620" y2="210">
                        <stop offset="0%" stopColor="var(--text)" stopOpacity="0.82" />
                        <stop offset="24%" stopColor="var(--c-glow-1)" stopOpacity="0.82" />
                        <stop offset="52%" stopColor="var(--c-glow-2)" stopOpacity="0.78" />
                        <stop offset="76%" stopColor="var(--c-glow-3)" stopOpacity="0.76" />
                        <stop offset="100%" stopColor="var(--c-metal-1)" stopOpacity="0.48" />
                    </linearGradient>

                    <radialGradient id={ids.sampleGrad} cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="var(--c-glow-2)" stopOpacity="0.28" />
                        <stop offset="70%" stopColor="var(--c-glow-1)" stopOpacity="0.08" />
                        <stop offset="100%" stopColor="transparent" />
                    </radialGradient>

                    <filter id={ids.softBlur} x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" />
                    </filter>

                    <clipPath id={ids.ribbonClip} clipPathUnits="userSpaceOnUse">
                        <path d={ribbonPath} />
                    </clipPath>
                </defs>

                <rect
                    className="UVVLightEntryBackground"
                    x="5"
                    y="15"
                    width="724"
                    height="280"
                    rx="24"
                />

                <g transform={`translate(0 ${LAYOUT.sceneShiftY})`}>
                    {/* Source Chamber (where broadband UV-vis light begins) */}
                    <g className="UVVLightEntrySource">
                        <rect
                            x={SOURCE.x}
                            y={SOURCE.y}
                            width={SOURCE.width}
                            height={SOURCE.height}
                            rx={SOURCE.rx}
                            fill={`url(#${ids.sourceGrad})`}
                            className="UVVLightEntrySourceBody"
                        />
                        <circle
                            cx="116"
                            cy={BEAM.centerY}
                            r="34"
                            fill="var(--c-glow-1)"
                            opacity="0.14"
                            filter={`url(#${ids.softBlur})`}
                            className="UVVLightEntrySourceGlow"
                        />
                        <rect
                            x={SOURCE.slitX}
                            y={SOURCE.slitY}
                            width="8"
                            height={SOURCE.slitHeight}
                            rx="4"
                            className="UVVLightEntrySlit"
                        />
                    </g>

                    {/* Pale Beam: Shows the source emitting one clean beam before it spreads into energies */}
                    <path
                        d={paleBeamPath}
                        fill="none"
                        stroke={`url(#${ids.beamGrad})`}
                        strokeWidth="9"
                        strokeLinecap="round"
                        className="UVVLightEntryPaleBeam"
                    />

                    {/* Spectral ribbon to show UV-Vis beam unfolding into many possible energies */}
                    <g className="UVVLightEntryRibbonGroup">
                        <path
                            d={ribbonPath}
                            fill={`url(#${ids.ribbonGrad})`}
                            className="UVVLightEntryRibbon"
                        />

                        <path
                            d={ribbonPath}
                            fill="none"
                            stroke="var(--c-glow-1)"
                            strokeWidth="1.2"
                            strokeOpacity="0.35"
                            className="UVVLightEntryRibbonEdge"
                        />
                    </g>

                    {/* Energy Market (quietly reinforces ribbon contains several light energies) */}
                    <g 
                        className="UVVLightEntryEnergyMarkers"
                        clipPath={`url(#${ids.ribbonClip})`}
                    >
                        {ENERGY_MARKERS.map((marker) => (
                            <circle
                                key={`${marker.tone}-${marker.x}-${marker.y}`}
                                cx={marker.x}
                                cy={marker.y}
                                r={marker.r}
                                style={{ "--dot-delay": `${marker.delay}s` }}
                                className={`UVVLightEntryEnergyDot UVVLightEntryEnergyDot--${marker.tone}`}
                            />
                        ))}
                    </g>

                    {/* Sample Hint to point towards next panel (absorption) */}
                    <g className="UVVLightEntrySampleHint">
                        <circle
                            cx={SAMPLE_HINT.cx}
                            cy={SAMPLE_HINT.cy}
                            r={SAMPLE_HINT.r}
                            fill={`url(#${ids.sampleGrad})`}
                            className="UVVLightEntrySampleGlow"
                        />

                        <circle
                            cx={SAMPLE_HINT.cx}
                            cy={SAMPLE_HINT.cy}
                            r="24"
                            className="UVVLightEntrySampleRing"
                        />
                    </g>

                    {/* Label Names of key ideas */}
                    <g className="UVVLightEntryLabels">
                        <text x="86" y="118" className="UVVLightEntryLabel UVVLightEntryLabel--source">
                            source
                        </text>

                        <text x="338" y="146" className="UVVLightEntryLabel UVVLightEntryLabel--ribbon">
                            many light energies
                        </text>

                        <text x="580" y="282" className="UVVLightEntryLabel UVVLightEntryLabel--next">
                            toward sample
                        </text>
                    </g>
                </g>
            </svg>
        </div>
    );
}
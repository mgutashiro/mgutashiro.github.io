import './absorptionVisual.css';
import { useId } from 'react';

const VIEWBOX = {
    x: 18,
    y: 30,
    width: 684,
    height: 300,
};

const SAMPLE = { cx: 360, cy: 180, coreR : 42, ringR: 70 }

const BEAM = {
  inX1: 70,
  inX2: 302,
  outX1: 418,
  outX2: 650,
};

const OUTGOING_BAND_Y = [160, 180, 200];

/* Defines each energy band in the incoming spectral ribbon. */
const ENERGY_BANDS = [
    {
        id: "violet",
        y: 138,
        color: "var(--c-glow-2)",
        absorbed: true,
    },
    {
        id: "pink",
        y: 158,
        color: "var(--c-glow-3)",
        absorbed: true,
    },
    {
        id: "cyan",
        y: 178,
        color: "var(--c-glow-1)",
        absorbed: false,
    },
    {
        id: "lime",
        y: 198,
        color: "var(--c-glow-4)",
        absorbed: false,
    },
    {
        id: "soft-pink",
        y: 218,
        color: "var(--c-emo-2)",
        absorbed: false,
    },
];

const ABSORPTION_DOTS = [
    { cx: 328, cy: 154, r: 3.2, delay: "0s" },
    { cx: 342, cy: 166, r: 2.5, delay: "0.4s" },
    { cx: 332, cy: 196, r: 3, delay: "0.8s" },
    { cx: 350, cy: 204, r: 2.4, delay: "1.2s" },
];

function makeBeamPath(x1, x2, y, bend = 0) {
    return `M ${x1} ${y} C ${x1 + 72} ${y + bend}, ${x2 - 72} ${
        y - bend
    }, ${x2} ${y}`;
}

function makeAbsorptionPath(y, direction = 1) {
    return `M ${BEAM.inX2} ${y} C 326 ${y}, ${342} ${
        SAMPLE.cy + direction * 18
    }, ${SAMPLE.cx} ${SAMPLE.cy}`;
}

function makeInternalLine(yOffset, width) {
    const x1 = SAMPLE.cx - width / 2;
    const x2 = SAMPLE.cx + width / 2;
    const y = SAMPLE.cy + yOffset;

    return `M ${x1} ${y} C ${SAMPLE.cx - 12} ${y - 4}, ${
        SAMPLE.cx + 12
    } ${y + 4}, ${x2} ${y}`;
}

export default function UVVAbsorptionReturn() {
    const uid = useId();

    const sampleGradId = `${uid}--sampleGrad`;
    const chamberGradId = `${uid}--chamberGrad`;
    const softBlurId = `${uid}--softBlur`;

    return (
        <figure className="UVVAbsorbVisual">
            <svg
                className="UVVAbsorbSVG"
                viewBox={`${VIEWBOX.x} ${VIEWBOX.y} ${VIEWBOX.width} ${VIEWBOX.height}`}
                role="img"
            >
                <defs>
                    <radialGradient
                        id={sampleGradId}
                        cx={SAMPLE.cx}
                        cy={SAMPLE.cy}
                        r={SAMPLE.coreR}
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop
                            offset="0%"
                            stopColor="color-mix(in oklab, var(--c-glow-3) 54%, white)"
                        />
                        <stop
                            offset="58%"
                            stopColor="color-mix(in oklab, var(--c-glow-2) 42%, var(--c-primary-2))"
                        />
                        <stop
                            offset="100%"
                            stopColor="color-mix(in oklab, var(--c-primary-2) 80%, var(--c-ink))"
                        />
                    </radialGradient>

                    <stop
                        offset="0%"
                        stopColor="color-mix(in oklab, var(--c-glow-3) 54%, white)"
                    />
                    <stop
                        offset="58%"
                        stopColor="color-mix(in oklab, var(--c-glow-2) 42%, var(--c-primary-2))"
                    />
                    <stop
                        offset="100%"
                        stopColor="color-mix(in oklab, var(--c-primary-2) 80%, var(--c-ink))"
                    />

                    <filter
                        id={softBlurId}
                        x="0"
                        y="0"
                        width={VIEWBOX.width}
                        height={VIEWBOX.height}
                        filterUnits="userSpaceOnUse"
                    >
                        <feGaussianBlur stdDeviation="7" />
                    </filter>
                </defs>
                <rect
                    className="UVVAbsorbBackplate"
                    x="34"
                    y="54"
                    width="652"
                    height="252"
                    rx="28"
                />

                {/* Shows incoming broadnamd ribbon before reaching sample */}
                <g className="UVVAbsorbIncoming" aria-hidden="true">
                    {ENERGY_BANDS.map((band) => (
                        <path
                            key={`incoming-${band.id}`}
                            className="UVVAbsorbBand UVVAbsorbBand--incoming"
                            d={makeBeamPath(BEAM.inX1, BEAM.inX2, band.y)}
                            stroke={band.color}
                        />
                    ))}
                </g>

                {/* Show sample chamber where selected energies are removed */}
                <g className="UVVAbsorbSample" aria-hidden="true">
                    <circle
                        className="UVVAbsorbChamberGlow"
                        cx={SAMPLE.cx}
                        cy={SAMPLE.cy}
                        r={SAMPLE.ringR}
                        fill={`url(#${chamberGradId})`}
                        filter={`url(#${softBlurId})`}
                    />

                    <circle
                        className="UVVAbsorbChamberRing"
                        cx={SAMPLE.cx}
                        cy={SAMPLE.cy}
                        r={SAMPLE.ringR}
                    />
                    <circle
                        className="UVVAbsorbSampleCore"
                        cx={SAMPLE.cx}
                        cy={SAMPLE.cy}
                        r={SAMPLE.coreR}
                        fill={`url(#${sampleGradId})`}
                    />
                    <path
                        className="UVVAbsorbInternalLine"
                        d={makeInternalLine(-12, 56)}
                    />
                    <path className="UVVAbsorbInternalLine" d={makeInternalLine(8, 42)} />
                </g>
                {/* make absorption feel selective effect */}
                <g className="UVVAbsorbPulledBands" aria-hidden="true">
                    {ENERGY_BANDS.filter((band) => band.absorbed).map((band, index) => (
                        <path
                        key={`absorbed-${band.id}`}
                        className="UVVAbsorbBand UVVAbsorbBand--absorbed"
                        d={makeAbsorptionPath(band.y, index === 0 ? -1 : 1)}
                        stroke={band.color}
                        />
                    ))}
                </g>

                {/* warm particles near chamber for showing energy being taken up */}
                <g className="UVVAbsorbDots" aria-hidden="true">
                    {ABSORPTION_DOTS.map((dot, index) => (
                        <circle
                            key={`dot-${index}`}
                            className="UVVAbsorbDot"
                            cx={dot.cx}
                            cy={dot.cy}
                            r={dot.r}
                            style={{ animationDelay: dot.delay }}
                        />
                    ))}
                </g>

                {/* shows transmitted beam after the samble + show abs bands missing or faded */}
                <g className="UVVAbsorbOutgoing" aria-hidden="true">
                    {ENERGY_BANDS.filter((band) => !band.absorbed).map((band, index) => (
                        <path
                        key={`outgoing-${band.id}`}
                        className="UVVAbsorbBand UVVAbsorbBand--outgoing"
                        d={makeBeamPath(BEAM.outX1, BEAM.outX2, OUTGOING_BAND_Y[index])}
                        stroke={band.color}
                        />
                    ))}
                </g>

                {/* Labels */}
                <g className="UVVAbsorbLabels" aria-hidden="true">
                    <text className="UVVAbsorbLabel" x="92" y="108">
                        many energies in
                    </text>

                    <text className="UVVAbsorbLabel UVVAbsorbLabel--sample" x="245" y="282">
                        matching energies absorbed
                    </text>

                    <text className="UVVAbsorbLabel UVVAbsorbLabel--sample" x="333" y="95">
                        sample
                    </text>

                    <text className="UVVAbsorbLabel" x="500" y="108">
                        missing energies out
                    </text>
                </g>
            </svg>
            <figcaption className="UVVAbsorbCaption">
                The molecule does not absorb every color of light. Only the matching
                energies are taken in, leaving gaps in the beam that continues forward.
            </figcaption>
        </figure>
    );
}
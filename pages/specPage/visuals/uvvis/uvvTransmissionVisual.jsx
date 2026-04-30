import { useId } from "react";
import './uvvTransmissionVisual.css'

const VIEWBOX = {
    width: 720,
    height: 320,
};

const SCENE_SHIFT = {
    x: -65,
    y: -78,
};

const SCENE_SCALE = 1.15;

const CAPTION =
    "A UV–Vis absorption measurement is fundamentally a transmission experiment: wavelength-selected radiation passes through the sample, and the remaining transmitted intensity is measured relative to the incident signal to quantify optical attenuation.";

const CONTINUUM_BANDS = [
    { id: "violet", y: 150, color: "var(--c-glow-2)", opacity: 0.62 },
    { id: "pink", y: 164, color: "var(--c-glow-3)", opacity: 0.64 },
    { id: "cyan", y: 178, color: "var(--c-glow-1)", opacity: 0.82 },
    { id: "lime", y: 192, color: "var(--c-glow-4)", opacity: 0.58 },
    { id: "softPink", y: 206, color: "var(--c-emo-2)", opacity: 0.5 },
];

const SIGNAL_BARS = [
    { x: 616, height: 28, opacity: 0.42 },
    { x: 633, height: 44, opacity: 0.68 },
    { x: 651, height: 32, opacity: 0.52 },
];

function makeId(baseId, name) {
    return `UVVTransmissionVisual-${name}-${baseId}`;
}

function TechnicalLabel({ x, y, children, anchor = "middle", className = "" }) {
    return (
        <text
            x={x}
            y={y}
            textAnchor={anchor}
            className={`UVVTransmissionVisual_Label ${className}`}
        >
            {children}
        </text>
    );
}

function BeamPath({
    d,
    color = "url(#beamGrad)",
    width = 4,
    opacity = 1,
    className = "",
    delay = 0,
}) {
    return (
        <path
            d={d}
            fill="none"
            stroke={color}
            strokeWidth={width}
            strokeLinecap="round"
            opacity={opacity}
            className={`UVVTransmissionVisual_BeamPath ${className}`}
            style={{ "--uvv-delay": `${delay}s` }}
        />
    );
}

function SignalBars() {
    return (
        <g className="UVVTransmissionVisual_SignalBars">
            {SIGNAL_BARS.map((bar) => (
                <rect
                    key={bar.x}
                    x={bar.x}
                    y={205 - bar.height}
                    width="9"
                    height={bar.height}
                    rx="4.5"
                    opacity={bar.opacity}
                    className="UVVTransmissionVisual_SignalBar"
                />
            ))}
        </g>
    );
}

export default function UVVTransmissionVisualReturn() {
    const rawId = useId();
    const baseId = rawId.replace(/:/g, "");

    const ids = {
        title: makeId(baseId, "title"),
        panelGrad: makeId(baseId, "panelGrad"),
        hardwareGrad: makeId(baseId, "hardwareGrad"),
        beamGrad: makeId(baseId, "beamGrad"),
        glassGrad: makeId(baseId, "glassGrad"),
        detectorGrad: makeId(baseId, "detectorGrad"),
        glow: makeId(baseId, "glow"),
    };

    return (
        <figure className="UVVTransmissionVisual">
            <svg
                className="UVVTransmissionVisual_SVG"
                viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
                role="img"
            >
                <defs>
                    <linearGradient
                        id={ids.panelGrad}
                        x1="20"
                        y1="26"
                        x2="700"
                        y2="296"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="var(--surface)" />
                        <stop offset="58%" stopColor="var(--surface-2)" />
                        <stop offset="100%" stopColor="var(--c-ink)" />
                    </linearGradient>

                    <linearGradient
                        id={ids.hardwareGrad}
                        x1="60"
                        y1="96"
                        x2="670"
                        y2="236"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="var(--c-metal-1)" />
                        <stop offset="52%" stopColor="var(--c-metal-2)" />
                        <stop offset="100%" stopColor="var(--c-metal-3)" />
                    </linearGradient>

                    <linearGradient
                        id={ids.beamGrad}
                        x1="130"
                        y1="176"
                        x2="590"
                        y2="176"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="var(--c-glow-2)" />
                        <stop offset="42%" stopColor="var(--c-glow-1)" />
                        <stop offset="100%" stopColor="var(--c-glow-4)" />
                    </linearGradient>

                    <linearGradient
                        id={ids.glassGrad}
                        x1="330"
                        y1="104"
                        x2="408"
                        y2="250"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="color-mix(in oklab, var(--c-glow-1) 22%, transparent)" />
                        <stop offset="50%" stopColor="color-mix(in oklab, var(--text) 16%, transparent)" />
                        <stop offset="100%" stopColor="color-mix(in oklab, var(--c-glow-2) 20%, transparent)" />
                    </linearGradient>

                    <linearGradient
                        id={ids.detectorGrad}
                        x1="588"
                        y1="118"
                        x2="684"
                        y2="238"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop offset="0%" stopColor="color-mix(in oklab, var(--c-ink) 74%, var(--c-glow-1) 26%)" />
                        <stop offset="100%" stopColor="color-mix(in oklab, var(--c-ink) 78%, var(--c-glow-3) 18%)" />
                    </linearGradient>

                    <filter
                        id={ids.glow}
                        x="-20%"
                        y="-40%"
                        width="140%"
                        height="180%"
                        colorInterpolationFilters="sRGB"
                    >
                        <feGaussianBlur stdDeviation="5" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <rect
                    x="-24"
                    y="-25"
                    width="770"
                    height="332"
                    rx="30"
                    fill={`url(#${ids.panelGrad})`}
                    className="UVVTransmissionVisual_Backplate"
                />
                
                <g
                    className="UVVTransmissionVisual_Scene"
                    transform={`translate(${SCENE_SHIFT.x} ${SCENE_SHIFT.y}) scale(${SCENE_SCALE})`}
                >
                    <path
                        d="M 56 72 H 690 M 56 270 H 690"
                        className="UVVTransmissionVisual_ChamberLines"
                    />


                    {/* source chamber */}
                    <g className="UVVTransmissionVisual_Source">
                        <rect
                            x="58"
                            y="112"
                            width="86"
                            height="128"
                            rx="22"
                            fill={`url(#${ids.hardwareGrad})`}
                            className="UVVTransmissionVisual_Hardware"
                        />
                        <ellipse
                            cx="101"
                            cy="176"
                            rx="24"
                            ry="46"
                            fill="var(--c-glow-2)"
                            filter={`url(#${ids.glow})`}
                            className="UVVTransmissionVisual_SourceGlow"
                        />
                        <path
                            d="M 78 136 H 124 M 78 216 H 124"
                            className="UVVTransmissionVisual_HardwareEtch"
                        />
                        <TechnicalLabel x="103" y="103">
                            continuum source
                        </TechnicalLabel>
                    </g>

                    {/* continuum entering selector */}
                    <g className="UVVTransmissionVisual_ContinuumBands">
                        {CONTINUUM_BANDS.map((band, index) => (
                            <BeamPath
                                key={band.id}
                                d={`M 134 ${band.y} C 162 ${band.y - 8}, 184 ${band.y - 10}, 212 ${176}`}
                                color={band.color}
                                width="3"
                                opacity={band.opacity}
                                delay={index * 0.12}
                                className="UVVTransmissionVisual_ContinuumBand"
                            />
                        ))}
                    </g>

                    {/* wavelength-selection gate */}
                    <g className="UVVTransmissionVisual_Selector">
                        <rect
                            x="212"
                            y="124"
                            width="74"
                            height="104"
                            rx="16"
                            fill={`url(#${ids.hardwareGrad})`}
                            className="UVVTransmissionVisual_Hardware"
                        />
                        <rect
                            x="247"
                            y="138"
                            width="8"
                            height="76"
                            rx="4"
                            className="UVVTransmissionVisual_Slit"
                        />
                        <path
                            d="M 226 146 L 268 206 M 230 206 L 272 146"
                            className="UVVTransmissionVisual_GratingMarks"
                        />
                        <TechnicalLabel x="250" y="115">
                            slit / selector
                        </TechnicalLabel>
                    </g>

                    {/* selected incident beam */}
                    <g className="UVVTransmissionVisual_SelectedBeam">
                        <BeamPath
                            d="M 286 176 H 336"
                            color={`url(#${ids.beamGrad})`}
                            width="7"
                            opacity="0.96"
                            className="UVVTransmissionVisual_IncidentBeam"
                        />
                        <BeamPath
                            d="M 286 176 H 336"
                            color="var(--c-glow-1)"
                            width="2.4"
                            opacity="0.96"
                            filter={`url(#${ids.glow})`}
                            className="UVVTransmissionVisual_IncidentCore"
                        />
                        <TechnicalLabel x="312" y="164" className="UVVTransmissionVisual_IntensityLabel">
                            I₀
                        </TechnicalLabel>
                    </g>

                    {/* sample cell */}
                    <g className="UVVTransmissionVisual_SampleCell">
                        <rect
                            x="336"
                            y="106"
                            width="76"
                            height="140"
                            rx="15"
                            fill={`url(#${ids.glassGrad})`}
                            className="UVVTransmissionVisual_Cuvette"
                        />
                        <rect
                            x="350"
                            y="126"
                            width="48"
                            height="98"
                            rx="10"
                            className="UVVTransmissionVisual_Solution"
                        />
                        <path
                            d="M 350 150 C 362 144, 382 156, 398 148"
                            className="UVVTransmissionVisual_Meniscus"
                        />
                        <circle cx="362" cy="166" r="3.5" className="UVVTransmissionVisual_MoleculeDot" />
                        <circle cx="386" cy="184" r="3.5" className="UVVTransmissionVisual_MoleculeDot" />
                        <circle cx="370" cy="205" r="3.5" className="UVVTransmissionVisual_MoleculeDot" />
                        <TechnicalLabel x="376" y="97">
                            sample cell
                        </TechnicalLabel>
                    </g>

                    {/* attenuated transmitted beam */}
                    <g className="UVVTransmissionVisual_TransmittedBeam">
                        <BeamPath
                            d="M 412 176 H 594"
                            color={`url(#${ids.beamGrad})`}
                            width="4.8"
                            opacity="0.58"
                            className="UVVTransmissionVisual_TransmittedPath"
                        />
                        <BeamPath
                            d="M 412 176 H 594"
                            color="var(--c-glow-4)"
                            width="1.7"
                            opacity="0.72"
                            filter={`url(#${ids.glow})`}
                            className="UVVTransmissionVisual_TransmittedCore"
                        />
                        <TechnicalLabel x="498" y="164" className="UVVTransmissionVisual_IntensityLabel">
                            Iₜ &lt; I₀
                        </TechnicalLabel>
                    </g>

                    {/* detector / readout */}
                    <g className="UVVTransmissionVisual_Detector">
                        <rect
                            x="594"
                            y="124"
                            width="86"
                            height="108"
                            rx="20"
                            fill={`url(#${ids.detectorGrad})`}
                            className="UVVTransmissionVisual_DetectorBody"
                        />
                        <SignalBars />
                        <path
                            d="M 614 214 H 660"
                            className="UVVTransmissionVisual_ReadoutBaseline"
                        />
                        <TechnicalLabel x="637" y="115">
                            detector
                        </TechnicalLabel>
                        <TechnicalLabel x="637" y="250" className="UVVTransmissionVisual_ReadoutLabel">
                            <tspan x="637" dy="0">remaining</tspan>
                            <tspan x="637" dy="1.15em">radiant power</tspan>
                        </TechnicalLabel>
                    </g>
                </g>

                {/* small technical header */}
                <g className="UVVTransmissionVisual_Header">
                    <text x="24" y="258" className="UVVTransmissionVisual_Title">
                        absorption as transmission
                    </text>
                    <text x="24" y="277" className="UVVTransmissionVisual_Subtitle">
                        source → selected wavelength band → sample attenuation → transmitted intensity
                    </text>
                </g>
            </svg>

            <figcaption className="UVVTransmissionVisual_Caption">
                {CAPTION}
            </figcaption>
        </figure>
    );
}
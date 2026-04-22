import './quantizedLightVisual.css'

const LEVEL_X1 = 74;
const LEVEL_X2 = 290;
const LEVEL_CENTER_X = (LEVEL_X1 + LEVEL_X2) / 2;

const FIELD_LEFT_X = 350;
const FIELD_RIGHT_X = 670;
const FIELD_CENTER_X = (FIELD_LEFT_X + FIELD_RIGHT_X) / 2;
const FIELD_SPAN = FIELD_RIGHT_X - FIELD_LEFT_X;
const WAVE_START_X = FIELD_LEFT_X;

const LEVELS = [
    { id: 0, y: 350, label: 'GS' },
    { id: 1, y: 221, label: 'E1' },
    { id: 2, y: 116, label: 'E2' },
];

const GS_Y = LEVELS[0].y;
const E1_Y = LEVELS[1].y;
const WAVE_Y = E1_Y;

const WAVE_AMPLITUDE = 20;

const WAVE_PATH = `
    M ${FIELD_LEFT_X} ${WAVE_Y}
    C ${FIELD_LEFT_X + FIELD_SPAN * 0.08} ${WAVE_Y - WAVE_AMPLITUDE},
    ${FIELD_LEFT_X + FIELD_SPAN * 0.17} ${WAVE_Y - WAVE_AMPLITUDE},
    ${FIELD_LEFT_X + FIELD_SPAN * 0.25} ${WAVE_Y}
    C ${FIELD_LEFT_X + FIELD_SPAN * 0.33} ${WAVE_Y + WAVE_AMPLITUDE},
    ${FIELD_LEFT_X + FIELD_SPAN * 0.42} ${WAVE_Y + WAVE_AMPLITUDE},
    ${FIELD_LEFT_X + FIELD_SPAN * 0.50} ${WAVE_Y}
    C ${FIELD_LEFT_X + FIELD_SPAN * 0.58} ${WAVE_Y - WAVE_AMPLITUDE},
    ${FIELD_LEFT_X + FIELD_SPAN * 0.67} ${WAVE_Y - WAVE_AMPLITUDE},
    ${FIELD_LEFT_X + FIELD_SPAN * 0.75} ${WAVE_Y}
    C ${FIELD_LEFT_X + FIELD_SPAN * 0.83} ${WAVE_Y + WAVE_AMPLITUDE},
    ${FIELD_LEFT_X + FIELD_SPAN * 0.92} ${WAVE_Y + WAVE_AMPLITUDE},
    ${FIELD_RIGHT_X} ${WAVE_Y}
`;

export default function QuantizedInteractionVisualResponse() {
    return (
        <div className="qiVisual">
            <div className="qiAnimationStage" aria-label="Quantized interaction visual">
                <svg
                    className="qiSvg"
                    viewBox="0 0 720 380"
                    role="img"
                    aria-labelledby="qiTitle qiDesc"
                >
                    <defs>
                        <filter id="qiSoftGlow" x="-8%" y="-8%" width="116%" height="116%">
                            <feGaussianBlur stdDeviation="1.2" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <clipPath id="qiWaveClip">
                            <rect
                                x={FIELD_LEFT_X}
                                y={WAVE_Y - 18}
                                width={FIELD_RIGHT_X - FIELD_LEFT_X}
                                height="36"
                                rx="8"
                            />
                        </clipPath>
                    </defs>



                    <text 
                        x="62" 
                        y="48" 
                        className="qiSideLabel"
                    >
                        molecular eigenstates
                    </text>
                    <text
                        x={FIELD_CENTER_X}
                        y="48"
                        textAnchor="middle"
                        className="qiSideLabel"
                    >
                        radiation field
                    </text>

                    {LEVELS.map((level) => (
                        <g key={level.id}>
                        <line
                            x1={LEVEL_X1}
                            y1={level.y}
                            x2={LEVEL_X2}
                            y2={level.y}
                            className="qiLevel"
                        />
                        <text x="40" y={level.y + 5} className="qiEnergyLabel">
                            {level.label}
                        </text>
                        </g>
                    ))}

                    {/* left population marker */}
                    <circle 
                        cx={LEVEL_CENTER_X} 
                        cy={GS_Y} 
                        r="10" 
                        className="qiElectron" 
                    />

                    {/* emitted off-white dot traveling from E1 to the wave start */}
                    <circle r="6.5" className="qiEmissionDot">
                        <animate
                            attributeName="opacity"
                            dur="4.6s"
                            repeatCount="indefinite"
                            values="0;0;1;1;0;0"
                            keyTimes="0;0.30;0.3001;0.42;0.4201;1"
                        />
                        <animateMotion
                            dur="4.6s"
                            repeatCount="indefinite"
                            calcMode="linear"
                            keyTimes="0;0.30;0.3001;0.42;0.4201;1"
                            keyPoints="0;0;0;1;1;1"
                            path={`M ${LEVEL_CENTER_X} ${E1_Y} L ${WAVE_START_X} ${E1_Y}`}
                        />
                    </circle>

                    {/* wave packet */}
                    <g clipPath="url(#qiWaveClip)">
                        <g opacity="0">
                            <animate
                                attributeName="opacity"
                                dur="4.6s"
                                repeatCount="indefinite"
                                values="0;0;1;1;0;0"
                                keyTimes="0;0.45;0.4501;0.62;0.82;1"
                            />
                            <animateTransform
                                attributeName="transform"
                                type="translate"
                                dur="4.6s"
                                repeatCount="indefinite"
                                values="0 0; 0 0; 0 0; 34 0; 48 0; 48 0"
                                keyTimes="0;0.45;0.4501;0.62;0.82;1"
                            />
                            <path
                                d={WAVE_PATH}
                                className="qiField"
                                filter="url(#qiSoftGlow)"
                            />
                        </g>
                    </g>

                    <text
                        x={FIELD_CENTER_X}
                        y="300"
                        textAnchor="middle"
                        className="qiFrequencyLabel"
                    >
                        ν tuned to resonance
                    </text>
                </svg>
            </div>
            <div className="visualCaption">
                The field promotes population from the ground state to an excited state. During
                relaxation, emitted radiation propagates outward across the field region.
            </div>
        </div>
    );
}
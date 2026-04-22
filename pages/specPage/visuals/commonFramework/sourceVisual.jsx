import './sourceVisual.css'

// preset constants
const VIEWBOX = { width: 720, height: 360 };

const SOURCE = {
  cx: 108,
  cy: 182,
  outerRx: 52,
  outerRy: 78,
  innerRx: 26,
  innerRy: 54,
  apertureX: 146,
  apertureY: 150,
  apertureW: 18,
  apertureH: 64,
  apertureR: 9,
};

const BEAM = {
  startX: 156,
  midX: 320,
  endX: 620,
  y: 182,
};

const HALO = {
  r1: 64,
  r2: 86,
};

const SPARKS = [
  { x: 88, y: 128, r: 2.2 },
  { x: 118, y: 102, r: 1.8 },
  { x: 96, y: 240, r: 2.0 },
  { x: 126, y: 264, r: 1.6 },
];

const BEAM_PATH = `
  M ${BEAM.startX} ${BEAM.y}
  C ${BEAM.midX} ${BEAM.y - 2},
    ${BEAM.endX - 120} ${BEAM.y + 2},
    ${BEAM.endX} ${BEAM.y}
`;

/** Helper Functions */
// function for tiny spark renderer
function renderSourceSparks(sparks) {
  return sparks.map((spark, i) => (
    <circle
      key={`spark-${i}`}
      cx={spark.x}
      cy={spark.y}
      r={spark.r}
      className="SVSpark"
      fill="var(--c-glow-1)"
      opacity="0.78"
      filter="url(#sSVBlurs)"
    />
  ));
}

// function for beam layer renderer
function renderBeamLayer(
  className,
  {
    stroke = 'url(#SVBeamGradient)',
    strokeWidth = 8,
    opacity = 1,
    filter,
  } = {}
) {
  return (
    <path
      d={BEAM_PATH}
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={opacity}
      filter={filter}
    />
  );
}

// function for source ring renderer
function renderHalo(
  cx,
  cy,
  rx,
  ry,
  className,
  {
    fill = 'url(#SVSourceGlow)',
    opacity = 1,
    filter,
    stroke,
    strokeWidth,
  } = {}
) {
  return (
    <ellipse
      cx={cx}
      cy={cy}
      rx={rx}
      ry={ry}
      className={className}
      fill={fill}
      opacity={opacity}
      filter={filter}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
}


export default function SourceVisualResponse() {
  return (
    <div className="SVStage" aria-label="Source beginning the measurement">
      <div className="SVBackground">
        <svg 
          className ="SVSVG"
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          role="img"
        >
          <defs>
            {/* soft blur filters */}
            <filter id="SVBlurL" x="-25%" y="-40%" width="150%" height="180%">
              <feGaussianBlur stdDeviation="18" />
            </filter>

            <filter id="SVBlurM" x="-20%" y="-30%" width="140%" height="160%">
              <feGaussianBlur stdDeviation="10" />
            </filter>

            <filter id="SVBlurS" x="-12%" y="-18%" width="124%" height="136%">
              <feGaussianBlur stdDeviation="4" />
            </filter>

            {/* beam gradient */}
            <linearGradient
              id="SVBeamGradient"
              x1={BEAM.startX}
              y1={BEAM.y}
              x2={BEAM.endX}
              y2={BEAM.y}
              gradientUnits="userSpaceOnUse"
            >
              <stop
                offset="0%"
                stopColor="var(--c-glow-1)"
                stopOpacity="0.98"
              />
              <stop
                offset="40%"
                stopColor="var(--c-glow-2)"
                stopOpacity="0.92"
              />
              <stop
                offset="72%"
                stopColor="var(--c-glow-1)"
                stopOpacity="0.72"
              />
              <stop
                offset="100%"
                stopColor="var(--c-glow-3)"
                stopOpacity="0.28"
              />
            </linearGradient>

            {/* source glow radial gradient */}
            <radialGradient
              id="SVSourceGlow"
              cx={SOURCE.cx}
              cy={SOURCE.cy}
              r={HALO.r2}
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--c-glow-1)" stopOpacity="0.98" />
              <stop offset="34%" stopColor="var(--c-glow-2)" stopOpacity="0.78" />
              <stop offset="66%" stopColor="var(--c-glow-3)" stopOpacity="0.24" />
              <stop offset="100%" stopColor="var(--c-glow-2)" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g className="SVSource">
            {/* outer housing */}
            <ellipse
              cx={SOURCE.cx}
              cy={SOURCE.cy}
              rx={SOURCE.outerRx}
              ry={SOURCE.outerRy}
              className="SVSourceShell"
              fill="color-mix(in oklab, var(--c-primary-2) 76%, var(--c-ink))"
              stroke="color-mix(in oklab, var(--c-glow-2) 42%, var(--text) 18%)"
              strokeWidth="1.5"
            />
            {/* outer halo */}
            {renderHalo(
              SOURCE.cx, 
              SOURCE.cy, 
              HALO.r2, 
              HALO.r2 * 0.82, 
              'SVHaloOuter',
              {
                opacity: 0.55,
                filter: 'url(#SVBlurL)'
              }
            )}
            {/* inner halo */}
            {renderHalo(
              SOURCE.cx, 
              SOURCE.cy, 
              HALO.r1, 
              HALO.r1 * 0.8, 
              'SVHaloInner',
              {
                opacity: 0.82,
                filter: 'url(#SVBlurM)'
              }
            )}
            {/* source core */}
            <ellipse
              cx={SOURCE.cx}
              cy={SOURCE.cy}
              rx={SOURCE.innerRx}
              ry={SOURCE.innerRy}
              className="SVSourceCore"
              fill="url(#SVSourceGlow)"
              opacity="0.96"
              filter="url(#SVBlurS)"
            />
            {/* emitter slit / aperture */}
            <rect
              x={SOURCE.apertureX}
              y={SOURCE.apertureY}
              width={SOURCE.apertureW}
              height={SOURCE.apertureH}
              rx={SOURCE.apertureR}
              className="SVAperture"
              fill="var(--c-glow-1)"
              opacity="0.92"
              filter="url(#SVBlurS)"
            />
            {/* tiny sparks */}
            {renderSourceSparks(SPARKS)}
          </g>

          <g className="SVEmission">
            {/* beam glow */}
            {renderBeamLayer('SVBeamGlow', {
              strokeWidth: 24,
              opacity: 0.32,
              filter: 'url(#SVBlurL)'
            })}
            {/* beam ribbon */}
            {renderBeamLayer('SVBeamRibbon', {
              strokeWidth: 14,
              opacity: 0.48,
              filter: 'url(#SVBlurM)'
            })}
            {/* beam core */}
            {renderBeamLayer('SVBeamCore', {
              strokeWidth: 6,
              opacity: 0.96
            })}
            {/* optional traveling pulse highlight */}
            <path 
              d={BEAM_PATH} 
              className="SVBeamPulse" 
              fill="none"
              stroke="url(#SVBeamGradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
              filter="url(#SVBlurS)"
            />
          </g>

          <g className="SVAmbient">
            {/* faint dust / shimmer / residual line */}
            <line 
              x1="180" 
              y1="182" 
              x2="650" 
              y2="182" 
              className="SVResidualLine"
              stroke="url(#SVBeamGradient)"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.22"
              filter="url(#SVBlurS)"
            />
          </g>

          <g className="SVLabels" aria-hidden="true">
            <text
              x="82"
              y="85"
              className="SVLabelText SVLabelText--source"
            >
              source
            </text>

            <text
              x="440"
              y="152"
              className="SVLabelText SVLabelText--beam"
            >
              outgoing signal
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}
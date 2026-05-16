import React, { useId } from "react";
import './NMRInstrumentSignalFlowVisual.css';

const CANVAS = {
  width: 700,
  height: 500,
  padding: 5,
};

const VIEWBOX = `0 0 ${CANVAS.width} ${CANVAS.height}`;

const CENTER = {
  x: CANVAS.width / 2,
  y: CANVAS.height / 2,
};

const PANEL = {
  x: CANVAS.padding,
  y: CANVAS.padding,
  width: CANVAS.width - CANVAS.padding * 2,
  height: CANVAS.height - CANVAS.padding * 2,
  rx: 28,
};

const NMRMAGNET = { 
    path: "M157 0.503906V151.504H295V0.503906L425 1.50391H436.5L440.5 3.50391L444 7.00391L447 11.0039L449.5 18.0039V331.504L448 335.504L445.5 338.504L442 341.504L438 344.004L433.5 346.004H16.5L12.5 345.004L8.5 343.004L4.5 338.504L2 333.504L0.5 328.004V14.5039L2.5 10.5039L6.5 6.00391L11.5 2.00391L17.5 0.503906H157Z",
    scale: 0.55,
    x: CENTER.x - 250,
    y: CENTER.y - 100,
};

const NMRCENTERGAP = {
    path: "M15 1.5L21 0.5L245 1L249 2L253.5 5L257.5 8.5L259.5 12.5L261 17.5V83V88L259 91L255.5 94.5L250.5 97.5L244 98.5H15.5L10 97L6 93.5L3.5 90L1.5 86.5L0.5 80.5V20.5V16L3.5 10L8 5.5L15 1.5Z",
    scale: 0.55,
    x: CENTER.x - 198,
    y: CENTER.y - 17.5,
};

const SAMPLECUVETTE = {
    path: "M4.5 227.5L0.5 218V0.5H55V218L52 224.5L44 232.5L34.5 239H18.5L11 235L4.5 227.5Z",
    scale: 0.55,
    x: CENTER.x - 140,
    y: CENTER.y - 130,
};

const MAGNETCOIL = {
    path: "M0.5 140.5V6.5L5.5 0.5H14L18 4.5V10.5M14 103L15.5 109.5L18 113L23 115.5L27 113L31.5 106.5V93L34 88.5V62.5L36.5 57.5V41.5L39.5 37V8.5L43 4.5L46.5 0.5H53L57.5 4.5L59.5 8.5V10.5M54.1838 104.052L55.6838 110.552L58.1838 114.052L63.1838 116.552L67.1838 114.052L71.6838 107.552V94.0523L74.1838 89.5523V63.5523L76.6838 58.5523V42.5523L79.6838 38.0523V9.5523L83.1838 5.5523L86.6838 1.5523H93.1838L97.6838 5.5523L99.6838 9.5523V11.5523M93.1838 104.053L94.6838 110.553L97.1838 114.053L102.184 116.553L106.184 114.053L110.684 107.553V94.0528L113.184 89.5528V63.5528L115.684 58.5528V42.5528L118.684 38.0528V9.55278L122.184 5.55278L125.684 1.55278H132.184L136.684 5.55278L138.684 9.55278V11.5528M134 105.668L135.5 112.168L138 115.668L143 118.168L147 115.668L151.5 109.168V95.6684L154 91.1684V65.1684L156.5 60.1684V44.1684L159.5 39.6684V11.1684L163 7.16837L166.5 3.16837H173L177.5 7.16837L179.5 11.1684V13.1684M179.5 140.5V107.553",
    scale: 0.56,
    x: CENTER.x - 175,
    y: CENTER.y + 30,
};

const SAMPLECOIL = {
    path: "M6.51752 19.916L1.51752 21.416L0.517517 25.416L1.51752 29.416L4.51752 32.916L8.01752 34.416H58.5175L62.5175 35.916L64.0175 38.416V41.416L61.0175 44.416M61.0175 19.916L62.5175 17.916L63.0175 15.416V13.416L61.0175 9.91602H1.51752L0.517517 5.91602L1.51752 2.41602L4.51752 0.416016M6.51752 42.916L1.51752 44.416L0.517517 48.416L1.51752 52.416L4.51752 55.916L8.01752 57.416H58.5175L62.5175 58.916L64.0175 61.416V64.416L61.0175 67.416M6.51752 67.416L1.51752 68.916L0.517517 72.916L1.51752 76.916L4.51752 80.416L8.01752 81.916H58.5175L62.5175 83.416L64.0175 85.916V88.916L61.0175 91.916",
    scale: 0.56,
    x: CENTER.x - 142,
    y: CENTER.y - 70,
};

const SIGNAL_BLOCK = {
    width: 150,
    height: 80,
    rx: 20,
};

const SIGNAL_BLOCK_START_X =
  CENTER.x - 200;

const READOUT_SIGNAL_PATH =
    "M0 112.023H13H23.5H36H44.5H52L56.5 105.523L62 94.5232L65.5 82.0232L67.5 70.0232L70 53.5232L72 37.5232L74 21.5232L75 0.0231934L76 21.5232L77 37.5232L78 53.5232L79.5 70.0232L81 82.0232L84 94.5232L91 105.523L97.5 112.023H114H132H153H175.5H206.5";

const READOUT_SIGNAL = {
    scale: 0.4,
    xOffset: 30,
    yOffset: 10,
};

function VisualGradients({ bgId, magnetId, sampleId }) {
    return (
        <defs>
            {/* background gradient */}
            <linearGradient id={bgId} x1="0" y1="0" x2="0" y2={CANVAS.height} gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="color-mix(in oklab, var(--bg) 88%, var(--accent) 12%)" />
                <stop offset="55%" stopColor="color-mix(in oklab, var(--bg) 94%, var(--accent-2) 6%)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--bg) 90%, black 10%)" />
            </linearGradient>

            {/* magnet gradient */}
            <linearGradient
                id={magnetId}
                x1="0"
                y1="0"
                x2="450"
                y2="346"
                gradientUnits="userSpaceOnUse"
            >
                <stop
                    offset="0%"
                    stopColor="color-mix(in oklab, var(--accent-3) 80%, white 20%)"
                />
                <stop
                    offset="100%"
                    stopColor="color-mix(in oklab, var(--accent) 85%, black 15%)"
                />
            </linearGradient>

            {/* sample gradient */}
            <radialGradient id={sampleId} cx="50%" cy="42%" r="65%">
                <stop offset="0%" stopColor="color-mix(in oklab, var(--accent-2) 55%, white 45%)" />
                <stop offset="65%" stopColor="color-mix(in oklab, var(--accent-2) 55%, transparent 45%)" />
                <stop offset="100%" stopColor="color-mix(in oklab, var(--accent) 35%, transparent 65%)" />
            </radialGradient>
        </defs>
    );
}

function BackgroundVisual({ bgId }) {
  return (
    <g className="NMInstrumentSignalFlow_Background">
      {/* outer visual panel */}
      <rect
        x={PANEL.x}
        y={PANEL.y}
        width={PANEL.width}
        height={PANEL.height}
        rx={PANEL.rx}
        fill={`url(#${bgId})`}
        className="NMInstrumentSignalFlow_Panel"
      />

      {/* soft inner grid / stage */}
      <path
        d={`
          M ${PANEL.x + 34} ${CENTER.y}
          H ${PANEL.x + PANEL.width - 34}
        `}
        className="NMInstrumentSignalFlow_CenterLine"
      />

    </g>
  );
}

function NMRComponents({ magnetId, bgId, sampleId }) {
    return (
        <g className="NMInstrumentSignalFlow_Components">
        {/* base NMR instrument body */}
            <path
                d={NMRMAGNET.path}
                fill={`url(#${magnetId})`}
                className="NMInstrumentSignalFlow_MagnetBody"
                transform={`
                    translate(${NMRMAGNET.x} ${NMRMAGNET.y})
                    scale(${NMRMAGNET.scale})
                `}
            />
            <path 
                d={NMRCENTERGAP.path}
                fill={`url(#${bgId})`}
                className="NMRInstrumentSignalFlow_MagnetCenterBody"
                transform={`
                    translate(${NMRCENTERGAP.x} ${NMRCENTERGAP.y})
                    scale(${NMRCENTERGAP.scale})
                `}
            />

            <path
                d={SAMPLECUVETTE.path}
                fill={`url(#${sampleId})`}
                className="NMRInstrumentSignalFlow_CUVETTE"
                transform={`
                    translate(${SAMPLECUVETTE.x} ${SAMPLECUVETTE.y})
                    scale(${SAMPLECUVETTE.scale})  
                `}
            />

            <path 
                d={MAGNETCOIL.path}
                className="NMRInstrumentSignalFlow_MAGNETCOIL"
                transform={`
                    translate(${MAGNETCOIL.x} ${MAGNETCOIL.y})
                    scale(${MAGNETCOIL.scale})     
                `}
            />

            <path 
                d={SAMPLECOIL.path}
                className="NMRInstrumentSignalFlow_SAMPLECOIL"
                transform={`
                    translate(${SAMPLECOIL.x} ${SAMPLECOIL.y})
                    scale(${SAMPLECOIL.scale})    
                `}
            />
        </g>
    );
}

function NMRSignalBlocks({ magnetId }) {
    const blocks = [
        {
            id: "magnet-fill",
            label: ["Magnet", "Controller"],
            x: SIGNAL_BLOCK_START_X,
            y: CENTER.y + 110,
            fill: `url(#${magnetId})`,
        },
        {
            id: "accent-fill-1",
            label: "detector",
            x: SIGNAL_BLOCK_START_X + 250,
            y: CENTER.y - 85,
            fill: "var(--accent-3)",
        },
        {
            id: "accent-fill-2",
            label: ["RF", "Pulse"],
            x: SIGNAL_BLOCK_START_X + 370,
            y: CENTER.y - 180,
            fill: "var(--accent-3)",
        },
    ];

    return (
        <g className="NMInstrumentSignalFlow_SignalBlocks">
            {blocks.map((block) => {
                const labelLines = Array.isArray(block.label)
                ? block.label
                : [block.label];

                return (
                    <g key={block.id} className="NMInstrumentSignalFlow_SignalBlockGroup">
                        <rect
                            x={block.x}
                            y={block.y}
                            width={SIGNAL_BLOCK.width}
                            height={SIGNAL_BLOCK.height}
                            rx={SIGNAL_BLOCK.rx}
                            fill={block.fill}
                            className="NMInstrumentSignalFlow_SignalBlock"
                        />

                        <text
                            x={block.x + SIGNAL_BLOCK.width / 2}
                            y={block.y + SIGNAL_BLOCK.height / 2}
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="NMInstrumentSignalFlow_SignalBlockText"
                        >
                            {labelLines.map((line, index, arr) => (
                                <tspan
                                    key={`${block.id}-${line}`}
                                    x={block.x + SIGNAL_BLOCK.width / 2}
                                    dy={
                                        arr.length === 1
                                        ? "0.2em"
                                        : index === 0
                                            ? `${-(arr.length - 1) * 0.38}em`
                                            : "1em"
                                    }
                                >
                                    {line}
                                </tspan>
                            ))}
                        </text>
                    </g>
                );
            })}
        </g>
    );
}

const CONNECTING_LINES = [
    {
        id: "rf-pulse-to-sample",
        d: `
            M ${CENTER.x + 170} ${CENTER.y - 120}
            H 250 V 210 H 240
        `,
    },
    {
        id: "sample-to-detector",
        d: `
            M ${CENTER.x + 50} ${CENTER.y - 30}
            H 240
            M ${CENTER.x + 50} ${CENTER.y - 60}
            H 240
        `,
    },
    {
        id: "detector-to-computer",
        d: `
            M ${CENTER.x + 190} ${CENTER.y + 140}
            H 440 V 245
        `,
    },
    {
        id: "magnet-to-computer",
        d: `
            M ${CENTER.x + 250} ${CENTER.y + 175}
            V 470 H 220 V440
        `,
    },
];

const ARROW_HEAD = {
  size: 5,
};

function RightArrowHead({ x, y }) {
  const s = ARROW_HEAD.size;

  return (
    <polygon
      points={`
        ${x + s},${y}
        ${x - s},${y - s}
        ${x - s},${y + s}
      `}
      className="NMRInstrumentSignalFlow_ConnectingArrowHead"
    />
  );
}

function UpArrowHead({ x, y }) {
    const s = ARROW_HEAD.size;

    return (
        <polygon
            points={`
                ${x},${y - s}
                ${x - s},${y + s}
                ${x + s},${y + s}
            `}
            className="NMRInstrumentSignalFlow_ConnectingArrowHead"
        />
    );
}

function NMRConnectingLines() {
    return (
        <g className="NMRInstrumentSignalFlow_ConnectingLines">
            {CONNECTING_LINES.map((line) => (
                <path
                    key={line.id}
                    d={line.d}
                    className="NMRInstrumentSignalFlow_ConnectingLine"
                />
            ))}


            <RightArrowHead
                x={CENTER.x + 190}
                y={CENTER.y + 140}
            />

            <UpArrowHead
                x={600}
                y={420}
            />
        </g>
    );
}

function NMRReadoutSignalBox() {
    const box = {
        id: "muted-fill",
        x: SIGNAL_BLOCK_START_X + 380,
        y: CENTER.y + 100,
        fill: "var(--text)",
    };

    const signalX = box.x + READOUT_SIGNAL.xOffset;
    const signalY = box.y + READOUT_SIGNAL.yOffset;

    const arrow = {
        x: box.x + 18,
        y: box.y + SIGNAL_BLOCK.height - 16,
        upLength: 46,
        rightLength: 112,
        head: 6,
    };


    return (
        <g className="NMInstrumentSignalFlow_ReadoutSignalBox">
            {/* readout block */}
            <rect
                x={box.x}
                y={box.y}
                width={SIGNAL_BLOCK.width}
                height={SIGNAL_BLOCK.height}
                rx={SIGNAL_BLOCK.rx}
                fill={box.fill}
                className="NMInstrumentSignalFlow_SignalBlock"
            />

            <line
                x1={arrow.x}
                y1={arrow.y}
                x2={arrow.x}
                y2={arrow.y - arrow.upLength}
                className="NMInstrumentSignalFlow_ReadoutArrowLine"
            />
            <polygon
                points={`
                ${arrow.x},${arrow.y - arrow.upLength - 10}
                ${arrow.x - arrow.head},${arrow.y - arrow.upLength + arrow.head - 5}
                ${arrow.x + arrow.head},${arrow.y - arrow.upLength + arrow.head - 5}
                `}
                className="NMInstrumentSignalFlow_ReadoutArrowHead"
            />

            <line
                x1={arrow.x}
                y1={arrow.y}
                x2={arrow.x + arrow.rightLength}
                y2={arrow.y}
                className="NMInstrumentSignalFlow_ReadoutArrowLine"
            />
            <polygon
                points={`
                ${arrow.x + arrow.rightLength + 10},${arrow.y}
                ${arrow.x + arrow.rightLength - arrow.head + 3},${arrow.y - arrow.head}
                ${arrow.x + arrow.rightLength - arrow.head + 3},${arrow.y + arrow.head}
                `}
                className="NMInstrumentSignalFlow_ReadoutArrowHead"
            />


            {/* signal trace inside readout block */}
            <path
                d={READOUT_SIGNAL_PATH}
                className="NMInstrumentSignalFlow_ReadoutSignal"
                transform={`
                translate(${signalX} ${signalY})
                scale(${READOUT_SIGNAL.scale})
                `}
            />
        </g>
    );
}

function NMRVisualLabels() {
    return (
        <g className="NMRInstrumentSignalFlow_Labels">
            <text
                x={SIGNAL_BLOCK_START_X + 300}
                y={CENTER.y + 135}
                className="NMRInstrumentSignalFlow_Label NMRInstrumentSignalFlow_Label--absorption"
            >
                Absorption
            </text>
            <text
                x={CENTER.x + 50}
                y={CENTER.y + 210}
                textAnchor="middle"
                className="NMRInstrumentSignalFlow_Label NMRInstrumentSignalFlow_Label--b0"
            >
                B₀
            </text>
            <text
                x={SIGNAL_BLOCK_START_X + 40}
                y={CENTER.y - 140}
                className="NMRInstrumentSignalFlow_Label"
            >
                Sample
            </text>
            <text
                x={CENTER.x - 205}
                y={CENTER.y - 50}
                textAnchor="middle"
                className="NMRInstrumentSignalFlow_Label"
            >
                Magnet
            </text>
        </g>
    );
}

export default function NMInstrumentSignalFlow() {
    const rawId = useId().replace(/:/g, "-");

    const bgId = `${rawId}-nm-bg-gradient`;
    const magnetId = `${rawId}-nm-magnet-gradient`;
    const sampleId = `${rawId}-nm-sample-gradient`;

    return (
        <figure className="NMRInstrumentSignalFlowCanvas">
            <svg
                className="NMInstrumentSignalFlow"
                viewBox={VIEWBOX}
                role="img"
            >

                <VisualGradients bgId={bgId} magnetId={magnetId} sampleId={sampleId} />

                <BackgroundVisual bgId={bgId} />
                <g className="NMRInstrumentSignalFlowVisual_Transform" transform="translate(-20 -20)" >
                    <NMRComponents magnetId={magnetId} bgId={bgId} sampleId={sampleId} />
                    <NMRSignalBlocks magnetId={magnetId} />
                    <NMRReadoutSignalBox />
                    <NMRConnectingLines />
                    <NMRVisualLabels />
                </g>

            </svg>
            <figcaption className="NMRInstrumentSignalFlowCaption">
                Simplified NMR signal flow: the magnet controller maintains a stable B₀ field, the Radio Frequency (RF) coil perturbs the spin ensemble with a B₁ pulse, and the receiver coil detects the induced free-induction decay. The readout processes this time-domain response into the final frequency-domain spectrum.
            </figcaption>
        </figure>
    );
}
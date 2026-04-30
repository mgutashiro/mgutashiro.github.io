import './specObservablesVisual.css';

const gsLines = [0, 1, 2, 3];
const s1Lines = [0, 1, 2, 3, 4];
const s2Lines = [0, 1, 2, 3, 4];
const tLines = [0, 1, 2, 3, 4];

export default function SpectroscopicObservablesVisualResponse() {
    return (
        <div className="SOVWrap">

            <div className="SOVBox">
                <div className="SOVJablonskiBase">
                    <svg
                        className="SOVJablonksiSVG"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid meet"
                        aria-hidden="true"
                    >

                        <defs>
                            <path
                                id="SOVArrowTipShape" 
                                d="M-2.2,3.6 L0,0 L2.2,3.6 Z"
                            />

                            <marker
                                id="sovArrowHeadElectron"
                                markerWidth="3"
                                markerHeight="3"
                                refX="2.2"
                                refY="1.5"
                                orient="auto"
                                markerUnits="strokeWidth"
                            >
                                <path
                                    d="M0,0 L3,1.5 L0,3 Z"
                                    className="ElectronArrowHead"
                                />
                            </marker>
                        </defs>

                        {/* GS */}
                        {gsLines.map((i) => (
                            <line 
                                key={`gs-${i}`}
                                x1="-30"
                                x2="140"
                                y1={90 - i * 2}
                                y2={90 - i * 2}
                                className={`SOVEnergyLine ${i > 0 ? 'thin' : ''}`}
                            />
                        ))}

                        {/* S1 */}
                        {s1Lines.map((i) => (
                            <line 
                                key={`s1-${i}`}
                                x1="-30"
                                x2="20"
                                y1={32 - i * 2}
                                y2={32 - i * 2}
                                className={`SOVEnergyLine ${i > 0 ? 'thin' : ''}`}
                            />
                        ))}

                        {/* S2 */}
                        {s2Lines.map((i) => (
                            <line 
                                key={`s2-${i}`}
                                x1="-30"
                                x2="20"
                                y1={12 - i * 2}
                                y2={12 - i * 2}
                                className={`SOVEnergyLine ${i > 0 ? 'thin' : ''}`}
                            />
                        ))}

                        {/* T1 */}
                        {tLines.map((i) => (
                            <line 
                                key={`t-${i}`}
                                x1="95"
                                x2="135"
                                y1={45 - i * 2}
                                y2={45 - i * 2}
                                className={`SOVEnergyLine ${i > 0 ? 'thin' : ''}`}
                            />
                        ))}

                        {/* Energy Level Labels */}
                        <text x="-39" y="12.8" className="SOVStateLabel">
                            S<tspan className="SOVStateSub">2</tspan>
                        </text>
                        <text x="-39" y="32.8" className="SOVStateLabel">
                            S<tspan className="SOVStateSub">1</tspan>
                        </text>
                        <text x="88" y="45.8" className="SOVStateLabel">
                            T<tspan className="SOVStateSub">1</tspan>
                        </text>
                        <text x="-42" y="90.8" className="SOVStateLabel">
                            GS
                        </text>

                        

                        {/* GS -> S2 absorption arrow */}
                        <g className="SOVArrowGroup SOVArrowGroupAbsS2">
                            {/* shaft */}
                            <path
                                d="M-20 90 L-20 5.5"
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowAbsS2"
                            />

                            {/* arrowhead (perfectly aligned to line) */}
                            <use
                                href="#SOVArrowTipShape"
                                x="-20"
                                y="4"
                                className="SOVArrowTip SOVArrowTipAbsS2"
                            />

                            <text
                                x="-30"
                                y="70"
                                textAnchor="start"
                                transform="rotate(-90 -30 70)"
                                className="SOVArrowLabel SOVArrowLabelAbsS2"
                            >
                                Abs
                            </text>
                        </g>

                        {/* GS → S1 absorption arrow */}
                        <g className="SOVArrowGroup SOVArrowGroupAbsS1">
                            <path
                                d="M-25 90 L-25 33.5"
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowAbsS1"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="-25"
                                y="32"
                                className="SOVArrowTip SOVArrowTipAbsS1"
                            />
                        </g>

                        {/* S1 → GS Fluorescence */}
                        <g className="SOVArrowGroup SOVArrowGroupFluor">
                            <path
                                d="M-5 32 L-5 88"
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowFluor"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="-5"
                                y="93"
                                transform="rotate(180 -5 90)"
                                className="SOVArrowTip SOVArrowTipFluor"
                            />

                            <text
                                x="-10"
                                y="72"
                                textAnchor="start"
                                transform="rotate(-90 -10 72)"
                                className="SOVArrowLabel SOVArrowLabelFluor"
                            >
                                Fluor
                            </text>
                        </g>

                        {/* S1 → GS Phosphorescence */}
                        <g className="SOVArrowGroup SOVArrowGroupPhosp">
                            <path
                                d="M115 45 L115 88"
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowPhosp"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="115"
                                y="93"
                                transform="rotate(180 115 90)"
                                className="SOVArrowTip SOVArrowTipPhosp"
                            />

                            <text
                                x="110"
                                y="75"
                                textAnchor="start"
                                transform="rotate(-90 110 75)"
                                className="SOVArrowLabel SOVArrowLabelPhosp"
                            >
                                Phosp
                            </text>
                        </g>

                        {/* S2 IC downward arrow */}
                        <g className="SOVArrowGroup SOVArrowGroupICS2">
                            <path
                                d="
                                    M0 4
                                    L-1 5.2
                                    L1 6.4
                                    L-1 7.6
                                    L1 8.8
                                    L0 10

                                "
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowICS2"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="0"
                                y="8"
                                transform="rotate(180 0 8) scale(0.85)"
                                className="SOVArrowTip SOVArrowTipICS2"
                            />
                        </g>

                        {/* S2 → S1 IC downward arrow */}
                        <g className="SOVArrowGroup SOVArrowGroupICS2toS1">
                            <path
                                d="
                                    M1 12
                                    L0 14.2
                                    L2 16.4
                                    L0 18.6
                                    L2 20.8
                                    L1 23
                                "
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowICS2S1"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="1.5"
                                y="18"
                                transform="rotate(180 1.5 18) scale(0.85)"
                                className="SOVArrowTip SOVArrowTipICS2S1"
                            />

                            <text
                                x="-2"
                                y="17.5"
                                textAnchor="end"
                                className="SOVArrowLabel SOVArrowLabelIC"
                            >
                                IC
                            </text>

                        </g>

                        {/* T1 IC arrow */}
                        <g className="SOVArrowGroup SOVArrowGroupICT1">
                            <path
                                d="
                                    M102 37
                                    L103 38.6
                                    L101 40.2
                                    L103 41.8
                                    L101 43.4
                                    L102 44
                                "
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowICT1"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="88.5"
                                y="37"
                                transform="rotate(180 88.5 37) scale(0.85)"
                                className="SOVArrowTip SOVArrowTipICT1"
                            />
                        </g>

                        {/* S1 IC arrow */}
                        <g className="SOVArrowGroup SOVArrowGroupICS1">
                            <path
                                d="
                                    M0 24
                                    L-1 25.6
                                    L1 27.2
                                    L-1 28.8
                                    L1 29.8
                                "
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowICS1"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="0"
                                y="25"
                                transform="rotate(180 0 25) scale(0.85)"
                                className="SOVArrowTip SOVArrowTipICS1"
                            />
                        </g>

                        {/* FRET */}
                        <g className="SOVArrowGroup SOVArrowGroupFRET">
                            <path
                                d="
                                    M15 18
                                    M20 19.5
                                    L30 16.5
                                    L40 19.5
                                    L50 16.5
                                    L60 19.5
                                    L70 16.5
                                    L80 19.5
                                    L85 18
                                "
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowFRET"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="85"
                                y="0"
                                transform="rotate(90 85 0) scale(1.2)"
                                className="SOVArrowTip SOVArrowTipFRET"
                            />

                            <text
                                x="50"
                                y="5"
                                textAnchor="start"
                                className="SOVArrowLabel SOVArrowLabelFRET"
                            >
                                <tspan x="50" dy="0">
                                    Nonradiative Dissipation:
                                </tspan>
                                <tspan x="57" dy="5">
                                    Quenching + FRET
                                </tspan>
                            </text>
                        </g>

                        {/* ISC */}
                        <g className="SOVArrowGroup SOVArrowGroupISC">
                            <path
                                d="M20 32 L95 37"
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowISC"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="95"
                                y="35"
                                transform="rotate(100 95 35)"
                                className="SOVArrowTip SOVArrowTipISC"
                            />

                            <text
                                x="50"
                                y="32"
                                textAnchor="middle"
                                className="SOVArrowLabel SOVArrowLabelISC"
                            >
                                ISC
                            </text>
                        </g>


                        {/* Electron upfacing static arrow */}
                        <line
                            x1="10"
                            y1="90"
                            x2="10"
                            y2="84"
                            className="ElectronArrow GSUp"
                            markerEnd="url(#sovArrowHeadElectron)"
                        />
                        
                        <line
                            x1="15"
                            y1="84"
                            x2="15"
                            y2="90"
                            className="ElectronArrow GSDown"
                            markerEnd="url(#sovArrowHeadElectron)"
                        />

                        <line
                            x1="15"
                            y1="32"
                            x2="15"
                            y2="26"
                            className="ElectronArrow S1Down"
                            markerEnd="url(#sovArrowHeadElectron)"
                        />

                        <line
                            x1="130"
                            y1="39"
                            x2="130"
                            y2="45"
                            className="ElectronArrow T1Up"
                            markerEnd="url(#sovArrowHeadElectron)"
                        />

                        <line
                            x1="130"
                            y1="90"
                            x2="130"
                            y2="84"
                            className="ElectronArrow GSUp"
                            markerEnd="url(#sovArrowHeadElectron)"
                        />
                        
                    </svg>
                </div>

                <div className="SOVSpecBase">
                    <svg
                        className="SOVSpecSVG"
                        viewBox="12 0 114 108"
                        preserveAspectRatio="xMinYMax meet"
                        aria-hidden="true"
                    >
                        {/* Y axis */}
                        <line
                            x1="50"
                            y1="5"
                            x2="50"
                            y2="125"
                            className="SOVSpecAxis"
                        />

                        { /* X axis */}
                        <line
                            x1="50"
                            y1="125"
                            x2="378"
                            y2="125"
                            className="SOVSpecAxis"
                        />

                        {/* X-axis label */}
                        <text
                            x="223"
                            y="145"
                            textAnchor="middle"
                            className="SOVSpecLabel"
                        >
                            Wavelength
                        </text>

                        {/* Y-axis label */}
                        <text
                            x="40"
                            y="65"
                            transform="rotate(-90 40 65)"
                            textAnchor="middle"
                            className="SOVSpecLabel"
                        >
                            Intensity
                        </text>

                        {/* Spectral sticks */}
                        <g className="SOVSpecStickGroup SOVSpecStickGroupAbsS1">
                            <line
                                x1="100"
                                y1="125"
                                x2="100"
                                y2="24"
                                className="SOVSpecStick SOVSpecStickAbsS1"
                            />
                        </g>

                        <g className="SOVSpecStickGroup SOVSpecStickGroupAbsS2">
                            <line
                                x1="115"
                                y1="125"
                                x2="115"
                                y2="38"
                                className="SOVSpecStick SOVSpecStickAbsS2"
                            />
                        </g>

                        <g className="SOVSpecStickGroup SOVSpecStickGroupFluor">
                            <line
                                x1="253"
                                y1="125"
                                x2="253"
                                y2="73"
                                className="SOVSpecStick SOVSpecStickFluor"
                            />
                        </g>

                        <g className="SOVSpecStickGroup SOVSpecStickGroupPhosp">
                            <line
                                x1="323"
                                y1="125"
                                x2="323"
                                y2="90"
                                className="SOVSpecStick SOVSpecStickPhosp"
                            />
                        </g>

                    </svg>
                </div>
            </div>

            <div className="SOVDescription">
                Jablonski-style diagram of ground, singlet, and triplet manifolds with 
                vibrational ladders and spin states, illustrating absorption, 
                internal conversion, intersystem crossing, fluorescence, 
                phosphorescence, and nonradiative decay, with 
                resulting stick spectra as measurable observables.
            </div>

        </div>
    );
}
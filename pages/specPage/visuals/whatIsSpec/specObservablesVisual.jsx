import './specObservablesVisual.css';

const gsLines = [0, 1, 2];
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
                        preserveAspectRatio="none"
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
                                x1="10"
                                x2="90"
                                y1={90 - i * 2}
                                y2={90 - i * 2}
                                className={`SOVEnergyLine ${i > 0 ? 'thin' : ''}`}
                            />
                        ))}

                        {/* S1 */}
                        {s1Lines.map((i) => (
                            <line 
                                key={`s1-${i}`}
                                x1="10"
                                x2="36"
                                y1={32 - i * 2}
                                y2={32 - i * 2}
                                className={`SOVEnergyLine ${i > 0 ? 'thin' : ''}`}
                            />
                        ))}

                        {/* S2 */}
                        {s2Lines.map((i) => (
                            <line 
                                key={`s2-${i}`}
                                x1="10"
                                x2="36"
                                y1={12 - i * 2}
                                y2={12 - i * 2}
                                className={`SOVEnergyLine ${i > 0 ? 'thin' : ''}`}
                            />
                        ))}

                        {/* T1 */}
                        {tLines.map((i) => (
                            <line 
                                key={`t-${i}`}
                                x1="64"
                                x2="90"
                                y1={45 - i * 2}
                                y2={45 - i * 2}
                                className={`SOVEnergyLine ${i > 0 ? 'thin' : ''}`}
                            />
                        ))}

                        {/* Energy Level Labels */}
                        <text x="5" y="12.8" className="SOVStateLabel">
                            S<tspan className="SOVStateSub">2</tspan>
                        </text>
                        <text x="5" y="32.8" className="SOVStateLabel">
                            S<tspan className="SOVStateSub">1</tspan>
                        </text>
                        <text x="59" y="45.8" className="SOVStateLabel">
                            T<tspan className="SOVStateSub">1</tspan>
                        </text>
                        <text x="3" y="90.8" className="SOVStateLabel">
                            GS
                        </text>

                        

                        {/* GS -> S2 absorption arrow */}
                        <g className="SOVArrowGroup SOVArrowGroupAbsS2">
                            {/* shaft */}
                            <path
                                d="M14 90 L14 5.5"
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowAbsS2"
                            />

                            {/* arrowhead (perfectly aligned to line) */}
                            <use
                                href="#SOVArrowTipShape"
                                x="14"
                                y="4"
                                className="SOVArrowTip SOVArrowTipAbsS2"
                            />

                            <text
                                x="12"
                                y="70"
                                textAnchor="start"
                                transform="rotate(-90 12 70)"
                                className="SOVArrowLabel SOVArrowLabelAbsS2"
                            >
                                Absorption
                            </text>
                        </g>

                        {/* GS → S1 absorption arrow */}
                        <g className="SOVArrowGroup SOVArrowGroupAbsS1">
                            <path
                                d="M18 90 L18 33.5"
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowAbsS1"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="18"
                                y="32"
                                className="SOVArrowTip SOVArrowTipAbsS1"
                            />
                        </g>

                        {/* S1 → GS Fluorescence */}
                        <g className="SOVArrowGroup SOVArrowGroupFluor">
                            <path
                                d="M32 32 L32 88"
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowFluor"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="32"
                                y="93"
                                transform="rotate(180 32 90)"
                                className="SOVArrowTip SOVArrowTipFluor"
                            />

                            <text
                                x="35"
                                y="70"
                                textAnchor="start"
                                transform="rotate(-90 35 70)"
                                className="SOVArrowLabel SOVArrowLabelFluor"
                            >
                                Fluorescence
                            </text>
                        </g>

                        {/* S1 → GS Phosphorescence */}
                        <g className="SOVArrowGroup SOVArrowGroupPhosp">
                            <path
                                d="M85 45 L85 88"
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowPhosp"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="85"
                                y="93"
                                transform="rotate(180 85 90)"
                                className="SOVArrowTip SOVArrowTipPhosp"
                            />

                            <text
                                x="88"
                                y="78"
                                textAnchor="start"
                                transform="rotate(-90 88 78)"
                                className="SOVArrowLabel SOVArrowLabelPhosp"
                            >
                                Phosphorescence
                            </text>
                        </g>

                        {/* S2 IC downward arrow */}
                        <g className="SOVArrowGroup SOVArrowGroupICS2">
                            <path
                                d="
                                    M32 4
                                    L31 5.2
                                    L33 6.4
                                    L31 7.6
                                    L33 8.8
                                    L32 10

                                "
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowICS2"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="28"
                                y="8"
                                transform="rotate(180 28 8) scale(0.85)"
                                className="SOVArrowTip SOVArrowTipICS2"
                            />
                        </g>

                        {/* S2 → S1 IC downward arrow */}
                        <g className="SOVArrowGroup SOVArrowGroupICS2toS1">
                            <path
                                d="
                                    M35 12
                                    L34 14.2
                                    L36 16.4
                                    L34 18.6
                                    L36 20.8
                                    L35 23
                                "
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowICS2S1"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="30.7"
                                y="18"
                                transform="rotate(180 30.7 18) scale(0.85)"
                                className="SOVArrowTip SOVArrowTipICS2S1"
                            />

                            <text
                                x="33"
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
                                    M80 37
                                    L79 38.6
                                    L81 40.2
                                    L79 41.8
                                    L81 43.4
                                    L80 44
                                "
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowICT1"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="70"
                                y="37"
                                transform="rotate(180 70 37) scale(0.85)"
                                className="SOVArrowTip SOVArrowTipICT1"
                            />
                        </g>

                        {/* S1 IC arrow */}
                        <g className="SOVArrowGroup SOVArrowGroupICS1">
                            <path
                                d="
                                    M34 24
                                    L33 25.6
                                    L35 27.2
                                    L33 28.8
                                    L33 29.8
                                "
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowICS1"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="29"
                                y="25"
                                transform="rotate(180 29 25) scale(0.85)"
                                className="SOVArrowTip SOVArrowTipICS1"
                            />
                        </g>

                        {/* FRET */}
                        <g className="SOVArrowGroup SOVArrowGroupFRET">
                            <path
                                d="
                                    M40 18
                                    L43 16.5
                                    L46 19.5
                                    L49 16.5
                                    L52 19.5
                                    L55 18
                                "
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowFRET"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="55"
                                y="17"
                                transform="rotate(90 55 17)"
                                className="SOVArrowTip SOVArrowTipFRET"
                            />

                            <text
                                x="58"
                                y="16.5"
                                textAnchor="start"
                                className="SOVArrowLabel SOVArrowLabelFRET"
                            >
                                <tspan x="58" dy="0">
                                    Nonradiative Dissipation:
                                </tspan>
                                <tspan x="62" dy="3.8">
                                    Quenching + FRET
                                </tspan>
                            </text>
                        </g>

                        {/* ISC */}
                        <g className="SOVArrowGroup SOVArrowGroupISC">
                            <path
                                d="M36 32 L64 37"
                                pathLength="100"
                                className="SOVArrowShaft SOVArrowISC"
                            />
                            <use
                                href="#SOVArrowTipShape"
                                x="64"
                                y="35"
                                transform="rotate(100 64 35)"
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
                            x1="21"
                            y1="90"
                            x2="21"
                            y2="84"
                            className="ElectronArrow GSUp"
                            markerEnd="url(#sovArrowHeadElectron)"
                        />
                        
                        <line
                            x1="24"
                            y1="84"
                            x2="24"
                            y2="90"
                            className="ElectronArrow GSDown"
                            markerEnd="url(#sovArrowHeadElectron)"
                        />

                        <line
                            x1="24"
                            y1="32"
                            x2="24"
                            y2="26"
                            className="ElectronArrow S1Down"
                            markerEnd="url(#sovArrowHeadElectron)"
                        />

                        <line
                            x1="70"
                            y1="39"
                            x2="70"
                            y2="45"
                            className="ElectronArrow T1Up"
                            markerEnd="url(#sovArrowHeadElectron)"
                        />

                        <line
                            x1="70"
                            y1="90"
                            x2="70"
                            y2="84"
                            className="ElectronArrow T1Up"
                            markerEnd="url(#sovArrowHeadElectron)"
                        />
                        
                    </svg>
                </div>

                <div className="SOVSpecBase">
                    <svg
                        className="SOVSpecSVG"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        {/* Y axis */}
                        <line
                            x1="8"
                            y1="6"
                            x2="8"
                            y2="92"
                            className="SOVSpecAxis"
                        />

                        { /* X axis */}
                        <line
                            x1="8"
                            y1="92"
                            x2="98"
                            y2="92"
                            className="SOVSpecAxis"
                        />

                        {/* X-axis label */}
                        <text
                            x="53"
                            y="98"
                            textAnchor="middle"
                            className="SOVSpecLabel"
                        >
                            λ
                        </text>

                        {/* Y-axis label */}
                        <text
                            x="8"
                            y="49"
                            transform="rotate(-90 8 50)"
                            textAnchor="middle"
                            className="SOVSpecLabel"
                        >
                            Intensity
                        </text>

                        {/* Spectral sticks */}
                        <g className="SOVSpecStickGroup SOVSpecStickGroupAbsS1">
                            <line
                                x1="20"
                                y1="92"
                                x2="20"
                                y2="34"
                                className="SOVSpecStick SOVSpecStickAbsS1"
                            />
                        </g>

                        <g className="SOVSpecStickGroup SOVSpecStickGroupAbsS2">
                            <line
                                x1="22"
                                y1="92"
                                x2="22"
                                y2="48"
                                className="SOVSpecStick SOVSpecStickAbsS2"
                            />
                        </g>

                        <g className="SOVSpecStickGroup SOVSpecStickGroupFluor">
                            <line
                                x1="55"
                                y1="92"
                                x2="55"
                                y2="63"
                                className="SOVSpecStick SOVSpecStickFluor"
                            />
                        </g>

                        <g className="SOVSpecStickGroup SOVSpecStickGroupPhosp">
                            <line
                                x1="84"
                                y1="92"
                                x2="84"
                                y2="76"
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
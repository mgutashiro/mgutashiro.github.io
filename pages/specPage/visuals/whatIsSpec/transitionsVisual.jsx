import { useEffect, useState } from 'react';
import { InlineMath } from 'react-katex';
import './transitionsVisual.css';

/**  setup + helper function that will be used in main component */
// array of three modes the visual cycles through
const PHASES = [
  {id: 'absorption', label: 'Absorption', subtitle: 'energy in'},
  {id: 'emission', label: 'Emission', subtitle: 'energy out'},
  {id: 'scattering', label: 'Scattering', subtitle: 'redirect'} 
];

// coordinates for visual animation
const LEFT = {
  upperY: 72,
  lowerY: 232,

  lineX1: 126,
  lineX2: 300,

  photonX: 190,

  scatterStartX: 190,
  scatterEndX: 282,
  scatterC1X: 214,
  scatterC1Y: 52,
  scatterC2X: 248,
  scatterC2Y: 144,

  arrowX: 305,
  arrowTop: 86,
  arrowBottom: 208,

  deltaEX: 314,
  deltaEY: 174,
};

const RIGHT = {
  signalStart: 108,
  signalEnd: 248,
  signalY: 142,
  hitX: 116,
  hitY: 142,
};

// helper function that draws right side animation 
// makes animation depends on which phase is active
function RightPhaseVisual({ phaseId }) {
    // absorption case
    if (phaseId === 'absorption') {
        return (
            <g className="TVRGroup TVRGroup--absorption">
                
                // incoming signal line
                <path
                    className="TVRSignalLine TVRSignalLine--in"
                    d={`M ${RIGHT.signalEnd} ${RIGHT.signalY} L ${RIGHT.signalStart} ${RIGHT.signalY}`}
                />
                // incoming signal orb
                <circle
                    className="TVRSignalOrb TVRSignalOrb--in"
                    cx={RIGHT.signalEnd}
                    cy={RIGHT.signalY}
                    r="5"
                />
            </g>
        );
    }

    // emission case
    if (phaseId === 'emission') {
        return (
            <g className="TVRGroup TVRGroup--emission">

                {/* incoming signal line */}
                <path
                    className="TVRSignalLine TVRSignalLine--out"
                    d={`M ${RIGHT.signalStart} ${RIGHT.signalY} L ${RIGHT.signalEnd} ${RIGHT.signalY}`}
                />
                {/* outgoing signal orb */}
                <circle
                    className="TVRSignalOrb TVRSignalOrb--out"
                    cx={RIGHT.signalStart}
                    cy={RIGHT.signalY}
                    r="5"
                />


            </g>
        );
    }

    // scatter case (default case)
    return (
        <g className="TVRGroup TVRGroup--scattering">
            {/* scattering interaction ring */}
            <circle className="TVRHitRing" cx={RIGHT.hitX} cy={RIGHT.hitY} r="13" />
            {/* scattering interaction core */}
            <circle className="TVRHitCore" cx={RIGHT.hitX} cy={RIGHT.hitY} r="4" />

            {/* incoming scattering line */}
            <path
                className="TVRSignalLine TVRSignalLine--scatterIn"
                d={`M ${RIGHT.signalEnd} ${RIGHT.signalY} L ${RIGHT.hitX} ${RIGHT.hitY}`}
            />
            {/* scattered output path */}
            <path
                className="TVRScatterPath"
                d={`M ${RIGHT.hitX} ${RIGHT.hitY}
                    Q ${RIGHT.hitX + 26} ${RIGHT.hitY - 8}
                        ${RIGHT.hitX + 52} ${RIGHT.hitY - 28}
                    T ${RIGHT.signalEnd - 2} ${RIGHT.hitY - 52}`}
            />

            {/* scattering orb that follows the full path */}
            <circle className="TVRSignalOrb TVRSignalOrb--scatterMotion" r="5">
                <animateMotion
                    dur="2.8s"
                    repeatCount="indefinite"
                    path={`M ${RIGHT.signalEnd} ${RIGHT.signalY}
                        L ${RIGHT.hitX} ${RIGHT.hitY}
                        Q ${RIGHT.hitX + 26} ${RIGHT.hitY - 8}
                            ${RIGHT.hitX + 52} ${RIGHT.hitY - 28}
                        T ${RIGHT.signalEnd - 2} ${RIGHT.hitY - 52}`}
                />
                <animate
                    attributeName="opacity"
                    dur="2.8s"
                    repeatCount="indefinite"
                    values="0;1;1;0;0"
                    keyTimes="0;0.1;0.62;0.72;1"
                />
            </circle>
        </g>
    );
}

export default function TransitionsVisualResponse() {
    // stating which phase is active
    const [phaseIndex, setPhaseIndex] = useState(0);

    // auto loop with useEffect
    // [] means run this effect only once when components mounts
    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setPhaseIndex((current) => (current + 1) % PHASES.length);
        }, 2800);

        return () => window.clearInterval(intervalId);
    }, []);

    // pick current phase object to later write PHASES[phaseIndex].label/subtitle/id as phase.label/subtitle/id
    const phase = PHASES[phaseIndex];  

    const leftPhotonPath =
        phase.id === 'absorption'
            ? `M ${LEFT.photonX} ${LEFT.lowerY} L ${LEFT.photonX} ${LEFT.upperY}`
            : phase.id === 'emission'
            ? `M ${LEFT.photonX} ${LEFT.upperY} L ${LEFT.photonX} ${LEFT.lowerY}`
            : `M ${LEFT.scatterStartX} ${LEFT.upperY}
                C ${LEFT.scatterC1X} ${LEFT.scatterC1Y},
                ${LEFT.scatterC2X} ${LEFT.scatterC2Y},
                ${LEFT.scatterEndX} ${LEFT.upperY}`;

        const leftPhotonTrackClass =
        phase.id === 'scattering'
            ? 'TVPhotonTrack TVPhotonTrack--scatter'
            : 'TVPhotonTrack TVPhotonTrack--vertical';

        const leftPhotonOrbClass =
        phase.id === 'absorption'
            ? 'TVPhotonOrb TVPhotonOrb--absorption'
            : phase.id === 'emission'
            ? 'TVPhotonOrb TVPhotonOrb--emission'
            : 'TVPhotonOrb TVPhotonOrb--scatter';  

    return (
        <div
            className="TVWrap"
            data-phase={phase.id}
            aria-label={`Eigenstate transition visual showing ${phase.label}`}
        >
            {/* title animation + visual animation */}
            <div className="TVVisualBase">
                
                {/* title container */}
                <div className="TVBadge" key={phase.id}>
                    <div className="TVBadgeLabel">{phase.label}</div>
                    <div className="TVBadgeSub">{phase.subtitle}</div>
                </div>

                {/* visual animation */}
                <div className="TVAnimSplit">
                    <div className="TVLeftPane">
                        <svg
                            className="TVLeftSVG"
                            viewBox="0 0 360 300"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <defs>
                                <filter id="tvPhotonGlow" x="-120%" y="-120%" width="340%" height="340%">
                                    <feGaussianBlur stdDeviation="3.2" result="blur" />
                                    <feColorMatrix
                                        in="blur"
                                        type="matrix"
                                        values="
                                            1 0 0 0 0
                                            0 1 0 0 0
                                            0 0 1 0 0
                                            0 0 0 3.8 0
                                        "
                                        result="glow"
                                    />
                                    <feMerge>
                                    <feMergeNode in="glow" />
                                    <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            <line
                                className="TVLevelLine"
                                x1={LEFT.lineX1}
                                y1={LEFT.upperY}
                                x2={LEFT.lineX2}
                                y2={LEFT.upperY}
                            />
                            <line
                                className="TVLevelLine"
                                x1={LEFT.lineX1}
                                y1={LEFT.lowerY}
                                x2={LEFT.lineX2}
                                y2={LEFT.lowerY}
                            />

                            <circle
                                className={leftPhotonOrbClass}
                                r="5"
                                key={`left-photon-${phase.id}`}
                            >
                            <animateMotion
                                dur="2.8s"
                                repeatCount="indefinite"
                                path={leftPhotonPath}
                            />
                            <animate
                                attributeName="opacity"
                                dur="2.5s"
                                repeatCount="indefinite"
                                values="0;1;1;1;0"
                                keyTimes="0;0.08;0.9;0.96;1"
                            />
                            </circle>

                            <line
                                className="TVLArrowStem"
                                x1={LEFT.arrowX}
                                y1={LEFT.arrowBottom}
                                x2={LEFT.arrowX}
                                y2={LEFT.arrowTop + 4}
                            />
                            <polygon
                                className="TVLArrowHead"
                                points={`${LEFT.arrowX - 10},${LEFT.arrowTop + 8} ${LEFT.arrowX},${LEFT.arrowTop - 4} ${LEFT.arrowX + 10},${LEFT.arrowTop + 8}`}
                            />

                            {/* static ΔE label */}
                            <text
                                className="TVDeltaE"
                                x={LEFT.deltaEX}
                                y={LEFT.deltaEY}
                            >
                                ΔE
                            </text>
                        </svg>

                        <div className="TVLevelLabel TVLevelLabel--upper">
                            <InlineMath math={'\\Psi_f'} />
                        </div>
                        <div className="TVLevelLabel TVLevelLabel--lower">
                            <InlineMath math={'\\Psi_i'} />
                        </div>
                    </div>

                    <div className="TVRightPane">
                        <svg
                            className="TVRightSVG"
                            viewBox="0 0 360 300"
                            preserveAspectRatio="none"
                            aria-hidden="true"
                        >
                            <RightPhaseVisual phaseId={phase.id} />
                        </svg>

                        <div className="TVOperator">
                            <InlineMath math={'\\langle \\Psi_f \\mid \\hat{\\mu} \\mid \\Psi_i \\rangle'} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="TVDescription" aria-hidden="true">
                <div className="TVDescriptionIntro">
                    Coupled eigenstates can produce distinct observables:
                </div>

                <ul className="TVDescriptionList">
                    <li>upward transfer in absorption</li>
                    <li>downward relaxation in emission</li>
                    <li>redirected interaction in scattering</li>
                </ul>

            </div>
        </div>
    );
}
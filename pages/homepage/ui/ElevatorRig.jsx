import './ElevatorRig.css';

import doorL from '../../../src/assets/SVG/elevator/ElevatorDoorL.png';
import doorR from '../../../src/assets/SVG/elevator/ElevatorDoorR.png';

import guideBase from '../../../src/assets/SVG/elevator/ElevatorGuideBase.png';
import guide1 from '../../../src/assets/SVG/elevator/ElevatorGuide1.png';
import guide2 from '../../../src/assets/SVG/elevator/ElevatorGuide2.png';
import guide3 from '../../../src/assets/SVG/elevator/ElevatorGuide3.png';
import guide4 from '../../../src/assets/SVG/elevator/ElevatorGuide4.png';
import guide5 from '../../../src/assets/SVG/elevator/ElevatorGuide5.png';

import rideClosed from '../../../src/assets/SVG/elevator/ElevatorRideClosed.png';
import rideOpen from '../../../src/assets/SVG/elevator/ElevatorRideOpen.png';

import gearL from '../../../src/assets/SVG/elevator/GearL.png';
import gearCenter from '../../../src/assets/SVG/elevator/GearCenter.png';
import gearMain from '../../../src/assets/SVG/elevator/GearMain.png';

import photon1 from '../../../src/assets/SVG/elevator/Photon1.png';
import photon2 from '../../../src/assets/SVG/elevator/Photon2.png';
import photon3 from '../../../src/assets/SVG/elevator/Photon3.png';

import weight from '../../../src/assets/SVG/elevator/Weight.png';

const GUIDE_BY_SECTION = {
    intro: guide1,
    landing: guide1,
    about: guide2,
    spec: guide3,
    dft: guide4,
    philosophy: guide5
};

function clamp01(value) {
    return Math.max(0, Math.min(1, value));
}

function easeInOut(value) {
    return value * value * value * (3 - 2 * value);
}

function lerp(a, b, t) {
    return a + (b - a) * t;
}

export default function ElevatorRig({
    progress = 0,
    activeId = 'intro',
    phase = 'home',
    loadingProgress = 1,
}) {
    const isLoading = phase === 'loading';

    const scrollT = isLoading ? 0 : easeInOut(clamp01(progress));
    const loadT = clamp01(loadingProgress);

    const stationY = 86;
    const rideY = lerp(stationY, 22, scrollT);
    const weightY = lerp(24, 90, scrollT);
    const cabX = 24;
    const weightX = 55;
    const gearLeftX = 25;
    const gearCenterX = 40;
    const gearRightX = 55;
    const gearMainX = 40;

    const guideImage = isLoading ? guide1 : GUIDE_BY_SECTION[activeId] || guide1;

    const bigGearRotation = scrollT * 720;
    const centerGearRotation = scrollT * -1440;
    const mainGearRotation = scrollT * -1440;

    const ropeCabAttachY = Math.max(rideY - 4, 28);
    const ropeWeightAttachY = Math.max(weightY - 4, 28);

    const ropeWrap = {
        cx: gearMainX,
        sideY: 18,
        topY: 1,
        leftX: cabX,
        rightX: weightX,
    };

    const ropePath = `
        M ${cabX} ${ropeCabAttachY}
        L ${ropeWrap.leftX} ${ropeWrap.sideY}

        C ${ropeWrap.leftX} ${ropeWrap.topY + 5}
        ${ropeWrap.cx - 10} ${ropeWrap.topY}
        ${ropeWrap.cx} ${ropeWrap.topY}

        C ${ropeWrap.cx + 10} ${ropeWrap.topY}
        ${ropeWrap.rightX} ${ropeWrap.topY + 5}
        ${ropeWrap.rightX} ${ropeWrap.sideY}

        L ${weightX} ${ropeWeightAttachY}
    `;

    return (
        <div
            className="ElevatorRig"
            data-phase={phase}
            data-active-section={activeId}
            style={{
                '--ride-y': `${rideY}%`,
                '--station-y': `${stationY}%`,
                '--weight-y': `${weightY}%`,
                '--load': loadT,
                '--cab-x': `${cabX}%`,
                '--weight-x': `${weightX}%`,
                '--gear-left-x': `${gearLeftX}%`,
                '--gear-center-x': `${gearCenterX}%`,
                '--gear-right-x': `${gearRightX}%`,
                '--gear-main-x': `${gearMainX}%`,
                '--gear-left-rotation': `${bigGearRotation}deg`,
                '--gear-center-rotation': `${centerGearRotation}deg`,
                '--gear-right-rotation': `${bigGearRotation}deg`,
                '--gear-main-rotation': `${mainGearRotation}deg`,
            }}
            aria-hidden="true"
        >
            <svg
                className="ElevatorRig_ropeSvg"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
            >
                <path className="ElevatorRig_ropeShadow" d={ropePath} />
                <path className="ElevatorRig_ropeCore" d={ropePath} />
                <path className="ElevatorRig_ropeHighlight" d={ropePath} />
            </svg>

            <div className="ElevatorRig_gearDeck">
                <div className="ElevatorRig_gearSlot ElevatorRig_gearSlot--left">
                    <img
                        className="ElevatorRig_gearImg ElevatorRig_gearImg--left"
                        src={gearL}
                        alt=""
                    />
                </div>

                <div className="ElevatorRig_gearSlot ElevatorRig_gearSlot--right">
                    <img
                        className="ElevatorRig_gearImg ElevatorRig_gearImg--right"
                        src={gearL}
                        alt=""
                    />
                </div>
                <div className="ElevatorRig_gearSlot ElevatorRig_gearSlot--center">
                    <img
                        className="ElevatorRig_gearImg ElevatorRig_gearImg--center"
                        src={gearCenter}
                        alt=""
                    />
                </div>

                <div className="ElevatorRig_gearSlot ElevatorRig_gearSlot--main">
                    <img
                        className="ElevatorRig_gearImg ElevatorRig_gearImg--main"
                        src={gearMain}
                        alt=""
                    />
                </div>
            </div>

            <div className="ElevatorRig_weight">
                <img src={weight} alt="" />
            </div>

            <div className="ElevatorRig_movingRide">
                <div className="ElevatorRig_cab">
                    <img
                        className="ElevatorRig_ride ElevatorRig_ride--open"
                        src={rideOpen}
                        alt=""
                    />

                    <div className="ElevatorRig_photons">
                        <img
                            className="ElevatorRig_photon ElevatorRig_photon--one"
                            src={photon1}
                            alt=""
                        />
                        <img
                            className="ElevatorRig_photon ElevatorRig_photon--two"
                            src={photon2}
                            alt=""
                        />
                        <img
                            className="ElevatorRig_photon ElevatorRig_photon--three"
                            src={photon3}
                            alt=""
                        />
                    </div>

                    <img
                        className="ElevatorRig_ride ElevatorRig_ride--closed"
                        src={rideClosed}
                        alt=""
                    />
                </div>
            </div>

            <div className="ElevatorRig_station">
    <div className="ElevatorRig_guideStack">
        <img
            className="ElevatorRig_guideBase"
            src={guideBase}
            alt=""
        />

        <img
            className="ElevatorRig_guideActive"
            src={guideImage}
            alt=""
        />
            </div>

            <div className="ElevatorRig_stationDoors">
                <img
                    className="ElevatorRig_door ElevatorRig_door--left"
                    src={doorL}
                    alt=""
                />

                <img
                    className="ElevatorRig_door ElevatorRig_door--right"
                    src={doorR}
                    alt=""
                />
            </div>
        </div>

   
        </div>
    );
}
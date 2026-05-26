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

    const rideY = lerp(82, 27, scrollT);
    const weightY = lerp(20, 78, scrollT);

    const guideImage = isLoading ? guide1 : GUIDE_BY_SECTION[activeId] || guide1;

    const bigGearRotation = scrollT * 720;
    const centerGearRotation = scrollT * -1440;
    const mainGearRotation = scrollT * -1440;

    const ropeCabTopY = rideY - 10;
    const ropeWeightTopY = weightY - 9;

    const ropePath = `
        M 50 ${ropeCabTopY}
        L 50 22
        Q 50 14 58 15
        Q 66 16 70 23
        L 79 ${ropeWeightTopY}
    `;

    return (
        <div
            className="ElevatorRig"
            data-phase={phase}
            data-active-section={activeId}
            style={{
                '--ride-y': `${rideY}%`,
                '--weight-y': `${weightY}%`,
                '--load': loadT,
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
                <img
                    className="ElevatorRig_gear ElevatorRig_gear--left"
                    src={gearL}
                    alt=""
                />

                <img
                    className="ElevatorRig_gear ElevatorRig_gear--center"
                    src={gearCenter}
                    alt=""
                />

                <img
                    className="ElevatorRig_gear ElevatorRig_gear--right"
                    src={gearL}
                    alt=""
                />

                <img
                    className="ElevatorRig_gear ElevatorRig_gear--main"
                    src={gearMain}
                    alt=""
                />
            </div>

            <div className="ElevatorRig_weight">
                <img src={weight} alt="" />
            </div>

            <div className="ElevatorRig_rideStack">
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
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

const FLUORES_CURVE_D=`M0.404846 775.053L33.1063 761.958L58.1774 747.771L73.438 720.489L85.4285 675.746L93.0589 621.181L99.5992 549.156L103.959 480.404L107.229 433.479L111.59 361.453L115.95 257.781L119.22 171.57L123.58 103.91L127.94 41.7059L132.301 0.236694L136.661 19.88L141.021 53.7101V85.3576L145.381 122.462L148.651 160.657L155.192 210.856L158.462 242.503L165.002 271.967L172.632 297.067L176.993 328.715L184.623 383.279L190.073 428.022L195.523 465.126L208.604 526.239L221.685 554.612L236.946 574.255L253.296 605.903L266.377 637.55L282.728 669.198L302.349 698.663L327.42 727.036L347.041 741.223L375.382 753.227L405.903 761.958L434.244 768.505L458.225 771.779`;

const BEGINNING_BEAM_SEGMENTS = ['Beam1', 'Beam2'];

const BEAM_SPLIT_1_SEGMENTS = [
    'Beam31',
    'Beam41',
    'Beam51',
    'Beam61',
    'Beam71',
    'Beam81',
    'Beam91',
    'Beam101',
    'Beam111',
    'Beam121',
];

const BEAM_SPLIT_2_SEGMENTS = [
    'Beam32',
    'Beam42',
    'Beam52',
    'Beam62',
    'Beam72',
    'Beam82',
    'Beam92',
    'Beam102',
    'Beam112',
    'Beam122',
];

const BEAM_SPLIT_A1_SEGMENTS = [
    'BeamA131',
    'BeamA141',
    'BeamA151',
    'BeamA161',
];

const BEAM_SPLIT_A2_SEGMENTS = [
    'BeamA132',
    'BeamA142',
    'BeamA152',
    'BeamA162',
];

const BEAM_SPLIT_B1_SEGMENTS = [
    'BeamB131',
    'BeamB141',
    'BeamB151',
    'BeamB161',
    'BeamB171',
    'BeamB181',
    'BeamB191',
    'BeamB201',
    'BeamB211',
];

const BEAM_SPLIT_B2_SEGMENTS = [
    'BeamB132',
    'BeamB142',
    'BeamB152',
    'BeamB162',
    'BeamB172',
    'BeamB182',
    'BeamB192',
    'BeamB202',
    'BeamB212',
];

const BEAM_SPLIT_C1_SEGMENTS = [
    'BeamC151',
    'BeamC161',
];

const BEAM_SPLIT_C2_SEGMENTS = [
    'BeamC152',
    'BeamC162',
];

const PMT1_ELECTRON_SEGMENTS = [
    'PMT1Beam1',
    'PMT1Beam2',
    'PMT1Beam3',
    'PMT1Beam4',
    'PMT1Beam5',
    'PMT1Beam6',
    'PMT1Beam7',
    'PMT1Beam8',
];

const PMT2_ELECTRON_SEGMENTS = [
    'PMT2Beam1',
    'PMT2Beam2',
    'PMT2Beam3',
    'PMT2Beam4',
    'PMT2Beam5',
    'PMT2Beam6',
    'PMT2Beam7',
    'PMT2Beam8',
];

const TIMING = {
    cycle: 26,

    beginningDelay: 0,
    beginningDuration: 0.5,

    splitDelay: 0.5,
    splitDuration: 6.0,

    branchADelay: 6.5,
    branchADuration: 1.5,

    branchBDelay: 6.5,
    branchBDuration: 6.0,

    branchCDelay: 7.0,
    branchCDuration: 1.5,

    pmt1Delay: 8.0,
    pmt2Delay: 12.5,
    pmtDuration: 3.2,

    screenDelay: 19.0,
    screenDuration: 5.0,
};

function normalizeName(name = '') {
    return name.replace(/[.\s_-]/g, '');
}

function getObjectByFlexibleName(scene, requestedName) {
    const direct = scene.getObjectByName(requestedName);
    if (direct) return direct;

    const normalizedRequestedName = normalizeName(requestedName);
    let found = null;

    scene.traverse((object) => {
        if (found) return;

        if (normalizeName(object.name) === normalizedRequestedName) {
            found = object;
        }
    });

    return found;
}

function getSegmentEndpointsFromObject(scene, modelRoot, objectName) {
    const object = getObjectByFlexibleName(scene, objectName);

    scene.updateWorldMatrix(true, true);
    modelRoot.updateWorldMatrix(true, true);
    object.updateWorldMatrix(true, true);

    let mesh = object.isMesh ? object : null;

    if (!mesh) {
        object.traverse((child) => {
            if (!mesh && child.isMesh) {
                mesh = child;
            }
        });
    }

    if (mesh?.geometry) {
        mesh.geometry.computeBoundingBox();

        const box = mesh.geometry.boundingBox;
        if (!box) return null;

        const size = new THREE.Vector3();
        const center = new THREE.Vector3();

        box.getSize(size);
        box.getCenter(center);

        let axis = 'x';

        if (size.y >= size.x && size.y >= size.z) {
            axis = 'y';
        }

        if (size.z >= size.x && size.z >= size.y) {
            axis = 'z';
        }

        const startLocal = center.clone();
        const endLocal = center.clone();

        startLocal[axis] -= size[axis] / 2;
        endLocal[axis] += size[axis] / 2;

        const startWorld = startLocal.applyMatrix4(mesh.matrixWorld);
        const endWorld = endLocal.applyMatrix4(mesh.matrixWorld);

        return {
            name: object.name,
            start: modelRoot.worldToLocal(startWorld.clone()),
            end: modelRoot.worldToLocal(endWorld.clone()),
        };
    }

    const worldBox = new THREE.Box3().setFromObject(object);

    if (worldBox.isEmpty()) return null;

    const size = new THREE.Vector3();
    const center = new THREE.Vector3();

    worldBox.getSize(size);
    worldBox.getCenter(center);

    let axis = 'x';

    if (size.y >= size.x && size.y >= size.z) {
        axis = 'y';
    }

    if (size.z >= size.x && size.z >= size.y) {
        axis = 'z';
    }

    const startWorld = center.clone();
    const endWorld = center.clone();

    startWorld[axis] -= size[axis] / 2;
    endWorld[axis] += size[axis] / 2;

    return {
        name: object.name,
        start: modelRoot.worldToLocal(startWorld.clone()),
        end: modelRoot.worldToLocal(endWorld.clone()),
    };
}

function orientSegments(segments) {
    if (segments.length === 0) return [];

    const orientedPoints = [];
    const first = { ...segments[0] };

    if (segments.length > 1) {
        const second = segments[1];

        const firstStartToSecond = Math.min(
            first.start.distanceTo(second.start),
            first.start.distanceTo(second.end)
        );

        const firstEndToSecond = Math.min(
            first.end.distanceTo(second.start),
            first.end.distanceTo(second.end)
        );

        if (firstStartToSecond < firstEndToSecond) {
            const originalStart = first.start;
            first.start = first.end;
            first.end = originalStart;
        }
    }

    orientedPoints.push(first.start.clone(), first.end.clone());

    for (let index = 1; index < segments.length; index += 1) {
        const segment = segments[index];
        const lastPoint = orientedPoints[orientedPoints.length - 1];

        const distanceToStart = lastPoint.distanceTo(segment.start);
        const distanceToEnd = lastPoint.distanceTo(segment.end);

        if (distanceToEnd < distanceToStart) {
            orientedPoints.push(segment.end.clone(), segment.start.clone());
        } else {
            orientedPoints.push(segment.start.clone(), segment.end.clone());
        }
    }

    return orientedPoints.filter((point, index, points) => {
        if (index === 0) return true;
        return point.distanceTo(points[index - 1]) > 0.001;
    });
}

function buildPathFromObjects(scene, modelRoot, segmentNames) {
    const segments = segmentNames
        .map((name) => {
            const segment = getSegmentEndpointsFromObject(scene, modelRoot, name);
            return segment;
        })
        .filter(Boolean);


    const points = orientSegments(segments);

    if (points.length < 2) return null;

    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.12);
}

function MovingGlowPacket({
    curve,
    laserOn,
    delay = 0,
    duration = 5,
    cycle = 20,
    color = '#9B5CFF',
    radius = 0.04,
    lightIntensity = 0.7,

    debugReachLabel = '',
    debugReachThreshold = 0.92,
}) {
    const groupRef = useRef(null);
    const startTimeRef = useRef(null);

    const hasLoggedReachRef = useRef(false);
    const lastCycleIndexRef = useRef(-1);

    useFrame((state) => {
        if (!groupRef.current) return;

        if (!laserOn || !curve) {
            groupRef.current.visible = false;
            startTimeRef.current = null;
            return;
        }

        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.elapsedTime;
        }

        const elapsed = state.clock.elapsedTime - startTimeRef.current;
        const cycleElapsed = elapsed % cycle;
        const cycleIndex = Math.floor(elapsed / cycle);
        const localTime = cycleElapsed - delay;

        if (cycleIndex !== lastCycleIndexRef.current) {
            lastCycleIndexRef.current = cycleIndex;
            hasLoggedReachRef.current = false;
        }

        if (localTime < 0 || localTime > duration) {
            groupRef.current.visible = false;
            return;
        }

        const progress = THREE.MathUtils.clamp(localTime / duration, 0, 1);
        const position = curve.getPointAt(progress);

        if (
            debugReachLabel &&
            progress >= debugReachThreshold &&
            !hasLoggedReachRef.current
        ) {
            console.log(debugReachLabel, {
                progress,
                elapsed,
                cycleElapsed,
                localTime,
            });

            hasLoggedReachRef.current = true;
        }



        groupRef.current.visible = true;
        groupRef.current.position.copy(position);
    });

    return (
        <group ref={groupRef} visible={false}>
            <mesh>
                <sphereGeometry args={[radius, 24, 24]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={1.8}
                    roughness={0.25}
                    metalness={0.05}
                />
            </mesh>

            <pointLight
                color={color}
                intensity={lightIntensity}
                distance={1.6}
                decay={1.7}
            />
        </group>
    );
}

function getObjectCenterInModelRoot(scene, modelRoot, objectName) {
    const object = scene.getObjectByName(objectName);

    if (!object) {
        console.warn('[PC screen readout missing object]', objectName);
        return null;
    }

    scene.updateWorldMatrix(true, true);
    modelRoot.updateWorldMatrix(true, true);
    object.updateWorldMatrix(true, true);

    const box = new THREE.Box3().setFromObject(object);

    if (box.isEmpty()) return null;

    const centerWorld = box.getCenter(new THREE.Vector3());

    return modelRoot.worldToLocal(centerWorld.clone());
}

function PCScreenReadout({
    scene,
    modelRootRef,
    laserOn = false,
    cycle = 26,
    screenDelay = 19,
    screenDuration = 5,
    curveType = 'fluorescence',
}) {
    const [position, setPosition] = useState(null);
    const [isActive, setIsActive] = useState(false);
    const [drawKey, setDrawKey] = useState(0);
    const PC_READOUT_OFFSET = [0, 0.05, 0.03];

    const startTimeRef = useRef(null);
    const isActiveRef = useRef(false);

    useEffect(() => {
        let frameId;

        function findScreenWhenReady() {
            const modelRoot = modelRootRef?.current;

            if (!scene || !modelRoot) {
                frameId = requestAnimationFrame(findScreenWhenReady);
                return;
            }

            const screenPosition = getObjectCenterInModelRoot(
                scene,
                modelRoot,
                'PCScreen'
            );

            if (screenPosition) {
                setPosition(screenPosition);
                return;
            }

            frameId = requestAnimationFrame(findScreenWhenReady);
        }

        findScreenWhenReady();

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
        };
    }, [scene, modelRootRef]);

    useFrame((state) => {
        if (!laserOn) {
            startTimeRef.current = null;

            if (isActiveRef.current) {
                isActiveRef.current = false;
                setIsActive(false);
            }

            return;
        }

        if (startTimeRef.current === null) {
            startTimeRef.current = state.clock.elapsedTime;
        }

        const elapsed = state.clock.elapsedTime - startTimeRef.current;
        const cycleElapsed = elapsed % cycle;

        const nextIsActive =
            cycleElapsed >= screenDelay &&
            cycleElapsed <= screenDelay + screenDuration;

        if (nextIsActive !== isActiveRef.current) {
            isActiveRef.current = nextIsActive;
            setIsActive(nextIsActive);

            if (nextIsActive) {
                setDrawKey((current) => current + 1);
            }
        }
    });

    if (!position) return null;

    const isFluorescence = curveType === 'fluorescence';

    const adjustedPosition = position
    ? position.clone().add(
        new THREE.Vector3(
            PC_READOUT_OFFSET[0],
            PC_READOUT_OFFSET[1],
            PC_READOUT_OFFSET[2]
        )
    )
    : null;

    return (
        <Html
            position={adjustedPosition}
            center
            transform
            sprite
            distanceFactor={5.5}
            zIndexRange={[60, 0]}
            style={{ pointerEvents: 'none' }}
        >
            <div
                className={`FluorPCReadout ${isActive ? 'is-active' : ''}`}
                style={{ '--pc-readout-duration': `${screenDuration}s` }}
            >
                <div className="FluorPCReadout_Header">
                    <span>READOUT</span>
                    <span>{isFluorescence ? 'Fluorescence' : 'Absorbance'}</span>
                </div>

                <svg
                    key={drawKey}
                    className="FluorPCReadout_Graph"
                    viewBox="0 0 459 776"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <g transform="translate(100 230) scale(0.8 0.35)">
                        <path
                            className="FluorPCReadout_GridLine"
                            d={FLUORES_CURVE_D}
                        />

                        <path
                            className="FluorPCReadout_Curve"
                            pathLength="1"
                            d={FLUORES_CURVE_D}
                        />
                    </g>
                </svg>

                <div className="FluorPCReadout_Footer">
                    <span>Wavelength</span>
                    <span>Intensity</span>
                </div>
            </div>
        </Html>
    );
}

export default function FluorescenceSpecBeamSystem({
    scene,
    modelRootRef,
    laserOn = false,
}) {
    const [curves, setCurves] = useState({
        beginning: null,
        split1: null,
        split2: null,
        branchA1: null,
        branchA2: null,
        branchB1: null,
        branchB2: null,
        branchC1: null,
        branchC2: null,
        pmt1: null,
        pmt2: null,
    });


    useEffect(() => {
        let frameId;

        function buildCurvesWhenReady() {
            const modelRoot = modelRootRef?.current;

            if (!scene || !modelRoot) {
                frameId = requestAnimationFrame(buildCurvesWhenReady);
                return;
            }

            const nextCurves = {
                beginning: buildPathFromObjects(scene, modelRoot, BEGINNING_BEAM_SEGMENTS),

                split1: buildPathFromObjects(scene, modelRoot, BEAM_SPLIT_1_SEGMENTS),
                split2: buildPathFromObjects(scene, modelRoot, BEAM_SPLIT_2_SEGMENTS),

                branchA1: buildPathFromObjects(scene, modelRoot, BEAM_SPLIT_A1_SEGMENTS),
                branchA2: buildPathFromObjects(scene, modelRoot, BEAM_SPLIT_A2_SEGMENTS),

                branchB1: buildPathFromObjects(scene, modelRoot, BEAM_SPLIT_B1_SEGMENTS),
                branchB2: buildPathFromObjects(scene, modelRoot, BEAM_SPLIT_B2_SEGMENTS),

                branchC1: buildPathFromObjects(scene, modelRoot, BEAM_SPLIT_C1_SEGMENTS),
                branchC2: buildPathFromObjects(scene, modelRoot, BEAM_SPLIT_C2_SEGMENTS),

                pmt1: buildPathFromObjects(scene, modelRoot, PMT1_ELECTRON_SEGMENTS),
                pmt2: buildPathFromObjects(scene, modelRoot, PMT2_ELECTRON_SEGMENTS),
            };

            setCurves(nextCurves);
        }

        buildCurvesWhenReady();

        return () => {
            if (frameId) {
                cancelAnimationFrame(frameId);
            }
        };
    }, [scene, modelRootRef]);

    return (
        <group>
            {/* First shared incoming beam */}
            <MovingGlowPacket
                curve={curves.beginning}
                laserOn={laserOn}
                delay={TIMING.beginningDelay}
                duration={TIMING.beginningDuration}
                cycle={TIMING.cycle}
                color="#9B5CFF"
                radius={0.12}
                lightIntensity={0.9}
            />

            {/* First split into two paths */}
            <MovingGlowPacket
                curve={curves.split1}
                laserOn={laserOn}
                delay={TIMING.splitDelay}
                duration={TIMING.splitDuration}
                cycle={TIMING.cycle}
                color="#3FFFE2"
                radius={0.04}
                lightIntensity={0.75}
            />

            <MovingGlowPacket
                curve={curves.split2}
                laserOn={laserOn}
                delay={TIMING.splitDelay}
                duration={TIMING.splitDuration}
                cycle={TIMING.cycle}
                color="#3FFFE2"
                radius={0.04}
                lightIntensity={0.75}
            />

            {/* Branch A */}
            <MovingGlowPacket
                curve={curves.branchA1}
                laserOn={laserOn}
                delay={TIMING.branchADelay}
                duration={TIMING.branchADuration}
                cycle={TIMING.cycle}
                color="#FF3CAC"
                radius={0.038}
                lightIntensity={0.7}
            />

            <MovingGlowPacket
                curve={curves.branchA2}
                laserOn={laserOn}
                delay={TIMING.branchADelay}
                duration={TIMING.branchADuration}
                cycle={TIMING.cycle}
                color="#FF3CAC"
                radius={0.038}
                lightIntensity={0.7}
            />

            {/* Branch B */}
            <MovingGlowPacket
                curve={curves.branchB1}
                laserOn={laserOn}
                delay={TIMING.branchBDelay}
                duration={TIMING.branchBDuration}
                cycle={TIMING.cycle}
                color="#B6FF00"
                radius={0.038}
                lightIntensity={0.7}
            />

            <MovingGlowPacket
                curve={curves.branchB2}
                laserOn={laserOn}
                delay={TIMING.branchBDelay}
                duration={TIMING.branchBDuration}
                cycle={TIMING.cycle}
                color="#B6FF00"
                radius={0.038}
                lightIntensity={0.7}
            />

            {/* Branch C */}
            <MovingGlowPacket
                curve={curves.branchC1}
                laserOn={laserOn}
                delay={TIMING.branchCDelay}
                duration={TIMING.branchCDuration}
                cycle={TIMING.cycle}
                color="#9B5CFF"
                radius={0.038}
                lightIntensity={0.7}
            />

            <MovingGlowPacket
                curve={curves.branchC2}
                laserOn={laserOn}
                delay={TIMING.branchCDelay}
                duration={TIMING.branchCDuration}
                cycle={TIMING.cycle}
                color="#9B5CFF"
                radius={0.038}
                lightIntensity={0.7}
            />

            {/* PMT electron multiplication paths */}
            <MovingGlowPacket
                curve={curves.pmt1}
                laserOn={laserOn}
                delay={TIMING.pmt1Delay}
                duration={TIMING.pmtDuration}
                cycle={TIMING.cycle}
                color="#3FFFE2"
                radius={0.032}
                lightIntensity={0.55}
            />

            <MovingGlowPacket
                curve={curves.pmt2}
                laserOn={laserOn}
                delay={TIMING.pmt2Delay}
                duration={TIMING.pmtDuration}
                cycle={TIMING.cycle}
                color="#3FFFE2"
                radius={0.032}
                lightIntensity={0.55}
            />
            <PCScreenReadout
                scene={scene}
                modelRootRef={modelRootRef}
                laserOn={laserOn}
                cycle={TIMING.cycle}
                screenDelay={TIMING.screenDelay}
                screenDuration={TIMING.screenDuration}
            />
            
        </group>
    );
}
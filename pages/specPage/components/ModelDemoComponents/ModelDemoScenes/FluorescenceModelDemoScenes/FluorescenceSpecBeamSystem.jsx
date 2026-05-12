import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const MAIN_BEAM_SEGMENTS = [
    'Beam1',
    'Beam2',
    'Beam3.1',
    'Beam3.2',
    'Beam4.1',
    'Beam5.1',
    'Beam5.2',
    'Beam6.1',
    'Beam6.2',
    'Beam7.1',
    'Beam7.2',
    'Beam8.1',
    'Beam8.2',
    'Beam9.1',
    'Beam9.2',
    'Beam10.1',
    'Beam10.2',
    'Beam11.1',
    'Beam11.2',
    'Beam12.1',
    'Beam12.2',
    'BeamA13.1',
    'BeamA13.2',
    'BeamA14.1',
    'BeamA14.2',
    'BeamA15.1',
    'BeamA15.2',
    'BeamA16.1',
    'BeamA16.2',
    'BeamB13.1',
    'BeamB13.2',
    'BeamB14.1',
    'BeamB14.2',
    'BeamB15.1',
    'BeamB15.2',
    'BeamB16.1',
    'BeamB16.2',
    'BeamB17.1',
    'BeamB17.2',
    'BeamB18.1',
    'BeamB18.2',
    'BeamB19.1',
    'BeamB19.2',
    'BeamB20.1',
    'BeamB20.2',
    'BeamB21.1',
    'BeamB21.2',
    'BeamC15.1',
    'BeamC15.2',
    'BeamC16.1',
    'BeamC16.2',
];

const PMT1_ELECTRON_SEGMENTS = [
    'PMTBeam1',
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

const ALL_PATH_SEGMENTS = [
    ...MAIN_BEAM_SEGMENTS,
    ...PMT1_ELECTRON_SEGMENTS,
    ...PMT2_ELECTRON_SEGMENTS,
];

function hidePathMeshes(scene) {
    ALL_PATH_SEGMENTS.forEach((name) => {
        const object = scene.getObjectByName(name);

        if (!object) return;

        object.visible = false;

        object.traverse((child) => {
            child.visible = false;
        });
    });
}

function getLongestAxis(size) {
    if (size.x >= size.y && size.x >= size.z) return 'x';
    if (size.y >= size.x && size.y >= size.z) return 'y';
    return 'z';
}

function getSegmentEndpointsFromMesh(object, modelRoot) {
    if (!object || !modelRoot) return null;

    object.updateWorldMatrix(true, true);
    modelRoot.updateWorldMatrix(true, true);

    const box = new THREE.Box3().setFromObject(object);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const axis = getLongestAxis(size);

    const startWorld = center.clone();
    const endWorld = center.clone();

    startWorld[axis] = box.min[axis];
    endWorld[axis] = box.max[axis];

    const startLocal = modelRoot.worldToLocal(startWorld.clone());
    const endLocal = modelRoot.worldToLocal(endWorld.clone());

    return {
        start: startLocal,
        end: endLocal,
        length: startLocal.distanceTo(endLocal),
    };
}

function orientSegments(rawSegments) {
    const oriented = [];

    rawSegments.forEach((segment) => {
        if (!segment) return;

        const current = {
            start: segment.start.clone(),
            end: segment.end.clone(),
            length: segment.length,
        };

        if (oriented.length === 0) {
            oriented.push(current);
            return;
        }

        const previousEnd = oriented[oriented.length - 1].end;

        const distanceToStart = previousEnd.distanceTo(current.start);
        const distanceToEnd = previousEnd.distanceTo(current.end);

        if (distanceToEnd < distanceToStart) {
            const oldStart = current.start;
            current.start = current.end;
            current.end = oldStart;
        }

        oriented.push(current);
    });

    return oriented;
}

function buildPathFromObjects(scene, modelRoot, segmentNames) {
    if (!scene || !modelRoot) return null;

    scene.updateWorldMatrix(true, true);
    modelRoot.updateWorldMatrix(true, true);

    const rawSegments = segmentNames
        .map((name) => {
            const object = scene.getObjectByName(name);

            if (!object) {
                console.warn(`[FluorescenceBeamSystem] Missing path mesh: ${name}`);
                return null;
            }

            return getSegmentEndpointsFromMesh(object, modelRoot);
        })
        .filter(Boolean)
        .filter((segment) => segment.length > 0.0001);

    const segments = orientSegments(rawSegments);

    const points = [];

    segments.forEach((segment, index) => {
        if (index === 0) {
            points.push(segment.start);
        }

        points.push(segment.end);
    });

    if (points.length < 2) return null;

    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2);
}

function MovingGlowPacket({
    curve,
    laserOn,
    delay = 0,
    duration = 4,
    color = '#3FFFE2',
    radius = 0.045,
    lightIntensity = 0.8,
}) {
    const packetRef = useRef(null);
    const lightRef = useRef(null);

    useFrame(({ clock }) => {
        if (!packetRef.current || !curve) return;

        if (!laserOn) {
            packetRef.current.visible = false;

            if (lightRef.current) {
                lightRef.current.intensity = 0;
            }

            return;
        }

        const elapsed = clock.getElapsedTime();
        const localTime = elapsed - delay;

        if (localTime < 0) {
            packetRef.current.visible = false;

            if (lightRef.current) {
                lightRef.current.intensity = 0;
            }

            return;
        }

        const progress = (localTime % duration) / duration;
        const position = curve.getPointAt(progress);

        packetRef.current.visible = true;
        packetRef.current.position.copy(position);

        if (lightRef.current) {
            lightRef.current.intensity = lightIntensity;
        }
    });

    return (
        <group ref={packetRef} visible={false}>
            <pointLight
                ref={lightRef}
                color={color}
                intensity={0}
                distance={1.25}
                decay={2}
            />

            <mesh>
                <sphereGeometry args={[radius, 24, 24]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.95}
                />
            </mesh>

            <mesh>
                <sphereGeometry args={[radius * 2.6, 24, 24]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.16}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

export default function FluorescenceBeamSystem({
    scene,
    modelRootRef,
    laserOn = false,
}) {
    useEffect(() => {
        if (!scene) return;
        hidePathMeshes(scene);
    }, [scene]);

    const curves = useMemo(() => {
        if (!scene || !modelRootRef?.current) {
            return {
                main: null,
                pmt1: null,
                pmt2: null,
            };
        }

        return {
            main: buildPathFromObjects(
                scene,
                modelRootRef.current,
                MAIN_BEAM_SEGMENTS
            ),

            pmt1: buildPathFromObjects(
                scene,
                modelRootRef.current,
                PMT1_ELECTRON_SEGMENTS
            ),

            pmt2: buildPathFromObjects(
                scene,
                modelRootRef.current,
                PMT2_ELECTRON_SEGMENTS
            ),
        };
    }, [scene, modelRootRef]);

    return (
        <group>
            <MovingGlowPacket
                curve={curves.main}
                laserOn={laserOn}
                delay={0}
                duration={5.6}
                color="#9B5CFF"
                radius={0.045}
                lightIntensity={0.9}
            />

            <MovingGlowPacket
                curve={curves.pmt1}
                laserOn={laserOn}
                delay={3.8}
                duration={1.8}
                color="#3FFFE2"
                radius={0.035}
                lightIntensity={0.55}
            />

            <MovingGlowPacket
                curve={curves.pmt2}
                laserOn={laserOn}
                delay={3.8}
                duration={1.8}
                color="#3FFFE2"
                radius={0.035}
                lightIntensity={0.55}
            />
        </group>
    );
}
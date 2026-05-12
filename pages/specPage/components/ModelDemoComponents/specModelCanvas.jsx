import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    Bounds,
    Center,
    Html,
    OrbitControls,
    Environment,
    useGLTF,
} from '@react-three/drei';
import { matchModelPartFromObject } from '/pages/specPage/utils/matchModelPart';
import FluorescenceSpecScene from './ModelDemoScenes/FluorescenceModelDemoScenes/FluorescenceSpecScene';

function SpecModelScene({ config, onSelectPart, debugNames = false }) {
    const { scene } = useGLTF(config.modelUrl);

    const [hoveredPart, setHoveredPart] = useState(null);
    const [hoverPoint, setHoverPoint] = useState(null);

    useEffect(() => {
        if (!debugNames) return;

        scene.traverse((object) => {
            if (object.isMesh) {
                console.log('[GLB mesh]', object.name);
            }
        });
    }, [scene, debugNames]);

    useEffect(() => {
        return () => {
            document.body.style.cursor="auto";
        };
    }, []);

    function clearHover() {
        setHoveredPart(null);
        setHoverPoint(null);
        document.body.style.cursor = 'auto';
    }

    function selectPart(part) {
        if(!part) return;
        onSelectPart(part.id);
    }

    function handlePointerMove(event) {
        const matchedPart = matchModelPartFromObject(
            event.object,
            config.parts
        );

        if (!matchedPart) {
            clearHover();
            return;
        }

        event.stopPropagation();

        setHoveredPart(matchedPart);
        setHoverPoint([
            event.point.x,
            event.point.y + 0.15,
            event.point.z,
        ]);

        document.body.style.cursor = 'pointer';
    }

    function handlePointerOut() {
        clearHover();
    }

    function handlePointerDown(event) {
        const matchedPart = matchModelPartFromObject(
            event.object,
            config.parts
        );

        if (!matchedPart) return;

        event.stopPropagation();
        onSelectPart(matchedPart.id);
    }

    return (
        <group
            onPointerMove={handlePointerMove}
            onPointerOut={handlePointerOut}
            onPointerDown={handlePointerDown}
        >
            <Bounds fit clip observe margin={1.25}>
                <Center>
                <primitive object={scene} scale={config.scale ?? 1} />
                </Center>
            </Bounds>

            {hoveredPart && hoverPoint && (
                <Html
                    position={hoverPoint}
                    center
                    distanceFactor={5}
                    zIndexRange={[100, 0]}
                    style={{ pointerEvents: 'none' }}
                >
                    <button
                        type="button"
                        className="SpecModelHoverLabel"
                        onPointerDown={(event) => {
                            event.stopPropagation();
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                            selectPart(hoveredPart);
                        }}
                    >
                        {hoveredPart.label}
                    </button>
                </Html>
            )}
        </group>
    );
}

export default function SpecModelCanvas({
    config,
    mode,
    activePartId,
    selectedPartId,
    onSelectPart,
    setSelectedPartId,
    onResetPart,
    laserOn = false,
    openParts = {},
    setOpenParts,
    debugNames = false,
}) {
    if (!config) return null;

    const cameraPosition = config.camera?.position ?? [4.2, 2.4, 5.2];
    const startAzimuth = Math.atan2(cameraPosition[0], cameraPosition[2]);

    return (
        <Canvas 
            camera={{
                position: cameraPosition,
                fov: config.camera?.fov ?? 35,
            }}
            gl={{
                antialias: true,
                alpha: true,
            }}
            onPointerMissed={() => {
                onResetPart?.();
            }}
        >
            <color attach="background" args={['#050712']} />

            <ambientLight
                intensity={config.lights?.ambient ?? 0.65}
            />

            <hemisphereLight
                args={[
                    '#dffcff',
                    '#1a1028',
                    config.lights?.hemisphere ?? 0.75,
                ]}
            />

            <directionalLight
                position={config.lights?.keyPosition ?? [4, 6, 5]}
                intensity={config.lights?.key ?? 1.45}
                color="#ffffff"
            />

            <directionalLight
                position={config.lights?.fillPosition ?? [-4, 3.5, -3]}
                intensity={config.lights?.fill ?? 0.85}
                color="#d9ccff"
            />

            <directionalLight
                position={config.lights?.rimPosition ?? [-3, 5, 4]}
                intensity={config.lights?.rim ?? 0.75}
                color="#b8f7ff"
            />

            <pointLight
                position={config.lights?.accentPosition ?? [0, 3, 0]}
                intensity={config.lights?.accent ?? 0.9}
                color="#ffb7f5"
                distance={9}
                decay={1.6}
            />

            <Suspense
                fallback={
                <Html center>
                    <span className="SpecModelLoading">Loading model...</span>
                </Html>
                }
            >
                {config.sceneType === 'fluorescence' ? (
                    <FluorescenceSpecScene
                        config={config}
                        mode={mode}
                        activePartId={activePartId ?? selectedPartId}
                        onSelectPart={onSelectPart}
                        debugNames={debugNames}
                        laserOn={laserOn}
                        openParts={openParts}
                        setOpenParts={setOpenParts}
                    />
                ) : (
                    <SpecModelScene
                        config={config}
                        onSelectPart={onSelectPart}
                        debugNames={debugNames}
                    />
                )}
            </Suspense>

            <OrbitControls
                makeDefault
                enableRotate
                enableZoom
                enablePan={false}
                enableDamping
                dampingFactor={0.08}
                // vertical rotation limit
                minPolarAngle={0.25}
                maxPolarAngle={1.25}

                // horizontal limit: prevents seeing the back
                minAzimuthAngle={startAzimuth - Math.PI / 4}
                maxAzimuthAngle={startAzimuth + Math.PI / 6}
                minDistance={3}
                maxDistance={8}
            />
        </Canvas>
    );
}
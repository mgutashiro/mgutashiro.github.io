import { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import {
    Bounds,
    Center,
    Html,
    OrbitControls,
    useGLTF,
} from '@react-three/drei';
import { matchModelPartFromObject } from '../utils/matchModelPart';

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
    onSelectPart,
    onResetPart,
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

            <ambientLight intensity={0.45} />
            

            <directionalLight
                position={[4, 6, 5]}
                intensity={1.45}
            />

            <pointLight
                position={[-2, 2.5, 2]}
                intensity={config.lights?.accent ?? 0.8}
                color="#b8f7ff"
            />

            <Suspense
                fallback={
                <Html center>
                    <span className="SpecModelLoading">Loading model...</span>
                </Html>
                }
            >
            <SpecModelScene
            config={config}
            onSelectPart={onSelectPart}
            debugNames={debugNames}
            />
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
import { useEffect, useRef, useState } from 'react';
import {
    Bounds,
    Center,
    Html,
    useGLTF,
} from '@react-three/drei';
import { matchModelPartFromObject } from '/pages/specPage/utils/matchModelPart';
import FluorescenceHotspots from './FluorescenceHotspots';
import FluorescencePopup from './FluorescencePopup';
import FluorescenceBeamSystem from './FluorescenceSpecBeamSystem';

export default function FluorescenceSpecScene({
    config,
    mode = 'friends',
    activePartId,
    onSelectPart,
    debugNames = false,
    laserOn = false,
    openParts = {},
    setOpenParts,
}) {
    const { scene } = useGLTF(config.modelUrl);

    const [hoveredPart, setHoveredPart] = useState(null);
    const [hoverPoint, setHoverPoint] = useState(null);
    const modelRootRef = useRef(null);
    const [popupPartId, setPopupPartId] = useState(null);

    useEffect(() => {
        if (!debugNames) return;

        scene.traverse((object) => {
            if (object.isMesh) {
                console.log('[Fluorescence GLB mesh]', object.name);
            }
        });
    }, [scene, debugNames]);

    useEffect(() => {
        return () => {
            document.body.style.cursor = 'auto';
        };
    }, []);

    function clearHover() {
        setHoveredPart(null);
        setHoverPoint(null);
        document.body.style.cursor = 'auto';
    }

    function selectPart(part) {
        if (!part) return;
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
        setPopupPartId(matchedPart.id);

        if (matchedPart.openKey && setOpenParts) {
            setOpenParts((current) => ({
                ...current,
                [matchedPart.openKey]: !current[matchedPart.openKey],
            }));
        }
    }

    return (
        <group
            onPointerMove={handlePointerMove}
            onPointerOut={handlePointerOut}
            onPointerDown={handlePointerDown}
        >
            <Bounds fit clip observe margin={1.25}>
                <Center>
                    <group ref={modelRootRef} scale={config.scale ?? 1}>
                        <primitive object={scene} />

                        <FluorescenceBeamSystem
                            scene={scene}
                            modelRootRef={modelRootRef}
                            laserOn={laserOn}
                        />

                        {config.hotspots?.enabled && (
                            <FluorescenceHotspots
                                scene={scene}
                                modelRootRef={modelRootRef}
                                parts={config.parts}
                                hotspotPartIds={config.hotspots?.partIds ?? []}
                                activePartId={activePartId}
                                onSelectPart={onSelectPart}
                                onOpenPopup={setPopupPartId}
                            />
                        )}
                    </group>
                </Center>
            </Bounds>

            <FluorescencePopup
                parts={config.parts}
                partId={popupPartId}
                mode={mode}
                onClose={() => setPopupPartId(null)}
            />

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
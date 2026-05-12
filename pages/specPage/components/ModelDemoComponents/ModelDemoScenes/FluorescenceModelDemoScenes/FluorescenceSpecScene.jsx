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


const HIDDEN_FLUORESCENCE_OBJECTS = [
    // beam guide rails
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

    // PMT electron guide rails
    'PMTBeam1',
    'PMT1Beam2',
    'PMT1Beam3',
    'PMT1Beam4',
    'PMT1Beam5',
    'PMT1Beam6',
    'PMT1Beam7',
    'PMT1Beam8',

    'PMT2Beam1',
    'PMT2Beam2',
    'PMT2Beam3',
    'PMT2Beam4',
    'PMT2Beam5',
    'PMT2Beam6',
    'PMT2Beam7',
    'PMT2Beam8',

    // lids, if you want them gone visually
    'LightSourceBaseLid',
    'ExcMonoBaseLid',
    'SampleChamberBaseLid',
    'EmissionMonoLid',
    'TSideEmissionChannelBaseLid',
];

function hideObjectsByName(scene, objectNames = []) {
    const hiddenSet = new Set(objectNames);

    scene.traverse((object) => {
        if (!hiddenSet.has(object.name)) return;

        object.visible = false;

        object.traverse((child) => {
            child.visible = false;
        });
    });
}

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
    useEffect(() => {
        hideObjectsByName(scene, HIDDEN_FLUORESCENCE_OBJECTS);
    }, [scene]);

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
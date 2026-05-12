import { useMemo } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

function getPartById(parts, partId) {
    return parts.find((part) => part.id === partId) ?? null;
}

function getAnchorFromObjectNames({
    scene,
    modelRoot,
    objectNames = [],
    yOffset = 0.28,
}) {
    if (!scene || !modelRoot || objectNames.length === 0) return null;

    scene.updateWorldMatrix(true, true);
    modelRoot.updateWorldMatrix(true, true);

    for (const objectName of objectNames) {
        const object = scene.getObjectByName(objectName);

        if (!object) continue;

        object.updateWorldMatrix(true, true);

        const box = new THREE.Box3().setFromObject(object);

        if (box.isEmpty()) continue;

        const centerWorld = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        centerWorld.y += Math.max(size.y * 0.55, yOffset);

        return modelRoot.worldToLocal(centerWorld.clone());
    }

    return null;
}

export default function FluorescenceHotspots({
    scene,
    modelRootRef,
    parts = [],
    hotspotPartIds = [],
    activePartId,
    onSelectPart,
    onOpenPopup,
}) {
    const hotspots = useMemo(() => {
        const modelRoot = modelRootRef?.current;

        if (!scene || !modelRoot || !hotspotPartIds.length) return [];

        return hotspotPartIds
            .map((partId) => {
                const part = getPartById(parts, partId);

                if (!part) return null;

                const position = getAnchorFromObjectNames({
                    scene,
                    modelRoot,
                    objectNames: part.objectNames,
                    yOffset: part.hotspotYOffset ?? 0.28,
                });

                if (!position) return null;

                return {
                    part,
                    position,
                };
            })
            .filter(Boolean);
    }, [scene, modelRootRef, parts, hotspotPartIds]);

    if (!hotspots.length) return null;

    return (
        <>
            {hotspots.map(({ part, position }) => (
                <Html
                    key={part.id}
                    position={position}
                    center
                    distanceFactor={5}
                    zIndexRange={[80, 0]}
                >
                    <button
                        type="button"
                        className={`FluorHotspotButton ${
                            activePartId === part.id ? 'is-active' : ''
                        }`}
                        onPointerDown={(event) => {
                            event.stopPropagation();
                        }}
                        onClick={(event) => {
                            event.stopPropagation();

                            onSelectPart?.(part.id);
                            onOpenPopup?.(part.id);
                        }}
                    >
                        {part.label}
                    </button>
                </Html>
            ))}
        </>
    );
}
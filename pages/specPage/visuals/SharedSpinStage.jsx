import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { VerticalMagnet } from "./SharedFieldPieces";

function useSpinPatternTexture(baseColor, patternColor) {
    return useMemo(() => {
        if (typeof document === "undefined") return null;

        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 512;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < 10; i++) {
            const y = (canvas.height / 10) * i;

            ctx.strokeStyle = i % 2 === 0 ? patternColor : baseColor;
            ctx.globalAlpha = i % 2 === 0 ? 0.55 : 0.2;
            ctx.lineWidth = i % 2 === 0 ? 10 : 5;

            ctx.beginPath();
            ctx.moveTo(-80, y + 90);
            ctx.bezierCurveTo(
                canvas.width * 0.2,
                y - 10,
                canvas.width * 0.55,
                y + 95,
                canvas.width + 80,
                y - 90
            );
            ctx.stroke();
        }

        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = patternColor;
        ctx.lineWidth = 5;

        for (let x = -220; x < canvas.width + 220; x += 36) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x + 220, canvas.height);
            ctx.stroke();
        }

        ctx.globalAlpha = 0.08;
        ctx.strokeStyle = baseColor;
        ctx.lineWidth = 2;

        for (let x = -220; x < canvas.width + 220; x += 52) {
            ctx.beginPath();
            ctx.moveTo(x, canvas.height);
            ctx.lineTo(x + 180, 0);
            ctx.stroke();
        }

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        texture.needsUpdate = true;

        return texture;
    }, [baseColor, patternColor]);
}

export function SpinningSphere({
    baseColor = "#DDE7FF",
    patternColor = "#3FFFE2",
    direction = 1,
    speed = 0.9,
    radius = 1.02,
}) {
    const shellGroupRef = useRef();
    const patternMap = useSpinPatternTexture("#FFFFFF", patternColor);

    useFrame((_, delta) => {
        if (!shellGroupRef.current) return;

        shellGroupRef.current.rotation.y += delta * speed * direction;
        shellGroupRef.current.rotation.z = Math.sin(performance.now() * 0.00035) * 0.04;
    });

    if (!patternMap) return null;

    return (
        <group ref={shellGroupRef}>
            <mesh renderOrder={1}>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshPhysicalMaterial
                    color={baseColor}
                    transparent
                    opacity={0.8}
                    roughness={0.08}
                    metalness={0.02}
                    transmission={0.68}
                    thickness={0.32}
                    emissive={baseColor}
                    emissiveIntensity={0.015}
                    depthWrite={false}
                />
            </mesh>

            <mesh scale={1.003} renderOrder={2}>
                <sphereGeometry args={[radius, 64, 64]} />
                <meshBasicMaterial
                    map={patternMap}
                    transparent
                    opacity={0.45}
                    color="#9DA8B2"
                    depthWrite={false}
                    depthTest={true}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}

export function StagePlane({
    position = [0, -2.5, -0.4],
    rotation = [-Math.PI / 2, 0, 0],
    size = [9, 4.6],
    color = "#2A0F3F",
}) {
    return (
        <mesh position={position} rotation={rotation}>
            <planeGeometry args={size} />
            <meshStandardMaterial color={color} roughness={0.95} metalness={0.05} />
        </mesh>
    );
}

export function SpinSphereUnit({
    position = [0, 0, 0],
    direction = 1,
    topText = "N",
    bottomText = "S",
    palette,
    shellColor,
    lineColor,
    title,
}) {
    const topColor = topText === "N" ? palette.accent3 : palette.accent2;
    const bottomColor = bottomText === "S" ? palette.accent2 : palette.accent3;

    return (
        <group position={position}>
            {/* fixed magnet */}
            <VerticalMagnet
                palette={palette}
                topText={topText}
                bottomText={bottomText}
                topColor={topColor}
                bottomColor={bottomColor}
            />

            {/* rotating sphere */}
            <SpinningSphere
                direction={direction}
                baseColor={shellColor}
                patternColor={lineColor}
            />

            {title ? (
                <Html
                    position={[0, -1.85, 0]}
                    center
                    transform
                    sprite
                    distanceFactor={10}
                >
                    <div className="NMRSpinPair_SphereTitle">{title}</div>
                </Html>
            ) : null}
        </group>
    );
}
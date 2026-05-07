import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./nmrHiddenMotionVisual.css";


function readCssVar(name, fallback) {
    if (typeof window === "undefined") return fallback;
    const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
    return value || fallback;
}

function useTokenPalette() {
    return useMemo(
        () => ({
            bg: readCssVar("--c-ink", "#0B1215"),
            surface: readCssVar("--c-primary-2", "#2A0F3F"),
            surface2: readCssVar("--c-shadow", "#120916"),

            sphereBaseLeft: "#E8F6FF",
            sphereBaseRight: "#F4EAFF",

            text: readCssVar("--text", "#EAF2F7"),
            textMuted: readCssVar("--text-muted", "#9DA8B2"),

            accent: readCssVar("--c-glow-2", "#9B5CFF"),
            accent2: readCssVar("--c-glow-1", "#3FFFE2"),
            accent3: readCssVar("--c-glow-3", "#FF3CAC"),
            accent4: readCssVar("--c-glow-4", "#B6FF00"),

            metal: readCssVar("--c-metal-1", "#C19A3F"),
            metalDark: readCssVar("--c-metal-2", "#8F6B1F"),
            copper: readCssVar("--c-metal-3", "#B46A4C"),
            }),
        []
    );
}

function useSpinPatternTexture(baseColor, patternColor) {
    return useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 512;
        canvas.height = 256;

        const ctx = canvas.getContext("2d");

        // transparent base
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // soft horizontal bands
        for (let i = 0; i < 9; i++) {
            const y = (canvas.height / 9) * i;
            ctx.strokeStyle = i % 2 === 0 ? patternColor : baseColor;
            ctx.globalAlpha = i % 2 === 0 ? 0.55 : 0.22;
            ctx.lineWidth = i % 2 === 0 ? 8 : 4;

            ctx.beginPath();
            ctx.moveTo(0, y + 10);
            ctx.bezierCurveTo(
                canvas.width * 0.25,
                y - 8,
                canvas.width * 0.75,
                y + 26,
                canvas.width,
                y + 10
            );
            ctx.stroke();
        }

        // diagonal hatch accents
        ctx.globalAlpha = 0.18;
        ctx.strokeStyle = patternColor;
        ctx.lineWidth = 3;

        for (let x = -120; x < canvas.width + 120; x += 44) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x + 120, canvas.height);
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

function PoleLabel({ children, position, className = ""  }) {
    return (
        <Html position={position} center transform sprite distanceFactor={8}>
            <div className={`NMRSpinPair_Label ${className}`}>{children}</div>
        </Html>
    );
}

function VerticalMagnet({
    palette,
    topText = "N",
    bottomText = "S",
    topColor,
    bottomColor,
}) {
    const spineHeight = 2.35;
    const poleHeight = 0.95;
    const poleOffset = 0.62;
    const capOffset = 1.16;
    // const labelOffset = 1.45;
    return (
        <group>
            {/* brass spine */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, spineHeight, 32]} />
                <meshStandardMaterial
                    color={palette.metal}
                    metalness={0.92}
                    roughness={0.22}
                    emissive={palette.metalDark}
                    emissiveIntensity={0.18}
                />
            </mesh>

            {/* top half */}
            <mesh position={[0, poleOffset, 0]}>
                <cylinderGeometry args={[0.17, 0.17, poleHeight, 36]} />
                <meshStandardMaterial
                    color={topColor}
                    metalness={0.35}
                    roughness={0.34}
                    emissive={topColor}
                    emissiveIntensity={0.25}
                />
            </mesh>

            {/* bottom half */}
            <mesh position={[0, -poleOffset, 0]}>
                    <cylinderGeometry args={[0.17, 0.17, poleHeight, 36]} />
                    <meshStandardMaterial
                        color={bottomColor}
                        metalness={0.35}
                        roughness={0.34}
                        emissive={bottomColor}
                        emissiveIntensity={0.25}
                    />
            </mesh>

            {/* caps */}
            <mesh position={[0, capOffset, 0]}>
                <sphereGeometry args={[0.12, 24, 24]} />
                <meshStandardMaterial color={topColor} emissive={topColor} emissiveIntensity={0.22} />
            </mesh>

            <mesh position={[0, -capOffset, 0]}>
                <sphereGeometry args={[0.12, 24, 24]} />
                <meshStandardMaterial
                    color={bottomColor}
                    emissive={bottomColor}
                    emissiveIntensity={0.22}
                />
            </mesh>

            <PoleLabel position={[0.1, 1.45, 0.02]} className="NMRSpinPair_Label--top">
                {topText}
            </PoleLabel>
            <PoleLabel position={[0.15, -1.65, 0.02]} className="NMRSpinPair_Label--bottom">
                {bottomText}
            </PoleLabel>
        </group>
    );
}

function SpinningSphere({
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

        // the whole sphere rotates here
        shellGroupRef.current.rotation.y += delta * speed * direction;
        shellGroupRef.current.rotation.z = Math.sin(performance.now() * 0.00035) * 0.04;
    });

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


function SpinSphereUnit({
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
                <Html position={[0, -1.85, 0]} center transform sprite distanceFactor={10}>
                    <div className="NMRSpinPair_SphereTitle">{title}</div>
                </Html>
            ) : null}
        </group>
    );
}

export function NMRSpinPairRig({
    leftTop = "N",
    leftBottom = "S",
    rightTop = "S",
    rightBottom = "N",
    leftDirection = 1,
    rightDirection = -1,
}) {
    const palette = useTokenPalette();

    return (
        <>
            <color attach="background" args={[palette.bg]} />

            <fog attach="fog" args={[palette.bg, 8, 16]} />

            <ambientLight intensity={0.8} />
            <directionalLight position={[4, 5, 6]} intensity={1.25} color={palette.text} />
            <pointLight position={[-4, 1, 3]} intensity={1.1} color={palette.accent2} />
            <pointLight position={[4, -1, 3]} intensity={1.1} color={palette.accent3} />

            <group position={[0, 0.15, 0]}>
                <SpinSphereUnit
                    position={[-2.15, 0, 0]}
                    direction={leftDirection}
                    topText={leftTop}
                    bottomText={leftBottom}
                    palette={palette}
                    shellColor={palette.sphereBaseLeft}
                    lineColor={palette.accent2}
                />

                <SpinSphereUnit
                    position={[2.15, 0, 0]}
                    direction={rightDirection}
                    topText={rightTop}
                    bottomText={rightBottom}
                    palette={palette}
                    shellColor={palette.sphereBaseRight}
                    lineColor={palette.accent3}
                />
            </group>

            {/* stage */}
            <mesh position={[0, -2.5, -0.4]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[9, 4.6]} />
                <meshStandardMaterial color={palette.surface} roughness={0.95} metalness={0.05} />
            </mesh>
        </>
    );
}


export default function NMRSpinPairScene({
    className = "",
    title = "Zeeman-Split Nuclear Spin States",
    caption = "The two spheres represent simplified spin states of the nucleus: tiny magnetic nuclei can align in different ways when placed inside a strong magnetic field.",
    showControls = false,
}) {
    return (
        <figure className={`NMRSpinPair ${className}`}>
            <div className="NMRSpinPair_CanvasWrap">
                <Canvas
                    camera={{ position: [0, 0.35, 8.2], fov: 34 }}
                    dpr={[1, 2]}
                    gl={{ antialias: true, alpha: true }}
                >
                    <NMRSpinPairRig />

                    <OrbitControls
                        enablePan={false}
                        enableZoom={false}
                        enableRotate={showControls}
                        autoRotate={false}
                    />
                </Canvas>
            </div>

            <figcaption className="NMRSpinPair_Caption">
                {/* <span className="NMRSpinPair_CaptionTitle">{title}</span> */}
                <span className="NMRSpinPair_CaptionText">{caption}</span>
            </figcaption>
        </figure>
    );
}
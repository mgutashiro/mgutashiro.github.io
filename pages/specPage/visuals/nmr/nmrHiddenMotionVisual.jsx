import React, { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "./nmrHiddenMotionVisual.css";

const ACWArrow = `M62.2277 7.96997L44.7277 11.47L26.2277 15.97L13.7277 19.97C13.7277 19.97 2.80328 22.9831 1.22768 26.97C0.294716 29.3307 0.220866 32.0125 1.22768 34.97C2.38798 38.3783 7.22768 41.97 7.22768 41.97L16.2277 46.47L30.2277 50.47L44.7277 54.47L62.2277 57.97L76.2277 60.47C76.2277 60.47 87.7749 62.2884 95.2277 62.97C103.21 63.6999 115.728 63.97 115.728 63.97H139.728H158.728H185.228H207.728H223.728H247.228L265.228 62.97L284.728 60.47L304.228 57.47L320.228 53.97L334.728 49.47L348.228 43.47L356.228 38.97C356.228 38.97 359.814 35.982 360.228 33.47C360.583 31.316 360.316 29.8625 359.228 27.97C357.904 25.6676 354.228 23.47 354.228 23.47L348.228 20.97L342.228 18.47L335.728 15.97L329.228 14.47L322.728 12.47L316.728 10.97L311.728 9.96997L307.228 8.96997L302.228 7.96997M324.228 0.469971L318.728 2.46997L313.228 4.46997L308.228 5.96997L302.228 7.96997L306.228 12.47L309.728 16.97L312.228 20.47L315.228 24.97`;
const CWArrow = `M298.751 8.41128L316.257 11.8837L334.763 16.3483L347.268 20.3168C347.268 20.3168 358.196 23.3062 359.772 27.2617C360.705 29.6038 360.779 32.2645 359.772 35.1987C358.611 38.5802 353.77 42.1436 353.77 42.1436L344.767 46.6081L330.762 50.5766L316.257 54.5451L298.751 58.0176L284.746 60.4979C284.746 60.4979 273.195 62.302 265.74 62.9782C257.755 63.7024 245.232 63.9703 245.232 63.9703H221.224H202.218H175.708H153.201H137.195H113.687L95.6807 62.9782L76.1739 60.4979L56.6671 57.5215L40.6616 54.0491L26.1566 49.5845L12.6519 43.6318L4.64914 39.1672C4.64914 39.1672 1.06206 36.2027 0.647766 33.7105C0.292512 31.5734 0.559573 30.1315 1.6481 28.2538C2.97235 25.9695 6.64984 23.7892 6.64984 23.7892L12.6519 21.3089L18.654 18.8286L25.1562 16.3483L32.5 13.9703L38.0005 12.376L43.8398 10.9705L49.0043 9.89566L53.5059 8.90353L58.5076 7.9114M36.5 0.470459L42.0019 2.45471L47.8398 4.47046L52.3398 5.97046L58.5076 7.9114L54.5063 12.376L51.005 16.8405L48.5042 20.313L45.5031 24.7775`;


function readCssVar(name, fallback) {
    if (typeof window === "undefined") return fallback;
    const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
    return value || fallback;
}

function useArrowTexture(pathD, strokeColor) {
    return useMemo(() => {
        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 256;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const path = new Path2D(pathD);

        // original path is about 360 x 64
        const sourceWidth = 360;
        const sourceHeight = 64;
        const padX = 48;
        const padY = 34;

        const scale = Math.min(
            (canvas.width - padX * 2) / sourceWidth,
            (canvas.height - padY * 2) / sourceHeight
        );

        const drawWidth = sourceWidth * scale;
        const drawHeight = sourceHeight * scale;
        const offsetX = (canvas.width - drawWidth) / 2;
        const offsetY = (canvas.height - drawHeight) / 2;

        ctx.save();
        ctx.translate(offsetX, offsetY);
        ctx.scale(scale, scale);
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        // soft glow pass
        ctx.globalAlpha = 0.18;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 8;
        ctx.shadowColor = strokeColor;
        ctx.shadowBlur = 14;
        ctx.stroke(path);

        // crisp pass
        ctx.globalAlpha = 0.95;
        ctx.lineWidth = 3.6;
        ctx.shadowBlur = 0;
        ctx.stroke(path);

        ctx.restore();

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        return texture;
    }, [pathD, strokeColor]);
}

function StageArrow({
    pathD,
    color,
    position = [0, -2.49, 0],
    size = [2.7, 0.48],
    rotation = [-Math.PI / 2, 0, 0],
}) {
    const texture = useArrowTexture(pathD, color);

    return (
        <mesh position={position} rotation={rotation}>
            <planeGeometry args={size} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={1}
                depthWrite={false}
                alphaTest={0.05}
                toneMapped={false}
            />
        </mesh>
    );
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
        canvas.height = 512;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // main diagonal flowing bands
        for (let i = 0; i < 10; i++) {
            const y = (canvas.height / 10) * i;

            ctx.strokeStyle = i % 2 === 0 ? patternColor : baseColor;
            ctx.globalAlpha = i % 2 === 0 ? 0.55 : 0.2;
            ctx.lineWidth = i % 2 === 0 ? 10 : 5;

            ctx.beginPath();
            ctx.moveTo(-80, y + 90);
            ctx.bezierCurveTo(
                canvas.width * 0.2, y - 10,
                canvas.width * 0.55, y + 95,
                canvas.width + 80, y - 90
            );
            ctx.stroke();
        }

        // stronger diagonal hatch accents
        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = patternColor;
        ctx.lineWidth = 5;

        for (let x = -220; x < canvas.width + 220; x += 36) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x + 220, canvas.height);
            ctx.stroke();
        }

        // optional counter-diagonal accents for more energy
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

function PoleLabel({ children, position, className = ""  }) {
    return (
        <Html 
            position={position} 
            center 
            distanceFactor={8}
            style={{ pointerEvents: "none" }}
        >
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
    const labelY = capOffset + 0.52;
    const labelZ = 0.08;
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

            <PoleLabel
                position={[0, labelY, labelZ]}
                className="NMRSpinPair_Label--top"
            >
                {topText}
            </PoleLabel>

            <PoleLabel
                position={[0, -labelY, labelZ]}
                className="NMRSpinPair_Label--bottom"
            >
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

            <StageArrow
                pathD={ACWArrow}
                color={palette.accent2}
                position={[-2.2, -2, 0]}
                size={[2, 2]}
            />

            <StageArrow
                pathD={CWArrow}
                color={palette.accent3}
                position={[2.3, -2, 0]}
                size={[2, 2]}
            />

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
                <span className="NMRSpinPair_CaptionText">{caption}</span>
            </figcaption>
        </figure>
    );
} 
import React, { useMemo } from "react";
import { Html } from "@react-three/drei";
import * as THREE from "three";

export const ACWArrow = `M89.3458 31.5179L65.1416 34.5133L37.8857 41.4027L20.6634 47.094C20.6634 47.094 8.5292 52.777 4.46748 59.6753C0.893 65.7462 -0.144853 70.3778 0.868399 77.3474C1.83186 83.9746 8.66642 92.6246 8.66642 92.6246L20.6634 102.509L34.4599 111.196L49.756 118.684L62.9526 122.635L76.1493 124.675L94.4446 127.371L115.439 129.168L131.635 130.367H151.13H171.825H193.719H214.714C214.714 130.367 222.512 130.367 231.81 130.367C238.6 130.367 243.441 128.97 250.705 127.371C260.003 125.324 262.016 124.239 267.201 122.579C273.478 120.568 282.497 115.989 282.497 115.989L294.834 109.399L306.791 101.91C306.791 101.91 315.488 96.5176 320.287 91.7255C325.086 86.9334 326.286 81.5417 326.286 81.5417C326.286 81.5417 327.656 74.9979 327.485 70.4587C327.341 66.6027 325.086 60.8728 325.086 60.8728L317.888 52.1861L311.889 46.1961L304.991 41.1032L294.834 35.3522L287.595 31.5183L279.185 26.809L270.253 23.2241L262.402 21.9334H253.404H245.606M263.302 0.366577L259.103 4.26059L254.904 9.05321L250.405 15.044L245.606 21.9334L251.605 28.8228L256.703 34.2145L261.202 38.7076L266.901 44.0993`;
export const CWArrow = `M235.837 31.5177L259.996 34.5131L287.202 41.4025C287.202 41.4025 298.142 43.7837 304.392 47.0937C311.88 51.0598 317.213 53.37 321.157 60.8732C324.199 66.6607 325.074 70.8738 324.15 77.3472C323.205 83.9766 316.367 92.6244 316.367 92.6244L304.392 102.509L290.621 111.195L275.353 118.684L262.181 122.635L248.709 125.274L230.747 127.37L209.791 129.168H193.925H173.867H153.211H131.955L113.095 130.366C113.095 130.366 100.543 130.03 93.9355 129.168C87.2147 128.29 76.5721 125.274 76.5721 125.274L62.5018 121.08L46.6352 115.389L33.7623 108.499L18.7939 100.711C18.7939 100.711 11.2222 96.4675 7.71723 92.3249C4.60636 88.648 1.72984 81.5415 1.72984 81.5415L0.532366 71.3564C0.532366 71.3564 0.190318 64.5206 1.72984 60.5737C3.19252 56.8238 7.71723 52.1859 7.71723 52.1859L14.3033 45.8963L20.5901 41.1029L30.4693 35.1129L38.2529 30.9193C38.2529 30.9193 42.9585 28.4327 46.3486 26.8087C49.7329 25.1876 51.6397 24.197 55.2636 23.2239C58.2593 22.4194 63.1005 21.9332 63.1005 21.9332H72.0816H79.8652M62.2024 0.366333L66.3936 4.26034L70.5847 9.05297L75.0753 15.0438L79.8652 21.9332L73.8778 28.8226L68.7885 34.2143L64.298 38.7073L58.61 44.0991`;

const ARROW_SOURCE = {
    width: 328,
    height: 131,
};

function readCssVar(name, fallback) {
    if (typeof window === "undefined") return fallback;

    const value = getComputedStyle(document.documentElement)
        .getPropertyValue(name)
        .trim();

    return value || fallback;
}

export function useTokenPalette() {
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

function useArrowTexture(pathD, strokeColor) {
    return useMemo(() => {
        if (typeof document === "undefined") return null;

        const canvas = document.createElement("canvas");
        canvas.width = 1024;
        canvas.height = 256;

        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const path = new Path2D(pathD);

        const sourceWidth = ARROW_SOURCE.width;
        const sourceHeight = ARROW_SOURCE.height;
        const padX = 64;
        const padY = 52;

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

        ctx.globalAlpha = 0.2;
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 8;
        ctx.shadowColor = strokeColor;
        ctx.shadowBlur = 16;
        ctx.stroke(path);

        ctx.globalAlpha = 0.95;
        ctx.lineWidth = 4;
        ctx.shadowBlur = 0;
        ctx.stroke(path);

        ctx.restore();

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;

        return texture;
    }, [pathD, strokeColor]);
}

export function StageArrow({
    pathD,
    color,
    position = [0, 0, 0],
    size = [0.72, 0.59],
    rotation = [0, 0, 0],
}) {
    const texture = useArrowTexture(pathD, color);

    if (!texture) return null;

    return (
        <mesh 
            position={position}
            rotation={rotation}
            scale={[size[0], size[1], 1]}
            renderOrder={20}
        >
            <planeGeometry args={[1, 1]} />
            <meshBasicMaterial
                map={texture}
                transparent
                opacity={1}
                depthWrite={false}
                depthTest={false}
                alphaTest={0.05}
                toneMapped={false}
            />
        </mesh>
    );
}

export function PoleLabel({ children, position, className = "" }) {
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

export function VerticalMagnet({
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

    const labelY = capOffset + 0.4;
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

            {/* top cap */}
            <mesh position={[0, capOffset, 0]}>
                <sphereGeometry args={[0.12, 24, 24]} />
                <meshStandardMaterial
                    color={topColor}
                    emissive={topColor}
                    emissiveIntensity={0.22}
                />
            </mesh>

            {/* bottom cap */}
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
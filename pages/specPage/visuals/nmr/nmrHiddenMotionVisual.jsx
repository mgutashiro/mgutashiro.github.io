import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import {
  ACWArrow,
  CWArrow,
  StageArrow,
  useTokenPalette,
} from "../SharedFieldPieces";

import {
  SpinSphereUnit,
  StagePlane,
} from "../SharedSpinStage";

import "./nmrHiddenMotionVisual.css";

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
            <directionalLight
                position={[4, 5, 6]}
                intensity={1.25}
                color={palette.text}
            />
            <pointLight
                position={[-4, 1, 3]}
                intensity={1.1}
                color={palette.accent2}
            />
            <pointLight
                position={[4, -1, 3]}
                intensity={1.1}
                color={palette.accent3}
            />

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
                position={[-2.05, 0, 0.45]}
                size={[5.3, 0.6]}
            />

            <StageArrow
                pathD={CWArrow}
                color={palette.accent3}
                position={[2.05, 0, 0.45]}
                size={[5.3, 0.6]}
            />

            <StagePlane color={palette.surface} />
        </>
    );
}

export default function NMRSpinPairScene({
    className = "",
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
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Html, Line } from "@react-three/drei";
import "./nmrHiddenMotionVisual.css";

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


function TinyMagnetCallout({ palette }) {
    const labelPos = [0, 1.55, 0.35];
    const leftTarget = [-2.15, 0.75, 0.25];
    const rightTarget = [2.15, 0.75, 0.25];

    return (
        <group>
            <Line
                points={[labelPos, leftTarget]}
                color={palette.accent2}
                lineWidth={1.4}
                transparent
                opacity={0.72}
            />

            <Line
                points={[labelPos, rightTarget]}
                color={palette.accent3}
                lineWidth={1.4}
                transparent
                opacity={0.72}
            />

            <Html
                position={labelPos}
                center
                transform
                sprite
                distanceFactor={7}
                style={{ pointerEvents: "none" }}
            >
                <div className="NMRSpinPair_TinyMagnetLabel">
                    “tiny magnets”
                </div>
            </Html>
        </group>
    );
}

function SpinModelNote() {
    return (
        <Html
            position={[0, -2, 0.65]}
            center
            transform
            sprite
            distanceFactor={7.5}
            style={{ pointerEvents: "none" }}
        >
            <div className="NMRSpinPair_ModelNote">
                This is a helpful picture, not the exact reality: nuclei do not literally spin like tiny spheres.
            </div>
        </Html>
    );
}

export function NMRSpinPairRig({
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
                    palette={palette}
                    shellColor={palette.sphereBaseLeft}
                    lineColor={palette.accent2}
                    flipMagnet={false}
                />

                <SpinSphereUnit
                    position={[2.15, 0, 0]}
                    direction={rightDirection}
                    palette={palette}
                    shellColor={palette.sphereBaseRight}
                    lineColor={palette.accent3}
                    flipMagnet={true}
                />
                <TinyMagnetCallout palette={palette} />
                <SpinModelNote />
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
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";

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
import "./NMRResonanceTransitionVisuals.css";



function ResonanceTransitionArrow({ color = "#B6FF00" }) {
    return (
        <group position={[-3.8, 0.1, 0]}>
            {/* transition shaft */}
            <mesh position={[0, -0.2, 0]}>
                <cylinderGeometry args={[0.025, 0.025, 2.5, 24]} />
                <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>

            {/* upward arrow tip */}
            <mesh position={[0, 1, 0]}>
                <coneGeometry args={[0.13, 0.34, 32]} />
                <meshBasicMaterial color={color} toneMapped={false} />
            </mesh>

            <Html
                position={[0.2, 0, 0.1]}
                center
                transform
                sprite
                distanceFactor={7}
                style={{ pointerEvents: "none" }}
            >
                <div className="NMRResonanceTransitionVisual_MFLabel">Β₀</div>
            </Html>
        </group>
    );
}

function SpinEnergyStateLabel({
    children,
    position = [0, 0, 0],
    className = "",
}) {
    return (
        <Html
            position={position}
            center
            style={{ pointerEvents: "none" }}
        >
            <div className={`NMRResonanceTransitionVisual_EnergyLabel ${className}`}>
                {children}
            </div>
        </Html>
    );
}

export function NMRResonanceTransitionRig({
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

            <ambientLight intensity={0.82} />

            <directionalLight
                position={[4, 5, 6]}
                intensity={1.25}
                color={palette.text}
            />

            <pointLight
                position={[-4, 1.2, 3]}
                intensity={1.15}
                color={palette.accent2}
            />

            <pointLight
                position={[4, -0.8, 3]}
                intensity={1.15}
                color={palette.accent3}
            />

            <pointLight
                position={[0, 2.2, 3.5]}
                intensity={0.95}
                color={palette.accent4}
            />

            <group position={[0, 0.4, 0]}>
                {/* lower-energy / initial spin state */}
                <SpinSphereUnit
                    position={[-2.15, 0, 0]}
                    direction={leftDirection}
                    topText={leftTop}
                    bottomText={leftBottom}
                    palette={palette}
                    shellColor={palette.sphereBaseLeft}
                    lineColor={palette.accent2}
                />

                {/* resonance transition arrow */}
                <ResonanceTransitionArrow color={palette.accent4} />

                {/* higher-energy / flipped spin state */}
                <SpinSphereUnit
                    position={[2.15, 0, 0]}
                    direction={rightDirection}
                    topText={rightTop}
                    bottomText={rightBottom}
                    palette={palette}
                    shellColor={palette.sphereBaseRight}
                    lineColor={palette.accent3}
                />

                {/* spin-direction arrows on the stage */}
                <StageArrow
                    pathD={ACWArrow}
                    color={palette.accent2}
                    position={[-2.2, 0, 0]}
                    size={[5.7, 0.6]}
                />

                <StageArrow
                    pathD={CWArrow}
                    color={palette.accent3}
                    position={[2.2, 0, 0]}
                    size={[5.7, 0.6]}
                />

                {/* spin energy state labels */}
                <SpinEnergyStateLabel
                    position={[-2, -2, 0.65]}
                >
                    +1/2 <span className="NMRResonanceTransitionVisual_LabelMuted">(or α)</span>
                </SpinEnergyStateLabel>

                <SpinEnergyStateLabel
                    position={[2, -2, 0.65]}
                >
                    −1/2 <span className="NMRResonanceTransitionVisual_LabelMuted">(or β)</span>
                </SpinEnergyStateLabel>

                <SpinEnergyStateLabel
                    position={[0, -2.5, 0.65]}
                    className="NMRResonanceTransitionVisual_EnergyLabel--title"
                >
                    Spin Energy States
                </SpinEnergyStateLabel>
            </group>

            {/* stage underneath */}
            <StagePlane
                position={[0, -2.5, -0.4]}
                size={[9, 4.6]}
                color={palette.surface}
            />
        </>
    );
}

export default function NMRResonanceTransitionVisuals({
    className = "",
    caption = "Radio-frequency energy can drive a transition between nuclear spin states when it matches the energy gap set by the magnetic field.",
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
                <NMRResonanceTransitionRig />

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
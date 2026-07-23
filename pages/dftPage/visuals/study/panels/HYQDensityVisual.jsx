import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds } from "@react-three/drei";

import HYQModel from "/pages/dftPage/visuals/shared/HYQModel";
import "./HYQDensityVisual.css";

function HYQCallouts() {
    return (
        <>
            <svg
                className="dft-hyq-callout-lines"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <polyline
                    className="dft-hyq-callout-line dft-hyq-callout-line--density"
                    points="25,20 37,35"
                />
                <circle
                    className="dft-hyq-callout-point dft-hyq-callout-point--density"
                    cx="37"
                    cy="35"
                    r="1.15"
                />
                <polyline
                    className="dft-hyq-callout-line dft-hyq-callout-line--molecule"
                    points="75,85 57,59"
                />
                <circle
                    className="dft-hyq-callout-point dft-hyq-callout-point--molecule"
                    cx="57"
                    cy="59"
                    r="1.15"
                />
            </svg>

            <span className="dft-hyq-callout dft-hyq-callout--density">
                Electron Density
            </span>
            <span className="dft-hyq-callout dft-hyq-callout--molecule">
                Molecule
            </span>
        </>
    );
}

export default function HYQDensityVisual({ mode }) {
    return (
        <div className="dft-chapter-hyq">
            <span className="dft-chapter-hyq__ring" aria-hidden="true" />

            <div className="dft-chapter-hyq__canvas" aria-hidden="true">
                <Canvas
                    frameloop="demand"
                    dpr={[1, 1.5]}
                    camera={{
                        position: [0, 0, 8],
                        fov: 28,
                        near: 0.1,
                        far: 100,
                    }}
                    gl={{
                        alpha: true,
                        antialias: true,
                        powerPreference: "high-performance",
                    }}
                >
                    <ambientLight intensity={0.85} />
                    <directionalLight position={[4, 5, 7]} intensity={3.6} />
                    <directionalLight
                        position={[-4, 1, 5]}
                        color="#9B5CFF"
                        intensity={0.65}
                    />
                    <directionalLight
                        position={[0, -4, 4]}
                        color="#C19A3F"
                        intensity={0.45}
                    />

                    <Suspense fallback={null}>
                        <Bounds fit clip observe margin={1.18}>
                            <HYQModel
                                densityOpacity={0.24}
                                rotation={[0.12, -0.08, -0.05]}
                            />
                        </Bounds>
                    </Suspense>
                </Canvas>
            </div>

            {mode === "friends" && <HYQCallouts />}
        </div>
    );
}
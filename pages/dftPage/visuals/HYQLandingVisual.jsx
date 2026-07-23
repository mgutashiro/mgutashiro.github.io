import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds } from "@react-three/drei";

import HYQModel from "/pages/dftPage/visuals/shared/HYQModel";

export default function HYQLandingVisual() {
    return (
        <div className="dft-hero-model" aria-hidden="true">
            <Canvas
                frameloop="always"
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
                    <Bounds fit clip observe margin={1.13}>
                        <HYQModel animate densityOpacity={0.28} />
                    </Bounds>
                </Suspense>
            </Canvas>
        </div>
    )
};
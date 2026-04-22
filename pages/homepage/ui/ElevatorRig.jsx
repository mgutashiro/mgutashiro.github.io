import { useFrame } from '@react-three/fiber'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

const clamp01 = (x) => Math.max(0, Math.min(1, x))
const lerp = THREE.MathUtils.lerp
const easeInOut = (x) => x * x * (3 - 2 * x)
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)

function cssVar(name, fallback) {
  if (typeof window === 'undefined') return fallback
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return v || fallback
}

function useThemeColors() {
  const [colors, setColors] = useState({
    violet: new THREE.Color('#9B5CFF'),
    cyan: new THREE.Color('#3FFFE2'),
    pink: new THREE.Color('#FF3CAC'),
    metal: new THREE.Color('#C19A3F'),
    purple: new THREE.Color('#5B208B'),
  })

  useEffect(() => {
    setColors({
      violet: new THREE.Color(cssVar('--c-glow-2', '#9B5CFF')),
      cyan: new THREE.Color(cssVar('--c-glow-1', '#3FFFE2')),
      pink: new THREE.Color(cssVar('--c-glow-3', '#FF3CAC')),
      metal: new THREE.Color(cssVar('--c-metal-1', '#C19A3F')),
      purple: new THREE.Color(cssVar('--c-primary-1', '#5B208B')),
    })
  }, [])

  return colors
}

function Photon({color, index, progress, rideY }) {
  const ref = useRef()

  useFrame((state) => {
    if (!ref.current) return

    const t = state.clock.getElapsedTime()
    const p = clamp01(progress)

    // ---- PHASE WINDOWS ----
    // Intro entry
    const introEnterStart = 0.00 + index * 0.015
    const introEnterEnd = 0.13 + index * 0.02
    const enterT = easeOutCubic(
      clamp01((p - introEnterStart) / (introEnterEnd - introEnterStart))
    )

    // About -> portfolio: sphere settles inside pod
    const insideLockStart = 0.12 + index * 0.01
    const insideLockEnd = 0.28 + index * 0.02
    const insideT = easeInOut(
      clamp01((p - insideLockStart) / (insideLockEnd - insideLockStart))
    )

    // Right-side start position
    const startX = 1.35 + index * 0.22
    const startY = -1.05 + index * 0.18
    const startZ = 0.02 + index * 0.04

    const podX = -0.2
    const podY = rideY

    // Slightly different paths so they don't overlap
    const entryTargetX = podX + [-0.08, 0.11, -0.03][index]
    const entryTargetY = podY + [0.06, -0.08, 0.12][index]
    const entryTargetZ = [-0.10, 0.14, 0.06][index]

    // Orbit inside sphere
    const orbitRadius = [0.11, 0.16, 0.13][index]
    const orbitSpeed = [1.6, 2.15, 1.85][index]
    const orbitPhase = [0.0, 2.1, 4.0][index]

    const insideX = podX + Math.cos(t * orbitSpeed + orbitPhase) * orbitRadius
    const insideY = podY + Math.sin(t * orbitSpeed + orbitPhase) * orbitRadius * 0.72
    const insideZ = Math.sin(t * (orbitSpeed + 0.5) + orbitPhase) * 0.15

    // Intro travel from right into the ride
    let x = lerp(startX, entryTargetX, enterT)
    let y = lerp(startY, entryTargetY, enterT)
    let z = lerp(startZ, entryTargetZ, enterT)

    // Lock inside the pod
    x = lerp(x, insideX, insideT)
    y = lerp(y, insideY, insideT)
    z = lerp(z, insideZ, insideT)

    const s = 0.07 + index * 0.008 + Math.sin(t * 4.2 + index * 1.7) * 0.004

    ref.current.position.set(x, y, z)
    ref.current.scale.setScalar(s)
  })

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1, 18, 18]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={3.2}
        toneMapped={false}
      />
    </mesh>
  )
}


export default function ElevatorRig({ progress = 0, dropNow = false }) {
  const pod = useRef()
  const shell = useRef()
  const glowLight = useRef()
  const colors = useThemeColors()
  const p = clamp01(progress)
  const rideProgress = easeInOut(clamp01(p / 0.86))
  const rideY = lerp(-1.08, 1.78, rideProgress)

  useFrame((state) => {
    if (!pod.current || !shell.current || !glowLight.current) return

    const t = state.clock.getElapsedTime()

    pod.current.position.set(-0.2, rideY, 0)

    shell.current.rotation.x += 0.004
    shell.current.rotation.y += 0.006

    const glow = lerp(0.8, 2.2, rideProgress)
    shell.current.material.emissiveIntensity = glow * 0.68
    glowLight.current.intensity = glow * 2.15

    const baseScale = 1 + Math.sin(t * 2.8) * 0.015
    shell.current.scale.setScalar(baseScale)

    shell.current.material.opacity = 0.62
  })

  return (
    <>
      <ambientLight intensity={0.42} />

      <pointLight
        ref={glowLight}
        position={[-0.2, 0.2, 1.6]}
        color={colors.violet}
        intensity={1.2}
        distance={8}
      />

      {/* shaft */}
      <mesh position={[-0.2, 0.38, -0.25]}>
        <cylinderGeometry args={[0.028, 0.028, 4.35, 16]} />
        <meshStandardMaterial
          color={colors.metal}
          emissive={colors.purple}
          emissiveIntensity={0.16}
        />
      </mesh>

      {/* bottom + top nodes */}
      <mesh position={[-0.2, -1.12, 0]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial
          color={colors.metal}
          emissive={colors.pink}
          emissiveIntensity={0.45}
        />
      </mesh>

      <mesh position={[-0.2, 1.95, 0]}>
        <sphereGeometry args={[0.085, 16, 16]} />
        <meshStandardMaterial
          color={colors.metal}
          emissive={colors.cyan}
          emissiveIntensity={0.65}
        />
      </mesh>

      {/* photons */}
      <Photon
        color={colors.cyan}
        index={0}
        progress={progress}
        rideY={rideY}
      />
      <Photon
        color={colors.violet}
        index={1}
        progress={progress}
        rideY={rideY}
      />
      <Photon
        color={colors.pink}
        index={2}
        progress={progress}
        rideY={rideY}
      />

      {/* pod */}
      <group ref={pod}>
        <mesh ref={shell}>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshStandardMaterial
            color={colors.purple}
            emissive={colors.violet}
            emissiveIntensity={0.9}
            metalness={0.2}
            roughness={0.24}
            transparent
            opacity={0.62}
            depthWrite={false}
          />
        </mesh>
      </group>
    </>
  )
}
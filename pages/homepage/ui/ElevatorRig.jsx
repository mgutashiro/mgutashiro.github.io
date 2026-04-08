import { useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, useState } from 'react'
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

function Photon({
  color,
  index,
  progress,
  rideY,
  burstAmount,
  resetMix,
}) {
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

    // Burst outward at meme/top
    if (burstAmount > 0.001) {
      const burstAngle = orbitPhase + index * 0.75
      x += Math.cos(burstAngle) * burstAmount * (0.75 + index * 0.16)
      y += Math.sin(burstAngle) * burstAmount * (0.55 + index * 0.15)
      z += burstAmount * (0.28 + index * 0.08)
    }

    // Reset: float back to right-side start
    if (resetMix > 0.001) {
      x = lerp(x, startX, resetMix)
      y = lerp(y, startY, resetMix)
      z = lerp(z, startZ, resetMix)
    }

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

function LightningBurst({ active, amount, color, position }) {
  const group = useRef()

  const rays = useMemo(() => {
    return new Array(12).fill(null).map((_, i) => ({
      key: i,
      rotation: (i / 12) * Math.PI * 2,
      length: i % 2 === 0 ? 0.72 : 0.48,
    }))
  }, [])

  useFrame((state) => {
    if (!group.current) return

    const t = state.clock.getElapsedTime()
    group.current.visible = active
    group.current.position.copy(position)
    group.current.rotation.z = t * 1.15

    const flicker = active ? 0.7 + Math.sin(t * 34) * 0.25 : 0
    const scale = active ? 0.3 + amount * 1.15 : 0.001

    group.current.children.forEach((child, i) => {
      child.scale.set(1, Math.max(0.001, scale + flicker + (i % 2) * 0.1), 1)
    })
  })

  return (
    <group ref={group}>
      {rays.map((ray) => (
        <mesh key={ray.key} rotation={[0, 0, ray.rotation]}>
          <boxGeometry args={[0.03, ray.length, 0.03]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </mesh>
      ))}
    </group>
  )
}

export default function ElevatorRig({ progress = 0, dropNow = false }) {
  const pod = useRef()
  const shell = useRef()
  const glowLight = useRef()
  const burstCarrier = useRef()

  const [resetPulse, setResetPulse] = useState(0)
  const colors = useThemeColors()

  // trigger local reset animation when page reset begins
  useEffect(() => {
    if (!dropNow) return
    setResetPulse(1)
  }, [dropNow])

  useFrame((state, delta) => {
    if (!pod.current || !shell.current || !glowLight.current || !burstCarrier.current) return

    const t = state.clock.getElapsedTime()
    const p = clamp01(progress)

    // Leave some headroom until meme
    const rideProgress = easeInOut(clamp01(p / 0.86))
    const normalRideY = lerp(-1.08, 1.78, rideProgress)

    // Meme/top burst
    const memeZone = clamp01((p - 0.86) / 0.10)
    const burstSeed = dropNow ? 1 : memeZone
    const burstAmount = easeOutCubic(clamp01(burstSeed))

    // Reset local pulse decays back to 0
    let nextReset = resetPulse
    if (nextReset > 0) {
      nextReset = Math.max(0, nextReset - delta * 1.2)
      if (nextReset !== resetPulse) setResetPulse(nextReset)
    }

    // Instant pod drop on reset pulse
    const rideY = resetPulse > 0.001
      ? lerp(normalRideY, -1.08, easeOutCubic(resetPulse))
      : normalRideY

    pod.current.position.set(-0.2, rideY, 0)

    // Shake at the top
    const shake = burstAmount > 0.01 ? burstAmount : 0
    pod.current.position.x = -0.2 + Math.sin(t * 45) * 0.035 * shake
    pod.current.position.y += Math.cos(t * 37) * 0.03 * shake

    shell.current.rotation.x += 0.004
    shell.current.rotation.y += 0.006

    const glow = lerp(0.8, 2.9, rideProgress)
    shell.current.material.emissiveIntensity = glow * 0.68
    glowLight.current.intensity = glow * 2.15

    const baseScale = 1 + Math.sin(t * 2.8) * 0.015
    const burstScale = 1 + burstAmount * 0.62
    shell.current.scale.setScalar(baseScale * burstScale)

    shell.current.material.opacity = lerp(0.62, 0.32, burstAmount)

    burstCarrier.current.position.copy(pod.current.position)
  })

  const p = clamp01(progress)
  const rideProgress = easeInOut(clamp01(p / 0.86))
  const normalRideY = lerp(-1.08, 1.78, rideProgress)
  const memeZone = clamp01((p - 0.86) / 0.10)
  const burstSeed = dropNow ? 1 : memeZone
  const burstAmount = easeOutCubic(clamp01(burstSeed))
  const lightningActive = burstAmount > 0.02
  const resetMix = resetPulse

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
        rideY={normalRideY}
        burstAmount={burstAmount}
        resetMix={resetMix}
      />
      <Photon
        color={colors.violet}
        index={1}
        progress={progress}
        rideY={normalRideY}
        burstAmount={burstAmount}
        resetMix={resetMix}
      />
      <Photon
        color={colors.pink}
        index={2}
        progress={progress}
        rideY={normalRideY}
        burstAmount={burstAmount}
        resetMix={resetMix}
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

      <group ref={burstCarrier} />
      <LightningBurst
        active={lightningActive}
        amount={burstAmount}
        color={colors.cyan}
        position={burstCarrier.current?.position || new THREE.Vector3(-0.2, 1.78, 0)}
      />
    </>
  )
}
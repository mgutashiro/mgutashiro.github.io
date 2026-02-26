import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
import { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

import fontBlackUrl from './assets/fonts/monsterrat/MontserratBlack_Regular.typeface.json?url'
import fontSemiUrl  from './assets/fonts/monsterrat/MontserratSemiBold_Regular.typeface.json?url'

const materialTitle = new THREE.MeshMatcapMaterial()
const materialPortal = new THREE.MeshMatcapMaterial()
const materialHex = new THREE.MeshMatcapMaterial()

export default function Experience() {
  const hexes = useRef([])
  const titleGroup = useRef()

  // scroll refs (no React state = no rerender spam)
  const scroll01 = useRef(0)          // 0..1 for section1->section2 fade
  const atBottom = useRef(false)
  const returnTimer = useRef(null)

  const [matcapTitle]  = useMatcapTexture('C98D7F_3B0B0B_A97667_94433F', 256)
  const [matcapPortal] = useMatcapTexture('9650CA_46236A_7239A6_633492', 256)
  const [matcapHexes]  = useMatcapTexture('C98D7F_3B0B0B_A97667_94433F', 256)

  // --- materials ---
  useEffect(() => {
    matcapTitle.colorSpace = THREE.SRGBColorSpace
    materialTitle.color.setScalar(0.75)
    materialTitle.matcap = matcapTitle
    materialTitle.transparent = true
    materialTitle.depthWrite = false
    materialTitle.needsUpdate = true
  }, [matcapTitle])

  useEffect(() => {
    matcapPortal.colorSpace = THREE.SRGBColorSpace
    materialPortal.matcap = matcapPortal
    materialPortal.color.setScalar(0.8)
    materialPortal.transparent = true
    materialPortal.depthWrite = false
    materialPortal.needsUpdate = true
  }, [matcapPortal])

  useEffect(() => {
    matcapHexes.colorSpace = THREE.SRGBColorSpace
    materialHex.matcap = matcapHexes
    materialHex.needsUpdate = true
  }, [matcapHexes])

  // --- hexes ---
  const hexGeometry = useMemo(
    () => new THREE.CylinderGeometry(0.22, 0.22, 0.12, 6, 1),
    []
  )

  const hexData = useMemo(() => {
    const count = 150
    const out = []
    const maxTries = 30

    // --------------------------------------------------
    // 1) MAKE A TEMP CAMERA THAT MATCHES YOUR REAL ONE
    // --------------------------------------------------
    const cam = new THREE.PerspectiveCamera(42, 1, 0.1, 200)
    cam.position.set(6.5, -0.8, 9.5)
    cam.lookAt(0, 0, 0)
    cam.updateMatrixWorld()
    cam.updateProjectionMatrix()

    const v = new THREE.Vector3()

    // --------------------------------------------------
    // 2) SCREEN-SPACE AVOID CHECK
    //    (left 40% of the VIEWPORT)
    // --------------------------------------------------
    const inAvoidScreenLeft = (x, y, z) => {
      v.set(x, y, z).project(cam)   // project into NDC space (-1..1)
      const screenX = (v.x + 1) / 2 // convert to 0..1 screen
      return screenX < 0.15         // left 40% = avoid
    }

    // --------------------------------------------------
    // 3) HELPER TO SPREAD HEXES NICELY
    // --------------------------------------------------
    const spread = (range, power = 0.9) => {
      const r = (Math.random() * 2 - 1)
      return Math.sign(r) * Math.pow(Math.abs(r), power) * range
    }

    // --------------------------------------------------
    // 4) GENERATE POSITIONS
    // --------------------------------------------------
    for (let i = 0; i < count; i++) {
      let pos
      let tries = 0

      do {
        const x = spread(6.2, 0.9)
        const y = spread(6.2, 0.85)  // fills top/bottom
        const z = -1.5 - Math.random() * 4
        pos = [x, y, z]
        tries++
      }
      while (tries < maxTries && inAvoidScreenLeft(pos[0], pos[1], pos[2]))

      out.push({
        position: pos,
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ],
        scale: 0.30 + Math.random() * 0.55,
        spin: (Math.random() * 0.6 + 0.15) * (Math.random() < 0.5 ? -1 : 1),
        bob: 0.4 + Math.random() * 0.9,
        bobOffset: Math.random() * Math.PI * 2,
      })
    }

    return out
  }, [])


  // --- render loop ---
  useFrame((state, delta) => {
    // hex motion
    const t = state.clock.elapsedTime
    for (let i = 0; i < hexes.current.length; i++) {
      const h = hexes.current[i]
      if (!h) continue
      const d = hexData[i]
      h.rotation.y += delta * d.spin
      h.rotation.x += delta * d.spin * 0.35
      const baseY = d.position[1]
      const bobY = Math.sin(t * 0.8 + d.bobOffset) * 0.15 * d.bob
      h.position.y = THREE.MathUtils.clamp(baseY + bobY, -7.5, 7.5)
    }

    // title fade based on scroll progress
    if (!titleGroup.current) return

    const p = scroll01.current                // 0..1
    const eased = p * p * (3 - 2 * p)         // smoothstep

    const alpha = 1 - eased
    materialTitle.opacity = alpha
    materialPortal.opacity = alpha

    // small “lift and shrink” as it fades
    const s = 1 - eased * 0.08
    titleGroup.current.scale.setScalar(s)
    titleGroup.current.position.y = eased * 0.35

    // optional perf: hide when basically gone
    titleGroup.current.visible = alpha > 0.02
  })

  return (
    <>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableZoom={false}
        enableRotate={false}
        enabled={false}
      />

      <Center>
        <group ref={titleGroup}>
          <Text3D
            material={materialTitle}
            font={fontBlackUrl}
            size={0.7}
            height={0.18}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.018}
            bevelSize={0.012}
            bevelSegments={4}
            position={[-1.3, 0.22, -0.5]}
          >
            {`GRAVEYARD CHEMIST`}
          </Text3D>

          <Text3D
            material={materialPortal}
            font={fontSemiUrl}
            size={0.62}
            height={0.12}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.014}
            bevelSize={0.01}
            bevelSegments={3}
            position={[3, -0.6, -0.5]}
          >
            {`PORTAL`}
          </Text3D>
        </group>
      </Center>

      {hexData.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => (hexes.current[i] = el)}
          geometry={hexGeometry}
          material={materialHex}
          position={d.position}
          rotation={d.rotation}
          scale={d.scale}
        />
      ))}
    </>
  )
}
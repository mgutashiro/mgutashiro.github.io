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


  const [matcapTitle] = useMatcapTexture('C98D7F_3B0B0B_A97667_94433F', 256)
  const [matcapPortal] = useMatcapTexture('9650CA_46236A_7239A6_633492', 256)
  const [matcapHexes] = useMatcapTexture('C98D7F_3B0B0B_A97667_94433F', 256)

  useEffect(() => {
    matcapTitle.colorSpace = THREE.SRGBColorSpace
    matcapTitle.needsUpdate = true
    materialTitle.matcap = matcapTitle
    materialTitle.needsUpdate = true
  }, [matcapTitle])

  useEffect(() => {
    matcapPortal.colorSpace = THREE.SRGBColorSpace
    matcapPortal.needsUpdate = true
    materialPortal.matcap = matcapPortal
    materialPortal.needsUpdate = true
  }, [matcapPortal])

  useEffect(() => {
    matcapHexes.colorSpace = THREE.SRGBColorSpace
    matcapHexes.needsUpdate = true
    materialHex.matcap = matcapHexes
    materialHex.needsUpdate = true
  }, [matcapHexes])

  const hexGeometry = useMemo(() => new THREE.CylinderGeometry(0.22, 0.22, 0.12, 6, 1), [])

  const hexData = useMemo(() => {
    const count = 90
    return [...Array(count)].map(() => ({
      position: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 6, -1.5 - Math.random() * 4],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
      scale: 0.35 + Math.random() * 0.45,
      spin: (Math.random() * 0.6 + 0.15) * (Math.random() < 0.5 ? -1 : 1),
      bob: 0.4 + Math.random() * 0.9,
      bobOffset: Math.random() * Math.PI * 2
    }))
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    for (let i = 0; i < hexes.current.length; i++) {
      const h = hexes.current[i]
      if (!h) continue
      const d = hexData[i]
      h.rotation.y += delta * d.spin
      h.rotation.x += delta * d.spin * 0.35
      h.position.y = d.position[1] + Math.sin(t * 0.8 + d.bobOffset) * 0.15 * d.bob
    }
  })

  return <>
      <OrbitControls makeDefault enablePan={false} />

      <Center>
        <group>
          <Text3D
            material={materialTitle}
            font={fontBlackUrl}
            size={0.75}
            height={0.18}
            curveSegments={12}
            bevelEnabled
            bevelThickness={0.018}
            bevelSize={0.012}
            bevelSegments={4}
            position={[0, 0.22, 0]}
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
            position={[0, -0.48, 0.02]}
          >
            {`P O R T A L`}
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
}
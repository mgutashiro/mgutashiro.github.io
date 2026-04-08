// src/pages/Home/scene/TitleRig.jsx
import { Text3D, useMatcapTexture } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { range } from '../scroll/mapProgress'

import fontBlackUrl from '/src/assets/fonts/monsterrat/MontserratBlack_Regular.typeface.json?url'
import fontSemiUrl from '/src/assets/fonts/monsterrat/MontserratSemiBold_Regular.typeface.json?url'
import fontRegularUrl from '/src/assets/fonts/monsterrat/Montserrat_Regular.typeface.json?url'

const materialTitle = new THREE.MeshMatcapMaterial()
const tempVec = new THREE.Vector3()

export default function TitleRig({
  p = 0,
  introRange = [0.0, 0.16],
  anchorRef = null,
}) {
  const titleGroup = useRef()
  const { camera, size, viewport } = useThree()

  const [matcapTitle] = useMatcapTexture('C98D7F_3B0B0B_A97667_94433F', 256)

  useEffect(() => {
    matcapTitle.colorSpace = THREE.SRGBColorSpace
    materialTitle.color.setScalar(0.75)
    materialTitle.matcap = matcapTitle
    materialTitle.transparent = true
    materialTitle.depthWrite = false
    materialTitle.needsUpdate = true
  }, [matcapTitle])

  useFrame(() => {
    if (!titleGroup.current) return

    const t = p ?? 0
    const [a, b] = introRange
    const eased = range(t, a, b)

    let anchorX = 0
    let anchorY = 0

    if (anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect()

      const px = rect.left + rect.width * 0.5
      const py = rect.top + rect.height * 0.5

      const { width, height } = viewport.getCurrentViewport(camera, [0, 0, 0])

      anchorX = (px / size.width - 0.5) * width
      anchorY = -(py / size.height - 0.5) * height
    }

    const alpha = 1 - eased
    materialTitle.opacity = alpha

    /* follow DOM anchor */
    titleGroup.current.position.x = anchorX
    titleGroup.current.position.y = anchorY + eased * 0.35
    titleGroup.current.position.z = -0.5 - eased * 1.8

    /* subtle intro motion */
    titleGroup.current.rotation.y = eased * 0.12

    const s = 1 - eased * 0.06
    titleGroup.current.scale.setScalar(s)

    titleGroup.current.visible = alpha > 0.02
  })

  return (
    <group ref={titleGroup}>
      <group position={[-1.7, -0.05, 0]}>
        <Text3D
      material={materialTitle}
      font={fontSemiUrl}
      size={0.58}
      height={0.14}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.016}
      bevelSize={0.010}
      bevelSegments={4}
      position={[0, 1.08, -0.5]}
    >
      {`GRAVEYARD`}
    </Text3D>

    <Text3D
      material={materialTitle}
      font={fontBlackUrl}
      size={0.76}
      height={0.20}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.018}
      bevelSize={0.012}
      bevelSegments={4}
      position={[0, 0.0, -0.5]}
    >
      {`CHEMIST`}
    </Text3D>

    <Text3D
      material={materialTitle}
      font={fontRegularUrl}
      size={0.44}
      height={0.10}
      curveSegments={12}
      bevelEnabled
      bevelThickness={0.012}
      bevelSize={0.006}
      bevelSegments={3}
      position={[1.9, -1.10, -0.5]}
    >
      {`PORTAL`}
    </Text3D>
      </group>
    </group>
  )
}
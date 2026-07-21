// src/pages/Home/scene/TitleRig.jsx
import { Text3D, useMatcapTexture, Center } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { range } from '../scroll/mapProgress'


import fontBoldUrl from '/src/assets/fonts/Basteleur/Basteleur_Bold.json'
import fontMoonlightUrl from '/src/assets/fonts/Basteleur/Basteleur_Moonlight.json'

const materialTitle = new THREE.MeshMatcapMaterial()

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
      <group position={[0, -0.22, 0]}>

        <group position={[0, 1.0, 0]}>
          <Center precise disableY disableZ>
            <Text3D
              material={materialTitle}
              font={fontBoldUrl}
              size={0.46}
              height={0.07}
              curveSegments={10}
              bevelEnabled
              bevelThickness={0.007}
              bevelSize={0.0035}
              bevelSegments={3}
              letterSpacing={0.03}
            >
              {`GRAVEYARD`}
            </Text3D>
          </Center>
        </group>
        <group position={[0, -0.1, 0]}>
            <Center precise disableY disableZ>
              <Text3D
                material={materialTitle}
                font={fontBoldUrl}
                size={0.72}
                height={0.085}
                curveSegments={10}
                bevelEnabled
                bevelThickness={0.008}
                bevelSize={0.004}
                bevelSegments={3}
                letterSpacing={0.03}
              >
                {`CHEMIST`}
              </Text3D>
          </Center>
        </group>
        <group position={[0, -0.7, 0]} scale={[1.08, 1, 1]}>
          <Center precise disableY disableZ>
            <Text3D
              material={materialTitle}
              font={fontMoonlightUrl}
              size={0.28}
              height={0.05}
              curveSegments={10}
              bevelEnabled
              bevelThickness={0.005}
              bevelSize={0.0025}
              bevelSegments={2}
              letterSpacing={0.035}
            >
              {`PORTAL`}
            </Text3D>
          </Center>
        </group>
      </group>
    </group>
  )
}
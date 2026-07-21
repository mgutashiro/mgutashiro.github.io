import { useMatcapTexture } from '@react-three/drei'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'

const materialHex = new THREE.MeshMatcapMaterial()

export default function HexBackground () {
    const hexes = useRef([])
        const [matcapHexes]  = useMatcapTexture('9650CA_46236A_7239A6_633492', 256)
    
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
        
            // controlling how much extra to spawn beyond visible edges
            const overscan = 1.2

            const halfWidth = 7 * overscan
            const halfHeight = 5 * overscan
        
            const titleHalfWidth = 4.4
            const titleHalfHeight = 1.55

            /*
            * How likely particles are near the center.
            * 0 = almost empty
            * 1 = same density as outside
            */
            const centerDensity = 0.08

            /*
            * Higher values push more particles toward the edges.
            * 1.0 = gentle increase
            * 1.5–2.0 = noticeable radial increase
            * 3.0+ = strong outer ring
            */
            const radialExponent = 1.8

            const maxAttempts = count * 100
            let attempts = 0

            while (out.length < count && attempts < maxAttempts) {
              attempts++

              const x = (Math.random() * 2 - 1) * halfWidth
              const y = (Math.random() * 2 - 1) * halfHeight

              /*
              * Normalize position so the rectangular background behaves
              * more like a radial field rather than stretching horizontally.
              */
              const normalizedX = x / halfWidth
              const normalizedY = y / halfHeight

              /*
              * Divide by sqrt(2), because the distance at a corner of a
              * normalized square is approximately 1.414.
              */
              const radialDistance = THREE.MathUtils.clamp(
                Math.sqrt(
                  normalizedX * normalizedX +
                  normalizedY * normalizedY
                ) / Math.SQRT2,
                0,
                1
              )
        
            //Low density in the center and increasing density toward the outer edges.
            const radialDensity = THREE.MathUtils.lerp(
              centerDensity,
              1,
              Math.pow(radialDistance, radialExponent)
            )

            /*
            * Elliptical distance from the title region.
            * titleDistance < 1 => the candidate is inside the approximate title ellipse.
            */
            const titleX = x / titleHalfWidth
            const titleY = y / titleHalfHeight

            const titleDistance = Math.sqrt(
              titleX * titleX +
              titleY * titleY
            )

            /*
            * Creates a soft transition rather than a sharp empty oval
            * Below 0.75: strongly reduced
            * Above 1.3: normal density
            */
            const titleFade = THREE.MathUtils.smoothstep(
              titleDistance,
              0.75,
              1.3
            )

            const titleDensity = THREE.MathUtils.lerp(
              0.08,
              1,
              titleFade
            )

            const acceptanceChance =
              radialDensity * titleDensity

            if (Math.random() > acceptanceChance) {
              continue
            }

            // make outer particles slightly larger.
            const radialScale = THREE.MathUtils.lerp(
              0.65,
              1.15,
              radialDistance
            )

            out.push({
              position: [
                x,
                y,
                -1.5 - Math.random() * 7
              ],

              rotation: [
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
              ],

              scale:
                (0.3 + Math.random() * 0.8) *
                radialScale,

              spin:
                (Math.random() * 0.6 + 0.15) *
                (Math.random() < 0.5 ? -1 : 1),

              bob: 0.4 + Math.random() * 0.9,

              bobOffset:
                Math.random() * Math.PI * 2
            })
          }

          return out
        }, [])
        
        useFrame((state, delta) => {
            const t = state.clock.elapsedTime
    
            for (let i = 0; i < hexes.current.length; i++) {
            const h = hexes.current[i]
            if (!h) continue
            const d = hexData[i]
            if (!d) continue
    
            h.rotation.y += delta * d.spin
            h.rotation.x += delta * d.spin * 0.35
    
            const baseY = d.position[1]
            const bobY = Math.sin(t * 0.8 + d.bobOffset) * 0.15 * d.bob
            h.position.y = THREE.MathUtils.clamp(baseY + bobY, -7.5, 7.5)
            }
        })
        
        return (
        <group /* stays in world space */>
          {hexData.map((d, i) => (
            <mesh
              key={i}
              ref={(el) => (hexes.current[i] = el)}
              geometry={hexGeometry}
              material={materialHex}
              position={d.position}
              rotation={d.rotation}
              scale={d.scale}
              frustumCulled={false}  // helps with “scroll fast and it disappears”
            />
            ))}
        </group>
    )
}
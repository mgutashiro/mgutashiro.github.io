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
            const overscan = 1.25
        
            //avoid zone in normalized screen coordinates 
            // const avoidLeft = 0
        
            for (let i = 0; i < count; i++) {
              // world-space box around the origin, in front of camera
              const x = (Math.random() - 0.5) * 14   // width
              const y = (Math.random() - 0.5) * 10   // height
              const z = -1.5 - Math.random() * 7.0   // depth layers
        
              // leave left lane empty (your “avoid”)
              if (x < -7.5) { 
                i--; 
                continue 
              }
        
              out.push({
                position: [x, y, z],
                rotation: [
                  Math.random() * Math.PI,
                  Math.random() * Math.PI,
                  Math.random() * Math.PI
                ],
                scale: 0.30 + Math.random() * 0.8, 
                spin: (Math.random() * 0.6 + 0.15) * (Math.random() < 0.5 ? -1 : 1),
                bob: 0.4 + Math.random() * 0.9,
                bobOffset: Math.random() * Math.PI * 2,
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
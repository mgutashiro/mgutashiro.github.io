import { useMatcapTexture, Center, Text3D, OrbitControls } from '@react-three/drei'
import { Perf } from 'r3f-perf'
import { useRef, useEffect, useState } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import GUI from 'lil-gui'

/**
 * base
 */
const gui = new dat.GUI()


// const planetGeometry = new THREE.SphereGeometry(0.8, 32, 32)
// const ringGeometry = new THREE.TorusGeometry(1.4, 0.2, 16, 64)
const material = new THREE.MeshMatcapMaterial()
const material2 = new THREE.MeshMatcapMaterial()

export default function Experience()
{
    const donuts = useRef([])
    // const [ torusGeometry, setTorusGeometry ] = useState()
    // const [ material, setMaterial ] = useState()
    
    const [ matcapTexture ] = useMatcapTexture('C98D7F_3B0B0B_A97667_94433F', 256)

    useEffect(() =>
    {
        matcapTexture.encoding = THREE.sRGBEncoding
        matcapTexture.needsUpdate = true
        matcapTexture.colorSpace = THREE.SRGBColorSpace
        material.matcap = matcapTexture
        material.needsUpdate = true
    }, [])

    const [ matcapTexture2 ] = useMatcapTexture('9650CA_46236A_7239A6_633492', 256)
    useEffect(() =>
    {
        matcapTexture2.encoding = THREE.sRGBEncoding
        matcapTexture2.needsUpdate = true
        matcapTexture2.colorSpace = THREE.SRGBColorSpace
        material2.matcap = matcapTexture2
        material2.needsUpdate = true
    }, [])


    useFrame((state, delta) =>
    {
        for(const donut of donuts.current)
        {
            donut.rotation.y += delta * 0.1
        }
    })


    return <>

        {/* <Perf position="top-left" /> */}

        <OrbitControls makeDefault />

        {/* <torusGeometry ref={ setTorusGeometry } args={ [ 1, 0.6, 16, 32 ] } /> */}
        {/* <meshMatcapMaterial ref={ setMaterial } matcap={ matcapTexture } /> */}

        <Center>
            <Text3D 
                material={ material }
                font="./fonts/UnifrakturCook_Bold.json"
                size={ 0.75 }
                height={ 0.2 }
                curveSegments={ 12 }
                bevelEnabled
                bevelThickness={ 0.02 }
                bevelSize={ 0.02 }
                bevelOffset={ 0 }
                bevelSegments={ 5 }
            >
                {`Graveyard Chemist\nPortfolio Website`}
            </Text3D>
        </Center>

        { [...Array(100)].map((value, index) =>
            <group
                ref={ (element) => donuts.current[index] = element }
                key={ index }
                // geometry={ torusGeometry }
                // material={ material }
                position={ [
                    (Math.random() - 0.5) * 30,
                    (Math.random() - 0.5) * 30,
                    -5 - Math.random() * 5
                ] }
                scale={ 0.2 + Math.random() * 0.2 }
                rotation={ [
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    0
                ] }
            >
                {/* Planet */}
                <mesh
                    geometry={ planetGeometry }
                    material={ material2 }
                />

                {/* Rings */}
                <mesh
                    geometry={ ringGeometry }
                    material={ material2 }
                    rotation-x={ Math.PI * 0.4 }   // slight tilt
                    scale={[1, 1, 0.15]}           // ⬅️ flatten the torus
                />
            </group>
        ) }
    </>
}
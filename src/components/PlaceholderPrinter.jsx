import { useGLTF } from '@react-three/drei'
import { useEffect } from 'react'

export default function X1CPrinter({ position = [0, 0, -1.2] }) {
  const { scene } = useGLTF('/models/x1c.glb')

  useEffect(() => {
    console.log(scene.children)
  }, [scene])

  return <primitive object={scene} position={position} />
}

useGLTF.preload('/models/x1c.glb')
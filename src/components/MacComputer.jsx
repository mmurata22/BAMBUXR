import { useGLTF } from '@react-three/drei'

// Scaled so it sits comfortably next to the printer on the desk.
const DESK_SCALE = 0.34

export default function MacComputer({ position = [0.42, 0.7336, -1.2], scale = DESK_SCALE }) {
  const { scene } = useGLTF('/models/maccomputer.glb')

  return <primitive object={scene} position={position} scale={scale} name="mac-computer" />
}

useGLTF.preload('${import.meta.env.BASE_URL}/models/maccomputer.glb')

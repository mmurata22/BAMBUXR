import { useGLTF } from '@react-three/drei'

// Raw model is ~1.08m tall; scaled down to a normal desk height (~0.75m).
const DESK_HEIGHT_SCALE = 0.75 / 1.0777

export default function WoodTable({ position = [0, 0, -1.2], rotation = [0, Math.PI / 2, 0], scale = DESK_HEIGHT_SCALE }) {
  const { scene } = useGLTF('/models/woodtable.glb')

  return <primitive object={scene} position={position} rotation={rotation} scale={scale} name="wood-table" />
}

useGLTF.preload('/models/woodtable.glb')

import { Grid } from '@react-three/drei'

/**
 * Minimal neutral room: floor, back wall, and a grid for spatial reference.
 * Kept deliberately plain — this is a training-app shell, not a set piece.
 * Swap materials/dimensions once real room dressing is decided.
 */
export default function Room() {
  const ROOM_SIZE = 6 // meters, roughly a small studio room

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial color="#c9c4ba" roughness={0.9} />
      </mesh>

      {/* Reference grid — helpful during development, easy to hide later */}
      <Grid
        position={[0, 0.001, 0]}
        args={[ROOM_SIZE, ROOM_SIZE]}
        cellSize={0.25}
        cellThickness={0.5}
        cellColor="#8a8478"
        sectionSize={1}
        sectionThickness={1}
        sectionColor="#5c574d"
        fadeDistance={ROOM_SIZE}
        fadeStrength={1}
      />

      {/* Back wall */}
      <mesh
        position={[0, ROOM_SIZE / 2, -ROOM_SIZE / 2]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial color="#e4e1d8" roughness={1} />
      </mesh>

      {/* Side wall, for spatial anchoring in VR */}
      <mesh
        position={[-ROOM_SIZE / 2, ROOM_SIZE / 2, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      >
        <planeGeometry args={[ROOM_SIZE, ROOM_SIZE]} />
        <meshStandardMaterial color="#dedbd2" roughness={1} />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <hemisphereLight args={['#ffffff', '#444444', 0.4]} />
    </group>
  )
}

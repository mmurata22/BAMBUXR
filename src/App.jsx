import { useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { XR, createXRStore, useXR } from '@react-three/xr'
import Room from './components/Room.jsx'
import X1CPrinter from './components/X1CPrinter.jsx'
import WoodTable from './components/WoodTable.jsx'
import MacComputer from './components/MacComputer.jsx'
import { useTutorial } from './tutorial/useTutorial.js'
import TutorialUI from './tutorial/TutorialUI.jsx'

const store = createXRStore({
  emulate: import.meta.env.DEV,
})

export default function App() {
  const [xrSupported, setXrSupported] = useState(null)
  const tutorial = useTutorial()

  useEffect(() => {
    if (!navigator.xr) {
      setXrSupported(false)
      return
    }
    navigator.xr
      .isSessionSupported('immersive-vr')
      .then(setXrSupported)
      .catch(() => setXrSupported(false))
  }, [])

  return (
    <>
      <VrToggleButton supported={xrSupported} />

      <Canvas
        shadows
        camera={{ position: [0, 1.6, 1.8], fov: 60 }}
        style={{ width: '100vw', height: '100vh' }}
      >
        <XR store={store}>
          <Scene activeHotspot={tutorial.step.hotspot} />
        </XR>
      </Canvas>

      <TutorialUI {...tutorial} />
    </>
  )
}

function Scene({ activeHotspot }) {
  const isPresenting = useXR((state) => state.session != null)

  return (
    <>
      <Room />
      <WoodTable />
      <X1CPrinter position={[-0.35, 0.75, -1.2]} activeHotspot={activeHotspot} />
      <MacComputer />
      {!isPresenting && (
        <OrbitControls
          target={[0, 1, -1.2]}
          minDistance={0.5}
          maxDistance={4}
          maxPolarAngle={Math.PI / 2 + 0.1}
          enableDamping
        />
      )}
    </>
  )
}

function VrToggleButton({ supported }) {
  const label =
    supported === null ? 'Checking VR support…' : supported ? 'Enter VR' : 'VR not available — using desktop view'
  return (
    <button
      onClick={() => store.enterVR()}
      disabled={!supported}
      style={{
        position: 'fixed',
        top: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        padding: '10px 20px',
        borderRadius: 8,
        border: 'none',
        background: supported ? '#3aa0ff' : '#555',
        color: '#fff',
        fontSize: 14,
        fontWeight: 600,
        cursor: supported ? 'pointer' : 'default',
        opacity: supported === false ? 0.7 : 1,
      }}
    >
      {label}
    </button>
  )
}
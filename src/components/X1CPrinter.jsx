import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MM_TO_M = 0.001
const HIGHLIGHT_COLOR = new THREE.Color('#8fd0ff')
const BLINK_SPEED = 2 // higher = faster blink

// Map your hotspot names to the mesh names found via scene.traverse()
const HOTSPOTS = {
  'hotspot-door': 'door',
  'hotspot-screen': 'monitor_hold',
  'hotspot-ams': 'filament_roll_1',
  'hotspot-plate': 'inner_table',
}

export default function X1CPrinter({ position = [0, 0, -1.2], scale = MM_TO_M, activeHotspot = null }) {
  const { scene } = useGLTF('/models/x1c.glb')
  const meshMap = useRef(new Map())          // hotspot name -> mesh
  const originalEmissive = useRef(new Map()) // mesh uuid -> { color, intensity }

  // Tag and index the target meshes once, when the model loads.
  useEffect(() => {
    scene.traverse((obj) => {
      const hotspotName = Object.keys(HOTSPOTS).find((key) => HOTSPOTS[key] === obj.name)
      if (hotspotName && obj.isMesh) {
        // useGLTF caches this scene globally by URL, so its materials are shared
        // across mounts/hot-reloads — clone before mutating or highlighting one
        // mesh can permanently stain the "original" color for every user of it.
        obj.material = obj.material.clone()
        meshMap.current.set(hotspotName, obj)
        originalEmissive.current.set(obj.uuid, {
          color: obj.material.emissive.clone(),
          intensity: obj.material.emissiveIntensity,
        })
      }
    })
  }, [scene])

  // Whenever the tutorial tells us which part is "active," reset every hotspot
  // mesh to its real emissive state — the blink itself happens in useFrame below.
  useEffect(() => {
    meshMap.current.forEach((mesh) => {
      const original = originalEmissive.current.get(mesh.uuid)
      mesh.material.emissive.copy(original.color)
      mesh.material.emissiveIntensity = original.intensity
    })
  }, [activeHotspot])

  // Pulse the active hotspot's emissive glow between off and HIGHLIGHT_COLOR.
  useFrame((state) => {
    const activeMesh = activeHotspot ? meshMap.current.get(activeHotspot) : null
    if (!activeMesh) return
    const pulse = (Math.sin(state.clock.elapsedTime * BLINK_SPEED) + 1) / 2 // 0 -> 1 -> 0
    activeMesh.material.emissive.copy(HIGHLIGHT_COLOR)
    activeMesh.material.emissiveIntensity = pulse
  })

  return <primitive object={scene} position={position} scale={scale} name="x1c-printer" />
}

useGLTF.preload('/models/x1c.glb')
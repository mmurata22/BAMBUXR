# Bambu X1C WebXR Training Shell

Scene shell for the training module: basic room environment, a placeholder
printer standing in for the real model, a VR-mode toggle, and mouse/touch
fallback controls for desktop and mobile browsers.

## Stack

- React + Vite
- React Three Fiber (`@react-three/fiber`)
- drei (`@react-three/drei`) — `OrbitControls`, `Grid`, `Text` helpers
- React Three XR (`@react-three/xr` v6) — `createXRStore` / `<XR>` for WebXR

## Run it

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. `localhost` counts as a secure context, so
WebXR and the built-in emulator work without extra setup.

## Testing without a headset

Two options, both work with plain `npm run dev`:

1. **Built-in dev emulator** — `createXRStore({ emulate: true })` is already
   wired up in `App.jsx` for dev builds. Depending on your `@react-three/xr`
   version this surfaces an on-screen emulated headset/controller rig you can
   drag around with the mouse.
2. **Immersive Web Emulator browser extension** (Chrome/Edge) — installs a
   DevTools panel that simulates a full XR session, including controller
   position and button state. This is generally the more reliable of the two
   and is what most of the WebXR ecosystem uses for day-to-day dev.

If neither XR path is active, the app falls back automatically to
`OrbitControls` — click-drag to orbit, scroll to zoom, same as any desktop
Three.js scene. Nothing extra to enable.

## Testing on a physical Quest

`localhost` only counts as secure on the machine running the dev server. To
open the page on the headset's browser over your LAN, you need real HTTPS:

```bash
npm run dev:https
```

This enables a self-signed cert via `vite-plugin-basic-ssl`. On first visit
from the Quest browser you'll need to click through the "not secure"
certificate warning. Get your dev machine's LAN IP (`ipconfig`/`ifconfig`)
and browse to `https://<your-ip>:5173` from the headset.

Alternative: tunnel with `ngrok http 5173` (with `npm run dev`, no
`--https` flag needed since ngrok terminates TLS for you) if the cert warning
is a hassle or your headset and dev machine aren't on the same network.

## File structure

```
src/
  App.jsx                    — XR store, Canvas, VR toggle, fallback controls
  components/
    Room.jsx                 — floor, walls, grid, lighting
    PlaceholderPrinter.jsx   — primitive-built stand-in for the X1C model
```

## Swapping in the real model

`PlaceholderPrinter.jsx` is intentionally isolated so it can be replaced
without touching `App.jsx` or `Room.jsx`. Once you have a GLTF (from GrabCAD/
CGTrader, converted via `gltfjsx` or Blender export):

1. Drop the `.glb` in `public/models/`.
2. Replace the component body with `useGLTF` + `<primitive object={scene} />`.
3. Keep the same root `position` prop and the named hotspot meshes
   (`hotspot-screen`, `hotspot-bed-plate`, `hotspot-ams`) — or re-parent
   equivalent empties in the real model to the same names — so any
   hotspot/interaction code built against this shell doesn't need rewiring.

## Notes

- `OrbitControls` is unmounted during an active XR session (checked via
  `useXR((state) => state.session)`) so it doesn't fight the headset camera.
- The VR button feature-detects `immersive-vr` support via
  `navigator.xr.isSessionSupported` and disables itself with a "VR not
  available" label on unsupported browsers (most desktop browsers, iOS)
  rather than doing nothing when clicked.
- Model scale in `PlaceholderPrinter.jsx` is real-world meters, matching the
  X1C's approximate 389×389×458mm footprint, so distances/reach in VR should
  already be roughly correct once the real model goes in.

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// WebXR requires a secure context. `localhost` counts as secure automatically,
// so the emulator and desktop fallback work with plain `npm run dev`.
// A physical Quest browsing to your dev machine over LAN needs real HTTPS —
// run `npm run dev:https` for that (see README).
const useHttps = process.env.HTTPS === 'true'

export default defineConfig({
  base: '/BAMBUXR/',
  plugins: [react(), ...(useHttps ? [basicSsl()] : [])],
  server: {
    https: useHttps,
    host: true
  }
})

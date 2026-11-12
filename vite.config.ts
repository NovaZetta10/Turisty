import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base relativa: funciona en https://<usuario>.github.io/<repo>/ sin tocar nada
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    rollupOptions: {
      output: {
        // las librerías cambian poco: van aparte para que el navegador las guarde en caché entre despliegues
        manualChunks: (id) => {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(react|react-dom|react-router|react-router-dom|@remix-run|scheduler)\//.test(id)) return 'vendor'
          if (/node_modules\/(qrcode|dijkstrajs|pngjs)\//.test(id)) return 'qr'
          return undefined
        },
      },
    },
  },
})

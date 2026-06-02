import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
    open: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'i18next', 'react-i18next', 'recharts', 'framer-motion'],
  },
})

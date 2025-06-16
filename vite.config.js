import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwind from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwind()],
    server: {
    port: 5051, // 🔥 Change Vite dev server port to 5000
    host: '0.0.0.0',
  }

})

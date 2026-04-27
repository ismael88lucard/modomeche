import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Cambiamos esto
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
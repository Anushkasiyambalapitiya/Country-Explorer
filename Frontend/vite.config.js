import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist', // Change this to match what Vercel expects
    emptyOutDir: true
  },
  base: './' // Important for correct asset paths
})

// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist', // Changed from 'build' to 'dist'
    emptyOutDir: true
  },
  base: './' // Ensures relative paths for assets
})
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "client/node_modules"),
      "@": path.resolve(__dirname, "client/src"),
    },
  },
  server: {
    proxy: {
      //'/api': 'http://localhost:3000'
    }
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
})

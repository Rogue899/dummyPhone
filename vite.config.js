import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "none-4zy",
    project: "javascript-react"
  })],

  build: {
    // outDir: 'dist',
    sourcemap: true
  }
})
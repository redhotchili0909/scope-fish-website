import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Standard base path for personal GitHub Pages project site
  base: '/scope-fish-website/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '~features': path.resolve(__dirname, './src/features'),
      '~components': path.resolve(__dirname, './src/components'),
      '~types': path.resolve(__dirname, './src/types'),
    },
  },
  server: {
    watch: {
      ignored: ['**/.agent/**', '**/.git/**']
    }
  }
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      babel: {
        compact: true,
      },
    }),
    compression({
      ext: '.gz',
      filter: /\.(js|mjs|json|css|html)$/i,
      disable: false,
      threshold: 1024,
      algorithm: 'gzip',
      deleteOriginFile: false,
    }),
  ],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei', 'lenis', 'framer-motion'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'animation': ['framer-motion', 'lenis'],
        },
      },
    },
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  },
})
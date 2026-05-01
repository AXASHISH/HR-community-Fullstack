import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (/(react|react-dom|react-router-dom)/.test(id)) {
            return 'react-vendor';
          }
          if (/@radix-ui\/react-(accordion|alert-dialog|avatar)/.test(id)) {
            return 'ui-vendor';
          }
          if (/(axios|clsx|tailwind-merge|framer-motion)/.test(id)) {
            return 'utility-vendor';
          }
          if (/@tanstack\/react-query/.test(id)) {
            return 'query-vendor';
          }
        },
      },
    },
    // Optimize chunk sizes
    minify: 'esbuild',
    esbuild: {
      drop: ['console'],
    },
  },
  // Dev server optimizations
  server: {
    // Reduce initial dependency optimization time
    middlewareMode: false,
    // Warm up commonly used dependencies
    warmup: {
      clientFiles: ['./src/main.jsx', './src/App.jsx'],
    },
  },
  // Enable dependency pre-bundling
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
      'axios',
      '@radix-ui/react-accordion',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
    ],
  },
})

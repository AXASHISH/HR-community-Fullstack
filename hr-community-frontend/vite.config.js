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
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-avatar'],
          'utility-vendor': ['axios', 'clsx', 'tailwind-merge', 'framer-motion'],
          'query-vendor': ['@tanstack/react-query'],
        },
      },
    },
    // Optimize chunk sizes
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
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

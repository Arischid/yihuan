import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'home': ['./src/views/Home.vue'],
          'characters': ['./src/views/Characters.vue'],
          'vendor': ['vue', 'vue-router', 'pinia']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    sourcemap: false
  },
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', '@vueuse/motion']
  }
}) 
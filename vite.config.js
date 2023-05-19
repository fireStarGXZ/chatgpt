import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true
  },
  plugins: [vue()],
  define: {
    'process.env': {
      INSCODE_API_KEY: process.env.INSCODE_API_KEY
    }
  }
})

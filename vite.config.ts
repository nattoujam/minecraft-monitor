import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())

  // https://vite.dev/config/
  return defineConfig({
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: {
        '/api/login': {
          target: env.VITE_API_ENDPOINT,
          changeOrigin: true,
        },
        '/api/logout': {
          target: env.VITE_API_ENDPOINT,
          changeOrigin: true,
        },
        '/api/check_auth': {
          target: env.VITE_API_ENDPOINT,
          changeOrigin: true,
        },
        '/api/health': {
          target: env.VITE_API_ENDPOINT,
          changeOrigin: true,
        },
        '/api/wake': {
          target: env.VITE_API_ENDPOINT,
          changeOrigin: true,
        },
        '/hook/run': {
          target: env.VITE_API_ENDPOINT,
          changeOrigin: true,
        },
      },
    },
  })
}

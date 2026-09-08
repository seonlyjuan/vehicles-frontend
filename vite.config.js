import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { requireHttpsOrigin, requirePublicSupabaseKey } from './build/production-env.js'

function createContentSecurityPolicy(env) {
  requirePublicSupabaseKey(env)
  const apiOrigin = requireHttpsOrigin(env, 'VITE_API_URL')
  const supabaseOrigin = requireHttpsOrigin(env, 'VITE_SUPABASE_URL')
  const realtimeOrigin = supabaseOrigin?.replace(/^https:/, 'wss:')
  const connectSources = ["'self'", apiOrigin, supabaseOrigin, realtimeOrigin]
    .filter(Boolean)
    .join(' ')

  return [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self'",
    "script-src 'self'",
    "style-src 'self'",
    "img-src 'self' data: blob: https:",
    `connect-src ${connectSources}`,
    'upgrade-insecure-requests',
  ].join('; ')
}

function productionSecurityPolicy(env) {
  return {
    name: 'production-content-security-policy',
    apply: 'build',
    transformIndexHtml() {
      return [{
        tag: 'meta',
        attrs: {
          'http-equiv': 'Content-Security-Policy',
          content: createContentSecurityPolicy(env),
        },
        injectTo: 'head-prepend',
      }]
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react(), productionSecurityPolicy(env)],
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})

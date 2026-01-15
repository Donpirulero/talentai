import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    },
    optimizeDeps: {
      exclude: ['@xenova/transformers']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks - split large libraries
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-supabase': ['@supabase/supabase-js'],
            'vendor-charts': ['recharts'],
            'vendor-ai': ['@huggingface/inference', '@google/generative-ai', '@google/genai'],
            'vendor-icons': ['lucide-react'],
            'vendor-utils': ['driver.js']
          }
        }
      },
      chunkSizeWarningLimit: 600,
      sourcemap: false
    }
  };
});

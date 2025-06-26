import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  // Эта опция нужна, чтобы Vite правильно обрабатывал воркеры
  worker: {
    format: 'es' 
  }
});


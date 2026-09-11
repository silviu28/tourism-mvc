import { defineConfig, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    exclude: [
      "**/e2e/**",
      "**/node_modules/**"
    ],
    coverage: {
      provider: "v8"
    },
    environment: 'jsdom',
    globals: true,
    setupFiles: './test_setup.js',
  }
} as UserConfig);

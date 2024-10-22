/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTests.ts',
    exclude: [
      'node_modules',
      'dist',
      'coverage',
      'mocks/**',
    ],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'coverage/',
        'mocks/**',
        'eslint.config.js',
        'test-utils.d.tsx',
        'vite.config.ts',
        'src/main.tsx',
        'src/vite-env.d.ts',
        'src/models/**'
      ]
    }
  },
});

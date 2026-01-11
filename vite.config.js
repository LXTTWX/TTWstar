import { defineConfig } from 'vite';

export default defineConfig({
  base: '/TTWstar/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
  server: {
    open: true
  }
});

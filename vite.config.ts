import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/skyline-galleria/',
  build: {
    // Raise chunk size warning threshold slightly for framer-motion
    chunkSizeWarningLimit: 750,
  },
});

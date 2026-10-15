import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Relative assets work both at / and at the repository path on GitHub Pages.
  base: './',
  plugins: [react()],
});

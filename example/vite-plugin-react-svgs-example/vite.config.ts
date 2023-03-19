import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { createSvgIconsPlugin } from 'vite-plugin-react-svgs';
import Inspect from 'vite-plugin-inspect';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createSvgIconsPlugin({ defaultImport: 'component' }),
    Inspect()
  ],
})

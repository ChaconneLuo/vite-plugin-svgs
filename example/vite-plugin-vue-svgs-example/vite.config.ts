import { createSvgIconsPlugin } from 'vite-plugin-vue-svgs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Inspect from 'vite-plugin-inspect';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      defaultImport: 'component',
    }),
    Inspect(),
  ],
});

# vite-plugin-vue-svgs

English | [简体中文](README.zh-CN.md)

Elegant use of svg for Vite

- 🌟 Use Svg as Vue components
- 🌈 Use props to edit svg color, height and width.

## Installing this Plugin

Installation can be done in a few simple steps. From the root of your repo do the following:

1. **Install**

   ```bash
   npm i vite-plugin-vue-svgs --save-dev
   ```

   ```bash
   yarn add vite-plugin-vue-svgs -D
   ```

   ```bash
   pnpm i vite-plugin-vue-svgs -D
   ```

2. **Vite Configuration**

   Add the following to your `vite.config.js` / `vite.config.ts` file:

   ```ts
   import { createSvgIconsPlugin } from 'vite-plugin-vue-svgs';
   import { defineConfig } from 'vite';
   import vue from '@vitejs/plugin-vue';

   export default defineConfig({
     plugins: [
       vue(),
       createSvgIconsPlugin({
         defaultImport: 'component',
       }),
     ],
   });
   ```

3. **Typescript Config** (optional)

   If you're using Typescript than you'll want take the additional step of adding a types file to help Typescript to understand how to think of SVG.

   ```ts
   declare module '*.svg?component' {
     import { FunctionalComponent, SVGAttributes } from 'vue';
     const src: FunctionalComponent<SVGAttributes>;
     export default src;
   }

   declare module '*.svg?url' {
     const src: string;
     export default src;
   }

   declare module '*.svg?raw' {
     const src: string;
     export default src;
   }

   declare module 'vite-plugin-vue-svgs' {
     import { Plugin } from 'vite';
     function createSvgIconsPlugin(options?: {
       defaultImport?: 'raw' | 'component' | 'url';
     }): Plugin;
     export default createSvgIconsPlugin;
   }
   ```

4. ## Using this Plugin

   ```bash
   <script setup lang="ts">
   import VueSvg from './assets/vue.svg?component';
   import RainSvg from './assets/rain.svg?component';
   </script>

   <template>
       <div class="container">
       <RainSvg color="blue" height="5em" width="5em" />
       <VueSvg width="10em" height="10em" />
       <RainSvg color="#f0f0f0" height="5em" width="5em" />
       </div>
   </template>
   ```

   Result:

   ![image.png](https://s2.loli.net/2023/02/14/U3qNFJaS8Wxujpg.png)

## License

MIT License [ChaconneLuo](https://github.com/ChaconneLuo)

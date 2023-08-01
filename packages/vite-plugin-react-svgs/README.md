# vite-plugin-react-svgs

English | [简体中文](README.zh-CN.md)

Elegant use of svg for Vite

- 🌟 Use Svg as React components
- 🌈 Use props to edit svg color, height and width.

## Installing this Plugin

Installation can be done in a few simple steps. From the root of your repo do the following:

1. **Install**

   ```bash
   npm i vite-plugin-react-svgs --save-dev
   ```

   ```bash
   yarn add vite-plugin-react-svgs -D
   ```

   ```bash
   pnpm i vite-plugin-react-svgs -D
   ```

2. **Vite Configuration**

   Add the following to your `vite.config.js` / `vite.config.ts` file:

   ```ts
   import { createSvgIconsPlugin } from 'vite-plugin-react-svgs';
   import { defineConfig } from 'vite';

   export default defineConfig({
     plugins: [
       react(),
       createSvgIconsPlugin({
         defaultImport: 'component',
       }),
     ],
   });
   ```

3. **Typescript Config** (optional)

   If you're using Typescript than you'll want take the additional step of adding a types file to help Typescript to understand how to think of SVG.
   
    ```ts
    /// <reference types="vite-plugin-react-svgs/index" />
    ```
    Or
   ```ts
    declare module '*.svg?component' {
      import { FunctionComponent } from 'react';
      const src: FunctionComponent<{ width?: string, height?: string, color?: string }>;
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

    declare module 'vite-plugin-react-svgs' {
      import { Plugin } from 'vite';
      function createSvgIconsPlugin(options?: {
        defaultImport?: 'raw' | 'component' | 'url';
      }): Plugin;
      export default createSvgIconsPlugin;
    }
   ```

4. ## Using this Plugin

   ```bash
    import ReactSvg from './assets/react.svg?component';
    import RainSvg from './assets/rain.svg?component';
    import React from 'react';
    import './App.css';

    function App() {
      return (
        <div className="container">
          <RainSvg color="blue" height="5em" width="5em" />
          <ReactSvg width="10em" height="10em" />
          <RainSvg color="#f0f0f0" height="5em" width="5em" />
        </div>
      );
    }

    export default App;
   ```

   Result:

   ![image.png](https://s2.loli.net/2023/03/19/hzbDdH51xVfCOGn.png)

## License

MIT License [ChaconneLuo](https://github.com/ChaconneLuo)

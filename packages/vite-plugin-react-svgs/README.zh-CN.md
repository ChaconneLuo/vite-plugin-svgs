# vite-plugin-react-svgs

[English](Readme.md) | 简体中文

优雅的在 React 中使用 SVG

- 🌟 导入 Svg 图标为 Vue 组件
- 🌈 使用 Props 优雅的修改 SVG 的颜色与大小。

## 安装插件

1. **安装**

   ```bash
   npm i vite-plugin-react-svgs -D
   ```

   ```bash
   yarn add vite-plugin-react-svgs -D
   ```

   ```bash
   pnpm i vite-plugin-react-svgs -D
   ```

2. **Vite 设置**

   添加以下代码到 `vite.config.js` / `vite.config.ts` 文件中:

   ```ts
   import { createSvgIconsPlugin } from 'vite-plugin-react-svgs';
   import { defineConfig } from 'vite';
   import vue from '@vitejs/plugin-react';

   export default defineConfig({
     plugins: [
       react(),
       createSvgIconsPlugin({
         defaultImport: 'component',
       }),
     ],
   });
   ```

3. **TS 类型文件** (optional)

   如果你正在使用 Typescript，你需要额外的类型文件去使 Typescript 可以准确地理解导入的 SVG 文件。

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

4. ## 使用插件

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

   预期的结果:

   ![image.png](https://s2.loli.net/2023/03/19/hzbDdH51xVfCOGn.png)

## 许可

MIT License [ChaconneLuo](https://github.com/ChaconneLuo)

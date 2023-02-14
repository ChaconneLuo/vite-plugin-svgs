declare module '*.svg?component' {
  import { FunctionalComponent, SVGAttributes } from 'react';
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

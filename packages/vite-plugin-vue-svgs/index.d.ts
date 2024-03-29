declare module '*.svg?component' {
  import { FC, SVGAttributes } from 'react';
  const src: FC<SVGAttributes>;
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

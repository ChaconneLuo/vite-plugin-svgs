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

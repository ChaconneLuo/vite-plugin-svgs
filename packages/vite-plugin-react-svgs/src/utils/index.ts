import { PluginOptions } from '../types';
import { Plugin } from 'vite';

export function createSvgIconsPlugin(options: PluginOptions): Plugin {
  const { defineImport } = options;
  const svgRegex = /\.svg(\?(component|raw))?$/;
  return {
    name: 'vite-plugin-react-svgs',
    enforce: 'pre',
    async load(id: string) {
      if (!id.match(svgRegex)) {
        return;
      }
    },
  };
}

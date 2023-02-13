import { PluginOptions } from './types';
import type { Plugin } from 'vite';
import { promises as fs } from 'fs';
import {
  compileTemplate,
  compileStyle,
  compileScript,
} from '@vue/compiler-sfc';
export function createSvgIconsPlugin(options: PluginOptions): Plugin {
  const { defaultImport } = options;

  const svgRegex = /\.svg(\?(component|raw))?$/;

  return {
    name: 'svg-plugin',
    enforce: 'pre',
    async load(id: string) {
      if (!id.match(svgRegex)) {
        return;
      }
      const [path, query] = id.split('?', 2);
      const importType = query || defaultImport;
      if (importType === 'url') {
        return;
      }

      let svg = '';

      try {
        svg = await fs.readFile(path, 'utf-8');
      } catch (error) {
        console.warn(
          `${path} cannot be loader by vite-plugin-svgs, use default svg loader`
        );
        return;
      }

      if (importType === 'raw') {
        return `export default ${JSON.stringify(svg)}`;
      }

      const { code } = compileTemplate({
        id: JSON.stringify(id),
        source: svg,
        filename: path,
        transformAssetUrls: false,
      });

      const { style } = compileStyle({});
      const { script } = compileScript({});

      return `${code}\nexport default { render: render }`;
    },
  };
}

import { PluginOptions } from './types';
import { Plugin } from 'vite';
import { promises as fs } from 'fs';
import { parse, transform } from '@babel/core';
import { getCssUrl } from './utils';

export function createSvgIconsPlugin(options: PluginOptions): Plugin {
  const { defaultImport } = options;

  const svgRegex = /\.svg(\?(component|raw))?$/;
  return {
    name: 'vite-plugin-react-svgs',
    enforce: 'pre',
    async load(id) {
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
      const mode = svg.includes('currentColor') ? 'mask' : 'background';
      let code = '';
      if (mode === 'mask') {
        code = `import React from 'react';

        export default function Svg({ color, height, width }) {
            const uri = \`${getCssUrl(`${svg}`)}\`;
            return (
                <div>
                    <div style={{
                        mask: uri,
                        WebkitMask: uri,
                        maskSize: '100% 100%',
                        WebkitMaskSize: '100% 100%',
                        backgroundColor: color || 'gray',
                        height: height || '1em',
                        width: width || '1em',
                    }} />
                </div>
            )
        }
        `;
      } else {
        code = `import React from 'react';

        export default function Svg({ height, width }) {
            const uri = \`${getCssUrl(`${svg}`)}\`;
            return (
                <div style={{
                    background: uri,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%',
                    backgroundColor: 'transparent',
                    height: height || '1em',
                    width: width || '1em',
                }} />
            )
        }
        `;
      }
      const ast = parse(code, {
        sourceType: 'module',
        plugins: ['jsx'],
      });
      const { code: transformedCode } = transform(ast, {
        plugins: ['@babel/plugin-transform-react-jsx'],
      });
      console.log(transformedCode);
      return transformedCode;
    }
  };
}


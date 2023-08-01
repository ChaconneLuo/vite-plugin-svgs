import { PluginOptions } from './types';
import { Plugin, transformWithEsbuild } from 'vite';
import { promises as fs } from 'fs';
import { getCssUrl, getDataSvg } from './utils';

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

        export type SvgProps = {
          color?: string;
          height: string;
          width: string;
        } & React.HTMLAttributes<HTMLDivElement>;

        const Svg = ({ color, height, width, ...rest }: SvgProps) => {
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
                    }} {...rest}/>
                </div>
            )
        }
        export default Svg;
        `;
      } else {
        code = `import React from 'react';

        export type SvgProps = {
          height: string;
          width: string;
          color?: string; 
        } & React.HTMLAttributes<HTMLDivElement>;

        const Svg = ({ height = '1em', width = '1em', color = '', ...rest }: SvgProps) => {
            const uri = \`${getDataSvg(`${svg}`)}\`;
            const getColor = (uri: string) => {
              if(color !== ''){
                return uri
                .replace('{}',\`width='\${width}' height ='\${height}'\`)
                .replace(/stroke='.*?'/g, \`stroke='\${color}'\`)
                .replace(/fill='(?:(?!none)(?:#(?:[0-9a-fA-F]{3}){1,2}|(?:red|blue|green|yellow|orange|purple)))'/g, \`fill='\${color}'\`)
              }
              return uri.replace('{}',\`width = \${width} height = \${height}\`);
            }
            return (
                <div style={{width: width, height: height}} dangerouslySetInnerHTML={{__html: getColor(uri)}} {...rest}>
                </div>
            )
        }
        export default Svg;
        `;
      }
      return code;
    },
    async transform(code, id) {
      if (!id.match(svgRegex)) {
        return;
      }
      const res = await transformWithEsbuild(code, id, {
        loader: 'tsx',
      });
      return {
        code: res.code,
        id: id,
      };
    }
  };
}


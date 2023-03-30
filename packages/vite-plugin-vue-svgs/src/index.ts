import { PluginOptions } from './types';
import type { Plugin } from 'vite';
import { promises as fs } from 'fs';
import { getCssUrl } from './utils';
import { compileTemplate, compileScript, parse } from '@vue/compiler-sfc';
export * from './types';

export function createSvgIconsPlugin(options: PluginOptions): Plugin {
  const { defaultImport } = options;

  const svgRegex = /\.svg(\?(component|raw))?$/;

  return {
    name: 'vite-plugin-vue-svgs',
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
      const mode = svg.includes('currentColor') ? 'mask' : 'background';
      let templateContent = '';
      let _sfc_render = '';
      if (mode === 'mask') {
        templateContent = `<template>
            <div :style="{
            'mask': uri,
            '-webkit-mask': uri,
            'mask-size': '100% 100%',
            '-webkit-mask-size': '100% 100%',
            'background-color': props.color || 'gray',
            'height': props.height || '1em',
            'width': props.width || '1em',
          }"
          ></div>
          </template>
          <script setup>
              const props = defineProps({
                color: String,
                height: String,
                width: String
              });
              let uri = \`${getCssUrl(`${svg}`)}\`;
          </script>`;
        _sfc_render = `function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
            return _openBlock(),
            _createElementBlock("div", {
                style: _normalizeStyle({
                    mask: $setup.uri,
                    "-webkit-mask": $setup.uri,
                    "mask-size": "100% 100%",
                    "-webkit-mask-size": "100% 100%",
                    "background-color": $setup.props.color || "gray",
                    'height': $setup.props.height || '1em',
                    'width': $setup.props.width || '1em',
                })
            }, null, 4 /* STYLE */
            );
        }`;
      } else {
        templateContent = `<template>
            <div :style="{
              background: uri,
              'background-repeat': 'no-repeat',
              backgroundSize: '100% 100%',
              backgroundColor: 'transparent',
              'height': props.height || '1em',
              'width': props.width || '1em',
            }"></div>
            </template>
            <script setup>
            const props = defineProps({
              height: String,
              width: String
            });
            let uri = \`${getCssUrl(`${svg}`)}\`;
            </script>`;
        _sfc_render = `function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
              return _openBlock(),
              _createElementBlock("div", {
                  style: _normalizeStyle({
                      background: $setup.uri,
                      "background-repeat": "no-repeat",
                      backgroundSize: "100% 100%",
                      backgroundColor: "transparent",
                      'height': $setup.props.height || '1em',
                      'width': $setup.props.width || '1em',
                  })
              }, null, 4 /* STYLE */
              );
          }`;
      }
      const parseValue = parse(templateContent, {});
      const { code } = compileTemplate({
        id: JSON.stringify(id),
        source: parseValue.descriptor.template!.content,
        filename: path,
        transformAssetUrls: false,
      });
      let { content } = compileScript(parseValue.descriptor, {
        id: JSON.stringify(id),
      });
      content = content.slice(content.indexOf('export default '));
      const script = content.replace('export default ', 'const script = ');
      return `${code.slice(
        0,
        code.indexOf('function')
      )}${script}\n${_sfc_render}\nscript.render = _sfc_render;\nscript.__filename = "${path}.vue";\nexport default script;`;
    },
  };
}
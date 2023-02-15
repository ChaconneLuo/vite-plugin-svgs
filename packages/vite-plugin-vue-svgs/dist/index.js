"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  createSvgIconsPlugin: () => createSvgIconsPlugin
});
module.exports = __toCommonJS(src_exports);
var import_fs = require("fs");

// src/utils/index.ts
function encodeSvg(svg) {
  return svg.replace(
    "<svg",
    ~svg.indexOf("xmlns") ? "<svg" : '<svg xmlns="http://www.w3.org/2000/svg"'
  ).replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/{/g, "%7B").replace(/}/g, "%7D").replace(/</g, "%3C").replace(/>/g, "%3E");
}
function getCssUrl(svg) {
  return `url("data:image/svg+xml;utf8,${encodeSvg(svg)}")`;
}

// src/index.ts
var import_compiler_sfc = require("@vue/compiler-sfc");
function createSvgIconsPlugin(options) {
  const { defaultImport } = options;
  const svgRegex = /\.svg(\?(component|raw))?$/;
  return {
    name: "vite-plugin-vue-svgs",
    enforce: "pre",
    async load(id) {
      if (!id.match(svgRegex)) {
        return;
      }
      const [path, query] = id.split("?", 2);
      const importType = query || defaultImport;
      if (importType === "url") {
        return;
      }
      let svg = "";
      try {
        svg = await import_fs.promises.readFile(path, "utf-8");
      } catch (error) {
        console.warn(
          `${path} cannot be loader by vite-plugin-svgs, use default svg loader`
        );
        return;
      }
      if (importType === "raw") {
        return `export default ${JSON.stringify(svg)}`;
      }
      const mode = svg.includes("currentColor") ? "mask" : "background";
      let templateContent = "";
      let _sfc_render = "";
      if (mode === "mask") {
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
      const parseValue = (0, import_compiler_sfc.parse)(templateContent, {});
      const { code } = (0, import_compiler_sfc.compileTemplate)({
        id: JSON.stringify(id),
        source: parseValue.descriptor.template.content,
        filename: path,
        transformAssetUrls: false
      });
      let { content } = (0, import_compiler_sfc.compileScript)(parseValue.descriptor, {
        id: JSON.stringify(id)
      });
      content = content.slice(content.indexOf("export default "));
      const script = content.replace("export default ", "const script = ");
      return `${code.slice(
        0,
        code.indexOf("function")
      )}${script}
${_sfc_render}
script.render = _sfc_render;
script.__filename = "${path}.vue";
export default script;`;
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSvgIconsPlugin
});

import { Plugin } from 'vite';

type PluginOptions = {
    defaultImport: string;
};

declare function createSvgIconsPlugin(options: PluginOptions): Plugin;

export { PluginOptions, createSvgIconsPlugin };

/**
 * defineConfig is a wrapper around vite's defineConfig to add some plugins and
 * default configuration.
 *
 * strongly inspired by https://github.com/geekact/vite-react
 */
import { ConfigEnv, defineConfig as origin, mergeConfig, UserConfig, UserConfigExport } from 'vite';
import { resolve} from 'path';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as dotenv from 'dotenv';
import eslint from 'vite-plugin-eslint';

export interface Config extends UserConfig {}

export type ConfigFn = (env: ConfigEnv) => Config;
export type ConfigExport = Config | ConfigFn;


export const defineConfig = (config: ConfigExport = {}): UserConfigExport => {
  return origin((env) => {
    const rootDir = process.cwd();

    dotenv.config({
      path: resolve(rootDir, '.env'),
    });

    const defConfig = typeof config === 'function' ? config(env) : config;

    return parseConfig(defConfig, env, rootDir);
  });
};

const parseConfig = (config: Config, env: ConfigEnv, rootDir: string): Config => {

  const eslintpath = `${rootDir}/node_modules/eslint/lib/api.js`;

  return mergeConfig({
    plugins: [
      react(),
      eslint({
        eslintPath: eslintpath,
        overrideConfigFile: `${rootDir}/.eslintrc`,
        // Until remove all the eslint errors
        failOnError: false,
      }),
      tsconfigPaths({
        root: rootDir,
      })
    ],
    envPrefix: 'SPZ_',
    define: {
      // Replace process.env by import.meta.env https://vitejs.dev/guide/env-and-mode.html
      'process.env': {
        NODE_ENV: process.env.NODE_ENV,
        REACT_APP_API: process.env.REACT_APP_API,
        REACT_APP_URL_BASENAME: process.env.REACT_APP_URL_BASENAME,
      },
    },
    build: {
      manifest: true,
      // Should be dist more convient for the standard community
      // We keep build for now to avoid breaking changes
      outDir: './build',
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          // Node.js global to browser globalThis
          global: 'globalThis',
        },
      },
    },
     // TODO remove from here when migrated to typescript and styled-components
     resolve: {
      alias: [
          {
              // this is required for the SCSS modules to resolve modules
              find: /^~styles\/(.*)$/,
              replacement: resolve(rootDir, 'src/styles/$1'),
          },
          {
              // this is required for the SCSS modules to resolve modules
              find: /^~(.*)$/,
              replacement: '$1',
          },
      ],
  },
    css: {
      preprocessorOptions: {
        sass: {
          // Silent sass warnings
          // we don't care about them when migrating to styled-components
          logger: {
            warn: () => { },
            info: () => { },
            debug: () => { },
          },
          includePaths: [
            resolve(rootDir, 'node_modules'),
          ],
        },
      },
    },
  }, config, true);
};

import { DEFAULT_EXTENSIONS } from '@babel/core';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import url from '@rollup/plugin-url';
import { ifdefVitePlugin } from '@plugin-light/vite-plugin-ifdef';

import copy from 'rollup-plugin-copy';
import deletePlugin from 'rollup-plugin-delete';
import esbuild from 'rollup-plugin-esbuild';
import ignoreImport from 'rollup-plugin-ignore-import';

import multiInput from 'rollup-plugin-multi-input';
import postcss from 'rollup-plugin-postcss';
import staticImport from 'rollup-plugin-static-import';
import styles from 'rollup-plugin-styles';

import { terser } from 'rollup-plugin-terser';
import vuePlugin from 'rollup-plugin-vue';

import pkg from '../../package.json';


const name = 'press-ui';
const esExternalDeps = Object.keys(pkg.dependencies || {});

const externalDeps = esExternalDeps.concat([/lodash/, /@babel\/runtime/]);
const externalPeerDeps = Object.keys(pkg.peerDependencies || {});

const banner = `/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;

const inputList = [
  'src/**/*.ts',
  'src/**/*.js',
  'src/**/*.vue',
  'src/**/*.tsx',
  '!src/**/demos',
  '!src/**/*.d.ts',
  '!src/**/__tests__',
  '!src/**/css/index.js',
];

const getPlugins = ({
  env = '',
  isProd = false,
  ignoreLess = true,
  extractOneCss = false,
  extractMultiCss = false,
} = {}) => {
  const plugins = [
    ifdefVitePlugin({
      context: { H5: true, VUE3: true },
      type: ['css', 'js', 'html'],
    }),
    vuePlugin({
      preprocessStyles: true,
      cssModulesOptions: {
        // https://github.com/css-modules/postcss-modules#usage
      },
    }),
    nodeResolve(),
    commonjs(),
    esbuild({
      target: 'esnext',
      minify: false,
      jsx: 'preserve',
      tsconfig: 'tsconfig.build.json',
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.vue', '.ts', '.tsx'],
    }),
    json(),
    url(),
    replace({
      preventAssignment: true,
      values: {
        __VERSION__: JSON.stringify(pkg.version),
      },
    }),
  ];

  // css
  if (extractOneCss) {
    plugins.push(postcss({
      extract: `${isProd ? `${name}.min` : name}.css`,
      minimize: isProd,
      sourceMap: true,
      extensions: ['.sass', '.scss', '.css', '.less'],
    }));
  } else if (extractMultiCss) {
    plugins.push(
      postcss({}),

      staticImport({
        include: ['src/**/css/css.mjs'],
      }),
      ignoreImport({
        include: ['**/*.scss', '**/*.css'],
        body: 'import "./css/css.mjs";',
      }),

      copy({
        targets: [
          {
            src: 'src/**/css/index.js',
            dest: 'es',
            rename: (name, extension, fullPath) => {
              const result = `${fullPath.substring(4, fullPath.length - 8)}css.mjs`;
              return result;
            },
            transform(contents) {
              return contents.toString().replace('index.scss', 'index.css');
            },
          },
        ],
        verbose: true,
      }),
      copy({
        targets: [
          {
            src: 'script/utils/rollup-empty-input.css',
            dest: [
              'es/press-overlay/css',
              'es/press-picker-plus-popup-plus/css',
              'es/press-teleport/css',
              'es/press-area/css',
            ],
            rename: 'index.css',
          },
        ],
        verbose: true,
      }),
    );
  } else if (ignoreLess) {
    plugins.push(
      postcss({}),
      ignoreImport({ include: ['**/*.scss', '**/*.css'] }),
    );
  } else {
    plugins.push(
      postcss({}),
      staticImport({
        include: ['src/**/style/index.js', 'src/_common/style/mobile/**/*.less'],
      }),
      ignoreImport({
        include: ['**/*.scss', '**/*.css'],
        body: 'import "./style/index.js";',
      }),
    );
  }

  if (env) {
    plugins.push(replace({
      preventAssignment: true,
      values: {
        'process.env.NODE_ENV': JSON.stringify(env),
      },
    }));
  }

  if (isProd) {
    plugins.push(terser({
      output: {
        ascii_only: true,
      },
    }));
  }

  return plugins;
};

/** @type {import('rollup').RollupOptions} */
const cssConfig = {
  input: ['src/**/css/index.js', 'src/common/**/*.scss'],
  plugins: [multiInput(), styles({ mode: 'extract' })],
  output: {
    banner,
    dir: 'es/',
    assetFileNames: '[name].css',
  },
};

const deleteEmptyJSConfig = {
  input: 'script/utils/rollup-empty-input.js',
  plugins: [deletePlugin({ targets: 'es/**/css/index.js', runOnce: true })],
};

const exception = ['dayjs'];
const esExternal = esExternalDeps.concat(externalPeerDeps).filter(value => !exception.includes(value));


/** @type {import('rollup').RollupOptions} */
const esConfig = {
  input: inputList,
  // 为了保留 style/css.js
  treeshake: false,
  external: esExternal,
  plugins: [multiInput()].concat(getPlugins({ extractMultiCss: true })), // .concat(renameNodeModules('ext')),
  output: {
    banner,
    dir: 'es/',
    format: 'esm',
    sourcemap: true,
    entryFileNames: '[name].mjs',
    chunkFileNames(chunkInfo) {
      const moduleIds = Object.keys(chunkInfo.modules);
      const reg = /\/(press-[\w-]+|swiper-item|swiper|scroll-view)\.vue$/;
      const vueFile = moduleIds.find(item => reg.test(item));
      if (vueFile) {
        const match = vueFile.match(reg);
        return `${match[1]}/dep-[hash].js`;
      }
      return '_chunks/dep-[hash].js';
    },
  },
};

const esmConfig = {
  input: inputList,
  // 为了保留 style/index.js
  treeshake: false,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput()].concat(getPlugins({ ignoreLess: false })),
  output: {
    banner,
    dir: 'esm/',
    format: 'esm',
    sourcemap: true,
    chunkFileNames(chunkInfo) {
      const moduleIds = Object.keys(chunkInfo.modules);
      const reg = /\/(press-[\w-]+|swiper-item|swiper|scroll-view)\.vue$/;
      const vueFile = moduleIds.find(item => reg.test(item));

      if (vueFile) {
        const match = vueFile.match(reg);
        return `${match[1]}/dep-[hash].js`;
      }

      return '_chunks/dep-[hash].js';
    },
  },
};

const libConfig = {
  input: inputList,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput()].concat(getPlugins()),
  output: {
    banner,
    dir: 'lib/',
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};


const cjsConfig = {
  input: inputList,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput()].concat(getPlugins()),
  output: {
    banner,
    dir: 'cjs/',
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};


const RESULT = [
  cssConfig,
  esConfig,
  esmConfig,
  libConfig,
  cjsConfig,
  deleteEmptyJSConfig,
];

export default RESULT;

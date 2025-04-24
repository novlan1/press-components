import path from 'path';

import { loadEnv, type LibraryFormats } from 'vite';

import { capitalize, pascalCase } from 't-comm';
import vue from '@vitejs/plugin-vue';

import dts from 'vite-plugin-dts';

import { alias } from './alias';


export function getViteConfig({
  mode,
  packageName = 'tdesign-vue-next',
  root,
  useDtsPlugin = false,
}: {
  mode: string;
  packageName: string;
  root: string;
  useDtsPlugin?: boolean;
}) {
  const env = loadEnv(mode, process.cwd(), ['VITE_']);

  const docsBuild: {
    base?: string;
    build?: {
      outDir: string;
    }
  } = {};

  if (mode === 'docs') {
    docsBuild.base = env.VITE_APP_PUBLIC_PATH ? `${env.VITE_APP_PUBLIC_PATH}/${packageName}` :  './';
    docsBuild.build = {
      outDir: path.resolve(__dirname, `../../docs/.vitepress/dist/${packageName}`),
    };
  }


  console.log('[common root] ', root);
  console.log('[common mode] ', mode);
  console.log('[common docsBuild] ', docsBuild);
  return {
    server: {
      port: 3336,
    },
    plugins: ([
      vue(),
      useDtsPlugin ? dts({
        entryRoot: path.resolve(root, './components'),       // 源码目录
        outDir: path.resolve(root, './dist/types'), // 类型文件输出目录
        tsconfigPath: path.resolve(root, './tsconfig.json'), // 指定 tsconfig 路径
      }) : null,
    ].filter(Boolean) as any[]),
    build: {
      // cssCodeSplit: false,
      rollupOptions: {
        external: [
          'vue',
          'vue-router',
          'tdesign-icons-vue-next',
          packageName,
        ],
        // output: {
        //   inlineDynamicImports: true, // 动态导入内联
        // },
      },
      lib: {
        entry: path.resolve(root, './components/index.ts'),
        name: capitalize(pascalCase(`press-${packageName}`)),
        fileName: 'index',
        formats: ['es', 'cjs', 'umd', 'iife'] as LibraryFormats[],
      },
    },
    resolve: {
      alias: alias(),
    },
    ...docsBuild,
  };
}

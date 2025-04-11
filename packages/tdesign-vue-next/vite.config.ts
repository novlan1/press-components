import path from 'path'
import vue from '@vitejs/plugin-vue'
import {defineConfig} from 'vite'
import type { PluginOption, Plugin } from 'vite'
import {alias} from '../../scripts'
import type { PluginOptions} from "vite-plugin-dts";
import dts from "vite-plugin-dts";


export default defineConfig(async ({ mode }) => {
  let docsBuild: {
    base?: string;
    build?: {
      outDir: string;
    }
  } = {};

  if (mode === 'docs') {
    docsBuild.base = './'
    docsBuild.build = {
      outDir: '../../docs/.vitepress/dist/element-plus'
    }
  }
  return {
    server: {
      port: 3333
    },
    plugins: ([
      vue(),
      dts({
        entryRoot: "./components",       // 源码目录
        outDir: "./dist/types", // 类型文件输出目录
        tsconfigPath: "./tsconfig.json" // 指定 tsconfig 路径
      })
    ] as Plugin[]),
    build: {
      rollupOptions: {
        external: ['vue', 'tdesign-vue-next']
      },
      lib: {
        entry: path.resolve(__dirname, './components/index.ts'),
        name: 'voiceUi',
        fileName: 'press-element-plus',
        // formats: ['es', 'cjs', 'umd', 'iife']
      }
    },
    resolve: {
      alias: await alias()
    },
    ...docsBuild
  }
})

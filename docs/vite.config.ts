// import { initSideBar } from './build/side-bar-plugin';
import sourceCode from './build/source-code';
import { defineConfig } from 'vite';
import path from 'path';
import { alias } from '../scripts';

// initSideBar();

// @ts-ignore
export default defineConfig(async () => ({
  server: {
    proxy: {
      '/assets': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    sourceCode(),
  ],
  resolve: {
    alias: [
      ...await alias(),
      {
        find: '@/',
        replacement: path.join(__dirname, '/'),
      },
    ],
  },
}));

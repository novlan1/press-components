import path from 'path';

import { defineConfig } from 'vite';

import { alias } from '../scripts/vite-config/alias';

import sourceCode from './build/source-code';


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

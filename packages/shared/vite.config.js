import * as path from 'path';

import { defineConfig } from 'vite';

import { alias } from '../../scripts/vite-config/alias';

export default defineConfig(async () => ({
  build: {
    lib: {
      entry: path.resolve(__dirname, './index.ts'),
      name: 'voiceShared',
      fileName: 'press-shared',
      formats: ['es', 'cjs', 'umd', 'iife'],
    },
  },
  resolve: {
    alias: await alias(),
  },
}));

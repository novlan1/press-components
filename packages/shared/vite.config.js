import * as path from 'path';
import { alias } from '../../scripts';
import { defineConfig } from 'vite';

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

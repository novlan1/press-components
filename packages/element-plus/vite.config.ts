import { defineConfig } from 'vite';

import { getViteConfig } from '../../scripts/vite-config';

export default defineConfig(({ mode }) => {
  const result = getViteConfig({
    mode,
    packageName: 'element-plus',
    root: __dirname,
    useDtsPlugin: false,
  });

  return result;
});

import { defineConfig } from 'vite';

import { getViteConfig } from '../../scripts/vite-config';

export default defineConfig(({ mode }) => {
  const result = getViteConfig({
    mode,
    packageName: 'tdesign-vue-next',
    root: __dirname,
    useDtsPlugin: true,
  });

  return result;
});

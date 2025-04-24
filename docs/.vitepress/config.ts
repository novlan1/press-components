import { defineConfig, loadEnv } from 'vitepress';

import footer from './configs/footer';
import nav from './configs/nav';
import sidebar from './configs/sidebar';
// import { mdPlugin } from './configs/plugins'


// @ts-ignore
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ['VITE_']);
  console.log('[docs env] ', env);
  const base = env.VITE_DOCS_PUBLISH_PATH || '/'; // '/press-components/';
  console.log('[docs base] ', base);

  return {
    lang: 'zh-CN',
    title: 'press-components',
    description: '',
    appearance: false,
    base,
    head: [
      [
        'link',
        {
          rel: 'icon',
          href: `${base}images/press-ui-favicon-888.ico`,
        },
      ],
    ],
    themeConfig: {
      logo: 'https://mike-1255355338.cos.ap-guangzhou.myqcloud.com/press%2Fimg%2Fpress-ui-avatar-transparent.png',
      nav,
      sidebar,
      footer,
      socialLinks: [
        { icon: 'git', link: 'https://github.com/novlan1/press-components/' },
      ],
    },
  };
});

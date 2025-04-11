import { defineConfig } from 'vitepress'
import nav from './configs/nav'
import sidebar from './configs/sidebar'
import footer from './configs/footer'
// import { mdPlugin } from './configs/plugins'

const base = '/'

export default defineConfig({
  title: 'press-components',
  description: '',
  appearance: false,
  base,
  head: [
    [
      'link',
      {
        rel: 'icon',
        href: '/images/press-icon.svg'
      }
    ]
  ],
  themeConfig: {
    logo: '/images/press-icon.svg',
    nav,
    sidebar,
    footer
  }
})

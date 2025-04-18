import elementPlusSideBar from "../pages/element-plus.json"
import tdesignVueNextSideBar from "../pages/tdesign-vue-next.json"

export default {
  '/zh-CN/guide/': [
    {
      text: '快速开始',
      "collapsible": true,
      "collapsed": false,
      items: [
        { text: 'press-element-plus', link: '/zh-CN/guide/elp-install' },
        { text: 'press-tdesign-vue-next', link: '/zh-CN/guide/tdesign-vue-next-install' },
      ]
    },
    {
      text: '开发者指南',
      "collapsible": true,
      "collapsed": false,
      items: [
        { text: 'docs项目', link: '/zh-CN/guide/docs-dev' },
        { text: 'element-plus', link: '/zh-CN/guide/elp-dev' },
        { text: 'tdesign-vue-next', link: '/zh-CN/guide/tdesign-vue-next-dev' },
      ]
    }
  ],
  '/zh-CN/components/element-plus': elementPlusSideBar,
  '/zh-CN/components/tdesign-vue-next': tdesignVueNextSideBar,
}

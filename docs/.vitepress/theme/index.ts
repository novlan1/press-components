import { App, Component } from 'vue';

import VcComponents from 'element-plus';
import Theme from 'vitepress/theme';

import { GLOBALS } from '../components';

import '../../css/custom-style.css';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';


export default {
  ...Theme,
  enhanceApp({ app }: {app: App}) {
    app.use(VcComponents);

    GLOBALS.forEach((comp: Component) => {
      app.component(comp.name as string, comp);
    });
  },
};

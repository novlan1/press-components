import { App } from 'vue';

import { SidebarItem } from './components/sidebar-item';

const components = [
  SidebarItem,
];

export const installer = (app: App) => {
  components.forEach(comp => app.use(comp));
};

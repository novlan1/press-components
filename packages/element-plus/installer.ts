import {App} from 'vue';

import { VcMenu } from './components/menu';
import { VcTable } from './components/table';

const elmPlusComponents = [
  VcTable,
  VcMenu
];

export const installer = (app: App) => {
  elmPlusComponents.forEach((comp) => app.use(comp));
};

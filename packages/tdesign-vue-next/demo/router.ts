import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/sidebar-item',
      component: () => import('./sidebar-item/sidebar-item.vue'),
      name: 'TableCustomColumns',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/sidebar-item',
    },
  ],
});

export default router;

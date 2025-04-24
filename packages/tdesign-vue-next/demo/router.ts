import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/sidebar-item',
      component: () => import('./sidebar-item/sidebar-item.vue'),
      name: 'SidebarItem',
    },
    {
      path: '/menu',
      component: () => import('./menu/menu.vue'),
      name: 'Menu',
    },
    {
      path: '/breadcrumb-a',
      component: () => import('./breadcrumb/breadcrumb.vue'),
      name: 'Breadcrumb',
      children: [
        {
          path: '/breadcrumb-b',
          component: () => import('./breadcrumb/breadcrumb.vue'),
          name: 'BreadcrumbA',
          children: [
            {
              path: '/breadcrumb',
              component: () => import('./breadcrumb/breadcrumb.vue'),
              name: 'BreadcrumbB',
            },
          ],
        },
      ],
    },
    {
      path: '/image-grid',
      component: () => import('./image-grid/image-grid.vue'),
      name: 'ImageGrid',
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/sidebar-item',
    },
  ],
});

export default router;

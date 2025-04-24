<template>
  <Menu
    :active-index="activeIndex"
    :routes="ROUTES"
    @changeCollapse="changeCollapse"
    @clickSidebar="clickSidebar"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { Menu, type ISidebarItem } from 'press-tdesign-vue-next';

import { ROUTES } from '../sidebar-item/routes';


const activeIndex = ref('/hok/match');

const changeCollapse = (value: boolean) => {
  console.log('[changeCollapse] ', value);
};

const clickSidebar = (item: ISidebarItem) => {
  console.log('[clickSidebar] ', item);
  activeIndex.value = item.fullPath || '';
};

</script>

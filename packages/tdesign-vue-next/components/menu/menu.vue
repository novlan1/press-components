<template>
  <TMenu
    :value="activeIndex"
    :collapsed="isCollapse"
    theme="light"
    class="press-menu flex-1"
    @open="handleOpen"
    @close="handleClose"
  >
    <template #logo>
      <img
        class="!ml-0"
        :src="isCollapse ? LOGO_MAP.COLLAPSE : LOGO_MAP.NORMAL"
        :class="{
          'px-[20px]': !isCollapse
        }"
      >
    </template>

    <SidebarItem
      v-for="(tItem, index) in routes"
      :key="`${tItem.path}-${index}`"
      :item="tItem"
      @clickSidebar="clickSidebar"
    />

    <template #operations>
      <TButton
        variant="text"
        shape="square"
        @click="changeCollapse"
      >
        <template #icon>
          <TIcon
            name="view-list"
          />
        </template>
      </TButton>
    </template>
  </TMenu>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import {
  Menu as TMenu,
  Icon as TIcon,
  Button as TButton,
} from 'tdesign-vue-next';

import { SidebarItem } from '../sidebar-item';

import type { ISidebarItem } from '../sidebar-item/types';

const LOGO_MAP = {
  NORMAL: '',
  COLLAPSE: '',
};

type Props = {
  activeIndex: string;
  routes: ISidebarItem[];
};


const isCollapse = ref(false);


defineProps<Props>();


const emits = defineEmits(['openMenu', 'closeMenu', 'clickSidebar',
  'changeCollapse']);


const handleOpen = (key: string, keyPath: string[]) => {
  emits('openMenu', key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  emits('closeMenu', key, keyPath);
};

const clickSidebar = (item: ISidebarItem) => {
  emits('clickSidebar', item);
};
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
  emits('changeCollapse', isCollapse.value);
};
</script>

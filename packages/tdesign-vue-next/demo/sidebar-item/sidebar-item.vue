<template>
  <TMenu
    :value="activeIndex"
    :collapsed="isCollapse"
    theme="light"
    class="flex-1"
  >
    <SidebarItem
      v-for="(item, index) in parsedRoutes"
      :key="`${item.path}-${index}`"
      :item="item"
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
import { ref, computed } from 'vue';

import { Menu as TMenu, Icon as TIcon, Button as TButton } from 'tdesign-vue-next';

import { SidebarItem, type ISidebarItem } from 'press-tdesign-vue-next';

import { ROUTES } from './routes';

const parsedRoutes = ref(ROUTES);

const activeIndex = computed(() => '/hok/match');

const collapseEmits = defineEmits(['collapse']);
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
  collapseEmits('collapse', isCollapse.value);
};
const isCollapse = ref(false);


const clickSidebar = (item: ISidebarItem) => {
  console.log('item', item);
};
</script>

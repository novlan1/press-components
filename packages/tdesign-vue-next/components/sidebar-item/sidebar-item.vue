<template>
  <TSubmenu
    v-if="item.children?.length"
    :value="item.fullPath"
    :title="item.name"
  >
    <template #icon>
      <TIcon
        v-if="item.meta?.icon"
        :name="item.meta?.icon"
      />
    </template>

    <SideBarItem
      v-for="(i, idx) in item.children"
      :key="`${i.path}-${idx}`"
      :item="i"
      @clickSidebar="() => clickSidebar(i)"
    />
  </TSubmenu>

  <TMenuItem
    v-else
    :value="item.fullPath"
    @click="() => clickSidebar(item)"
  >
    <template
      v-if="item.meta?.icon"
      #icon
    >
      <TIcon :name="item.meta?.icon" />
    </template>
    <span>{{ item.name }}</span>
  </TMenuItem>
</template>
<script lang="ts" setup>
import {
  MenuItem as TMenuItem,
  Submenu as TSubmenu,
  Icon as TIcon,
} from 'tdesign-vue-next';

import type { ISidebarItem } from './types';

type Props = {
  item: ISidebarItem;
};

defineProps<Props>();

const emits = defineEmits(['clickSidebar']);
defineOptions({
  name: 'SideBarItem',
});

function clickSidebar(item: ISidebarItem) {
  emits('clickSidebar', item);
}
</script>

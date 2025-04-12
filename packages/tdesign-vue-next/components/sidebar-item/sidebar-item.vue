<template>
  <TSubmenu
    v-if="props.item.children?.length"
    :value="props.item.fullPath"
    :title="props.item.name"
  >
    <template #icon>
      <TIcon
        v-if="props.item.meta?.icon"
        :name="props.item.meta?.icon"
      />
    </template>

    <SideBarItem
      v-for="(i, idx) in props.item.children"
      :key="`${i.path}-${idx}`"
      :item="i"
      @click="clickSidebar(i)"
    />
  </TSubmenu>

  <TMenuItem
    v-else
    :value="props.item.fullPath"
    @click="clickSidebar(props.item)"
  >
    <template
      v-if="props.item.meta?.icon"
      #icon
    >
      <TIcon :name="props.item.meta?.icon" />
    </template>
    <span>{{ props.item.name }}</span>
  </TMenuItem>
</template>
<script lang="ts" setup>
import {
  MenuItem as TMenuItem,
  Submenu as TSubmenu,
  Icon as TIcon,
} from 'tdesign-vue-next';
import type { Route } from './types';

type SidebarItem = Route

type Props = {
  item: SidebarItem;
};

const props = defineProps<Props>();

const emits = defineEmits(['clickSidebar']);
defineOptions({
  name: 'SideBarItem',
});

function clickSidebar(item: SidebarItem) {
  emits('clickSidebar', item);
}
</script>

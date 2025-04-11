<template><t-submenu v-if="props.item.children?.length" :value="props.item.fullPath" :title="props.item.name">
  <template #icon>
    <t-icon v-if="props.item.meta?.icon" :name="props.item.meta?.icon" />
  </template>

  <SideBarItem v-for="(i, idx) in props.item.children" :key="`${i.path}-${idx}`" :item="i" @click="clickSidebar(i)" />
</t-submenu>

<t-menu-item v-else :value="props.item.fullPath" @click="clickSidebar(props.item)">
  <template v-if="props.item.meta?.icon" #icon>
    <t-icon :name="props.item.meta?.icon" />
  </template>
  <span>{{ props.item.name }}</span>
</t-menu-item></template>
<script lang="ts" setup>
import { 
  Menu as TMenu, 
  MenuItem as TMenuItem,
  Submenu as TSubmenu,
  Icon as TIcon,
 } from 'tdesign-vue-next';

type Props = {
  item: any;
};

const props = defineProps<Props>();

const emits = defineEmits(['clickSidebar']);
defineOptions({
  name: 'SideBarItem',
});

function clickSidebar(item:any) {
  emits('clickSidebar', item);
}
</script>

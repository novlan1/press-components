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
import { SidebarItem } from 'press-tdesign-vue-next';
import { Menu as TMenu, Icon as TIcon, Button as TButton } from 'tdesign-vue-next';


const parsedRoutes = ref([
  {
    path: '/hok/match',
    name: '赛事列表',
    meta: {
      title: '赛事列表',
      icon: 'data',
    },
    fullPath: '/hok/match',
    children: [

    ],
  },
  {
    path: '/hok/homepage',
    name: '端内首页',
    meta: {
      title: '端内首页',
      icon: 'command',
    },
    fullPath: '/hok/homepage',
    children: [

    ],
  },
  {
    path: '/hok/recommend',
    name: '推荐管理',
    meta: {
      title: '推荐管理',
      icon: 'page-first',
    },
    fullPath: '/hok/recommend',
    children: [

    ],
  },
  {
    path: '/hok/brand',
    name: '品牌管理',
    meta: {
      title: '品牌管理',
      icon: 'star',
    },
    fullPath: '/hok/brand',
    children: [

    ],
  },
]);

const activeIndex = computed(() => '/hok/match');

const collapseEmits = defineEmits(['collapse']);
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
  collapseEmits('collapse', isCollapse.value);
};
const isCollapse = ref(false);


const clickSidebar = (item) => {
  console.log('item', item);
};
</script>

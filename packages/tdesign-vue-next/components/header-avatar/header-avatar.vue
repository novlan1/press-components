<template>
  <div class="header flex h-full items-center justify-between px-4">
    <div>
      <Breadcrumb />
    </div>

    <div>
      <TPopup
        trigger="click"
        virtual-triggering
        width="250"
        placement="top-left"
      >
        <template #default>
          <span class="flex cursor-pointer items-center">
            <span
              v-if="showNick"
              class="mr-[8px]"
            >
              {{ nick }}
            </span>
            <img
              v-if="head"
              class="mr-[4px] h-[40px] w-[40px] rounded-full"
              :src="head"
            >
            <ChevronDownIcon size="20px" />
          </span>
        </template>

        <template #content>
          <TButton
            divided
            @click="onLogout"
          >
            退出登录
          </TButton>
        </template>
      </TPopup>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ChevronDownIcon } from 'tdesign-icons-vue-next';
import {
  Button as TButton,
  Popup as TPopup,
} from 'tdesign-vue-next';

import { Breadcrumb } from '../breadcrumb';

import type { HeaderAvatarProps } from './types';


withDefaults(defineProps<HeaderAvatarProps>(), {
  showNick: false,
  nick: '',
  head: '',
});

const emits = defineEmits<{
  logout: [];
}>();


const onLogout = () => {
  emits('logout');
};
</script>

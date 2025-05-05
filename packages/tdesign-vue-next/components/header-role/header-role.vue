<template>
  <div class="header flex h-full items-center justify-between px-4">
    <div>
      <Breadcrumb />
    </div>


    <div class="flex items-center justify-center">
      <TButton
        v-if="!loginInfo.isLogin"
        theme="primary"
        @click="onLogin"
      >
        登录
      </TButton>
      <div
        v-else
        class="mr-6 flex h-full items-center justify-center"
      >
        {{ gameName }}
      </div>

      <TPopup
        v-if="loginInfo.isLogin"
        ref="popoverRef"
        trigger="click"
        virtual-triggering
        width="250"
        placement="top-left"
      >
        <template #content>
          <div>
            <div class="flex items-center">
              <div>切换到：</div>
              <TCascader
                :model-value="roleId"
                :options="roleList"
                placeholder="请选择角色"
                style="width: 160px"
                :show-all-levels="false"
                placement="bottom-end"
                :teleported="false"
                @change="onChangeRole"
              />
            </div>
            <div
              class="mt-3 flex cursor-pointer items-center justify-start"
              @click.stop="onLogout"
            >
              <ArrowLeftIcon class="mr-2" />
              <span>退出登录</span>
            </div>
          </div>
        </template>

        <template #default>
          <div
            class="flex cursor-pointer items-center text-[14px]"
          >
            <img
              v-if="loginInfo.head"
              :src="loginInfo.head"
              class="mr-3 h-[36px] w-[36px] rounded-full"
            >
            <div class="mr-3 flex flex-col justify-start">
              <div class="mb-[4px] text-[#252525]">
                {{ loginInfo.nick }}
              </div>
              <div class="min-w-[90px] text-[#999]">
                {{ nodeName }}
              </div>
            </div>

            <ChevronDownIcon
              class="cursor-pointer !text-[#999]"
              size="16"
            />
          </div>
        </template>
      </TPopup>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import {
  ArrowLeftIcon,
  ChevronDownIcon,
} from 'tdesign-icons-vue-next';
import {
  Button as TButton,
  Popup as TPopup,
  Cascader as TCascader,
} from 'tdesign-vue-next';

import { Breadcrumb } from 'press-tdesign-vue-next';

import type { HeaderRoleProps, RoleItem } from './types';


withDefaults(defineProps<HeaderRoleProps>(), {
  loginInfo: () => ({}),
  roleList: () => ([]),
});


const emits = defineEmits<{
  changeRole: [info: RoleItem];
  logout: [];
  login: [];
}>();

const popoverRef = ref();

const onLogout = () => {
  emits('logout');
};


const onChangeRole = (info) => {
  emits('changeRole', info);
};


const onLogin = () => {
  emits('login');
};

</script>

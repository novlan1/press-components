<template>
  <div class="menu-wrapper">
    <ElMenu
      :collapse="_collapse"
      class="menu"
      v-bind="$attrs"
    >
      <ElMenuItem
        v-if="title"
        class="menu-title"
        index="title"
        @click="onTitleClick"
      >
        <ElIcon>
          <img
            class="logo"
            :src="logo"
          >
        </ElIcon>
        <template #title>
          <span class="title">{{ title }}</span>
        </template>
      </ElMenuItem>
      <slot />
    </ElMenu>
    <div class="trigger">
      <ElIcon
        class="icon-trigger"
        @click="toggle"
      >
        <IconOpen v-show="collapse" />
        <IconClose v-show="!collapse" />
      </ElIcon>
    </div>
  </div>
</template>

<script setup>
import { ElIcon, ElMenu, ElMenuItem } from 'element-plus';
import { computed, getCurrentInstance, defineComponent } from 'vue';
import Logo from './assets/logo.png';
import IconOpen from './iconOpen.vue';
import IconClose from './iconClose.vue';

const emit = defineEmits(['update:collapse']);
const instance = getCurrentInstance();
const router = instance.appContext.config.globalProperties.$router;

const props = defineProps({
  logo: {
    type: String,
    default: Logo,
  },
  title: {
    type: String,
  },
  collapse: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
  },
});

const _collapse = computed({
  get() {
    return props.collapse;
  },
  set(val) {
    emit('update:collapse', val);
  },
});

function toggle() {
  _collapse.value = !_collapse.value;
}

function onTitleClick() {
  if (router && props.url) {
    router.push(props.url);
  }
}
defineComponent({
  name: 'VcMenu',
  inheritAttrs: false,
});
</script>

<style lang="less" scoped>
.menu-wrapper {
  height: 100%;
  position: relative;
  padding-bottom: 48px;
  box-sizing: border-box;

  .menu-title {
    border-bottom: 1px solid rgba(0,0,0,.1);
    &:hover {
      background: #fff !important;
    }
  }
}

:deep(.el-menu:not(.el-menu--collapse)) {
  .title {
    height: 56px;
    line-height: 56px;
    padding-left: 16px;
    font-size: 16px;
    font-weight: 700;
    color: rgba(0, 0, 0, 0.90);
    box-sizing: border-box;
  }
}

.menu {
  &:not(.el-menu.el-menu--collapse) {
    width: var(--vc-menu-width);
  }

  &.el-menu.el-menu--collapse {
    .logo {
      margin-left: -2px;
    }
  }

  height: 100%;
  overflow-y: auto;
}

.logo {
  width: 32px;
  margin-left: 32px - 24px;
}

.trigger {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  bottom: 0;
  width: 100%;
  height: 48px;
  font-size: 24px;

  .icon-trigger {
    cursor: pointer;
    width: 64px;
    text-align: center;
    &:hover {
      color: var(--vc-color-primary);
    }
  }
}
</style>

# 使用 `press-tdesign-vue-next`

本节将介绍如何在项目中使用 Press TDesign Vue Next。

## 环境支持

::: tip 当前封装所使用的库版本

- tdesign-vue-next 版本为： `1.11.+`
- vue 版本为： `3.2.+`

:::

## 安装

### 1. 使用包管理器

```shell
# NPM
npm install press-tdesign-vue-next

# Yarn
yarn install press-tdesign-vue-next

# pnpm
pnpm install press-tdesign-vue-next
```

## 快速开始

### 1. 完整引入

`press-tdesign-vue-next` 将会在Vue应用中进行**全局组件注册**。

```ts
// main.ts
import { createApp } from 'vue'
import PressTDesignVueNext from 'press-tdesign-vue-next'
import 'press-tdesign-vue-next/dist/style.css'

const app = createApp(App)

app.use(PressTDesignVueNext)
```

### 2. 按需引入

需要在使用组件的地方手动对 `组件` 进行导入。

```html
<!-- App.vue -->
<template>
  <SidebarItem ... />
</template>

<script setup>
  import { SidebarItem } from 'press-tdesign-vue-next'
</script>
```

## 注意事项

::: danger 关于原生库
组件库打包时会对第三方包如 `tdesign-vue-next` 、`vue` 进行 `externals` 处理，所以务必保证使用组件的项目中导入必须要的第三方库。
:::

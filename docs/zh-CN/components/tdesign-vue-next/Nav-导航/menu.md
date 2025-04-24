# Menu 导航菜单

适用于业务的导航菜单。

## 示例

<vp-demo
  demo-height="380px"
  source-code="tdesign-vue-next:::menu/menu"
/>

## 属性

| 属性        | 说明                   | 类型                                                                                                                                                                | 可选值 | 默认值 |
| ----------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ |
| routes      | 路由列表               | `SidebarItem[]`。[类型定义](https://github.com/novlan1/press-components/blob/release/packages/tdesign-vue-next/components/sidebar-item/sidebar-item.vue) | -      | -      |
| activeIndex | 当前激活的路由路径名称 | `string`                                                                                                                                                            | -      | -      |


## 事件

| 事件           | 说明         | 参数                                                                                                                                                                     |
| -------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| clickSidebar   | 点击侧边栏   | `(item: SidebarItem)`。[类型定义](https://github.com/novlan1/press-components/blob/master/packages/tdesign-vue-next/components/sidebar-item/sidebar-item.vue) |
| changeCollapse | 切换展开收起 | `(isCollapse: boolean)`                                                                                                                                                  |

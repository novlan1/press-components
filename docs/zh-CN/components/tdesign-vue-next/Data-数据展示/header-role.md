# HeaderRole 带角色的头部导航

带角色切换的头部导航，适用于管理端。

## 示例

<vp-demo
  demo-height="360px"
  source-code="tdesign-vue-next:::header-role/header-role"
/>

## 属性

| 属性      | 说明     | 类型                                                                                            | 可选值 | 默认值 |
| --------- | -------- | ----------------------------------------------------------------------------------------------- | ------ | ------ |
| nodeName  | 节点ID   | `string`。                                                                                      | -      | -      |
| gameName  | 游戏ID   | `string`                                                                                        | -      | -      |
| roleId    | 角色ID   | `string`                                                                                        | -      | -      |
| loginInfo | 登录信息 | `{ head?: string; nick?: string; isLogin?: boolean }`                                           | -      | -      |
| roleList  | 角色列表 | `Array<{ label: string; value: string; children?: Array<{ label: string; value: string; }>; }>` | -      | -      |

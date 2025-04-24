# Breadcrumb 面包屑

适用于业务的面包屑，根据 `vue-router` 生成。

核心逻辑

```ts
import { useRoute } from 'vue-router';

const route = useRoute();
const matched = computed(() => route.matched);
```

## 示例

<vp-demo
  demo-height="380px"
  source-code="tdesign-vue-next:::breadcrumb/breadcrumb"
/>

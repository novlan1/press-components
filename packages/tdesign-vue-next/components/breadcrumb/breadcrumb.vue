<template>
  <TBreadcrumb separator="/">
    <TBreadcrumbItem
      v-for="(item, index) of matched"
      :key="index"
      :to="{ path: item.path }"
    >
      {{ item.meta.title || item.name }}
    </TBreadcrumbItem>
  </TBreadcrumb>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import {
  Breadcrumb as TBreadcrumb,
  BreadcrumbItem as TBreadcrumbItem,
} from 'tdesign-vue-next';
import { useRoute } from 'vue-router';

const route = useRoute();
const matched = computed(() => route.matched);

</script>

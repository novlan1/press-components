<template>
  <t-breadcrumb separator="/">
    <t-breadcrumb-item
      v-for="(item, index) of matched"
      :key="index"
      :to="{ path: item.path }"
    >
      {{ item.meta.title || item.name }}
    </t-breadcrumb-item>
  </t-breadcrumb>
</template>
<script lang="ts" setup>
import { computed } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();
const matched = computed(() => route.matched);

</script>

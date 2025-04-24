<template>
  <ImageGrid
    :image-list="imageList"
    width="200px"
    height="140px"
  />
</template>
<script lang="ts" setup>
import { ImageGrid } from 'press-tdesign-vue-next';

const imageList = Array.from({ length: 20 })
  .map((_, index) => ({
    url: 'https://tdesign.gtimg.com/demo/demo-image-1.png',
    name: `图片-${index + 1}-描述-大江东去，浪淘尽，千古风流人物，故垒西边`,
  }));
</script>

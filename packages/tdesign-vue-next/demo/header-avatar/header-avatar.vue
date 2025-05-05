<template>
  <HeaderAvatar
    :nick="userName"
    :head="userAvatar"
    :show-nick="true"

    @logout="onLogout"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

import { HeaderAvatar } from 'press-tdesign-vue-next';

const userName = ref('novlan1');
const userAvatar = ref('https://tdesign.gtimg.com/demo/demo-image-1.png');

const onLogout = () => {
  console.log('logout');
};
</script>
